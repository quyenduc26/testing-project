import { confirmFriend, getFriendRequestUsers, getFriends, unfriend } from '@/api/users.api';
import { FRIEND, FRIENDREQUEST } from '@/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FriendListItem from './FriendListItem';

function renderFriendList(
  users: any,
  isShowFriend: boolean,
  onFirstButtonClick: Function,
  onSecondButtonClick: Function,
) {
  console.log(users);
  return users.map((user: any) => (
    <>
      <FriendListItem
        userId={user.id}
        key={user.id}
        avatar={user?.avatar}
        name={user.fullName}
        address={user.address}
        firstBtnTitle={isShowFriend ? 'Chat' : 'Confirm'}
        secondBtnTitle={isShowFriend ? 'Unfriend' : 'Cancel'}
        onFirstButtonClick={() => onFirstButtonClick(user.id)}
        onSecondButtonClick={() => onSecondButtonClick(user.id)}
      />
    </>
  ));
}

function FriendList() {
  const [isShowFriendList, setIsShowFriendList] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [isShowFriendList ? FRIEND : FRIENDREQUEST],
    queryFn: isShowFriendList ? getFriends : getFriendRequestUsers,
  });
  const dataList = data?.data?.data;

  const unfriendMutation = useMutation({
    mutationFn: (id: number) => unfriend(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [isShowFriendList ? FRIEND : FRIENDREQUEST] });
    },
    onError: (error: any) => {
      console.log('Unfriend failed', error);
    },
  });

  const confirmMutation = useMutation({
    mutationFn: (id: number) => confirmFriend(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [isShowFriendList ? FRIEND : FRIENDREQUEST] });
    },
    onError: (error: any) => {
      console.log('Confirm failed', error);
    },
  });

  const handleFirstButtonClick = (id: number) => {
    if (isShowFriendList) {
      navigate('/message');
    } else {
      confirmMutation.mutate(id);
    }
  };

  const handleSecondButtonClick = (id: number) => {
    if (isShowFriendList) {
      // Handle 'Unfriend' action
      unfriendMutation.mutate(id);
    } else {
      // Handle 'Cancel' action
      unfriendMutation.mutate(id);
    }
  };

  return (
    <div className="text-white bg-slate-500 bg-opacity-40 rounded-lg p-4">
      <div className="flex grid-cols-6 sm:grid-cols-4 items-center justify-between">
        <button
          onClick={() => setIsShowFriendList(true)}
          className={`col-span-2 text-start text-xl sm:text-sm p-2 rounded-md inline-block ${isShowFriendList ? 'main-gradient-color' : 'bg-none'}`}>
          All Friends
        </button>
        <button
          onClick={() => setIsShowFriendList(false)}
          className={`col-span-2 text-xl text-end sm:text-sm p-2 rounded-md inline-block ${!isShowFriendList ? 'main-gradient-color' : 'bg-none'}`}>
          Friends request
        </button>
      </div>
      <div className="grid grid-cols-2 m-3 ms-0 w-full gap-5 sm:gap-2">
        {!isLoading &&
          renderFriendList(
            dataList,
            isShowFriendList,
            handleFirstButtonClick,
            handleSecondButtonClick,
          )}
      </div>
    </div>
  );
}

export default FriendList;
