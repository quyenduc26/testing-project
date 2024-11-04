import avt_default from '@/assets/images/blank-avt.jpg';
import { PROFILE } from '@/constants';
import { UserResponse } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaImage } from 'react-icons/fa6';
import CreatePostForm from './forms/createPostForm';

function StatusBar() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleCreateForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  interface CachedData {
    data: {
      user: UserResponse;
    };
  }
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData<CachedData>([PROFILE]);

  return (
    <div className="p-3 pb-1 sm:p-2 sm:pt-4">
      <div className="flex gap-3 sm:gap-2 px-5 sm:px-2 bg-purple-100 bg-opacity-10 shadow py-3 w-full rounded-lg overflow-hidden">
        <a className="flex-shrink-0" href="">
          <div className="flex">
            <img
              className="w-12 sm:w-10 h-12 sm:h-10 object-cover rounded-full "
              src={profile?.data.user.avatar || avt_default}
              alt=""
            />
          </div>
        </a>
        <button
          className="bg-white text-start bg-opacity-90 p-3 sm:p-1 px-5 sm:px-4 rounded-full w-10/12 text-nowrap overflow-hidden"
          onClick={handleCreateForm}>
          <p className="overflow-hidden text-xs">Loyce, what are you thinking of ?</p>
        </button>
        <button className="w-1/12 flex justify-center items-center">
          <FaImage className="text-white block sm:text-[1.5rem] text-[1.75rem]" />
        </button>
      </div>
      {isFormVisible && <CreatePostForm closeFunc={handleCreateForm} />}
    </div>
  );
}

export default StatusBar;
