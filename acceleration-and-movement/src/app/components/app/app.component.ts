import {Component, OnDestroy, OnInit} from '@angular/core';
import {SensorDataService} from '../../services/sensor-data.service';
import {Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(private sensorDataService: SensorDataService) {
    }

    rawdataSubscription: Subscription;
    temperatureSubscription: Subscription;
    temperature: number | null = null;
    rawdata: any | null = null;
    raw: any;

    ngOnInit() {
    }

    ngOnDestroy() {

        if (!!this.rawdataSubscription) {
            this.rawdataSubscription.unsubscribe();
        }

        if (!!this.temperatureSubscription) {
            this.temperatureSubscription.unsubscribe();
        }
    }


    connect() {

        this.rawdataSubscription =
            this
                .sensorDataService
                .getRaw(1)
                .subscribe((rawData) => {
                    this.rawdata = rawData;
                });

        this.temperatureSubscription =
            this
                .sensorDataService
                .getTemperature()
                .subscribe((temperature) => {
                    this.temperature = temperature;
                });
    }

    disconnect() {

        if (!!this.rawdataSubscription) {
            this.rawdataSubscription.unsubscribe();
        }

        if (!!this.temperatureSubscription) {
            this.temperatureSubscription.unsubscribe();
        }

        this
            .sensorDataService
            .disconnect()
            .then(() => {
                console.log('Disconnected');
                this.temperature = null;
            });
    }
}
