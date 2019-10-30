import { Component, OnDestroy } from '@angular/core';
import { AuthService, SignInInput } from '../../services/auth.service';
import { TokenService } from '../../../shared/services/token.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnDestroy {

  private _loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnDestroy(): void {
    this._loginForm.reset();
  }

  get loginForm(): FormGroup {
    return this._loginForm;
  }

  submit() {
    if (!this._loginForm.valid) {
      // dispatch error
    }

    const input = this._loginForm.value as SignInInput;

    this.authService.signIn(input)
      .pipe(
        tap(output => {
          this.tokenService.store(output);
          this.router.navigate(['main']);
        })
      )
      .subscribe();
  }
}
