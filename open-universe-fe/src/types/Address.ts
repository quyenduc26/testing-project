export interface Address {
  street: string;
  state: string;
  city: string;
  country: string;
  is_default: boolean;
  userId: number;
}

export type AddressResponse = Pick<
  Address,
  'userId' | 'street' | 'city' | 'country' | 'state' | 'is_default'
>;

export type AddressPayload = Omit<Address, 'id' | 'isActive'>;
