import { Resolve } from '@angular/router';
import { ServiceOutput } from '../../shared/types/room';
import { Observable } from 'rxjs';
import { ServicesService } from '../services/services.service';
import { PaginatedData } from '../../shared/types/pagination';
import { RoomsInjectable } from '../rooms-services.module';

@RoomsInjectable()
export class ServicesResolver implements Resolve<PaginatedData<ServiceOutput>> {

  constructor(private servicesService: ServicesService) { }

  resolve(): Observable<PaginatedData<ServiceOutput>> {
    return this.servicesService.getAllServices();
  }
}

export interface ServicesResolvedData {
  services: PaginatedData<ServiceOutput>
}
