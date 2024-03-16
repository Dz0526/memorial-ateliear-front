import {
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { NextPageWithLayout } from 'next';
import { ChekiImageForm } from 'shared/components/form/ChekiImageForm';
import { Layout } from 'shared/components/layouts/Layout';
import { MembersSelectionForm } from 'shared/components/form/MembersSelectionForm';
import { RainbowButton } from 'shared/components/RainbowButton';
import {
  CreateImageMemoryArgs,
  useCreateImageForm,
} from 'forms/mutate-memory/create-image-memory';
import { RHFErrorMessage } from 'shared/components/form/RHFErrorMessage';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { authClient, authClientForm } from 'libs/axios/client';

type CreateImageMemoryInput = {
  caption: string;
  timeLabel: string;
  timestamp: string | null;
  members: string[];
  image: File;
  description: string | null;
};

type GetProfilesResponse = {
  profiles: {
    uuid: string;
    screenName: string;
    iconUrl: string | null;
    linkedUser: {
      username: string;
    };
    memo: string;
  }[];
};

const MemoryCreate: NextPageWithLayout = () => {
  const { register, control, handleSubmit, setValue } = useCreateImageForm();
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const { data: profiles } = useQuery<GetProfilesResponse, AxiosError>({
    queryKey: ['profiles'],
    queryFn: () =>
      authClient(localStorage.getItem('access-token') as string)
        .get<GetProfilesResponse>('/profiles/')
        .then(res => res.data),
  });
  const mutation = useMutation({
    mutationFn: (input: FormData) =>
      authClientForm(localStorage.getItem('access-token') as string)
        .post('/image-memories/', input)
        .then(res => res.data),
    onSuccess: data => {
      setServerErrorMessage(
        'サーバでエラーが発生しました。もう一度お試しください。',
      );
    },
    onError: error => {
      setServerErrorMessage(
        'サーバでエラーが発生しました。もう一度お試しください。',
      );
      console.log(error);
    },
  });

  const onSubmit = (args: CreateImageMemoryArgs) => {
    const formData = new FormData();
    const { image, ...rest } = args;
    const value = { ...rest, timestamp: new Date(), description: '' };
    formData.append('image', args.image);
    formData.append('schema', JSON.stringify(value));
    mutation.mutate(formData);
  };

  return (
    <Stack
      spacing={8}
      padding={8}
      paddingBottom={32}
      as={'form'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading size={'lg'}>思い出を投稿する</Heading>
      <ChekiImageForm
        message='思い出の画像を入力'
        imgSrc={imageSrc}
        onChange={file => {
          setImageSrc(URL.createObjectURL(file));
          setValue('image', file);
        }}
      />
      {serverErrorMessage && <Text color={'danger'}>{serverErrorMessage}</Text>}

      {/* caption and time */}
      <FormControl>
        <Stack spacing={6}>
          <Stack>
            <FormLabel>思い出のキャプション</FormLabel>
            <Input
              placeholder='みんなでバンジージャンプ'
              {...register('caption')}
            />
            <RHFErrorMessage name='caption' control={control} />
          </Stack>
          <Stack>
            <FormLabel>思い出のとき</FormLabel>
            <Input placeholder='2023の夏休み' {...register('timeLabel')} />
            <RHFErrorMessage name='timeLabel' control={control} />
          </Stack>
        </Stack>
      </FormControl>

      {/* members selction */}
      <Stack spacing={4}>
        <Text>思い出に参加したメンバーを選択</Text>
        <MembersSelectionForm
          profiles={profiles?.profiles ? profiles.profiles : []}
          onChange={profiles => {
            setValue(
              'members',
              profiles.map(profile => profile.uuid),
            );
          }}
        />
        <RHFErrorMessage name='members' control={control} />
      </Stack>

      <RainbowButton type='submit'>思い出を投稿する</RainbowButton>
    </Stack>
  );
};

MemoryCreate.getLayout = page => <Layout>{page}</Layout>;

export default MemoryCreate;
