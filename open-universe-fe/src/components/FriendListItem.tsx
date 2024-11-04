import defaultAvt from '@/assets/images/blank-avt.jpg';
import { PROFILE_PATH } from '@/constants';
import { Link } from 'react-router-dom';

type FriendListItemProps = {
  userId: string;
  avatar: string;
  name: string;
  address: string;
  firstBtnTitle: string;
  secondBtnTitle: string;
  onFirstButtonClick: () => void;
  onSecondButtonClick: () => void;
};

function FriendListItem({
  userId,
  avatar,
  name,
  address,
  firstBtnTitle,
  secondBtnTitle,
  onFirstButtonClick,
  onSecondButtonClick,
}: FriendListItemProps) {
  return (
    <div className="col-span-1 sm:col-span-2 shrink">
      <div className="bg-slate-500 bg-opacity-40 rounded-lg p-3 sm:py-0 grid grid-cols-3 grid-rows-1 gap-4 ">
        <Link to={`${PROFILE_PATH}/${userId}`}>
          <div className="col-span-1 row-start-1 row-end-3 flex justify-center py-2 ">
            <img
              src={avatar ? avatar : defaultAvt}
              alt="avatar"
              className="h-36 w-36 sm:h-24 sm:w-full rounded-md"
            />
          </div>
        </Link>
        <div className="col-span-2  sm:row-span-2 sm:flex sm:flex-col sm:justify-around pt-1">
          <div className="md:relative md:right-6 sm:right-9 pt-1 ">
            <Link to={`${PROFILE_PATH}/${userId}`}><div className="text-xl sm:text-sm pb-1 sm:relative right-1.5">{name}</div></Link>
            <div className="text-lg opacity-90 sm:text-sm pb-1 sm:relative right-1.5">
              {address}
            </div>
            <div className="flex h-14 gap-5 sm:gap-2 col-span-2 sm:col-span-3 mt-6 sm:mt-1 sm:me-2 justify-center sm:items-start sm:relative sm:right-1.5 ">
              <button
                className="flex flex-1 justify-center text-white bg-purple-500 rounded-md sm:h-10 sm:text-sm sm:p-1"
                onClick={onFirstButtonClick}>
                <span className="mx-2 my-auto sm:mx-0">{firstBtnTitle}</span>
              </button>
              <button
                className="flex flex-1 justify-center text-white bg-red-500 rounded-md sm:h-10 sm:text-sm"
                onClick={onSecondButtonClick}>
                <span className="mx-2 my-auto">{secondBtnTitle}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendListItem;
