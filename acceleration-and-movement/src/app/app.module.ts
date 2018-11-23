import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { SensorDataService } from './services/sensor-data.service';
import { VisualizationComponent } from './components/visualization/visualization.component';

@NgModule({
  declarations: [
    AppComponent,
    VisualizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    SensorDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
