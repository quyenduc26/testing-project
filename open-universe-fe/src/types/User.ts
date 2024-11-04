import { Gender, UserRole } from '@/constants';
import { Address } from './Address';

export interface User {
  id: number;
  fullName: string;
  email: string;
  userName: string;
  password: string;
  dateOfBirth: Date;
  phoneNumber: string;
  gender: Gender;
  role: UserRole;
  avatar?: string;
  status: string;
  cover: string;
  bio: string;
  ins: string;
  facebook: string;
  created_at: Date;
  address: Address[];
}

export type UserResponse = {
  id: number;
  fullName: string;
  userName: string;
  email: string;
  dateOfBirth: Date;
  phoneNumber: string;
  gender: string;
  avatar: string;
  bio: string;
  status: string;
  ins: string;
  address: Address[];
};

export type UserPayload = Omit<User, 'id' | 'status'>;

export type createUserPayload = {
  fullName: string;
  email: string;
  userName: string;
  password: string;
  dateOfBirth: Date;
  phoneNumber: string;
  gender: Gender;
  role: UserRole;
  avatar?: string;
};

export type UserAdminUpdatePayload = {
  id: number;
  role?: string;
  status?: string;
  isDestroyed?: boolean;
};
export type UserClientUpdatePayload = {
  id?: number;
  fullName?: string;
  userName?: string;
  email?: string;
  phoneNumber: string;
  avatar?: string;
};

export type UserAdminResponse = {
  id: number;
  avatar: string;
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  role: string;
  status: string;
};

export type ContactResponse = {
  id: number;
  fullName: string;
  avatar: string;
};

export type UserQueryResponse = {
  id: number;
  fullName: string;
  avatar: string;
};
