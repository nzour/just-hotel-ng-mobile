import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthInjectable } from '../auth-services.module';
import { TokenInfo } from '../../shared/types/manual';

@AuthInjectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(input: SignInInput): Observable<TokenInfo> {
    return this.http.post<TokenInfo>('auth/sign-in', input);
  }

  signUp(input: SignUpInput): Observable<TokenInfo> {
    return this.http.post<TokenInfo>('auth/sign-up', input);
  }
}

export interface SignInInput {
  login: string,
  password: string
}

export interface SignUpInput {
  login: string,
  firstName: string,
  lastName: string,
  password: string
}
