import { SharedInjectable } from '../shared-service.module';

@SharedInjectable()
export class TokenService {
  private readonly USER_KEY = 'current_user';

  store(tokenInfo: TokenInfo): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(tokenInfo));
  }

  clear(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  get hasTokeInfo(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  get tokenInfo(): TokenInfo {
    if (!this.hasTokeInfo) {
      throw new Error("Token info was not found.");
    }

    return JSON.parse(localStorage.getItem(this.USER_KEY)!);
  }
}
