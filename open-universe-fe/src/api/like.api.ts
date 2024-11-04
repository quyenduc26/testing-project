import { LikePayload } from '@/types/Like';
import request from '@/utils/request';
import { QueryClient } from '@tanstack/react-query';

const handleSuccess = (data: any) => {
  console.log('data success', data);
};

const handleError = (error: any) => {
  console.log('error', error);
};

export const postLike = async (data: LikePayload, queryClient: QueryClient) => {
  return await request({
    method: 'post',
    url: '/like',
    data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] });
    },
    onError: handleError,
  });
};

export const getLikes = async () => {
  return await request({
    method: 'get',
    url: '/like',
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const deleteLike = async (postId: number, userId: number, queryClient: QueryClient) => {
  return await request({
    method: 'delete',
    url: `/like/${postId}/${userId}`,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] });
    },
    onError: handleError,
  });
};
