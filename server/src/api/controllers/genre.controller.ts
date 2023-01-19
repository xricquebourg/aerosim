import { Genre } from '../../entity/Genre';
import { Router, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { Controller } from './interface.controller';


export class GenreController implements Controller {
    router: Router;
    private genreRepository: Repository<Genre>;

    constructor() {
        this.genreRepository = AppDataSource.getRepository(Genre);
        this.router = Router();
    }

    getAll = async (request: Request, response: Response): Promise<void> => {
        const genres: Genre[] = await this.genreRepository.find();
        response.status(200).json(genres);
    };

    getOne = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        const genre: Genre | null = await this.genreRepository.findOneBy({ id: parseInt(request.params.id ?? 0) });
        response.status(200).send(genre);
    };

    create = async (request: Request, response: Response): Promise<void> => {
        try {
            const genre: Genre = new Genre(request.body.name_g);

            const genre2 = await this.genreRepository.save(genre);
            console.log(genre2);

            response.status(200).send(genre2);
        } catch (ex: any) {
            console.log(ex);
            if (ex?.code === 'ER_DUP_ENTRY')
                response.status(400).send('Marque déjà enregistré');
            else if (ex?.code === 'ER_NO_DEFAULT_FOR_FIELD')
                response.status(400).send(ex.sqlMessage);
        }

    };

    update = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        const genre: Genre | null = await this.genreRepository.findOneBy({ id: parseInt(request.params.id ?? 0) });

        if (genre) {
            genre.name_g = request.body.name_g;
            await this.genreRepository.update(genre.id, genre);
            response.status(200).send(genre);
        } else {
            response.status(400).send('Marque non trouvé');
        }
    };

    delete = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        try {
            await this.genreRepository.delete({ id: parseInt(request.params.id ?? 0) });
            response.status(200);
        } catch (ex: any) {
            response.status(400).send(ex);
        }
    };
}

export default GenreController;