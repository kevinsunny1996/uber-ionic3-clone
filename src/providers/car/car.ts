import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SimulateService } from '../simulate/simulate';

/*
  Generated class for the CarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarService {

  constructor(public simulateService: SimulateService) {
    console.log('Hello CarProvider Provider');
  }

  pollForRiderPickup() {
    return this.simulateService.riderPickup();
  }

  pollForRiderDropOff() {
    return this.simulateService.riderDropOff();
  }

  dropOffCar(pickupLocation, dropoffLocation) {
    return this.simulateService.dropoffPickupCar(pickupLocation,dropoffLocation);
  }

  getPickupCar() {
    return this.simulateService.getPickupCar();
  }

  getCars(lat,lng) {
    return Observable
    .interval(2000)
    .switchMap(() => this.simulateService.getCars(lat,lng))
    .share();
  }

  findPickupCar(pickupLocation) {
    return this.simulateService.findPickupCar(pickupLocation);
  }

}
