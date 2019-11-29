import { ToastController } from '@ionic/angular';
import { IonicColor } from '../types/manual';
import { SharedInjectable } from '../shared-service.module';

@SharedInjectable()
export class NotifierService {

  constructor(private toasts: ToastController) { }

  async dispatchMessage(message: string, duration: number = 5000): Promise<void> {
    await this.dispatch(message, 'light', duration);
  }

  async dispatchError(message: string, duration: number = 5000): Promise<void> {
    await this.dispatch(message, 'danger', duration);
  }

  async dispatchWarning(message: string, duration: number = 5000): Promise<void> {
    await this.dispatch(message, 'warning', duration);
  }

  async dispatchSuccess(message: string, duration: number = 5000): Promise<void> {
    await this.dispatch(message, 'success', duration);
  }

  async dispatch(message: string, color: IonicColor, duration: number = 5000): Promise<void> {
    const toast = await this.toasts
      .create({
        message: message,
        color: color,
        duration: duration,
        showCloseButton: true
      });

    await toast.present();
  }
}

