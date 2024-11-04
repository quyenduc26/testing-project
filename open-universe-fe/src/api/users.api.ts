import {
  CommentAdminUpdatePayload,
  UserAdminUpdatePayload,
  UserClientUpdatePayload,
  createUserPayload,
} from '@/types';
import request from '@/utils/request';
import { QueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { searchType } from '../constants';

const handleSuccess = (data: any) => {
  console.log('data success', data);
};

const handleError = (error: any) => {
  console.log('error', error);
};

export const postUser = (
  data: createUserPayload,
  queryClient: QueryClient,
  onClose: () => void,
) => {
  return request({
    method: 'post',
    url: '/users',
    data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['USERS'] });
      onClose();
    },
    onError: (error) => {
      const message = error.message;
      let stringMessage = '';
      if (Array.isArray(message)) {
        message.forEach((item) => {
          stringMessage += item + '. \n';
        });
        alert(stringMessage);
      } else {
        alert(message);
      }
    },
  });
};

export const getUsers = () => {
  return request({
    method: 'get',
    url: '/users',
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const updateUser = (data: UserAdminUpdatePayload) => {
  return request({
    method: 'patch',
    url: `/users/${data.id}`,
    data,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const updateProfile = (data: UserClientUpdatePayload) => {
  console.log(data);
  return request({
    method: 'patch',
    url: `/users/${data.id}`,
    data,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const deleteUser = (id: number) => {
  return request({
    method: 'delete',
    url: `/users/${id}`,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const getFriendRequestUsers = () => {
  const accessToken = Cookies.get('access_token');
  let decodedToken;
  if (accessToken) {
    decodedToken = jwtDecode<any>(accessToken);
  }
  return request({
    method: 'get',
    url: `/users/${decodedToken.sub}/requests`,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const getFriends = () => {
  const accessToken = Cookies.get('access_token');
  let decodedToken;
  if (accessToken) {
    decodedToken = jwtDecode<any>(accessToken);
  }
  return request({
    method: 'get',
    url: `/users/${decodedToken.sub}/friends`,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const getProfile = (targetUserId: string) => {
  return request({
    method: 'get',
    url: `/users/1/${targetUserId}`,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};
export const unfriend = (id: number) => {
  return request({
    method: 'delete',
    url: `/request/delete/${id}`,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const confirmFriend = (id: number) => {
  return request({
    method: 'patch',
    url: `/request/confirm/${id}`,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const getUserInfo = () => {
  const accessToken = Cookies.get('access_token');
  let decodedToken;
  if (accessToken) {
    decodedToken = jwtDecode<any>(accessToken);
  }
  return request({
    method: 'get',
    url: `/users/info/${decodedToken.sub}`,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const getComments = () => {
  return request({
    method: 'get',
    url: `/comment`,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const updateComment = (data: CommentAdminUpdatePayload) => {
  return request({
    method: 'patch',
    url: `/comment/${data.id}`,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const search = (
  keyword: string,
  searchUser?: string,
  searchPost?: string,
  searchFriends?: string,
) => {
  const params = new URLSearchParams();
  params.append('key', keyword);
  if (searchUser && searchUser !== '' && searchUser === searchType.USER)
    params.append('searchUser', searchUser);
  if (searchPost && searchPost !== '' && searchPost === searchType.POST)
    params.append('searchPost', searchPost);
  if (searchFriends && searchFriends !== '' && searchFriends === searchType.FRIENDS)
    params.append('searchFriends', searchFriends);

  const url = `/search?${params.toString()}`;

  return request({
    method: 'get',
    url,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const sendFriendRequest = (followerId: number) => {
  console.log('receiverId', followerId);

  const accessToken = Cookies.get('access_token');
  let decodedToken;
  if (accessToken) {
    decodedToken = jwtDecode<any>(accessToken);
  }
  return request({
    method: 'post',
    url: '/request',
    data: { userId: followerId, followerId: decodedToken.sub },
    onSuccess: handleSuccess,
    onError: handleError,
  });
};
