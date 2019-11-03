export type Guid = string;

export type UserRole = 'Manager' | 'Employee' | 'Client';

export interface UserOutput {
  id: Guid;
  role: UserRole;
  login: string;
  firstName: string;
  lastName: string;
}

export interface TokenInfo {
  token: string;
  userId: Guid;
  role: UserRole;
}

export type IonicColor = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'dark' | 'medium' | 'light';
