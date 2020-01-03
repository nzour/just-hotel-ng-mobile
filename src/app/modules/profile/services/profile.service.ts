import { ProfileInjectable } from '../profile-services.module';
import { HttpClient } from '@angular/common/http';
import { Guid, UserRole } from '../../shared/types/manual';
import { Observable } from 'rxjs';
import { ReservationOutput } from '../../rooms/services/reservation.service';

@ProfileInjectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<ProfileOutput> {
    return this.http.get<ProfileOutput>('profile');
  }

  getCurrentUserReservations(): Observable<ReservationOutput[]> {
    return this.http.get<ReservationOutput[]>('profile/reservations');
  }

  updateNames(input: UpdateNamesInput): Observable<void> {
    return this.http.patch<void>('profile/update-names', input);
  }

  updatePassword(input: UpdatePasswordInput): Observable<void> {
    return this.http.patch<void>('profile/update-password', input);
  }

  updateAvatar(input: UpdateAvatarInput): Observable<void> {
    return this.http.patch<void>('profile/update-avatar', input);
  }
}

export interface ProfileOutput {
  id: Guid,
  firstName: string,
  lastName: string,
  login: string,
  role: UserRole,
  avatar?: string
}

export interface UpdateNamesInput {
  firstName: string,
  lastName: string
}

export interface UpdatePasswordInput {
  oldPassword: string,
  newPassword: string
}

export interface UpdateAvatarInput {
  avatar: string
}
