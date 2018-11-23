import { Injectable, EventEmitter } from '@angular/core';
import * as Thingy from 'thingy52_web_bluetooth/js/Thingy.js';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  private thingy: any;
  private connected = false;

  constructor() {
    this.thingy = new Thingy.default({ loggingEnabled: true });
  }

  private async connect(): Promise<boolean> {
    if (!this.connected) {
      this.connected = await this.thingy.connect() || false;
    }

    return this.connected;
  }

  public getTemperature(): EventEmitter<any> {
    const emitter = new EventEmitter();

    (async () => {
      await this.connect();

      this.thingy.addEventListener('temperature', (temperature) => {
        emitter.next(temperature.detail.value);
      });

      this.thingy.temperature.start();
    })();

    return emitter;
  }
}
