import { Component, OnInit, OnChanges } from '@angular/core';
import { CarService } from '../../providers/car/car';
import * as SlidingMarker from 'marker-animate-unobtrusive';
import { PickupPubSubService } from '../../providers/pickup-pub-sub/pickup-pub-sub';
declare var google: any;

/**
 * Generated class for the PickupCarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pickup-car',
  templateUrl: 'pickup-car.html'
})
export class PickupCarComponent implements OnInit, OnChanges {

  @Input() map;
  @Input() isPickupRequested;
  @Input() pickupLocation;
  @Input() destination;

  public pickupCarMarker;
  public polylinePath;
  public cab;

  constructor(public carService: CarService,
              private pickupPubSub: PickupPubSubService) {
    console.log('Hello PickupCarComponent Component');
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if(this.destination) {
      this.dropoffCar();
    }
    else {
      if(this.isPickupRequested) {
        this.requestCar();
      }else{
        this.removeCar();
        this.removeDirections();
      }
    }
  }

  addCarMarker(car) {
    this.pickupCarMarker = new SlidingMarker({
      map: this.map,
      position: car.position,
      icon: 'assets/imgs/taxi.png'
    })

    this.pickupCarMarker.setDuration(1000);
    this.pickupCarMarker.setEasing('linear');
  }

  showDirections(car) {
    this.polylinePath = new google.maps.Polyline({
      path: car.path,
      strokeColor: '#FF0000',
      strokeWeight: 3
    })
    this.polylinePath.setMap(this.map);
  }

  updateCar(cbDone) {
    this.carService.getPickupCar().subscribe( car =>{
      this.cab = car;

      if(this.destination||this.pickupCarMarker) {
        this.pickupCarMarker.setPosition(this.cab.position);
        this.polylinePath.setPath(this.cab.path);
        this.pickupPubSub.emitArrivalTime(this.cab.time);
      }

      if(this.cab.path.length>1) {
        setTimeout(() => {
          this.updateCar(cbDone);
        },1000);
      }else {
        cbDone();
      }
    });
  }

  checkForRiderPickup() {
    this.carService.pollForRiderPickup().subscribe(data => {
      this.pickupPubSub.emitPickup();
    })
  }

  checkForRiderDropOff() {
    this.carService.pollForRiderDropOff().subscribe(data => {
      this.pickupPubSub.emitDropOff();
    })
  }

  requestCar() {
    console.log('request car'+this,this.pickupLocation);
    this.carService.findPickupCar(this.pickupLocation)
      .subscribe(car => {
        this.addCarMarker(car);
        this.showDirections(car);
        this.updateCar(() => this.checkForRiderPickup());
      })
  }

  dropOffCar() {
    this.carService.dropOffCar(this.pickupLocation)
      .subscribe(car => {
        this.updateCar(car);
      })
  }

  removeDirections() {
    if(this.polylinePath) {
      this.polylinePath.setMap(null);
      this.polylinePath = null;
    }
  }

  removeCar() {
    if(this.pickupCarMarker) {
      this.pickupCarMarker.setMap(null);
      this.pickupCarMarker = null;
    }
  }
}
