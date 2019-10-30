import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { environment } from '../../../../environments/environment';
import { catchError, finalize } from 'rxjs/operators';
import { RootInjectable } from '../shared-service.module';

@RootInjectable()
export class ApiInterceptor implements HttpInterceptor {

  private readonly UNAUTHORIZED_CODE = 401;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private loaderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.increase();

    req = req.clone({
      url: `${environment.apiUrl}/${req.url}`
    });

    if (this.tokenService.hasTokeInfo) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${this.tokenService.tokenInfo.token}` }
      });
    }

    return next.handle(req).pipe(
      finalize(() => this.loaderService.decrease()),
      catchError((response: HttpErrorResponse) => {
        if (this.UNAUTHORIZED_CODE === response.status) {
          this.tokenService.clear();
          this.router.navigate(['']);
        }

        return throwError(response);
      })
    );
  }
}
