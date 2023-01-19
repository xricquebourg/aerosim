import { Router } from 'express';
import { Routeur } from './routes/routes';
import { UserController } from './controllers/user.controller';
import { BrandController } from './controllers/brand.controller';
import CarController from './controllers/car.controller';
import GenreController from './controllers/genre.controller';
import PartsController from './controllers/parts.controller';
const router = Router();

const userRoot = new Routeur(new UserController());
const brandRoot = new Routeur(new BrandController());
const carRoot = new Routeur(new CarController());
const genreRoot = new Routeur(new GenreController());
const partsRoot = new Routeur(new PartsController());

router.use('/users', userRoot.router);
router.use('/brand', brandRoot.router);
router.use('/car', carRoot.router);
router.use('/genre', genreRoot.router);
router.use('/parts', partsRoot.router);

router.get('/ping', (request, response) => {
  console.log('[HttpServer] Get /ping request');
  return response.status(200).json({ data: 'Pong !' });
});

export default router;
