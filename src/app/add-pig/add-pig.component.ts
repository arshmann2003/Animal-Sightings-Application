import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Md5} from 'ts-md5';
import { NavigationExtras, Router } from '@angular/router';


@Component({
    selector: 'app-add-pig',
    templateUrl: './add-pig.component.html',
    styleUrls: ['./add-pig.component.css']
})
export class AddPigComponent {  

    title = "CREATE NEW PIG"
    array:any;

    constructor(private http: HttpClient, private router: Router ) { }

    ngOnInit() {
        this.http.get("https://272.selfip.net/apps/tulvuEsSjP/collections/pigs/documents/")
        .subscribe((res) => {
            this.array = res;
        }); 
    }
    

    ShowAddPigForm(){
        let values = document.getElementsByTagName("input");
        for(let i=0;i<values.length;i++)
            values[i].value = "";
        let x = document.getElementById("mainForm");
        let table = document.getElementById("mainTable")

        if (x?.style.display === "none") {
            x.style.display = "block";
            if(table!=null){
                table.style.display = "none"
                table.style.border = "thick solid blue;"
            }
            
        } else {
            if(x!=null)
                x.style.display = "none";
            if(table!=null){
                table.style.display = "block"
                table.style.border = "thick solid blue;"
            }
        }        
    }


    displayInfo(x:any){
        let name_ = x["data"]["name"];
        let time_ = x["data"]["time"];
        let number_ = x["data"]["number"];
        let status_ = x["data"]["status"];
        let breed_ = x["data"]["breed"];
        let longtitude_ = x["data"]["longtitude"];
        let langtitude_ = x["data"]["langtitude"];
        let location_ = x["data"]["location"];
        let key_ = x["key"];

        let navigationExtras: NavigationExtras = {
            queryParams: {
                name:name_,
                time:time_,
                number:number_,
                status:status_,
                breed:breed_,
                longtitude:longtitude_,
                langtitude:langtitude_,
                location:location_,
                key:key_
            }
        };
        this.router.navigate(["pid-db-component"], navigationExtras);
    }
    
    deletePig(pig:any){
        let validHash = Md5.hashStr("OINK!!");
        let validPassword = false;
        let person = prompt("Please enter your password:", "");
        if(person!=null){
            let hash = Md5.hashStr(person);
            if(hash==validHash){
                console.log(hash)
                validPassword = true;
            }
        }

        if(validPassword){
            let delURL =  "https://272.selfip.net/apps/tulvuEsSjP/collections/pigs/documents/"
            let key = pig["key"]
            console.log(key);
            delURL = delURL + key + '/';
            
            this.http.delete(delURL).subscribe( (res) => {});     

            let main = document.getElementById("mainTable")
            let child = document.getElementById(key)
            if(child!=null)
                main?.removeChild(child);
            window.location.reload();
        }else{
            alert("WRONG PASSWORD");
        }
        
    }
}

