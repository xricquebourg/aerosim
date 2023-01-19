// Import
import 'reflect-metadata';
import httpServer from './src/api/http.server';
import { AppDataSource } from './src/config/data-source';
import * as dotenv from 'dotenv';
import { User } from './src/entity/User';
import UdpServer from './src/simulator/udp-server/udp-server';
import HttpServer from './src/api/http.server';

const httpPort: number = parseInt(process.env.HTTP_PORT ?? '3000');
// const udpPort: number = parseInt(process.env.UDP_PORT ?? '5500');
// const udpHost: string = process.env.UDP_HOST ?? 'localhost';
const DBHost: string = process.env.MYSQL_DB ?? 'localhost';
const DBPort: number = parseInt(process.env.MYSQL_PORT ?? '3006');

// To load easily the .env file
dotenv.config();

// Initialize data source for typeOrm
AppDataSource.initialize()
  .then(async (response) => {
    const userRepo = await response.getRepository(User);
    await userRepo.find();
    console.log(`Connected to ${DBHost} database on port ${DBPort}`);
  })
  .catch((error: any) =>
    console.log(
      `Failed to connect to ${DBHost} database on port ${DBPort}:`,
      error?.message
    )
  );

// Start HTTP server
const http = new HttpServer(httpPort);
http.start();
/*http.listen(httpPort, () => {
  // Set up logger for traceability
  console.info(`HTTP server running on port ${httpPort}`);
});*/

// Start UDP server
const udp = new UdpServer();
udp.start();

/*#region old udp server init
const startUdpServer = () => {
  udp.on('listening', () => {
    const address = udp.address();
    console.log(`UDP server listening on ${address.address}:${address.port}`);
  });

  udp.bind({
    address: udpHost,
    port: udpPort,
    exclusive: true,
  });
};

// Handle UDP erros
udp.on('error', (err: { stack: any }) => {
  console.log(`Server error:\n${err.stack}`);
  udp.close();
  startUdpServer();
});

startUdpServer();
#endregion*/
