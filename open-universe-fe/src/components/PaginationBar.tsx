import { FaGreaterThan, FaLessThan } from 'react-icons/fa';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  setPage: (number: number) => void;
  currentPage: number;
}

const Pagination = ({ itemsPerPage, totalItems, setPage, currentPage }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          '...',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();
  const isEnd = totalPages === currentPage;

  return (
    <div className="flex flex-col items-center px-5 py-1 bg-white xs:flex-row xs:justify-between">
      <div className="flex items-center">
        <button
          type="button"
          onClick={currentPage !== 1 ? () => setPage(currentPage - 1) : () => {}}
          className="w-full px-4 py-3 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">
          <FaLessThan />
        </button>
        <nav>
          <ul className="pagination flex">
            {pages.map((number, index) => (
              <li
                key={index}
                className={`page-item ${number === currentPage ? 'bg-slate-200' : ''} p-2 px-3 border`}>
                {number === '...' ? (
                  <span className="page-link px-1">...</span>
                ) : (
                  <button className="page-link px-1" onClick={() => setPage(number as number)}>
                    {number}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          onClick={!isEnd ? () => setPage(currentPage + 1) : () => {}}
          className="w-full px-4 py-3 text-base text-gray-600 bg-white border rounded-r-xl hover:bg-gray-100">
          <FaGreaterThan />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
