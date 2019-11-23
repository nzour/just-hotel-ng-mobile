import { ProfileInjectable } from '../profile-services.module';
import { HttpClient } from '@angular/common/http';
import { Guid, UserRole } from '../../shared/types/manual';
import { Observable } from 'rxjs';
import { PaginatedData, Pagination } from '../../shared/types/pagination';
import { RentOutput } from '../../shared/types/room';
import { urlParams } from '../../shared/utils/functional';

@ProfileInjectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<ProfileOutput> {
    return this.http.get<ProfileOutput>('profile');
  }

  getUserRents(pagination: Pagination): Observable<PaginatedData<RentOutput>> {
    return this.http.get<PaginatedData<RentOutput>>(`profile/rents${urlParams(pagination)}`);
  }
}

export interface ProfileOutput {
  id: Guid,
  firstName: string,
  lastName: string,
  login: string,
  role: UserRole
}
