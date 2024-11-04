import * as yup from 'yup';

export const signin = yup
  .object({
    username: yup.string().required('You must fill your name'),
    password: yup.string().required('You must fill your password'),
  })
  .required();
