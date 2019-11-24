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

  updateNames(input: UpdateNamesInput): Observable<void> {
    return this.http.put<void>('profile/update-names', input);
  }

  updatePassword(input: UpdatePasswordInput): Observable<void> {
    return this.http.put<void>('profile/update-password', input);
  }
}

export interface ProfileOutput {
  id: Guid,
  firstName: string,
  lastName: string,
  login: string,
  role: UserRole
}

export interface UpdateNamesInput {
  firstName: string,
  lastName: string
}

export interface UpdatePasswordInput {
  oldPassword: string,
  newPassword: string
}
