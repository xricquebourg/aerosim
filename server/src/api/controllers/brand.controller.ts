import { Brand } from '../../entity/Brand';
import { Router, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { Controller } from './interface.controller';


export class BrandController implements Controller {
    router: Router;
    private brandRepository: Repository<Brand>;

    constructor() {
        this.brandRepository = AppDataSource.getRepository(Brand);
        this.router = Router();
    }

    getAll = async (request: Request, response: Response): Promise<void> => {
        const brands: Brand[] = await this.brandRepository.find();
        response.status(200).json(brands);
    };

    getOne = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        const brand: Brand | null = await this.brandRepository.findOneBy({ id: parseInt(request.params.id ?? 0) });
        response.status(200).send(brand);
    };

    create = async (request: Request, response: Response): Promise<void> => {
        try {
            const brand: Brand = new Brand(request.body.name_b);

            const brand2 = await this.brandRepository.save(brand);
            console.log(brand2);

            response.status(200).send(brand2);
        } catch (ex: any) {
            console.log(ex);
            if (ex?.code === 'ER_DUP_ENTRY')
                response.status(400).send('Marque déjà enregistré');
            else if (ex?.code === 'ER_NO_DEFAULT_FOR_FIELD')
                response.status(400).send(ex.sqlMessage);
        }

    };

    update = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        const brand: Brand | null = await this.brandRepository.findOneBy({ id: parseInt(request.params.id ?? 0) });

        if (brand) {
            brand.name_b = request.body.name_b;
            await this.brandRepository.update(brand.id, brand);
            response.status(200).send(brand);
        } else {
            response.status(400).send('Marque non trouvé');
        }
    };

    delete = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        try {
            await this.brandRepository.delete({ id: parseInt(request.params.id ?? 0) });
            response.status(200);
        } catch (ex: any) {
            response.status(400).send(ex);
        }
    };
}