import { CanActivate } from '@angular/router';
import { TokenService } from '../../shared/services/token.service';
import { RoomsInjectable } from '../rooms-services.module';

@RoomsInjectable()
export class OnlyClientGuard implements CanActivate {

  constructor(private tokenService: TokenService) { }

  canActivate(): Promise<boolean> | boolean {
    const tokenInfo = this.tokenService.tryGetTokenInfo;

    return !!tokenInfo && 'Client' === tokenInfo.role;
  }
}
