import * as yup from 'yup';

export const creatPostSchema = yup
  .object({
    user_id: yup.number().required('Require'),
    content: yup.string(),
    mediaUrl: yup.string(),
  })
  .required();
