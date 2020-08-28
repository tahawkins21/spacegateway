//data service - component calls this 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()//decorate with this from import above
export class RoverService{
    testUrl: string = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=PkcuobafFqdU9tbv3jy4wo6Cs0Pp1HwAqGrZLe3Q";
    savedUrl: string; //for saving last call to refresh if needed

    constructor(private httpClient: HttpClient){ //when the service is created, instance of httpclient injected

    }
    
    //this function is the dataservice -> observable <- api 
    getTestRover(){
        return this.httpClient.get(this.testUrl);//httpClient does and HTTP GET request 
    }

    getRover(rover: string, earth_date: string, api_key: string){
        let url1: string = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
        let url2: string = "/photos?earth_date=";
        let url3: string = "&api_key=";
        let newUrl: string = url1 + rover + url2 + earth_date + url3 + api_key;
        this.savedUrl = newUrl;
        try{
            return this.httpClient.get(newUrl);
        }catch(err){
            console.log("Error with getRover URL: " + newUrl + "/n" +err);
        }

    }
    
}