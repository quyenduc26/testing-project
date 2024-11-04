export interface SignUp {
  userName: string;
  fullName: string;
  email: string;
  password: string;
}

export type SignUpResponse = Pick<SignUp, 'userName' | 'fullName' | 'email' | 'password'>;

export type SignUpPayload = SignUp;
