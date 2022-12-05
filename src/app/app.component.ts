
import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as L from 'leaflet';

// need to add to make leaflet icons work
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    private map:any;
    private arr:any;
    constructor(private http: HttpClient) {}
    

    ngOnInit(){
        this.http.get("https://272.selfip.net/apps/tulvuEsSjP/collections/pigs/documents/")
        .subscribe((res) => {
            this.arr = res;
            this.addMarkers();
        }); 
        
    }

    ngAfterViewInit(): void { 
        this.map = L.map('mapid').setView([49.2, -123], 11);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNtMzIiLCJhIjoiY2xiNWhpc3cyMDZwMjNvcXBucDNkMDdvcCJ9.zSEtb4tvXsEp2dd5ddqgbQ', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(this.map);
    }

    addMarkers(){
        let arr:any = {};
        

        for(let i=0; i<this.arr.length; i++){
            let long = this.arr[i]["data"]["longtitude"];
            let lang = this.arr[i]["data"]["langtitude"];
            let location = long+lang;
            let location_name = this.arr[i]["data"]["location"]

            if(arr[location]==null){
                arr[location] = [long, lang, 1];
                let formatted_input = "<b>"
                formatted_input = formatted_input+location_name;
                formatted_input = formatted_input + "</b><br /> 1 cases reported."
                L.marker([long, lang]).addTo(this.map)
                .bindPopup(formatted_input).openPopup();
                this.map.panTo(new L.LatLng(long, lang));
            }
            else if(arr[location][0]==long && arr[location][1]==lang){
                if(arr[location][0]==long && arr[location][1]==lang){
                    arr[location][2] = arr[location][2]+1;
                }
                let value = arr[location][2].toString();
                let formatted_input = "<b>"
                formatted_input = formatted_input+location_name;
                formatted_input = formatted_input + "</b><br />"
                formatted_input = formatted_input + value + " cases reported."

                L.marker([long, lang]).addTo(this.map)
                .bindPopup(formatted_input).openPopup();
                this.map.panTo(new L.LatLng(long, lang));
            }
        }
        // L.marker([49.2276, -123.0076]).addTo(this.map)
        // .bindPopup("<b>Metrotown</b><br />cases reported.").openPopup();

        // L.marker([49.1867, -122.8490]).addTo(this.map)
        // .bindPopup("<b>SFU Surrey</b><br />cases reported.").openPopup();
    }
}
