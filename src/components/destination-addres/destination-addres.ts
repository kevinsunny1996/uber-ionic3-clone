import { Component,Output ,EventEmitter } from '@angular/core';

declare var google: any;

/**
 * Generated class for the DestinationAddresComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'destination-addres',
  templateUrl: 'destination-addres.html'
})
export class DestinationAddresComponent {

  @Output() newDest: EventEmitter<string> = new EventEmitter();

  public enteredAddress;
  public grocoder;
  public results;

  constructor() {
    this.enteredAddress= "";
    this.grocoder= new google.maps.Geocoder();
    this.results=[];
  }

  onSubmit() {
    this.results =[];
    this.grocoder.geocode({address: this.enteredAddress},(destinations,status) => {
      if(status===google.maps.GeocoderStatus.OK){
        this.results = destinations.slice(0,5);//top 5 results
      }
      else if(status===google.maps.GeocoderStatus.ZERO_RESULTS){
        alert("Destination Not Found");
      }
    })
  }

  selectDestination(destination) {
    this.results = [];
    this.enteredAddress = destination.formatted_address;
    //pass the destination lat/lng to parent page
    this.newDest.next(destination.geometry.location);
  }

}
