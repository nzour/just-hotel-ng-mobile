import { RoomsInjectable } from '../rooms-services.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedData } from '../../shared/types/pagination';
import { ServiceOutput } from '../../shared/types/room';

@RoomsInjectable()
export class ServicesService {

  constructor(private http: HttpClient) { }

  createService(input: ServiceInput): Observable<void> {
    return this.http.post<void>('services', input);
  }

  getAllServices(): Observable<PaginatedData<ServiceOutput>> {
    return this.http.get<PaginatedData<ServiceOutput>>('services');
  }
}

export interface ServiceInput {
  name: string,
  cost: number
}
