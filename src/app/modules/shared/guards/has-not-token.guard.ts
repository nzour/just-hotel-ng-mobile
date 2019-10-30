import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { RootInjectable } from '../shared-service.module';
import { TokenService } from '../services/token.service';

@RootInjectable()
export class HasNotTokenGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private tokenService: TokenService) { }

  canActivate(): Promise<boolean> | boolean {
    return !this.tokenService.hasTokeInfo || this.router.navigate(['main']);
  }
  canActivateChild(): Promise<boolean> | boolean {
    return this.canActivate();
  }
}
