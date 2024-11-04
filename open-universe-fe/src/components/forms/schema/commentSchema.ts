import * as yup from 'yup';

export const createCommentSchema = yup
  .object({
    userId: yup.number().required('Require'),
    postId: yup.number().required('Require'),
    content: yup.string().required('Require'),
    mediaUrl: yup.string(),
  })
  .required();
