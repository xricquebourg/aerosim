class Clock {
  currentTime: number;
  isStarted: boolean;
  loopInterval: NodeJS.Timer | undefined;
  listeners: {
    [key: string]: {
      fct: Function,
      time: number,
      lastExecutionAt: number,
    },
  };

  constructor() {
    this.currentTime = -1;
    this.listeners = {};
    this.loopInterval = undefined;
    this.isStarted = false;
  }

  start(): void {
    if (this.currentTime == -1) {
      this.currentTime = Date.now();
      this.loopInterval = setInterval(() => this.loop(), 10);
      this.isStarted = true;
    }
  }

  stop(): void {
    this.isStarted = false;
    this.currentTime = -1;
    clearInterval(this.loopInterval);
  }

  restart(): void {
    this.currentTime = Date.now();
  }

  update(time: number): void {
    this.currentTime = time;
  }

  addListener(name: string, fct: Function, time: number): void {
    if (!this.listeners[name]) {
      this.listeners[name] = { fct, time, lastExecutionAt: Date.now() };
    }
  }

  removeListeners(): void {
    this.listeners = {};
  }

  removeListener(name: string): void {
    if (this.listeners[name]) {
      delete this.listeners[name];
    }
  }

  destroy(): void {
    this.stop();
    this.removeListeners();
  }

  loop(): void {
    let keys: string[];

    if (!this.isStarted) {
      return;
    }

    keys = Object.keys(this.listeners);
    this.currentTime = Date.now();
    keys.forEach((key) => {
      if (
        this.currentTime - this.listeners[key].lastExecutionAt >
        this.listeners[key].time
      ) {
        this.listeners[key].fct();
        this.listeners[key].lastExecutionAt = this.currentTime;
      }
    });
  }
}

export default Clock;
