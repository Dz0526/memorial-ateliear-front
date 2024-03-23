import React, { useState } from 'react'
import type * as next from 'next';
import { BackAndKebabHeader } from 'shared/components/layouts/BackAndKebabHeader';
import { Text, VStack, HStack, Heading, Box, Button, Stack, Spinner, Center, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Input, FormLabel, MenuList, Link, MenuItem } from '@chakra-ui/react';
import { FaUserCheck } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { AxiosError } from 'axios';
import { authClient } from 'libs/axios/client';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UpdateProfileArgs } from 'forms/mutate-profile/update-profile';

type ProfileResponse = {
  uuid: string,
  screenName: string,
  iconUrl: string,
  linkedUser: {
    username?: string
  },
  memo: string
}

const Profile: next.NextPageWithLayout = () => {
  const router = useRouter();


  const { data, isLoading, error, refetch } = useQuery<ProfileResponse, AxiosError>({
    queryKey: ['profile', router.query.profileId],
    queryFn: () =>
      authClient(localStorage.getItem('access-token') as string)
        .get<ProfileResponse>(`/profiles/${router.query.profileId}`)
        .then(res => res.data),

  });



  const isLinked = data && data.linkedUser && data.linkedUser.username;

  const { isOpen: isConnectModalOpen, onOpen: onConnectModalOpen, onClose: onConnectModalClose } = useDisclosure();
  const { isOpen: isUnlinkModalOpen, onOpen: onUnlinkModalOpen, onClose: onUnlinkModalClose } = useDisclosure();


  return (
    <>

      <Box paddingBottom={'40'}>

        {/* header menu */}
        <BackAndKebabHeader>
          <MenuList>
            <MenuItem>
              <Link width={'100%'} height={'100%'} href={`${router.query.profileId}/edit`}>
                プロフィールを編集する
              </Link>
            </MenuItem>
            <MenuItem> プロフィールを削除（no implementation）</MenuItem>
          </MenuList>
        </BackAndKebabHeader>

        {/* loading and error on query */}
        {
          isLoading &&
          <Center minHeight={'50vh'}>
            <Spinner size='xl' />
          </Center>

        }
        {
          error && <Text color={'red'}>Error: {error.message}</Text>
        }

        {/* display query data */}
        {data && (
          <Stack spacing={8}>

            {/* icon and name */}
            <VStack paddingTop={8} spacing={'4'}>
              <Avatar src={`${process.env.NEXT_PUBLIC_STORAGE_ORIGIN}${data.iconUrl}`} name={data.screenName} boxSize={'100px'} />
              <Heading size="md">{data.screenName}</Heading>
            </VStack>

            <Stack spacing={4}>
              {/* linked user status */}
              {
                isLinked ? (
                  <HStack justifyContent={'center'}>
                    <Button
                      variant={'ghost'}
                      onClick={onUnlinkModalOpen}
                      leftIcon={<FaUserCheck color='green' size={16} />}
                    >
                      <Text fontWeight={'semibold'}>{data.linkedUser.username}</Text>
                    </Button>
                  </HStack>
                ) : (
                  <HStack justifyContent={'center'}>
                    <Button leftIcon={<FaUserPlus color='gray' size={16} />} size={'sm'} onClick={onConnectModalOpen}>ユーザと紐付ける</Button>
                  </HStack>

                )
              }
            </Stack>

            {/* memo */}
            <Stack spacing={2} paddingX={8} alignSelf={'center'}>
              <Heading size={'sm'} alignSelf={'center'}>メモ</Heading>
              <Text fontSize={'sm'}>{data.memo}</Text>
            </Stack>

          </Stack>
        )}
      </Box>

      {
        data && (
          data.linkedUser !== null
            ? <UnlinkModal data={data} isOpen={isUnlinkModalOpen} onClose={() => { refetch(); onUnlinkModalClose(); }} />
            : <ConnectModal data={data} isOpen={isConnectModalOpen} onClose={() => { refetch(); onConnectModalClose(); }} />
        )
      }



    </>
  );
}

const ConnectModal = (
  { data, isOpen, onClose }: { data: ProfileResponse | undefined, isOpen: boolean, onClose: () => void }
) => {
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const { mutate } = useMutation({
    mutationFn: (input: { linkUserUsername: string; }) =>
      authClient(localStorage.getItem('access-token') as string)
        .patch(`/profiles/${data?.uuid}/link`, input)
        .then(res => res.data),
    onSuccess: () => {
      setSuccessMessage(
        '紐づけに成功しました！'
      );
      setErrorMessage('');
    },
    onError: error => {
      setSuccessMessage('');
      setErrorMessage(
        'エラーが発生しました。もう一度お試しください。',
      );
      console.log(error);
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xs"} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ユーザへの紐づけ</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={'8'}>

            <VStack>
              <Avatar src={`${process.env.NEXT_PUBLIC_STORAGE_ORIGIN}${data?.iconUrl}`} name={data?.screenName} boxSize={'100px'} />
              <Heading size="md">{data?.screenName}</Heading>
            </VStack>

            <VStack>
              <FormLabel htmlFor="username">紐付けるユーザ名</FormLabel>
              <Input id="username" onChange={(e) => { setUsername(e.target.value) }} />
              <Button onClick={() => {
                mutate({ linkUserUsername: username });
              }}>つなげる</Button>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Text hidden>紐付けるユーザ名を入力し、「つなげる」を押してください</Text>
          {
            errorMessage !== '' && <Text color={'red.400'}>{errorMessage}</Text>
          }
          {
            successMessage !== '' && <Text color={'green'}>{successMessage}</Text>
          }
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

const UnlinkModal = (
  { data, isOpen, onClose }: { data: ProfileResponse | undefined, isOpen: boolean, onClose: () => void }
) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: () => {

      if (!data) return Promise.reject('data is not found');

      const requestBody: UpdateProfileArgs = {
        screen_name: data.screenName,
        memo: data?.memo,
        link_user_username: null // overwrite linked user to null
      }

      return authClient(localStorage.getItem('access-token') as string)
        .put(`/profiles/${data.uuid}`, requestBody)
        .then(res => res.data)
    },
    onSuccess: () => {
      setErrorMessage('');
      setSuccessMessage('紐づけを解除しました。')
    },
    onError: error => {
      setErrorMessage('更新に失敗しました。');
      console.log(error);
    },
  });


  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xs"} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>紐づけを解除しますか？</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={'8'}>

            <HStack spacing={'4'}>
              <Avatar src={`${process.env.NEXT_PUBLIC_STORAGE_ORIGIN}${data?.iconUrl}`} name={data?.screenName} size={'md'} />
              <Heading size="md">{data?.screenName}</Heading>
            </HStack>

            <VStack>
              <Text>現在紐付いているユーザ：</Text>
              <Text fontWeight={'bold'}>{data?.linkedUser.username}</Text>
            </VStack>

            <Button
              colorScheme='red' // means danger
              disabled={isPending}
              onClick={() => {
                mutate();
              }}>つながりを解除</Button>
          </VStack>
        </ModalBody>

        <ModalFooter>
          {
            errorMessage !== '' && <Text color={'red.400'}>{errorMessage}</Text>
          }
          {
            successMessage !== '' && <Text color={'green'}>{successMessage}</Text>
          }
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

export default Profile;
