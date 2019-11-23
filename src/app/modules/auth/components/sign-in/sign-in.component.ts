import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../../shared/services/token.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../auth.component.scss'],
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

  submit(): void {
    if (!this._loginForm.valid) {
      return;
    }

    this.authService.signIn(this._loginForm.value)
      .pipe(
        tap(async output => {
          this.tokenService.store(output);
          await this.router.navigate(['/profile']);
        })
      )
      .subscribe(this.ngOnDestroy);
  }

  hasFormError(controlName: string): boolean {
    const control = this._loginForm.get(controlName);

    if (!control || !control.dirty) {
      return false;
    }

    return control.hasError('required');
  }
}
