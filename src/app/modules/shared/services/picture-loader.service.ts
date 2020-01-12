import { SharedInjectable } from '../shared-service.module';
import { ImagePicker, ImagePickerOptions, OutputType } from '@ionic-native/image-picker/ngx';
import { Platform } from '@ionic/angular';
import { firstOrDefault } from '../utils/functional';
import { NotifierService } from './notifier.service';
import { defaultAvatar } from '../utils/constants/default-avatar';

function createOptions(imageCount: number): ImagePickerOptions {
  return {
    allow_video: false,
    maximumImagesCount: imageCount,
    outputType: OutputType.DATA_URL
  };
}

@SharedInjectable()
export class PictureLoaderService {

  constructor(private imagePicker: ImagePicker, private platform: Platform, private notifier: NotifierService) { }

  async loadImages(imageCount: number = 10): Promise<string[]> {
    if (!this.platform.is('cordova')) {
      return Promise.resolve([defaultAvatar]);
    }

    const options = createOptions(imageCount);
    return await this.imagePicker.getPictures(options);
  }

  async loadOneImage(): Promise<string> {
    if (!this.platform.is('cordova')) {
      return Promise.resolve(defaultAvatar);
    }

    const options = createOptions(1);

    const images = await this.imagePicker.getPictures(options);
    const image = firstOrDefault<string>(images);

    if (!image) {
      const errorMessage = 'Возникла ошибка при загрузке изображения!';
      await this.notifier.dispatchError(errorMessage);
      throw new Error(errorMessage);
    }

    return image;
  }
}
