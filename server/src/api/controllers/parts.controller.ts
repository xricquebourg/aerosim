import { Parts } from '../../entity/Parts';
import { Router, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { Genre } from '../../entity/Genre';
import { Controller } from './interface.controller';


export class PartsController implements Controller {
    router: Router;
    private partsRepository: Repository<Parts>;

    constructor() {
        this.partsRepository = AppDataSource.getRepository(Parts);
        this.router = Router();
    }

    getAll = async (request: Request, response: Response): Promise<void> => {
        const partss: Parts[] = await this.partsRepository.find();
        response.status(200).json(partss);
    };

    getOne = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        const parts: Parts | null = await this.partsRepository.findOneBy({ id: parseInt(request.params.id ?? 0) });
        response.status(200).send(parts);
    };

    create = async (request: Request<{}, {}, Parts>, response: Response): Promise<void> => {
        try {
            // const genre: Genre = request.body.genre as Genre;
            console.log(request.body);
            const parts: Parts = request.body;//new Parts(request.body.name_p);

            const parts2 = await this.partsRepository.save(parts);
            console.log(parts2);

            response.status(200).send(parts2);
        } catch (ex: any) {
            console.log(ex);
            if (ex?.code === 'ER_DUP_ENTRY')
                response.status(400).send('Marque déjà enregistré');
            else if (ex?.code === 'ER_NO_DEFAULT_FOR_FIELD')
                response.status(400).send(ex.sqlMessage);
        }

    };

    update = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        // let parts: Parts | null = await this.partsRepository.findOneBy({ id: parseInt(request.params.id ?? 0) });

        if (request.body.id) {
            const parts: Parts = request.body;//new Parts(request.body.name_p);
            // parts.name_p = request.body.name_p;
            await this.partsRepository.update(parts.id, parts);
            response.status(200).send(parts);
        } else {
            response.status(400).send('Marque non trouvé');
        }
    };

    delete = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        try {
            await this.partsRepository.delete({ id: parseInt(request.params.id ?? 0) });
            response.status(200);
        } catch (ex: any) {
            response.status(400).send(ex);
        }
    };
}

export default PartsController;