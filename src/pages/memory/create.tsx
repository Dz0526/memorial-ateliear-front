import { Heading, Stack, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { NextPageWithLayout } from 'next';
import { ChekiImageForm } from 'shared/components/form/ChekiImageForm';
import { Layout } from 'shared/components/layouts/Layout';
import { MembersSelectionForm } from 'shared/components/form/MembersSelectionForm';
import { RainbowButton } from 'shared/components/RainbowButton';


const MemoryCreate: NextPageWithLayout = () => {
  return (
    <Stack spacing={8} padding={8} paddingBottom={32}>
      <Heading size={'lg'}>思い出を投稿する</Heading>
      <ChekiImageForm message='思い出の画像を入力' />

      {/* caption and time */}
      <FormControl>
        <Stack spacing={6}>
          <Stack>
            <FormLabel>思い出のキャプション</FormLabel>
            <Input placeholder='みんなでバンジージャンプ' />
          </Stack>
          <Stack>
            <FormLabel>思い出のとき</FormLabel>
            <Input placeholder='2023の夏休み' />
          </Stack>
        </Stack>
      </FormControl>

      {/* members selction */}
      <Stack spacing={4}>
        <Text>思い出に参加したメンバーを選択</Text>
        <MembersSelectionForm />
      </Stack>

      <RainbowButton>思い出を投稿する</RainbowButton>

    </Stack >
  );
};

MemoryCreate.getLayout = page => <Layout>{page}</Layout>;

export default MemoryCreate;


