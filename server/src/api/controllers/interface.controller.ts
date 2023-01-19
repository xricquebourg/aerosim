import { User } from '../../entity/User';
import { Router, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';


export interface Controller {
    router: Router;
    // private userRepository: Repository<User>;

    getAll(request: Request, response: Response): Promise<void>

    getOne(request: Request<{ id: string }>, response: Response): Promise<void>

    create(request: Request, response: Response): Promise<void>

    update(request: Request<{ id: string }>, response: Response): Promise<void>

    delete(request: Request<{ id: string }>, response: Response): Promise<void>
}