import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type CreateImageMemoryArgs = {
  caption: string;
  timeLabel: string;
  timestamp: string | null;
  members: string[];
  description: string | null;
  image: any;
};

export const createImageMemorySchema = yup.object().shape({
  caption: yup.string().required('入力は必須です'),
  timeLabel: yup
    .string()
    .required('入力は必須です')
    .max(30, '30文字以内の入力にしてください'),
  timestamp: yup.string().required().nullable(),
  members: yup.array(yup.string().required()).required('メンバーが必要です'),
  description: yup.string().required().nullable(),
  image: yup.mixed().required('画像は必須項目です'),
});

export const useCreateImageForm = () => {
  return useForm<CreateImageMemoryArgs>({
    resolver: yupResolver(createImageMemorySchema),
    mode: 'onChange',
    defaultValues: { timestamp: null, description: null },
  });
};
