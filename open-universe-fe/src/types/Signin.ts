export interface SignIn {
  username: string;
  password: string;
}

export type SignInResponse = Pick<SignIn, 'username' | 'password'>;

export type SignInPayload = SignIn;
