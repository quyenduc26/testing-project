import { FRIEND, PROFILE_PATH } from '@/constants';
import { Link } from 'react-router-dom';

interface Friend {
  id: number;
  name: string;
  avatarUrl: string;
}

function ProfileFriends({
  friends,
  visibleFriends,
}: {
  friends: Friend[];
  visibleFriends: number;
}) {
  return (
    <div className="mt-4 background-item text-white p-4 sm:flex-row">
      <p className="text-lg sm:text-sm">
        <b>Friends</b>
      </p>
      <div className="flex items-center justify-between sm:text-nowrap">
        <p className="text-xs p-2 sm:text-xs">
          {friends != undefined ? friends.length : 0} Friends
        </p>
        <Link to={`${PROFILE_PATH}/${FRIEND}`} className="text-xs p-2 hover:underline">
          See all friends
        </Link>
      </div>
      {friends != undefined ? (
        <div className="grid grid-cols-3 gap-3 sm:gap-1 sm:text-xs">
          {friends.slice(0, visibleFriends).map((friend) => (
            <Link
              to={`${PROFILE_PATH}/${friend.id}`}
              key={friend.id}
              className="col-span-1 sm:col-span-1 shrink p-1">
              <div className="rounded-lg sm:py-0 flex flex-col items-center">
                <div className="w-full flex justify-center">
                  <img
                    src={friend.avatarUrl}
                    alt="avatar"
                    className="h-28 w-36 sm:h-20 sm:w-20 rounded-md"
                  />
                </div>
                <span className="text-sm sm:text-xs pb-1 mt-2 text-center">{friend.name}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex justify-center mt-4">
          <Link
            to="/explore"
            className="main-gradient-color rounded-md px-4 py-2 text-sm sm:text-xs flex items-center">
            Explore to connect more friends
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfileFriends;
