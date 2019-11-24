import { ProfileInjectable } from '../profile-services.module';
import { HttpClient } from '@angular/common/http';
import { Guid, UserRole } from '../../shared/types/manual';
import { Observable } from 'rxjs';

@ProfileInjectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<ProfileOutput> {
    return this.http.get<ProfileOutput>('profile');
  }

}

export interface ProfileOutput {
  id: Guid,
  firstName: string,
  lastName: string,
  login: string,
  role: UserRole
}
