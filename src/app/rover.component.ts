import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Rovers } from './models/rover.model';
import { Observable } from 'rxjs';
import { RoverService } from './rover.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component(
    {
        selector: 'rover',
        templateUrl: './rover.html',
        styleUrls: ['./rover.css']
    }
)

export class Rover implements OnInit, OnChanges{
   // @Input('roverName') roverName: string;
   // @Input('date') date: string;
    roverName: string;
    date: string;
    loading: string = "Submit the form to view photos. Choose a rover: Curiosity, Opportunity, or Spirt";
    testResult: any;
    rovers: Rovers[] = [];
    hidden: boolean = false;
    possibleRovers: string[] = ["curiosity","opportunity","spirit"];

    constructor(private ds: RoverService){//add data service
      
         // this won't work because i'm outside of the subscribe . console.log(this.rovers);
    }
    hide(): void{
        this.hidden = true;
    }
    unHide(): void{
        this.hidden = false;
    }

    test(){
        console.log(document.querySelector('body'));
        document.getElementById('mainCard').setAttribute('class','active');
    }
    /* Limits the dates able to be chosen based on last transmission of rovers*/
    limitDates(event){
        let assetName = event.target.value;
        let dateInput = document.getElementById('rovDate');
        console.log(event.target.value);
        switch(assetName){
            case "0: curiosity":
                dateInput.setAttribute("min","2012-08-06");
                break;
            case "1: opportunity":
                dateInput.setAttribute("min","2004-01-25");
                dateInput.setAttribute("max","2018-06-10");
                break;
            case "2: spirit":
                dateInput.setAttribute("min","2004-01-04");
                dateInput.setAttribute("max","2010-03-22");
                break;
        }
    }
    roverSubmit(rover: string, date: string){
        this.rovers = [];//this is here to empty the array and trigger the view to render again w/ *ngFor
        document.getElementById('mainCard').className = "card mb-3 carousel-item active";
        this.loading = "...Loading...";
        document.querySelector('#mainCard > .card-body').insertAdjacentHTML('beforeend','<img id="loading" src="./assets/img/loading.gif" style="">');

        if(!rover || !date){
            this.loading = "Please enter both a date and choose a Mars Rover asset and try again."
            document.getElementById('loading').remove();
            return false;
        }

        let api: string = "PkcuobafFqdU9tbv3jy4wo6Cs0Pp1HwAqGrZLe3Q";
        this.ds.getRover(rover, date, api).subscribe((res: any) => {
            console.log(res);
            let json = res["photos"];
            for(let j of json){
                 this.rovers.push(j);
            }
            //console.log(this.rovers);
            if(this.rovers.length < 1){
                this.loading = "No photos found for that date. Try another";
            }else{
                this.loading = this.rovers.length +" Pictures Found. CLICK NEXT TO VIEW";
            }
        document.getElementById('loading').remove();
          });//ADD DOM INJECTOIN OF NGFOR!!! MAYBE A METHOD()?
    }
    //doesn't work as planned
    buildRoverCard(): void{
       let test =  document.getElementById('mainCard');
       test.insertAdjacentHTML('afterend', '<div class="card mb-3 carousel-item" *ngFor="let rov of rovers">\
            <img  class="card-img-top" src="{{rov.img_src}}" alt="Asset Image" style="height: 50%; width: 50%;">\
            <div class="card-body" style="display: inline-block"><h5 class="card-title">{{rov.id}}</h5>\
            <p class="card-text">Need to add here.</p><p class="card-text">\
            <small class="text-muted">{{rov.earth_date}}</small></p></div></div>'); 
        //test.insertAdjacentHTML('afterend', '{{rovers[0].id}}');
        console.log(this.rovers);
    } 
    ngOnChanges(changes: SimpleChanges){
        console.log("changed" + this.rovers);
    }   
    ngOnInit(){
        console.log("init " + this.rovers);
        //move constructor logic and data calls to here
    }
    getInfo(name){
        if(name=="spirit"){
            return "Spirit was the second successful rover sent to mars. It landed on January 4, 2004\
             and got stuck in sand in 2010. Its last communication was on March 22,2010";
        }else if(name=="opportunity"){
            return "The Opportunity rover landed on January 25, 2004. Its last transmission\
             was on June 10, 2018, after a dust storm covered the solar panels which charged its batteries";
        }else if(name=="curiosity"){
            return "Curiosity landed on August 6, 2012. It is still operational to this day!";
        }else{
            return "";
        }
    }
    //add ondestroy & ngonchanges...
  //  <div class="card mb-3 carousel-item" *ngFor="let rov of rovers"><img  class="card-img-top" src="{{rov.img_src}}" alt="Asset Image" style="height: 50%; width: 50%;"><div class="card-body" style="display: inline-block"><h5 class="card-title">{{rov.id}}</h5><p class="card-text">Need to add here.</p><p class="card-text"><small class="text-muted">{{rov.earth_date}}</small></p></div></div>
}
