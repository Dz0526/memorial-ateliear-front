import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type CreateBridgeArgs = {
  name: string;
  requirementUuids: string[];
};

export const createBridgeSchema = yup.object().shape({
  name: yup.string().required('入力は必須です'),
  requirementUuids: yup
    .array(yup.string().required())
    .required('一つ以上の達成条件が必要です'),
});

export const useCreateBridgeForm = () => {
  return useForm<CreateBridgeArgs>({
    resolver: yupResolver(createBridgeSchema),
    mode: 'onChange',
    defaultValues: { requirementUuids: [] },
  });
};
