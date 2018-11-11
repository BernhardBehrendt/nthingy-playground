import { Component, OnInit } from '@angular/core';
import { SensorDataService } from './src/app/services/sensor-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private sensorDataService: SensorDataService) {
  }

  temperature: number;

  ngOnInit() {
  }

  connect() {
    this
      .sensorDataService
      .getTemperature()
      .subscribe((temperature) => {
        this.temperature = temperature;
      });
  }
}
