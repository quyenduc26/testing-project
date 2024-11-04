import { UserResponse } from '@/types';
import { ReactNode, createContext, useState } from 'react';

type ContainerProps = { children: ReactNode };

type ClientProfileContextType = {
  user: UserResponse;
  setClientProfile: React.Dispatch<React.SetStateAction<UserResponse>>;
};

const initialUserState: UserResponse = {
  id: 0,
  fullName: '',
  email: '',
  userName: '',
  dateOfBirth: new Date(),
  phoneNumber: '',
  gender: '',
  status: '',
  avatar: '',
  address: [],
  bio: '',
  ins: '',
};

const initialClientProfileState: ClientProfileContextType = {
  user: initialUserState,
  setClientProfile: () => {},
};

const ClientProfileContext = createContext<ClientProfileContextType>(initialClientProfileState);

function ClientProfileContextProvider(props: ContainerProps) {
  const [user, setClientProfile] = useState<UserResponse>(initialUserState);

  return (
    <ClientProfileContext.Provider value={{ user, setClientProfile }}>
      {props.children}
    </ClientProfileContext.Provider>
  );
}

export { ClientProfileContext, ClientProfileContextProvider };
