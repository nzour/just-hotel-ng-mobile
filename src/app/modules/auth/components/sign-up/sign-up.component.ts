import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, SignUpInput } from '../../services/auth.service';
import { TokenService } from '../../../shared/services/token.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class SignUpComponent implements OnDestroy {

  private _signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnDestroy(): void {
    this._signUpForm.reset();
  }

  get signUpForm(): FormGroup {
    return this._signUpForm;
  }

  submit(): void {
    if (!this._signUpForm.valid) {
      return;
    }

    const input = this._signUpForm.value as SignUpInput;

    this.authService.signUp(input)
      .pipe(
        tap(async output => {
          this.tokenService.store(output);
          await this.router.navigate(['/profile']);
        })
      )
      .subscribe(this.ngOnDestroy);
  }

  hasFormError(controlName: string, errorType: 'required' | 'minLength'): boolean {
    const control = this._signUpForm.get(controlName);

    if (!control || !control.dirty) {
      return false;
    }

    return control.hasError(errorType.toLowerCase());
  }
}
