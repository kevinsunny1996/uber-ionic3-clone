import { NgModule } from '@angular/core';
import { MapsComponent } from './maps/maps';
import { AvailableCarsComponent } from './available-cars/available-cars';
import { PickupComponent } from './pickup/pickup';
import { PickupCarComponent } from './pickup-car/pickup-car';
import { DestinationAddresComponent } from './destination-addres/destination-addres';
@NgModule({
	declarations: [MapsComponent,
    AvailableCarsComponent,
    PickupComponent,
    PickupCarComponent,
    DestinationAddresComponent],
	imports: [],
	exports: [MapsComponent,
    AvailableCarsComponent,
    PickupComponent,
    PickupCarComponent,
    DestinationAddresComponent]
})
export class ComponentsModule {}
