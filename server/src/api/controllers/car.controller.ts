import { Car } from '../../entity/Car';
import { Router, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { Controller } from './interface.controller';


export class CarController implements Controller {
    router: Router;
    private carRepository: Repository<Car>;

    constructor() {
        this.carRepository = AppDataSource.getRepository(Car);
        this.router = Router();
    }

    getAll = async (request: Request, response: Response): Promise<void> => {
        const cars: Car[] = await this.carRepository.find();
        response.status(200).json(cars);
    };

    getOne = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        const car: Car | null = await this.carRepository.findOneBy({ id: parseInt(request.params.id ?? 0) });
        response.status(200).send(car);
    };

    create = async (request: Request<{}, {}, Car>, response: Response): Promise<void> => {
        try {
            // const genre: Genre = request.body.genre as Genre;
            console.log(request.body);
            const car: Car = request.body;//new Car(request.body.name_p);

            const car2 = await this.carRepository.save(car);
            console.log(car2);

            response.status(200).send(car2);
        } catch (ex: any) {
            console.log(ex);
            if (ex?.code === 'ER_DUP_ENTRY')
                response.status(400).send('Marque déjà enregistré');
            else if (ex?.code === 'ER_NO_DEFAULT_FOR_FIELD')
                response.status(400).send(ex.sqlMessage);
        }

    };

    update = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        // let car: Car | null = await this.carRepository.findOneBy({ id: parseInt(request.params.id ?? 0) });

        if (request.body.id) {
            const car: Car = request.body;//new Car(request.body.name_p);
            // car.name_p = request.body.name_p;
            await this.carRepository.update(car.id, car);
            response.status(200).send(car);
        } else {
            response.status(400).send('Marque non trouvé');
        }
    };

    delete = async (request: Request<{ id: string }>, response: Response): Promise<void> => {
        try {
            await this.carRepository.delete({ id: parseInt(request.params.id ?? 0) });
            response.status(200);
        } catch (ex: any) {
            response.status(400).send(ex);
        }
    };
}

export default CarController;