import { Component, OnInit } from '@angular/core'; 
import {newsModel} from './models/news.model';
import { newsService  } from './bannerNews.service';

@Component(
    {
        selector: 'banner',
        templateUrl: './banner.html',
        styleUrls: ['./banner.css']
    }
)

export class Banner implements OnInit{
    newsString: string = "";
    newsObject: newsModel;

    constructor(private ns: newsService){//add data service

    }

    ngOnInit(){
        this.getTheNews();
    }


    
    getTheNews(){
        this.ns.getNews().subscribe((res: newsModel) => {
            this.newsString = "";
            console.log(res);
            for(let r of res.articles){
                this.newsString += r.description ;
                this.newsString += "       -- -- --      ";
            }
        });
    }
    stopNews(){
        this.newsString = null;
    }
    playNews(){
        this.getTheNews();
    }
}