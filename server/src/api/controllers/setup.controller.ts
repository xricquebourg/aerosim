import { Setup } from '../../entity/Setup';
import { Router, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { Genre } from '../../entity/Genre';
import { Controller } from './interface.controller';


export class SetupController implements Controller {
    router: Router;
    private setupRepository: Repository<Setup>;

    constructor() {
        this.setupRepository = AppDataSource.getRepository(Setup);
        this.router = Router();
    }

    getAll = async (request: Request, response: Response): Promise<void> => {
        const setups: Setup[] = await this.setupRepository.find();
        response.status(200).json(setups);
    };

    getOne = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        const setup: Setup | null = await this.setupRepository.findOneBy({ id: parseInt(request.params.id ?? 0) });
        response.status(200).send(setup);
    };

    create = async (request: Request<{}, {}, Setup>, response: Response): Promise<void> => {
        try {
            // const genre: Genre = request.body.genre as Genre;
            console.log(request.body);
            const setup: Setup = request.body;//new Setup(request.body.name_p);

            const setup2 = await this.setupRepository.save(setup);
            console.log(setup2);

            response.status(200).send(setup2);
        } catch (ex: any) {
            console.log(ex);
            if (ex?.code === 'ER_DUP_ENTRY')
                response.status(400).send('Marque déjà enregistré');
            else if (ex?.code === 'ER_NO_DEFAULT_FOR_FIELD')
                response.status(400).send(ex.sqlMessage);
        }

    };

    update = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        // let setup: Setup | null = await this.setupRepository.findOneBy({ id: parseInt(request.params.id ?? 0) });

        if (request.body.id) {
            const setup: Setup = request.body;//new Setup(request.body.name_p);
            // setup.name_p = request.body.name_p;
            await this.setupRepository.update(setup.id, setup);
            response.status(200).send(setup);
        } else {
            response.status(400).send('Marque non trouvé');
        }
    };

    delete = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        try {
            await this.setupRepository.delete({ id: parseInt(request.params.id ?? 0) });
            response.status(200);
        } catch (ex: any) {
            response.status(400).send(ex);
        }
    };
}

export default SetupController;