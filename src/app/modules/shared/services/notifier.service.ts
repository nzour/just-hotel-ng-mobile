import { ToastController } from '@ionic/angular';
import { IonicColor } from '../types/manual';
import { SharedInjectable } from '../shared-service.module';

@SharedInjectable()
export class NotifierService {

  constructor(private toasts: ToastController) { }

  dispatchMessage(message: string, duration: number = 5000): void {
    this.dispatch(message, 'light', duration);
  }

  dispatchError(message: string, duration: number = 5000): void {
    this.dispatch(message, 'danger', duration);
  }

  dispatchWarning(message: string, duration: number = 5000): void {
    this.dispatch(message, 'warning', duration);
  }

  dispatchSuccess(message: string, duration: number = 5000): void {
    this.dispatch(message, 'success', duration);
  }

  async dispatch(message: string, color: IonicColor, duration: number = 5000): Promise<void> {
    await this.toasts
      .create({
        message: message,
        color: color,
        duration: duration,
        showCloseButton: true
      })
      .then(async toast => await toast.present());
  }
}

