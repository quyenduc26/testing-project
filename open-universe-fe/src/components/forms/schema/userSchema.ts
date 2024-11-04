import { Gender, UserRole } from '@/constants';
import * as yup from 'yup';

const vietnamPhoneNumberRegex = /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-689]|9[0-9])[0-9]{7}$/;

export const creatUserSchema = yup
  .object({
    fullName: yup.string().required('Required'),
    email: yup.string().email('Must be a valid email').required('Required'),
    userName: yup.string().required('Required'),
    password: yup.string().required('Required'),
    dateOfBirth: yup.date().required('Required'),
    phoneNumber: yup
      .string()
      .matches(vietnamPhoneNumberRegex, 'Invalid phone number')
      .required('Required'),
    gender: yup
      .mixed<Gender>()
      .oneOf([Gender.MALE, Gender.FEMALE, Gender.OTHER])
      .required('Gender is required'),
    role: yup
      .mixed<UserRole>()
      .oneOf(Object.values(UserRole).map((e) => e as UserRole))
      .required('Required'),
  })
  .required();
