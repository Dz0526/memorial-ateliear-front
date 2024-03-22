
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type UpdateProfileArgs = {
  screen_name: string;
  memo?: string;
  linked_user_uuid?: string | null;
};

export const editProfileFormSchema = yup
  .object()
  .required()
  .shape({
    screen_name: yup.string().required('入力は必須です'),
    memo: yup.string().transform((value, original) => (original === null ? '':value)),
    // not using in form
    linked_user_uuid: yup.string().nullable(),
  });

export const useUpdateProfileForm = () => {
  return useForm<UpdateProfileArgs>({
    resolver: yupResolver(editProfileFormSchema),
    mode: 'onChange',
  });
};
