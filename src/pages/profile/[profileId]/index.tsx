import React, { useState } from 'react'
import { Layout } from 'shared/components/layouts/Layout';
import type * as next from 'next';
import { BackAndKebabHeader } from 'shared/components/layouts/BackAndKebabHeader';
import { Text, VStack, HStack, Heading, Box, Button, Stack, Spinner, Center, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Input, FormLabel, MenuList, Link, MenuItem } from '@chakra-ui/react';
import { FaUserCheck } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { AxiosError } from 'axios';
import { authClient } from 'libs/axios/client';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';

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

  const { isOpen: isConnectModalOpen, onOpen: onConnectModalOpen, onClose: onConnectModalClose } = useDisclosure()


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
                    <FaUserCheck color='green' size={16} />
                    <Text fontWeight={'semibold'}>{data.linkedUser.username}</Text>
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
      <ConnectModal data={data} isOpen={isConnectModalOpen} onClose={() => { refetch(); onConnectModalClose(); }} />



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

Profile.getLayout = page => <Layout>{page}</Layout>;
export default Profile;
