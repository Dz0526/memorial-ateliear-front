import { Box, Text, HStack, Heading, Spacer, Center, Button, Stack, FormControl, FormLabel, Input, Textarea, Spinner } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UpdateProfileArgs, useUpdateProfileForm } from "forms/mutate-profile/update-profile";
import { authClient } from "libs/axios/client";
import { NextPageWithLayout } from "next"
import { useRouter } from "next/router";
import { useState } from "react";
import { RHFErrorMessage } from "shared/components/form/RHFErrorMessage";

type ProfileResponse = {
  uuid: string,
  screenName: string,
  iconUrl: string,
  linkedUser: {
    username?: string
  },
  memo: string
}

// スクリーンネームとメモを更新するフォーム
// リンクユーザの情報は更新しない
const ProfileEdit: NextPageWithLayout = () => {
  const router = useRouter();
  // fixme: Is assertion needed?
  const profileId = router.query.profileId as string;

  const { register, control, handleSubmit } = useUpdateProfileForm();
  const [mutationErrorMessage, setMutationErrorMessage] = useState('');

  // profile data fetching
  const { data, isLoading, } = useQuery<ProfileResponse, AxiosError>({
    queryKey: ['profile', router.query.profileId],
    queryFn: () =>
      authClient(localStorage.getItem('access-token') as string)
        .get<ProfileResponse>(`/profiles/${profileId}`)
        .then(res => res.data),
  });

  const isLinked = data && data.linkedUser && data.linkedUser.username;

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: UpdateProfileArgs) => {

      // リンクユーザの情報を更新しない
      if (isLinked) {
        formData.link_user_username = data.linkedUser.username;
      } else {
        formData.link_user_username = null;
      }

      return authClient(localStorage.getItem('access-token') as string)
        .put(`/profiles/${profileId}`, formData)
        .then(res => res.data)
    },
    onSuccess: () => {
      setMutationErrorMessage('');
      router.push(`/profile/${profileId}`);
    },
    onError: error => {
      setMutationErrorMessage('更新に失敗しました。');
      console.log(error);
    },
  });

  return (
    <Box
      paddingBottom={'40'}
      as={'form'}
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <HStack paddingX={'4'} paddingY={'4'}>
        <Button onClick={() => { router.back() }} variant={'ghost'}>キャンセル</Button>
        <Spacer />
        <Button type="submit" disabled={isPending} colorScheme="blue" width={'30%'}>
          {isPending
            ? <Spinner />
            : "保存する"
          }
        </Button>
      </HStack>
      <Center paddingY={'4'}>
        <Stack>

          <Center paddingY={'8'}>
            <Heading as={'h2'} size={'md'}>プロフィールを編集</Heading>
          </Center>

          {!data || isLoading
            ? (<Center>
              <Spinner />
            </Center>)
            : (
              <Stack>

                {mutationErrorMessage && <Text color={'danger'}>{mutationErrorMessage}</Text>}
                <FormControl>
                  <FormLabel>表示名</FormLabel>
                  <Input
                    {...register('screen_name')}
                    defaultValue={data.screenName}
                  />
                  <RHFErrorMessage name='screenName' control={control} />
                </FormControl>
                <FormControl>
                  <FormLabel>メモ</FormLabel>
                  <Textarea
                    {...register('memo')}
                    defaultValue={data.memo}
                  />
                  <RHFErrorMessage name='memo' control={control} />
                </FormControl>

              </Stack>
            )}
        </Stack>
      </Center>
    </Box >
  )
}

export default ProfileEdit
