import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Md5} from 'ts-md5';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
    filled_data : any;

    url = "https://272.selfip.net/apps/tulvuEsSjP/collections/pigs/documents/"
 
    constructor(private http: HttpClient, 
        private router:Router, 
        private route: ActivatedRoute ){}

    ngOnInit(){
        let x = document.getElementById("mainForm");
        if(x!=null)
            x.style.display = "none";

        function handleForm(event:any) { event.preventDefault(); } 
        x?.addEventListener('submit', handleForm);
    }
    
    submit(){
        let x = document.getElementById("mainForm");
        let values = document.getElementsByTagName("input");

        let name = values[0].value;
        let phone_number = values[1].value;
        let breed = values[2].value;
        let time = values[3].value;
        let location_name = values[4].value;
        let langtitude = values[5].value;
        let longtitude = values[6].value;
        let retrieved = "READY FOR PICKUP";

        console.log(time)
        let data = {
            key: Md5.hashStr(time),
            data: {'name':name, 
            'number':phone_number, 
            'breed':breed, 
            "time":time, 
            "location":location_name, "langtitude":langtitude, "longtitude":longtitude,
            "status":retrieved}
        };

        this.filled_data = data;
        let valid = true;
        
        if(name=="")    
            valid = false;
        else if(phone_number=="")
            valid = false;
        else if(breed=="")
            valid = false;
        else if(time=="")
            valid = false;
        else if(location_name=="")
            valid = false;
        else if(longtitude=="")
            valid = false;
        else if(langtitude=="")
            valid = false;
        
        if(valid){
            this.http.post(this.url, this.filled_data).subscribe( (res) => {console.log(res);});      
            window.location.reload()
            if(x!=null)
                x.style.display = "none";
            for(let i=0;i<4;i++)
                values[i].value = "";
        }else{
            alert("Please fill entire form before submitting");
        }
        
    }

    // addToDom() {
    //     let x = document.getElementById("mainTable");
    //     let newRow = document.createElement("tr");
        
    //     let gg = this.filled_data;
    //     let name = gg["data"]["name"];
    //     let number = gg["data"]["number"]
    //     let time = gg["data"]["time"]
    //     let breed = gg["data"]["breed"]
    //     let location_value = gg["data"]["location"]
    //     let langtitude = gg["data"]["langtitude"]
    //     let longtitude = gg["data"]["longtitude"]
        
    //     let addName = document.createElement("td");
    //     addName.innerHTML = name;
    //     addName.id = "name";
    //     addName.style.border =  "thick solid #0000FF"

    //     let location = document.createElement("td");
    //     location.innerHTML = location_value
    //     location.id = "location"
    //     location.style.border =  "thick solid #0000FF"

    //     let date = document.createElement("td");
    //     date.innerHTML = time
    //     date.id = "timeReported"
    //     date.style.border =  "thick solid #0000FF"
        
    //     let status = document.createElement("td");
    //     status.innerHTML = "READY FOR PICKUP"
    //     status.id = "pigStatus"
    //     status.style.border =  "thick solid #0000FF"

    //     let moreInfo = document.createElement("td");
    //     moreInfo.innerHTML = "MORE INFO"
    //     moreInfo.id = "pigInformation"
    //     moreInfo.style.border =  "thick solid #0000FF"

    //     let delBtn = document.createElement("td");
    //     let btn = document.createElement("button");
    //     btn.innerHTML = "DELETE"
    //     delBtn.style.border = "thick solid #0000FF"
    //     btn.style.width = "100%"
    //     btn.style.backgroundColor = "blue"
    //     btn.style.color = "white"
    //     btn.style.border = "none"
    //     btn.style.border = "none"
        
        
        

    //     delBtn.appendChild(btn);   
        
    //     newRow.appendChild(location)
    //     newRow.appendChild(addName)
    //     newRow.appendChild(date)
    //     newRow.appendChild(status)
    //     newRow.appendChild(moreInfo)
    //     newRow.appendChild(delBtn);
    //     newRow.style.border = "thick solid #0000FF"

    //     x?.appendChild(newRow);
    // }
    
}
