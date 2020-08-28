//data service - component calls this 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()//decorate with this from import above
export class SatService{
    url: string;
    datesUrl1: string = "https://api.nasa.gov/planetary/earth/assets?lon=";
    datesUrl2: string = "&lat=";
    datesUrl3: string = "&date=";//previously was 'begin' before api changed parameters?
    datesUrl4: string = "&api_key=";
    //https://api.nasa.gov/planetary/earth/imagery?lon=100.75&lat=1.5&date=2014-02-01&cloud_score=True&api_key=DEMO_KEY
    //https://api.nasa.gov/planetary/earth/imagery/?lon=100.75&lat=1.5&date=2014-02-01&cloud_score=True&api_key=DEMO_KEY
    imgUrl1: string = "https://api.nasa.gov/planetary/earth/imagery/?lon=";
    imgUrl2: string = "&lat=";
    imgUrl3: string = "&date=";
    imgUrl4: string = "&api_key=";//removed cloudscore because api changed 
//https://api.nasa.gov/planetary/earth/assets?lon=100.75&lat=1.5&date=2014-02-01&dim=0.15&api_key=DEMO_KEY
    constructor(private httpClient: HttpClient){ //when the service is created, instance of httpclient injected

    }
    
    //this function is the dataservice -> observable <- api 
    getSatImgs(){
        return this.httpClient.get(this.url);//httpClient does and HTTP GET request 
    }

    getValidDates(lon: string, lat: string, beginDate: string){
        let apiKey = "PkcuobafFqdU9tbv3jy4wo6Cs0Pp1HwAqGrZLe3Q";
        let newUrl: string = this.datesUrl1 + lon + this.datesUrl2 + lat + this.datesUrl3 + beginDate + this.datesUrl4 + apiKey;
       // console.log(newUrl)
        let json = this.httpClient.get(newUrl);
        //console.log(json);
        return json;
    }

    getSatImages(lon: string, lat: string, date: string){
        let apiKey = "PkcuobafFqdU9tbv3jy4wo6Cs0Pp1HwAqGrZLe3Q";
        let newUrl: string = this.imgUrl1 + lon + this.imgUrl2 + lat + this.imgUrl3 + date + this.imgUrl4 + apiKey; 
        console.log(newUrl)
        let json = this.httpClient.get(newUrl);
        console.log("getting images...");
        //return json; //now the api returns a :getPixels element instead of a json response, chaning to return the url
        return newUrl
    }
    
    getAssets(lon: string, lat: string, date: string){
        let apiKey = "PkcuobafFqdU9tbv3jy4wo6Cs0Pp1HwAqGrZLe3Q";
        let newUrl: string = this.imgUrl1 + lon + this.imgUrl2 + lat + this.imgUrl3 + date + this.imgUrl4 + apiKey;
        let json = this.httpClient.get(newUrl);
        console.log("getting images...");
        return json;
    }

}