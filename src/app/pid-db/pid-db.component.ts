import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Router } from '@angular/router';
import {Location, LocationStrategy} from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pid-db',
  templateUrl: './pid-db.component.html',
  styleUrls: ['./pid-db.component.css']
})

export class PidDBComponent {
    name:any = null;
    time:any = null;
    number:any = null;
    status:any = null;
    breed:any = null;
    longtitude:any = null;
    langtitude:any = null;
    location:any = null;
    key:any = null;
    url:any = null;
    public constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router, private _location: Location, private locationStrategy: LocationStrategy){
        
        this.route.queryParams.subscribe(params => {
            this.name = params["name"];
            this.time = params["time"];
            this.number = params["number"];
            this.status = params["status"];
            this.breed = params["breed"];
            this.longtitude = params["longtitude"];
            this.langtitude = params["langtitude"];
            this.location = params["location"];
            this.key = params["key"];
            this.displayContent();
        });
    }

    displayContent(){   
        this.preventBackButton();
        let x = document.getElementById("FormClass");
        let y = document.getElementById("addPigBtnClass");
        if(x!=null && y!=null){
            x.style.display = "none"
            y.style.display = "none"
        }
    }

    goBack(){
        this._location.back()
        this.router.navigate(['/'])
            .then(() => {
            window.location.reload();
        });
    }
    preventBackButton() {
        history.pushState(null, 'null', location.href);
        this.locationStrategy.onPopState(() => {
          history.pushState(null, 'null', location.href);
        })
    }
    changeStatus(){
        // check for password
        let valid = false;
        if(valid){
            if(this.status=="READY FOR PICKUP")
                this.status = "RETRIEVED"
            else if(this.status =="RETRIEVED")
                this.status = "READY FOR PICKUP"
            let url = "https://272.selfip.net/apps/tulvuEsSjP/collections/pigs/documents/"
            url+=this.key;
            url+='/'
            let sub = {
                status: this.status
            }
            this.url = url;
            this.updateData();
        }else{
            alert("INVALID PASSWORD");
        }
    }

    updateData(){
        let sub = {
            name:this.name,
            time:this.name,
            number:this.number,
            status:this.status,
            breed:this.breed,
            longtitude:this.longtitude,
            langtitude:this.langtitude,
            location:this.location
        }
        this.http.put(this.url, {key:this.key, data:sub}).subscribe( (res) => {console.log(res);});
    }
}
