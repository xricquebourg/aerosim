import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import router from './router';
dotenv.config();

class HttpServer {
  app: Express;
  isOpen: boolean;
  port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.isOpen = true;
  }

  start(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(router);

    this.app.listen(this.port, () => {
      // Set up logger for traceability
      console.info(`HTTP server running on port ${this.port}`);
    });
  }
}

// const server = express();

// const server = http.Server(server);

// const init = async () => {

// };

export default HttpServer;
