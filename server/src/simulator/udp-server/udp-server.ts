import * as dotenv from 'dotenv';
import dgram from 'dgram';
import Clock from '../Clock/Clock';
dotenv.config();

class UdpServer {
  server: dgram.Socket;
  isOpen: boolean;
  i = 0;
  y = 0;

  constructor() {
    this.server = dgram.createSocket('udp4');
    this.isOpen = true;
  }

  start(): void {
    this.initEvents();
    this.server.bind(parseInt(process.env.UDP_PORT ?? '5600'));
    console.log(`[UdpServer] Starting server on port ${process.env.UDP_PORT}`);
  }

  initEvents(): void {
    this.server.on('error', this.handleError.bind(this));
    this.server.on('connect', this.handleConnect.bind(this));
    this.server.on('close', this.handleClose.bind(this));
    this.server.on('message', this.testClock.bind(this));
    this.server.on('listening', this.handleListening.bind(this));
  }

  handleError(error: any): void {
    console.log(`[UdpServer] An error has been caught ${error.message}`);
    this.server.close();
  }

  handleConnect(): void {
    console.log('[UdpServer] Detect Connect');
  }

  handleClose(): void {
    console.log('[UdpServer] Detect Close');
  }

  handleListening(): void {
    const address = this.server.address();
    console.log(`[UdpServer] Listening on ${address.address}:${address.port}`);
  }

  sendUdpData(senderInfo: any, packet: any, i: number): void {
    console.log('packet', packet);
    this.server.send(
      JSON.stringify(packet),
      senderInfo.port,
      senderInfo.address,
      () => {
        console.log(
          `[UdpServer] Message have been sent to ${senderInfo.address}:${senderInfo.port} | Packet n°${i}`
        );
      }
    );
  }

  handleMessage(message: any, senderInfo: any): void {
    let packet: { x: number, y: number, z: number, time: number };
    console.log('[UdpServer] Message reveived', message);
    for (let j = 0; j <= 1000; j++) {
      for (let i = 0; i <= 1000; i++) {
        const packet = {
          x: i,
          y: 0,
          z: 0,
          time: Date.now(),
        };
        setTimeout(() => {
          this.sendUdpData(senderInfo, packet, i);
        }, 500);
      }
      for (let i = 1000; i <= 0; i--) {
        packet = {
          x: i,
          y: 0,
          z: 0,
          time: Date.now(),
        };
        setTimeout(() => {
          this.sendUdpData(senderInfo, packet, i);
        }, 500);
      }
      this.server.send('end', senderInfo.port, senderInfo.address, () => {
        console.log(
          `[UdpServer] Message have been sent to ${senderInfo.address}:${senderInfo.port} with message: end`
        );
      });
    }
  }

  sendData(message: any, senderInfo: any): void {
    const packet = {
      x: this.i,
      y: 0,
      z: 0,
      timestamp: Date.now(),
      speed: 180,
    };
    this.sendUdpData(senderInfo, packet, this.i);
  }

  updateI(): void {
    this.i += 5;
  }

  updateY(): void {
    this.y++;
    console.log('y:', this.y);
  }

  testClock(message: any, senderInfo: any): void {
    console.log('[UdpServer] Message reveived', message);
    const clock = new Clock();

    clock.addListener(
      'updateI',
      () => {
        this.updateI();
      },
      50
    );
    clock.addListener(
      'testClockI',
      () => {
        this.sendData(message, senderInfo);
      },
      50
    );
    clock.addListener(
      'endCommunication',
      () => {
        this.server.send('end', senderInfo.port, senderInfo.address, () => {
          console.log(
            `[UdpServer] Message have been sent to ${senderInfo.address}:${senderInfo.port} with message: end`
          );
        });
        clock.destroy();
      },
      60000
    );
    clock.start();
  }
}

export default UdpServer;
