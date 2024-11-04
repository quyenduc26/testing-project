import { getAllComments, updateComment } from '@/api/comment.api';
import blankAvt from '@/assets/images/blank-avt.jpg';
import CustomizationModal from '@/components/CustomizationModal';
import Pagination from '@/components/PaginationBar';
import { COMMENTS } from '@/constants';
import { TitleContext } from '@/context/AdminTitleContext';
import { CommentAdminResponse, CommentAdminUpdatePayload } from '@/types';
import { calculateTimeDifference } from '@/utils/transformTime';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';

const renderCommentList = (
  comments: CommentAdminResponse[],
  handleDeleteClick: (comment: CommentAdminUpdatePayload) => void,
) => {
  return comments.map((comment: CommentAdminResponse) => (
    <tr key={comment.id} className="hover:bg-gray-100">
      <td className="px-5 py-4 border-b border-gray-200">{comment.id}</td>
      <td className="px-5 py-4 border-b border-gray-200 text-center">
        <div className="flex flex-col items-center">
          <img
            src={comment.user.avatar || blankAvt}
            className="avatar-img h-12 w-12 rounded-full mb-2"
            alt="avatar"
          />
          <p className="text-gray-900">{comment.user.user_name}</p>
        </div>
      </td>
      <td className="px-5 py-4 border-b border-gray-200">
        <p className="text-gray-900">{comment.content}</p>
      </td>
      <td className="px-5 py-4 border-b border-gray-200">
        {comment.media_url && (
          <img
            src={comment.media_url}
            className="object-scale-down h-32 w-64 mx-auto"
            alt="media"
          />
        )}
      </td>
      <td className="px-5 py-4 border-b border-gray-200 text-center">
        <span
          className={`capitalize relative inline-block px-3 py-1 font-semibold leading-tight cursor-pointer ${comment.status === 'inactive' ? 'text-red-900' : 'text-green-900'}`}>
          <span
            aria-hidden="true"
            className={`absolute inset-0 rounded-full opacity-50 ${comment.status === 'inactive' ? 'bg-red-200' : 'bg-green-200'}`}></span>
          <span className="relative">{comment.status}</span>
        </span>
      </td>
      <td className="px-5 py-4 border-b border-gray-200 text-center">
        <p className="text-gray-900 font-normal">{calculateTimeDifference(comment.createAt)}</p>
      </td>
      <td className="px-5 py-4 border-b border-gray-200">
        <button
          className="ml-3 p-3 group inline-block rounded-md border text-blue-700 group"
          onClick={() => handleDeleteClick(comment)}>
          <MdOutlineEdit className="size-5 group-hover:text-black" />
        </button>
      </td>
    </tr>
  ));
};

function CommentList() {
  const { setTitle } = useContext(TitleContext);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentComment, setCurrentComment] = useState({} as CommentAdminUpdatePayload);

  const { data, isLoading } = useQuery({
    queryKey: [COMMENTS],
    queryFn: getAllComments,
  });
  const commentsRes: CommentAdminResponse[] = data?.data.data || [];

  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<CommentAdminResponse[]>([]);

  const handleSetCurrentPage = (number: number) => {
    setCurrentPage(number);
  };

  const itemsPerPage = 5;
  const totalItems = commentsRes.length;
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;

  const filteredItems = commentsRes.filter((item: CommentAdminResponse) =>
    item.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const slicedItems = filteredItems.slice(indexOfFirstItems, indexOfLastItems);

  useEffect(() => {
    setCurrentItems(slicedItems);
  }, [currentPage, commentsRes, searchQuery]);

  const handleDeleteClick = (comment: CommentAdminUpdatePayload) => {
    setIsDeleteModalShow(true);
    setCurrentComment(comment);
  };
  setTitle('comments');

  return (
    <div className="container mx-auto pr-4">
      <div className="text-center flex w-full gap-2 mt-4">
        <div className="search-bar w-full">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded w-full outline-none"
          />
        </div>
      </div>
      <CustomizationModal
        isShow={isDeleteModalShow}
        title="Are you sure change status this comment?"
        onClose={() => setIsDeleteModalShow(false)}
        queryKey={COMMENTS}
        object={currentComment}
        queryFn={updateComment}
      />
      <table className="table-auto w-full text-left border-collapse border border-gray-200 shadow-lg mt-6">
        <thead className="bg-gray-200">
          <tr>
            {['ID', 'User', 'Content', 'Media', 'Status', 'Create At', 'Action'].map((header) => (
              <th
                key={header}
                className="px-5 py-3 border-b border-gray-200 text-gray-800 text-sm uppercase font-semibold text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr className="animate-pulse">
              <td className="px-5 py-4 border-b border-gray-200" colSpan={7}>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </td>
            </tr>
          ) : currentItems.length > 0 ? (
            renderCommentList(currentItems, handleDeleteClick)
          ) : (
            <tr>
              <td colSpan={7} className="text-center px-5 py-4 border-b border-gray-200">
                No comments
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        setPage={handleSetCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default CommentList;
