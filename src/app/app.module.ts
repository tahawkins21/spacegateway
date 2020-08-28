import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Banner } from './banner.component';
import {Nav} from './nav.component';
import { Home } from './home.component';
import { Rover } from './rover.component';
import { RoverService } from './rover.service';
import { Sat } from './sat.component';
import { SatService } from './sat.service';
import {newsService} from './bannerNews.service';

@NgModule({
  declarations: [
    AppComponent, Banner, Nav, Home, Rover, Sat
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RoverService, SatService, newsService],//put dataserviceS here when created
  bootstrap: [AppComponent]//pretty sure i'm doing this wrongs
})
export class AppModule { }
