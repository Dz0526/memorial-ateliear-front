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
import { NextPageWithLayout } from 'next';
import { useState } from 'react';
import { ChekiCard } from 'shared/components/feed/ChekiCard';
import { mockedChekiProps } from 'shared/components/feed/ChekiProps';
import { Layout } from 'shared/components/layouts/Layout';

const QuestCreate: NextPageWithLayout = () => {
  return (
    <Flex flexDir={'column'} gap={'16px'} p={8} pb={32}>
      <Heading size={'lg'}>新しいクエストをつくる</Heading>
      <Flex flexDir={'column'} gap={'8px'}>
        <Text fontSize={'16px'}>起点となる思い出：</Text>
        <ChekiCard {...mockedChekiProps} transform={'rotate(2deg)'} />
      </Flex>
      <FormControl>
        <FormLabel>クエスト名</FormLabel>
        <Input placeholder='早朝竜泉寺で気持ちよくなる' />
      </FormControl>
      <FormControl>
        <FormLabel>達成条件</FormLabel>
        <Text>おすすめの達成条件：</Text>
        <VStack alignItems={'start'}>
          <Checkbox
            defaultChecked
            variant={'primary'}
            colorScheme='blackScheme'
            size={'xl'}
          >
            同じアングルで写真をとる
          </Checkbox>
          <Checkbox
            defaultChecked
            variant={'primary'}
            size={'xl'}
            colorScheme='blackScheme'
          >
            同じメンバーで写真をとる
          </Checkbox>
          <Checkbox
            defaultChecked
            variant={'primary'}
            size={'xl'}
            colorScheme='blackScheme'
          >
            同じ場所で写真をとる
          </Checkbox>
        </VStack>
      </FormControl>
      <AdditionalAchivementConditionForm />
      <Button variant={'outline'} w={'70%'} alignSelf={'center'}>
        クエストを作成する
      </Button>
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

export default QuestCreate;
