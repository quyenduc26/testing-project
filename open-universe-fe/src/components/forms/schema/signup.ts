import * as yup from 'yup';

export const signup = yup
  .object({
    userName: yup.string().required('You must fill your user name'),
    fullName: yup.string().required('You must fill your full name'),
    email: yup.string().required('You must fill your email'),
    password: yup.string().required('You must fill your password'),
  })
  .required();
