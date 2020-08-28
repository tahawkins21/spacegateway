import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SatModel } from './models/sat.model';
import { Observable } from 'rxjs';
import { SatService } from './sat.service';
import { identifierModuleUrl } from '@angular/compiler';
import { satDatesModel } from './models/satDates.model';
import {satImageModel} from './models/satImages.model';

@Component({
  selector: 'sat',
  templateUrl: './sat.html',
  styleUrls: ['./sat.css'],
})

export class Sat implements OnInit{

  public validDates: satDatesModel; //to store the dates of satelite passes over the location
  public beginDate: string = '';
  public lon: string;
  public lat: string;
  public loading = "Choose a begin date and enter the latitude and longitude of somewhere.\
               A satelite passes over each location on Earth once every 16 days. ";
  public images: satImageModel[];//to store the images returned by getImages()
  public countOfCloudyPics: number;
  public resCount: number;
  public pixelsUrl: string[] = [];

  constructor(private satService: SatService){
    //i am empty for a reason
  }

  ngOnInit(){

  }

  getValidDates(lon: string, lat: string, beginDate: string){
    this.images = [];//clear the array to re-render the DOM

    //add the loading gif to the card until getImages() removes it after its call to data service
    document.getElementById('mainCard').className = "card mb-3 carousel-item active";
    this.loading = "...Loading...";
    document.querySelector('#mainCard > .card-body').insertAdjacentHTML('beforeend','<img id="loading" src="./assets/img/loading.gif" style="margin: 2em;">');

    if(!lon || !lat || !beginDate){
      this.loading = "Please enter a begin date, latitude, and longitude and try again."
      document.getElementById('loading').remove();
      return false;
    }
    

    this.satService.getValidDates(this.lon, this.lat, this.beginDate).subscribe((res: any) => {//changed res: satDatesModel to any due to api change
      this.validDates = res;//set the valid dates to get images for in the next method call
      //console.log(this.validDates);
      this.resCount = res.count;
      console.log(res.count)
      console.log(res)

      for(let i = 0; i < 1; i++){//the endpoint changed only returns one image url, and res.count is always coming back as undefined, changed to i < 1
        console.log(res.url);//this works..
        let fullDate = "";
         fullDate = res.date;
        let goodDate:string = fullDate.substring(0,10);
        this.getImage(this.lon, this.lat, goodDate, res.url);
      }

      document.querySelector("#loading").remove();
      if(!res.url){
        this.loading = "No photos were found on or after that date. Try using an earlier date"
      }else{
        this.loading = "Image found on " + res.date + " for resource " + res.id + ". Click next to view the images.";
      }

    });
  }

  getImage(lon: string, lat: string, date: string, url: string ){
    //this gets the image but doesn't work currently
    let img: String = this.satService.getSatImages(lon, lat, date);
    console.log(url + " THIS THE URL");
    console.log(typeof url);
    //push the url of the image into pixelsUrl with has an ngFor on the view to display
    console.log(this.pixelsUrl);
    console.log(this.images);
    this.pixelsUrl.push(url);
    //this.images.push(img);
    /*
    this.satService.getSatImages(lon, lat, date).subscribe((img: satImageModel) => {
     console.log(img)
     this.images.push(img);
    });
    */
    //create data service
    //add img src to the array variable;
  }
}
