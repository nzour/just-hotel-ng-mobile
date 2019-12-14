import { RoomsInjectable } from '../rooms-services.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@RoomsInjectable()
export class ServicesService {

  constructor(private http: HttpClient) { }

  createService(input: ServiceInput): Observable<void> {
    return this.http.post<void>('services', input);
  }
}

export interface ServiceInput {
  name: string,
  cost: number
}
