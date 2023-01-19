import { Router, Response, Request } from 'express';
import { Controller } from '../controllers/interface.controller';

export class Routeur {
  controller: Controller;
  router: Router;

  constructor(controller: Controller) {
    this.router = Router();
    this.controller = controller;

    this.router.get('/', this.controller.getAll);

    this.router.get('/:id', this.controller.getOne);

    this.router.post('/', this.controller.create);

    this.router.put('/:id', this.controller.update);

    this.router.delete('/:id', this.controller.delete);
  }
}
