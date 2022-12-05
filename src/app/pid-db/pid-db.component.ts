import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Router } from '@angular/router';
import {Location, LocationStrategy} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {Md5} from 'ts-md5';

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
    arr:any = null;
    public constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router, private _location: Location, private locationStrategy: LocationStrategy){
        
        this.route.queryParams.subscribe(params => {
            this.key = params["key"];
            this.url = "https://272.selfip.net/apps/tulvuEsSjP/collections/pigs/documents/"
            this.url += this.key
            this.url += '/'
            this.http.get(this.url).subscribe((res) => {
                this.arr = res;
                this.time = this.arr["data"]["time"]
                this.name = this.arr["data"]["name"]
                this.status = this.arr["data"]["status"]
                this.breed = this.arr["data"]["breed"]
                this.longtitude = this.arr["data"]["longtitude"]
                this.langtitude = this.arr["data"]["langtitude"]
                this.location = this.arr["data"]["location"]
                this.number = this.arr["data"]["number"]
            }); 
            
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
        
        let validHash = Md5.hashStr("OINK!!");
        let validPassword = false;
        let person = prompt("Please enter your password:", "");
        if(person!=null){
            let hash = Md5.hashStr(person);
            if(hash==validHash){
                validPassword = true;
            }
        }

        if(validPassword){
            if(this.status=="READY FOR PICKUP")
                this.status = "RETRIEVED"
            else if(this.status =="RETRIEVED")
                this.status = "READY FOR PICKUP"
    
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
