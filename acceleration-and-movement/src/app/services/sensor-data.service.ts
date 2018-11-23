import {Injectable, EventEmitter} from '@angular/core';
import * as Thingy from 'thingy52_web_bluetooth/js/Thingy.js';

@Injectable({
    providedIn: 'root'
})
export class SensorDataService {
    private thingy: any;
    private connected = false;
    private connecting = false;

    constructor() {

    }

    public async disconnect() {
        if (this.connected) {
            await this.thingy.temperature.stop();
            await this.thingy.rawdata.stop();
            await this.thingy.disconnect();

            this.connected = false;
            this.connecting = false;
        }

        return true;
    }

    private async connect(): Promise<boolean> {
        let wait;

        if (!this.connected && !this.connecting) {

            this.connecting = true;
            this.thingy = new Thingy.default({loggingEnabled: true});
            this.connected = await this.thingy.connect();

        } else {

            await new Promise((resolve) => {
                wait = setInterval(() => {
                    if (this.connected === true) {
                        clearInterval(wait);
                        resolve();
                    }
                }, 100);
            });
        }
        return this.connected;
    }

    public getTemperature(): EventEmitter<any> {
        const emitter = new EventEmitter();

        (async () => {
            if (this.connected !== true) {
                await this.connect();
            }

            this.thingy.addEventListener('temperature', (temperature) => {
                emitter.next(temperature.detail.value);
            });
            this.thingy.temperature.start();
        })();

        return emitter;
    }

    public getRaw(precision: number = 5): EventEmitter<any> {
        const emitter = new EventEmitter();

        (async () => {
            if (this.connected !== true) {
                await this.connect();
            }

            this.thingy.addEventListener('rawdata', (rawdata) => {

                const preciser = (value: number): number => {
                    return value;
//                    return parseFloat(value.toFixed(precision));
                };

                const accelerometer = rawdata.detail.accelerometer;
                const gyroscope = rawdata.detail.gyroscope;
                const compass = rawdata.detail.compass;


                accelerometer.x = preciser(accelerometer.x);
                accelerometer.y = preciser(accelerometer.y);
                accelerometer.z = preciser(accelerometer.z);

                gyroscope.x = preciser(gyroscope.x);
                gyroscope.y = preciser(gyroscope.y);
                gyroscope.z = preciser(gyroscope.z);

                compass.x = preciser(compass.x);
                compass.y = preciser(compass.y);
                compass.z = preciser(compass.z);

                emitter.next(rawdata.detail);
            });

            this.thingy.rawdata.start();
        })();

        return emitter;
    }
}
