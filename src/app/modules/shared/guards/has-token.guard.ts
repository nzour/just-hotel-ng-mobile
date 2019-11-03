import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AppInjectable } from '../shared-service.module';

@AppInjectable()
export class HasTokenGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private tokenService: TokenService) { }

  canActivate(): Promise<boolean> | boolean {
    return this.tokenService.hasTokeInfo || this.router.navigate(['auth']);
  }
  canActivateChild(): Promise<boolean> | boolean {
    return this.canActivate();
  }
}
