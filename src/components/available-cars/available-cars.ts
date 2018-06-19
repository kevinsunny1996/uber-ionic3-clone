import { Component, Input, OnInit } from '@angular/core';
import { CarService } from '../../providers/car/car';
import * as SlidingMarker from 'marker-animate-unobtrusive';
declare var google: any;

/**
 * Generated class for the AvailableCarsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "available-cars",
  templateUrl: "available-cars.html"
})
export class AvailableCarsComponent implements OnInit {
  @Input() map;
  @Input() isPickupRequested;

  public carMarker;
  public carMarkers;

  constructor(public service: CarService) {
    console.log('HELLO AVAILABLE CARS COMPONENT');
    this.carMarkers = [];
  }

  ngOnInit() {
    this.fetchAndRefreshCars();
    console.log('1');
  }

  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.isPickupRequested){
      this.removeCarMarkers();
    }
  }

  removeCarMarkers() {
    let numOfCars = this.carMarkers.length;
    while(numOfCars--) {
      let car = this.carMarkers.pop();
      car.setMap(null);
    }
  }

  addCarMarker(car) {
    let carMarker = new SlidingMarker({
      map: this.map,
      position: new google.maps.LatLng(car.coord.lat,car.coord.lng),
      icon: 'assets/imgs/taxi.png'
    });

    carMarker.setDuration(2000);
    carMarker.setEasing('linear');

    carMarker.set('id', car.id); //MVCObject

    this.carMarkers.push(carMarker)
    console.log(this.carMarkers);
  }

  updateCarMarker(car) {
    for (var i=0; numOfCars=this.carMarkers.length;i<numOfCars;i++) {
      if(this.carMarkers[i].id===car.id) {
          this.carMarkers[i].setPosition(new google.maps.LatLng(car.coord.lat,car.coord.lng));
          return;
      }

    }

    this.addCarMarker(car);
    console.log('3');
  }

  fetchAndRefreshCars() {
    this.carService.getCars(9,9)
    .subscribe(carsData => {

      if(!this.isPickupRequested){
        (<any>carsData).cars.forEach(car => {
          this.updateCarMarker(car)
        })
      }
    })
    console.log('2');
  }
}
