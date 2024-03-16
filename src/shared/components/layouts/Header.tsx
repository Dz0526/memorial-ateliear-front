import { Avatar, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, Text, DrawerHeader, DrawerOverlay, Flex, HStack, Heading, Spacer, useDisclosure, Stack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authClient } from 'libs/axios/client';
import Link from 'next/link';
import { useRef } from 'react';

type Response = {
  uuid: string;
  screenName: string;
  iconUrl: string;
  linkedUser: {
    username: string;
  }
  memo: string;
}

export const Header = ({
  title,
}: {
  title: string;
  iconSrc?: string;
}) => {

  const { data } = useQuery<Response, AxiosError>({
    queryKey: ['myProfile'],
    queryFn: () =>
      authClient(localStorage.getItem('access-token') as string)
        .get<Response>('/profiles/me')
        .then(res => res.data),
  });

  // Drawer
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  return (

    <>
      <Flex minWidth='max-content' alignItems='center' gap='2' paddingTop='8'>
        <Box>
          <Heading size='lg'>{title}</Heading>
        </Box>
        <Spacer />
        <button ref={btnRef} onClick={onOpen}>
          <Avatar size={'lg'} src={data && `${process.env.NEXT_PUBLIC_STORAGE_ORIGIN}${data.iconUrl}`} />
        </button>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack spacing={4} marginTop={8}>
              <Avatar size={'lg'} src={data && `${process.env.NEXT_PUBLIC_STORAGE_ORIGIN}${data.iconUrl}`} />
              <Text>{data && data.screenName}</Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing={6} paddingTop={4}>
              <Link href={`profile/${data?.uuid}`} passHref>
                <Text fontSize={'lg'}>あなたのプロフィール</Text>
              </Link>
              <Link href={`profiles`} passHref>
                <Text fontSize={'lg'}>プロフィール一覧</Text>
              </Link>
              <Text fontSize={'lg'}>設定</Text>
            </Stack>
          </DrawerBody>

        </DrawerContent>
      </Drawer >
    </>
  )
};
