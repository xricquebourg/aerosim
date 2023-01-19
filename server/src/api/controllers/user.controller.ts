import { User } from '../../entity/User';
import { Router, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { Controller } from './interface.controller';


export class UserController implements Controller {
    router: Router;
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.router = Router();
    }

    getAll = async (request: Request, response: Response): Promise<void> => {
        const users: User[] = await this.userRepository.find();
        console.log(users);
        response.status(200).json(users);
    };

    getOne = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        console.log('la');
        const user: User | null = await this.userRepository.findOneBy({ id: parseInt(request.params.id ?? 0) });
        response.status(200).send(user);
    };

    create = async (request: Request, response: Response): Promise<void> => {
        try {
            const user: User = new User(request.body.firstName, request.body.email);

            user.lastName = request.body.lastName;
            user.password = request.body.password;

            const user2 = await this.userRepository.save(user);
            console.log(user2);

            response.status(200).send(user2);
        } catch (ex: any) {
            console.log(ex);
            if (ex?.code === 'ER_DUP_ENTRY')
                response.status(400).send('Email déjà enregistré');
            else if (ex?.code === 'ER_NO_DEFAULT_FOR_FIELD')
                response.status(400).send(ex.sqlMessage);
        }

    };

    update = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        const user: User | null = await this.userRepository.findOneBy({ id: parseInt(request.params.id ?? 0) });

        if (user) {
            user.lastName = request.body.lastName;
            user.firstName = request.body?.firstName;
            user.email = request.body.email;
            user.password = request.body.password;
            await this.userRepository.update(user.id, user);
            response.status(200).send(user);
        } else {
            response.status(400).send('Utilisateur non trouvé');
        }
    };

    delete = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        try {
            await this.userRepository.delete({ id: parseInt(request.params.id ?? 0) });
            response.status(200);
        } catch (ex: any) {
            response.status(400).send(ex);

        }
    };
}