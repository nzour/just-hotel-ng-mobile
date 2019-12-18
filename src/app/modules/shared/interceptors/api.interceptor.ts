import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { environment } from '../../../../environments/environment';
import { catchError, finalize } from 'rxjs/operators';
import { AppInjectable } from '../shared-service.module';
import { NotifierService } from '../services/notifier.service';

@AppInjectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private loaderService: LoaderService,
    private notifier: NotifierService
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
        this.handleIfUnauthorized(response);
        this.handleIfForbidden(response);
        this.handleIfBadRequest(response);
        this.handleIfServerError(response);

        return throwError(response);
      })
    );
  }

  private handleIfUnauthorized(response: HttpErrorResponse): void {
    if (ResponseCode.UNAUTHORIZED === response.status) {
      this.tokenService.clear();
      this.router.navigate(['']);
    }
  }

  private handleIfForbidden(response: HttpErrorResponse): void {
    if (ResponseCode.FORBIDDEN === response.status) {
      this.notifier.dispatchError('Нет доступа!');
    }
  }

  private handleIfBadRequest(response: HttpErrorResponse): void {
    if (!this.isErrorReadable(response.error, response)) {
      return;
    }

    this.notifier.dispatchError(`[${response.error.type}] \n${response.error.message}`);
  }

  private handleIfServerError(response: HttpErrorResponse): void {
    if (response.status != 0 && response.status < ResponseCode.SERVER_ERROR) {
      return;
    }

    this.notifier.dispatchError('Ошибка сервера!');
  }

  private isErrorReadable(error: any, response: HttpErrorResponse): error is ErrorResponse {
    return ResponseCode.BAD_REQUEST === response.status;
  }
}

interface ErrorResponse {
  type: string
  message: string
}

class ResponseCode {
  static readonly UNAUTHORIZED = 401;
  static readonly FORBIDDEN = 403;
  static readonly BAD_REQUEST = 400;
  static readonly SERVER_ERROR = 500;
}
