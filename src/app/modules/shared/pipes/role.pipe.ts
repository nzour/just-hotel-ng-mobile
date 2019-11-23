import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '../types/manual';

@Pipe({
  name: 'translateRole'
})
export class RolePipe implements PipeTransform {

  transform(role: UserRole): string {
    switch (role) {
      case 'Employee':
        return 'Сотрудник';

      case 'Client':
        return 'Клиент';

      case 'Manager':
        return 'Менеджер';

    }
  }
}
