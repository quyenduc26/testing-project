import * as yup from 'yup';

export const updateProfileSchema = yup.object().shape({
  id: yup.number().optional(),
  fullName: yup.string().optional(),
  userName: yup.string().optional(),
  email: yup.string().email().optional(),
  phoneNumber: yup.string().required('Phone number is required'),
  avatar: yup.string().optional(),
});
