import { Box, Button, Flex, FlexProps, Icon, Text } from '@chakra-ui/react';
import { NextPageWithLayout } from 'next';
import { Layout } from 'shared/components/layouts/Layout';
import { BackHeader } from 'shared/components/layouts/BackHeader';
import { FaCheckCircle } from 'react-icons/fa';
import { ChekiCard } from 'shared/components/feed/ChekiCard';
import { ChekiImageForm } from 'shared/components/form/ChekiImageForm';
import { Dispatch, SetStateAction, useState } from 'react';
import { createContext } from 'shared/components/utils/react';

type QuestAchivementProgressContext = {
  setPage: Dispatch<SetStateAction<number>>;
  newImgSrc: string;
  setNewImgSrc: Dispatch<SetStateAction<string>>;
};

const [QuestAchivementProgressProvider, useQuestAchivementProgressContext] =
  createContext<QuestAchivementProgressContext>({
    name: 'QuestAchivementProgressContext',
  });

const QuestAchivementProgress: NextPageWithLayout = () => {
  const [page, setPage] = useState(0);
  const [newImgSrc, setNewImgSrc] = useState<string>('');
  return (
    <QuestAchivementProgressProvider
      value={{ setPage, newImgSrc, setNewImgSrc }}
    >
      {page == 0 ? (
        <QuestDetail />
      ) : page == 1 ? (
        <QuestAchivementJudge />
      ) : (
        <></>
      )}
    </QuestAchivementProgressProvider>
  );
};

const QuestDetail = () => {
  const { setPage, newImgSrc, setNewImgSrc } =
    useQuestAchivementProgressContext();
  return (
    <>
      <BackHeader href='/quest' />
      <Flex flexDir={'column'} gap={'32px'} p={4} pb={32}>
        <Box>
          <Text fontSize={'24px'} fontWeight={'semibold'}>
            クエスト
          </Text>
          <Text fontSize={'32px'} fontWeight={'semibold'} pl={4}>
            みんなで集まる
          </Text>
        </Box>
        <Box>
          <Text fontSize={'24px'} fontWeight={'semibold'}>
            達成条件
          </Text>
          <AchivementConditionText text={'思い出のメンバーで集まる'} pl={4} />
          <AchivementConditionText text={'同じアングルの写真をとる'} pl={4} />
        </Box>
        <ChekiImageForm
          imgSrc={newImgSrc}
          onChange={file => {
            setNewImgSrc(URL.createObjectURL(file));
          }}
        />
        <Button
          variant={'outline'}
          w={'70%'}
          alignSelf={'center'}
          isLoading={newImgSrc.length == 0}
          loadingText={'クエストを達成する'}
          spinner={<></>}
          onClick={() => {
            setPage(1);
          }}
        >
          クエストを達成する
        </Button>
        <Flex flexDir={'column'} gap={'8px'}>
          <Text fontSize={'20px'} fontWeight={'semibold'}>
            起点となる思い出
          </Text>
          <ChekiCard transform={'rotate(2deg)'} />
        </Flex>
      </Flex>
    </>
  );
};

const AchivementConditionText = ({
  text,
  ...rest
}: { text: string } & FlexProps) => {
  return (
    <Flex alignItems={'center'} gap={'8px'} {...rest}>
      <Icon as={FaCheckCircle} boxSize={'24px'} color={'black'} />
      <Text fontSize={'20px'} fontWeight={'semibold'}>
        {text}
      </Text>
    </Flex>
  );
};

const QuestAchivementJudge = () => {
  return (
    <>
      <BackHeader href='/quest' />
    </>
  );
};

QuestAchivementProgress.getLayout = page => <Layout>{page}</Layout>;

export default QuestAchivementProgress;
