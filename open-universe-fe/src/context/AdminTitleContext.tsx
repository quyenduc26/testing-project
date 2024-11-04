import { ContainerProps } from '@/types';
import { createContext, useState } from 'react';

type TitleContextType = { title: string; setTitle: React.Dispatch<React.SetStateAction<string>> };

const titleContext = { title: '', setTitle: () => '' };

const TitleContext = createContext<TitleContextType>(titleContext);

function TitleContextProvider(props: ContainerProps) {
  const [title, setTitle] = useState<string>('');
  return (
    <TitleContext.Provider value={{ title, setTitle }}>{props.children}</TitleContext.Provider>
  );
}

export { TitleContext, TitleContextProvider };
