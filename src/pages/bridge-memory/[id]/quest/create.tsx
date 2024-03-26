import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { GetServerSideProps, NextPageWithLayout } from 'next';
import { useState } from 'react';
import { Layout } from 'shared/components/layouts/Layout';
import { AxiosError } from 'axios';
import { getAuthorizationProps } from 'middleware/getAuthorizationProps';
import { useQuery, useMutation } from '@tanstack/react-query';
import { QuestAchievedMemory } from 'pages/feed';
import { useRouter } from 'next/router';
import { authClient } from 'libs/axios/client';
import { RainbowButton } from 'shared/components/RainbowButton';
import {
  CreateBridgeArgs,
  useCreateBridgeForm,
} from 'forms/mutate-bridge/create-bridge';
import { RHFErrorMessage } from 'shared/components/form/RHFErrorMessage';
import { ChekiCardForBridgeNodeMemory } from 'shared/components/feed/ChekiCardForBridgeNodeMemory';

type CreateBridgeInput = {
  name: string;
  originMemoryUuid: string;
  requirementUuids: string[];
};

type SuggestBridgeRequirements = {
  uuid: string;
  detail: string;
};

const QuestCreate: NextPageWithLayout = () => {
  const router = useRouter();
  const uuid = router.query.id;
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const { register, setValue, control, getValues, handleSubmit } =
    useCreateBridgeForm();

  const { data: memoryDetail } = useQuery<QuestAchievedMemory, AxiosError>({
    queryKey: [`quest-achievement-memories-${uuid}`],
    queryFn: () =>
      authClient(localStorage.getItem('access-token') as string)
        .get<QuestAchievedMemory>(`/quest-achievement-memories/${uuid}`)
        .then(res => res.data),
    enabled: !!uuid,
  });

  const { data: bridgeRequirements } = useQuery<
    SuggestBridgeRequirements[],
    AxiosError
  >({
    queryKey: ['suggest-quest-requirements'],
    queryFn: () =>
      authClient(localStorage.getItem('access-token') as string)
        .get<SuggestBridgeRequirements[]>('/quest-requirements/suggest')
        .then(res => res.data),
  });

  const mutation = useMutation({
    mutationFn: (input: CreateBridgeInput) =>
      authClient(localStorage.getItem('access-token') as string)
        .post('/quests/', input)
        .then(res => res.data),
    onSuccess: data => {
      setServerErrorMessage('');
      router.push('/quest');
    },
    onError: error => {
      setServerErrorMessage(
        'サーバでエラーが発生しました。もう一度お試しください。',
      );
      console.log(error);
    },
  });

  const onSbumit = (args: CreateBridgeArgs) => {
    memoryDetail &&
      mutation.mutate({ ...args, originMemoryUuid: memoryDetail?.uuid });
  };

  return (
    <Flex
      flexDir={'column'}
      gap={'16px'}
      p={8}
      pb={32}
      as={'form'}
      onSubmit={handleSubmit(onSbumit)}
    >
      <Heading size={'lg'}>新しいクエストをつくる</Heading>
      <Flex flexDir={'column'} gap={'8px'}>
        <Text fontSize={'16px'}>起点となる思い出：</Text>
        {memoryDetail && (
          <ChekiCardForBridgeNodeMemory
            {...memoryDetail}
            transform={'rotate(2deg)'}
          />
        )}
      </Flex>
      {serverErrorMessage && <Text color={'danger'}>{serverErrorMessage}</Text>}
      <FormControl>
        <FormLabel>クエスト名</FormLabel>
        <Input placeholder='早朝竜泉寺で気持ちよくなる' {...register('name')} />
        <RHFErrorMessage name='name' control={control} />
      </FormControl>
      <FormControl>
        <FormLabel>達成条件</FormLabel>
        <Text>おすすめの達成条件：</Text>
        <VStack alignItems={'start'}>
          {bridgeRequirements &&
            bridgeRequirements.map(bridgeRequirement => (
              <Checkbox
                key={bridgeRequirement.uuid}
                variant={'primary'}
                colorScheme='blackScheme'
                size={'xl'}
                value={bridgeRequirement.uuid}
                onChange={e => {
                  if (e.target.checked) {
                    setValue('requirementUuids', [
                      ...getValues('requirementUuids'),
                      e.target.value,
                    ]);
                  } else {
                    setValue(
                      'requirementUuids',
                      getValues('requirementUuids').filter(
                        uuid => uuid != e.target.value,
                      ),
                    );
                  }
                }}
              >
                {bridgeRequirement.detail}
              </Checkbox>
            ))}
        </VStack>
        <RHFErrorMessage name='requirementUUids' control={control} />
      </FormControl>
      <AdditionalAchivementConditionForm />
      <RainbowButton variant={'outline'} alignSelf={'center'} type='submit'>
        クエストを作成する
      </RainbowButton>
    </Flex>
  );
};

const AdditionalAchivementConditionForm = () => {
  const [achivementCondition, setAchivementCondition] = useState('');
  const [achivementConditions, setAchivementConditions] = useState<string[]>(
    [],
  );
  return (
    <>
      <FormControl>
        <Text>さらに追加する</Text>
        <Flex gap='8px'>
          <Input
            placeholder=''
            value={achivementCondition}
            onChange={e => setAchivementCondition(e.target.value)}
          />
          <Button
            onClick={() => {
              if (achivementCondition.length != 0) {
                setAchivementConditions(value => [
                  ...value,
                  achivementCondition,
                ]);
              }
              setAchivementCondition('');
            }}
          >
            追加
          </Button>
        </Flex>
      </FormControl>
      {achivementConditions.map((achivementCondition, index) => (
        <Flex key={achivementCondition} gap={'8px'}>
          <Text
            fontWeight={'bold'}
            fontSize={'lg'}
            borderBottom={'2px'}
            borderColor={'black'}
          >
            {achivementCondition}
          </Text>
          <Button
            onClick={() => {
              setAchivementConditions(
                achivementConditions.filter((_, i) => i != index),
              );
            }}
            variant={'danger'}
          >
            削除
          </Button>
        </Flex>
      ))}
    </>
  );
};

QuestCreate.getLayout = page => <Layout>{page}</Layout>;

export const getServerSideProps: GetServerSideProps = getAuthorizationProps;
export default QuestCreate;
