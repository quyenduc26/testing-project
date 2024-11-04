import { useSearch } from '@/context/ClientSearchContext';
import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

function Search() {
  const { state, setSearchTerm } = useSearch();
  const [search, setSearch] = useState(state.key);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        const trimmedValue = newValue.trim();
        setSearchTerm(trimmedValue);
        if (trimmedValue.length > 0) {
          navigate(`/explore?search=${trimmedValue}`, { replace: true });
        }
      }, 1000),
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim().length > 0) {
      setSearchTerm(search.trim());
      navigate(`/explore?search=${search.trim()}`);
    }
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  useEffect(() => {
    setSearch(state.key);
  }, [state.key]);

  return (
    <form className="flex items-center w-full" onSubmit={handleSubmit}>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 sm:ps-2">
          <CiSearch style={{ fontSize: '1.5rem', color: 'black' }} />
        </div>
        <input
          className="sm:ps-8 block w-full p-3 sm:p-2 ps-12 sm:text-sm text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 outline-none"
          placeholder="Search OpenU..."
          value={search}
          onChange={handleSearch}
        />
      </div>
    </form>
  );
}

export default Search;
