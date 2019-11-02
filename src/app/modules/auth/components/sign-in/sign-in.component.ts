import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../../shared/services/token.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotifierService } from '../../../shared/services/notifier.service';

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
    private tokenService: TokenService,
    private notifier: NotifierService
  ) { }

  ngOnDestroy(): void {
    this._loginForm.reset();
  }

  get loginForm(): FormGroup {
    return this._loginForm;
  }

  submit(): void {
    if (!this._loginForm.valid) {
      this.notifier.dispatchError('Оба поля должны быть заполнены.');
      return;
    }

    this.authService.signIn(this._loginForm.value)
      .pipe(
        tap(output => {
          this.tokenService.store(output);
          this.router.navigate(['main']);
        })
      )
      .subscribe(() => this._loginForm.reset());
  }
}
