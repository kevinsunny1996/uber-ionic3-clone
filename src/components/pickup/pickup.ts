import { Component } from '@angular/core';

/**
 * Generated class for the PickupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html'
})
export class PickupComponent {

  text: string;

  constructor() {
    console.log('Hello PickupComponent Component');
    this.text = 'Hello World';
  }

}
