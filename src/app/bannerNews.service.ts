//data service - component calls this 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()//decorate with this from import above
export class newsService{
    newsUrl: string = "https://newsapi.org/v2/everything?q=outer%20space&apiKey=a24c700515fe4dd88f0b8ebe09f0ebb4";

    constructor(private httpClient: HttpClient){ //when the service is created, instance of httpclient injected

    }
    
    getNews(){
       return this.httpClient.get(this.newsUrl);
    }
}