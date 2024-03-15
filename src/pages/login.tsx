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
import { LoginArgs, useLoginForm } from 'forms/auth/login';
import { client } from 'libs/axios/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RHFErrorMessage } from 'shared/components/form/RHFErrorMessage';

type LoginInput = {
  username: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  token_type: string;
};

const Login = () => {
  const { register, control, handleSubmit } = useLoginForm();
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const router = useRouter();
  const name = router.query.username;

  const mutation = useMutation({
    mutationFn: (input: LoginInput) =>
      client
        .post<LoginResponse>('/login/access-token', input)
        .then(res => res.data),
    onSuccess: data => {
      setServerErrorMessage('');
      console.log(data);
    },
    onError: error => {
      setServerErrorMessage('ユーザ名かパスワードが間違っています');
      console.log(error);
    },
  });

  const onSubmit = (args: LoginArgs) => {
    mutation.mutate(args);
  };

  return (
    <VStack
      h={'100%'}
      justifyContent={'center'}
      as={'form'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Text fontWeight={'semibold'} fontSize={'24px'}>
        ログイン
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
        <FormLabel>ユーザ名かメールアドレス</FormLabel>
        <Input
          {...register('username')}
          placeholder='mandu'
          defaultValue={name}
          disabled={name != undefined}
        />
        <RHFErrorMessage name='name' control={control} />
      </FormControl>
      <FormControl w={'70%'}>
        <FormLabel>パスワード</FormLabel>
        <Input {...register('password')} type='password' />
        <RHFErrorMessage name='password' control={control} />
      </FormControl>
      <Button variant={'outline'} type='submit'>
        ログイン
      </Button>
    </VStack>
  );
};

export default Login;
