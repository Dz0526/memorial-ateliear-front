import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type LoginArgs = {
  username: string;
  password: string;
};

export const loginFormSchema = yup
  .object()
  .required()
  .shape({
    username: yup.string().required('入力は必須です'),
    password: yup.string().required('入力は必須です'),
  });

export const useLoginForm = () => {
  return useForm<LoginArgs>({
    resolver: yupResolver(loginFormSchema),
    mode: 'onChange',
  });
};
