import { getPosts, updatePost } from '@/api/posts.api';
import CustomizationModal from '@/components/CustomizationModal';
import Pagination from '@/components/PaginationBar';
import AdminUpdatePostForm from '@/components/forms/AdminUpdatePostForm';
import { POSTS } from '@/constants';
import { TitleContext } from '@/context/AdminTitleContext';
import { PostAdminResponse, PostAdminUpdatePayload } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';

const renderPostList = (
  posts: PostAdminResponse[],
  handleEditClick: (post: PostAdminUpdatePayload) => void,
  handleDeleteClick: (post: PostAdminUpdatePayload) => void,
) => {
  return posts.map((post: PostAdminResponse, index) => (
    <tr key={index}>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{post.id}</p>
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{post.content}</p>
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        {post.media_url && (
          <img src={post.media_url} className="object-cover h-12 w-12" alt="media" />
        )}
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{post.likes ? post.likes.length : 0}</p>
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">
          {post.comments ? post.comments.length : 0}
        </p>
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{post.user.id}</p>
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <span
          className={`capitalize relative inline-block px-3 py-1 font-semibold leading-tight ${post.status === 'active' ? 'text-green-900' : 'text-red-900'}`}>
          <span
            aria-hidden="true"
            className={`absolute inset-0 ${post.status === 'active' ? 'bg-green-200' : 'bg-red-200'} rounded-full opacity-50`}></span>
          <span className="relative">{post.status}</span>
        </span>
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <button
          className="text-blue-700 group inline-block p-3 rounded-md border border-slate-500"
          onClick={() =>
            handleEditClick({
              id: post.id,
              status: post.status,
              content: post.content,
              media_url: post.media_url,
            })
          }>
          <MdOutlineEdit className="size-5 group-hover:text-black" />
        </button>
        <button
          className="ml-3 p-3 group inline-block rounded-md border border-slate-500 "
          onClick={() => handleDeleteClick({ id: post.id, status: 'inactive' })}>
          <FaTrash className="size-5 text-red-500 group-hover:text-black" />
        </button>
      </td>
    </tr>
  ));
};

function PostList() {
  //set title for page
  const { setTitle } = useContext(TitleContext);
  useEffect(() => {
    setTitle('posts');
  }, []);

  const [isUpdateModalShow, setIsUpdateModalShow] = useState(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [pickedPost, setPickedPost] = useState<PostAdminUpdatePayload | null>(null);

  //get all posts
  const { data, isLoading } = useQuery({
    queryKey: [POSTS, 'admin'],
    queryFn: getPosts,
  });
  const postsRes: PostAdminResponse[] = data?.data?.posts || [];

  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<PostAdminResponse[]>([]);

  const handleSetCurrentPage = (number: number) => {
    setCurrentPage(number);
  };

  // pagination handle
  const itemsPerPage = 5;
  const totalItems = postsRes.length;
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;

  const filteredItems = postsRes.filter((item: PostAdminResponse) =>
    item.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const slicedItems = filteredItems.slice(indexOfFirstItems, indexOfLastItems);

  useEffect(() => {
    setCurrentItems(slicedItems);
  }, [currentPage, postsRes, searchQuery]);

  //hanlde click edit button
  const handleEditClick = (post: PostAdminUpdatePayload) => {
    setIsUpdateModalShow(true);
    setPickedPost(post);
  };

  const handleDeleteClick = (post: PostAdminUpdatePayload) => {
    setIsDeleteModalShow(true);
    setPickedPost(post);
  };

  return (
    <div className="container px-4 mx-auto">
      {/* update modal */}
      <div className="text-center flex w-full gap-2 mt-4">
        <div className="search-bar w-full">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded w-full outline-none"
          />
        </div>
      </div>
      <CustomizationModal isShow={isUpdateModalShow}>
        <div className="bg-white rounded-lg p-6 shadow-lg w-1/4 pt-0">
          <div className="flex justify-center items-center border-b-2 border-gray-200 pb-4">
            <h2 className="text-2xl font-semibold">Update post</h2>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsUpdateModalShow(false)}></button>
          </div>
          <div className="mt-6 space-y-4">
            <AdminUpdatePostForm post={pickedPost} onClose={setIsUpdateModalShow} />
          </div>
        </div>
      </CustomizationModal>
      {/* delete modal */}
      <CustomizationModal
        isShow={isDeleteModalShow}
        title="Are you sure want to delete this post?"
        onClose={() => setIsDeleteModalShow(false)}
        queryFn={updatePost}
        object={pickedPost}
        queryKey={POSTS}
      />
      <div className="py-8 pt-0">
        <div className="px-4 py-4 -mx-4 overflow-x- sm:-mx-8 sm:px-8">
          {isLoading && (
            <div>
              <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="w-full h-12 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-12 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-12 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-12 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-12 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-12 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-12 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-12 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-12 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-12 bg-gray-300 rounded mb-2"></div>
              </div>
            </div>
          )}
          {!isLoading && (
            <div className="inline-block min-w-full overflow-hidden rounded-lg border border-slate-200 shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      <AiOutlineFieldNumber className="size-6" />
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Content
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Media
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Likes
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Comments
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Author ID
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{renderPostList(currentItems, handleEditClick, handleDeleteClick)}</tbody>
              </table>
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={totalItems}
                  setPage={handleSetCurrentPage}
                  currentPage={currentPage}
                />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostList;
