export class AccessToken {
  accessToken?: string;

  isAvailable(): boolean {
    return !!this.accessToken;
  }

  asAuthorizationHeader(): string {
    return `Bearer ${this.accessToken}`;
  }
}
