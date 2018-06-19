import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { GeoLocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
declare var google: any;

/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'maps',
  templateUrl: 'maps.html'
})
export class MapComponent extends OnInit{

  @Input() isPickupRequested: boolean;
  @Input() destination;

  public map;
  public isMapIdle: boolean;
  public currentLocation;
  constructor(public geoLocation : Geolocation,
    public loadingCtrl : LoadingController) {
      console.log('HELLO MAPS COMPONENT');
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.map = this.createMap();
    this.addMapEventListeners();

    this.getCurrentLocation().subscribe(location => {
      this.map.setCenter(location);
    })
  }

  addMapEventListeners() {
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle = false;
    })
    google.maps.event.addListener(this.map, 'idle', () => {
      this.isMapIdle = true;
    })
  }

  getCurrentLocation() {
    let loading = this.loadingCtrl.create({
      content: 'Locating...'
    });

    loading.present();

    let options = {timeout: 10000 , enableHighAccuracy:true};
    let locationObs = new Observable(observable => {
      this.geoLocation.getCurrentPosition(options)
      .then(resp => {
        let lat = resp.coords.latitude;
        let lng = resp.coords.longitude;
        console.log('lat'+lat+'long'+lng);
        let location = new google.maps.LatLng(lat,lng);
        console.log('current location'+loaction);
        observable.next(location);
        loading.dismiss();
      })
    })
    return locationObs;
  }

  createMap(location = new google.maps.LatLng(40.712784,-74.005942)){
    console.log('init location' + location);
    let mapOptions = {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    let mapEl = document.getElementById("map");
    let map = new google.maps.Map(mapEl,mapOptions);

    return map;
  }

  centerLocation(location) {
    if(location) {
      this.map.setCenter(location);
    }else{
      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.setCenter(currentLocation);
      })
    }
  }
}
