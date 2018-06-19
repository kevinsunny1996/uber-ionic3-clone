import { Component } from '@angular/core';

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
export class PickupCarComponent {

  text: string;

  constructor() {
    console.log('Hello PickupCarComponent Component');
    this.text = 'Hello World';
  }

}
