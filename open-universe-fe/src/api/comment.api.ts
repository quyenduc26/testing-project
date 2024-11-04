import { CommentAdminUpdatePayload, CommentPayload } from '@/types';
import request from '@/utils/request';

export const postComment = async (data: CommentPayload) => {
  await request({
    method: 'post',
    url: '/comments',
    data,
  });
};

export const getAllComments = async () => {
  return await request({
    method: 'get',
    url: `/comments`,
  });
};

export const getComments = async (postId: number) => {
  return await request({
    method: 'get',
    url: `/comments?postId=${postId}`,
  });
};

export const updateComment = (data: CommentAdminUpdatePayload) => {
  return request({
    method: 'patch',
    url: `/comments/${data.id}`,
  });
};
