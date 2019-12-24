import * as moment from 'moment';
import { Moment } from 'moment';

export type Guid = string;

export type Timestamp = number;

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

export function tsToMoment(ts: Timestamp): Moment {
  return moment.unix(ts);
}
