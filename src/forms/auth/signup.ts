import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type SignupArgs = {
  username: string;
  email: string;
  password: string;
  verificationPassword: string;
};

export const signupFormSchema = yup
  .object()
  .required()
  .shape({
    username: yup.string().required('入力は必須です'),
    email: yup
      .string()
      .required('入力は必須です')
      .email('メールアドレスの形式が不正です'),
    password: yup
      .string()
      .required('入力は必須です')
      .matches(
        /^(?=.*?[a-z])(?=.*?\d)/,
        ' パスワードは半角英数字を組み合わせて入力してください',
      ),
    verificationPassword: yup
      .string()
      .required('入力必須です')
      .oneOf([yup.ref('password')], 'パスワードが一致しません'),
  });

export const useSignupForm = () => {
  return useForm<SignupArgs>({
    resolver: yupResolver(signupFormSchema),
    mode: 'onChange',
  });
};
