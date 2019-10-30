import { RootInjectable } from '../shared-service.module';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@RootInjectable()
export class LoaderService {

  private _stack = new BehaviorSubject<number>(0);

  get isLoading(): Observable<boolean> {
    return this._stack.pipe(
      map(counter => counter > 0)
    );
  }

  increase(): void {
    this._stack.next(this._stack.value + 1);
  }

  decrease(): void {
    this._stack.next(this._stack.value - 1);
  }
}
