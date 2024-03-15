import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { SignupArgs, useSignupForm } from 'forms/auth/signup';
import { client } from 'libs/axios/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RHFErrorMessage } from 'shared/components/form/RHFErrorMessage';

type CreateUserInput = {
  username: string;
  email: string;
  password: string;
};

type CreateUserResponse = {
  username: string;
};

const Signup = () => {
  const { register, control, handleSubmit } = useSignupForm();
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (input: CreateUserInput) =>
      client.post<CreateUserResponse>('/users/', input).then(res => res.data),
    onSuccess: data => {
      setServerErrorMessage('');
      router.push({ pathname: '/login', query: { username: data.username } });
    },
    onError: error => {
      console.log(error);
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status == 409
      ) {
        setServerErrorMessage('ユーザ名かメールアドレスが使われています。');
      } else {
        setServerErrorMessage('エラーが発生しました。もう一度試してください。');
      }
    },
  });

  const onSubmit = (value: SignupArgs) => {
    const { verificationPassword, ...rest } = value;
    mutation.mutate(rest);
  };

  return (
    <VStack
      h={'100%'}
      justifyContent={'center'}
      as={'form'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Text fontWeight={'semibold'} fontSize={'24px'}>
        新規登録
      </Text>
      <Player
        autoplay
        loop
        src={
          'https://lottie.host/7887bf2f-b082-43b0-9dd2-168c415d8602/UiefVnvnN6.json'
        }
      />
      {serverErrorMessage && <Text color={'danger'}>{serverErrorMessage}</Text>}
      <FormControl w={'70%'}>
        <FormLabel>ユーザ名</FormLabel>
        <Input {...register('username')} placeholder='mandu' />
        <RHFErrorMessage name='name' control={control} />
      </FormControl>
      <FormControl w={'70%'}>
        <FormLabel>メールアドレス</FormLabel>
        <Input
          {...register('email')}
          placeholder='example@gmail.com'
          type='email'
        />
        <RHFErrorMessage name='email' control={control} />
      </FormControl>
      <FormControl w={'70%'}>
        <FormLabel>パスワード</FormLabel>
        <Input {...register('password')} type='password' />
        <RHFErrorMessage name='password' control={control} />
      </FormControl>
      <FormControl w={'70%'}>
        <FormLabel>確認パスワード</FormLabel>
        <Input {...register('verificationPassword')} type='password' />
        <RHFErrorMessage name='verificationPassword' control={control} />
      </FormControl>
      <Button variant={'outline'} type='submit'>
        登録
      </Button>
    </VStack>
  );
};

export default Signup;
