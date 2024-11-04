import { search } from '@/api/users.api';
import { ReactNode, createContext, useContext, useState } from 'react';

interface SearchContextProps {
  state: {
    key: string;
    result: {
      users: any[];
      posts: any[];
      friends: any[];
    };
  };
  setSearchTerm: (term: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

const initSearchState = {
  key: '',
  result: {
    users: [],
    posts: [],
    friends: [],
  },
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(initSearchState);

  const setSearchTerm = (
    term: string,
    searchUser?: string,
    searchPost?: string,
    searchFriends?: string,
  ) => {
    const result = search(term, searchUser, searchPost, searchFriends);
    result.then((res) => {
      setState({
        key: term,
        result: {
          users: res?.data?.result?.users || [],
          posts: res?.data?.result?.posts || [],
          friends: res?.data?.result?.friends || [],
        },
      });
    });
  };

  return (
    <SearchContext.Provider value={{ state, setSearchTerm }}>{children}</SearchContext.Provider>
  );
};
