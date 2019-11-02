export type Guid = string;

export type UserRole = 'Manager' | 'Employee' | 'Client';

export interface TokenInfo {
  token: string,
  userId: Guid,
  role: UserRole
}

export type IonicColor = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'dark' | 'medium' | 'light';
