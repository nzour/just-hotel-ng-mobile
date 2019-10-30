type Guid = string;

type UserRole = 'Manager' | 'Employee' | 'Client';

interface TokenInfo {
  token: string,
  userId: Guid,
  role: UserRole
}
