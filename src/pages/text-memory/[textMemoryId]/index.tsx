import { Text, HStack, Heading, Box, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { authClient } from "libs/axios/client";
import { getAuthorizationProps } from "middleware/getAuthorizationProps";
import { GetServerSideProps, NextPageWithLayout } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { TextMemory } from "pages/feed";
import { RainbowButton } from "shared/components/RainbowButton";
import { UserCardBanner } from "shared/components/feed/UserCardBanner";
import { BackAndKebabHeader } from "shared/components/layouts/BackAndKebabHeader";
import { Layout } from "shared/components/layouts/Layout";

const TextMemoryDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const uuid = router.query.textMemoryId as string;

  const { data } = useQuery<TextMemory, AxiosError>({
    queryKey: [`memory-detail-${uuid}`],
    queryFn: () =>
      authClient(localStorage.getItem('access-token') as string)
        .get<TextMemory>(`/text-memories/${uuid}`)
        .then(res => res.data),
    enabled: !!uuid,
  });

  return (
    <Box paddingBottom={'40'}>
      <BackAndKebabHeader />
      {data && (
        <>
          <Stack spacing={'8'} paddingX={'4'} marginTop={'4'}>
            {/* title and when */}
            <Stack>
              <Heading variant={'handwriting'} size={'lg'}>
                {data.title}
              </Heading>
              <HStack alignItems={'end'} spacing={'1'}>
                <Text
                  variant={'handwriting'}
                  fontSize={'sm'}
                  fontWeight={'bold'}
                >
                  {data.timeLabel}
                </Text>
                <Text variant={'handwriting'} fontSize={'sm'}>
                  の思い出
                </Text>
              </HStack>
            </Stack>

            <Stack width={'90%'} alignSelf={'center'}>
              <Text>{data.content}</Text>
            </Stack>

            {/* members */}
            <Stack spacing={4}>
              <Heading size={'sm'}>思い出のメンバー</Heading>
              <Stack spacing={4} paddingLeft={2}>
                {data.members.map(member => (
                  <UserCardBanner
                    key={member.uuid}
                    {...member}
                    iconImageUrl={member.iconUrl ? `${process.env.NEXT_PUBLIC_STORAGE_ORIGIN}${member.iconUrl}` : ''}
                  />
                ))}
              </Stack>
            </Stack>

            <RainbowButton>
              <Link href={`/memory/${data?.uuid}/quest/create`} passHref>
                この思い出からクエストを作成する
              </Link>
            </RainbowButton>
          </Stack>
        </>
      )}
    </Box>
  );
}
TextMemoryDetail.getLayout = page => <Layout>{page}</Layout>;

export const getServerSideProps: GetServerSideProps =
  getAuthorizationProps;

export default TextMemoryDetail