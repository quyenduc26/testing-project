import { deleteUser, getUsers } from '@/api/users.api';
import catAvt from '@/assets/images/blank-avt.jpg';
import CustomizationModal from '@/components/CustomizationModal';
import Pagination from '@/components/PaginationBar';
import AdminUpdateUserForm from '@/components/forms/AdminUpdateUserForm';
import CreateUserForm from '@/components/forms/createUserForm';
import { TitleContext } from '@/context/AdminTitleContext';
import { UserAdminResponse, UserAdminUpdatePayload } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { MdOutlineEdit } from 'react-icons/md';

const renderUserList = (
  users: UserAdminResponse[],
  handleEditClick: (user: UserAdminUpdatePayload) => void,
) => {
  return users.map((user: UserAdminResponse, index) => (
    <tr key={index}>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{user.id}</p>
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <img src={user.avatar || catAvt} className="avatar-img h-12 w-12" alt="avatar" />
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{user.fullName}</p>
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{user.phoneNumber}</p>
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{user.gender == '0' ? 'Male' : 'Female'}</p>
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <span
          className={`capitalize relative inline-block px-3 py-1 font-semibold leading-tight ${user.status === 'active' ? 'text-green-900' : 'text-red-900'}`}>
          <span
            aria-hidden="true"
            className={`absolute inset-0 ${user.status === 'active' ? 'bg-green-200' : 'bg-red-200'} rounded-full opacity-50`}></span>
          <span className="relative">{user.status}</span>
        </span>
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{user.role}</p>
      </td>
      <td className="px-5 py-1 text-sm bg-white border-b border-gray-200">
        <button
          className="text-blue-700 group inline-block p-3 rounded-md border border-slate-500"
          onClick={() => handleEditClick({ id: user.id, status: user.status, role: user.role })}>
          <MdOutlineEdit className="size-5 group-hover:text-black" />
        </button>
      </td>
    </tr>
  ));
};

function UserList() {
  //set title for page
  const { setTitle } = useContext(TitleContext);
  useEffect(() => {
    setTitle('users');
  }, []);

  const [isUpdateModalShow, setIsUpdateModalShow] = useState(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const [isCreateModalShow, setIsCreateModalShow] = useState(false);
  const [pickedUser, setPickedUser] = useState<UserAdminUpdatePayload | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // get all users
  const { data, isLoading } = useQuery({
    queryKey: ['USERS'],
    queryFn: getUsers,
  });
  const usersRes: UserAdminResponse[] = data?.data?.data || [];

  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<UserAdminResponse[]>([]);

  const handleSetCurrentPage = (number: number) => {
    setCurrentPage(number);
  };

  // pagination handle
  const itemsPerPage = 5;
  const totalItems = usersRes.length;
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;

  const filteredItems = usersRes.filter((item: UserAdminResponse) =>
    item.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const slicedItems = filteredItems.slice(indexOfFirstItems, indexOfLastItems);

  useEffect(() => {
    setCurrentItems(slicedItems);
  }, [currentPage, usersRes, searchQuery]);

  //hanlde click edit button
  const handleEditClick = (user: UserAdminUpdatePayload) => {
    setIsUpdateModalShow(true);
    setPickedUser(user);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  function handleConfirmDelete(id: number | undefined) {
    id && mutation.mutate(id);
    setIsDeleteModalShow(false);
  }

  return (
    <div className="container px-4 mx-auto">
      {/* update modal */}
      <CustomizationModal isShow={isUpdateModalShow}>
        <div className="bg-white rounded-lg p-6 shadow-lg w-1/4">
          <div className="flex justify-center items-center border-b-2 border-gray-200 pb-4">
            <h2 className="text-2xl font-semibold">Update user</h2>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsUpdateModalShow(false)}></button>
          </div>
          <div className="mt-6 space-y-4">
            <AdminUpdateUserForm user={pickedUser} onClose={setIsUpdateModalShow} />
          </div>
        </div>
      </CustomizationModal>

      {/* delete modal */}
      <CustomizationModal
        isShow={isDeleteModalShow}
        title="Are you sure want to delete this user?"
        onClose={() => setIsDeleteModalShow(false)}
        onConfirm={() => handleConfirmDelete(pickedUser?.id)}
      />
      {/* Create modal */}
      <CreateUserForm
        isShow={isCreateModalShow}
        onClose={() => setIsCreateModalShow(false)}
        queryClient={queryClient}
      />

      <div className="py-8">
        <div className="px-4 py-4 -mx-4 overflow-x- sm:-mx-8 sm:px-8">
          <div className="text-center flex w-full gap-2">
            <div className="search-bar w-full">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border rounded w-full outline-none"
              />
            </div>
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => setIsCreateModalShow(true)}>
              Create
            </button>
          </div>
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
                      Avatar
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Phone number
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{renderUserList(currentItems, handleEditClick)}</tbody>
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

export default UserList;
