import { PostAdminUpdatePayload, PostPayload } from '@/types';
import request from '@/utils/request';

const handleSuccess = (data: any) => {
  console.log('data success', data);
};

const handleError = (error: any) => {
  console.log('error', error);
};

export const postPost = async (data: PostPayload) => {
  await request({
    method: 'post',
    url: '/posts',
    data,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const getPosts = async () => {
  return await request({
    method: 'get',
    url: '/posts',
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const updatePost = (data: PostAdminUpdatePayload) => {
  return request({
    method: 'patch',
    url: `/posts/${data.id}`,
    data,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const deletePost = (data: PostAdminUpdatePayload) => {
  return request({
    method: 'patch',
    data,
    url: `/posts/${data}`,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const getUserPosts = async (id: number) => {
  return await request({
    method: 'get',
    url: `/posts/user/${id}`,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};
