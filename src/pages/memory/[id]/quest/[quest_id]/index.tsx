import {
  Box,
  Button,
  Checkbox,
  Flex,
  FlexProps,
  FormControl,
  FormLabel,
  Icon,
  Text,
  VStack,
  keyframes,
} from '@chakra-ui/react';
import { NextPageWithLayout } from 'next';
import { Layout } from 'shared/components/layouts/Layout';
import { BackHeader } from 'shared/components/layouts/BackHeader';
import { FaCheckCircle } from 'react-icons/fa';
import { ChekiCard } from 'shared/components/feed/ChekiCard';
import { ChekiImageForm } from 'shared/components/form/ChekiImageForm';
import { mockedChekiProps } from 'shared/components/feed/ChekiProps';
import { Dispatch, SetStateAction, useState } from 'react';
import { createContext } from 'shared/components/utils/react';
import { MiniChekiCard } from 'shared/components/quest/achive/ChekiCard';
import { motion } from 'framer-motion';
import { BsLadder } from 'react-icons/bs';
import { Player } from '@lottiefiles/react-lottie-player';

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
          message=''
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
          <ChekiCard {...mockedChekiProps} transform={'rotate(2deg)'} />
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

const animationKeyframesPrev = keyframes`
0% {opacity: 1}
25% {opacity: 0.6}
50% {opacity: 0}
75% {opacity: 1}
100% {opacity: 1}
`;

const animationKeyframesNext = keyframes`
0% {opacity: 0; top: 0}
25% {opacity: 0.5; top: 0}
50% {opacity: 1; top: 0}
75% {opacity: 1; top: 25}
100% {opacity: 1; top: 50}
`;

const animationPrev = `${animationKeyframesPrev} 7s linear`;
const animationNext = `${animationKeyframesNext} 7s linear`;

const QuestAchivementJudge = () => {
  const [checked, setChecked] = useState([false, false]);
  return (
    <>
      <BackHeader href='/quest' />
      <Flex flexDir={'column'} gap={'16px'} p={4} pb={32} height={'100%'}>
        <Box>
          <Text fontSize={'16px'} fontWeight={'semibold'}>
            クエスト
          </Text>
          <Text fontSize={'20px'} fontWeight={'semibold'} pl={4}>
            みんなで集まる
          </Text>
        </Box>
        {/* <Box>
          <Text fontSize={'24px'} fontWeight={'semibold'}>
            達成条件
          </Text>
          <AchivementConditionText text={'思い出のメンバーで集まる'} pl={4} />
          <AchivementConditionText text={'同じアングルの写真をとる'} pl={4} />
        </Box> */}
        <FormControl>
          <FormLabel>達成条件</FormLabel>
          <VStack alignItems={'start'}>
            <Checkbox
              variant={'primary'}
              colorScheme='blackScheme'
              size={'md'}
              onChange={() => {
                const copyChecked = checked.slice();
                copyChecked[0] = true;
                setChecked(copyChecked);
              }}
            >
              同じアングルで写真をとる
            </Checkbox>
            <Checkbox
              variant={'primary'}
              size={'md'}
              colorScheme='blackScheme'
              onChange={() => {
                const copyChecked = checked.slice();
                copyChecked[1] = true;
                setChecked(copyChecked);
              }}
            >
              同じメンバーで写真をとる
            </Checkbox>
          </VStack>
        </FormControl>
        <Flex
          flexDir={'column'}
          gap={'8px'}
          alignItems={'center'}
          position={'relative'}
          flexGrow={1}
        >
          <MiniChekiCard
            maxW={'200px'}
            imageUrl={'https://i.postimg.cc/Gt8cbL7B/image-10.png'}
            zIndex={1}
            as={motion.div}
            animation={animationPrev}
          />
          <MiniChekiCard
            maxW={'200px'}
            position={'absolute'}
            top={220}
            imageUrl={'https://i.postimg.cc/7L9PVQJL/image-9.png'}
            as={motion.div}
            animation={animationNext}
          />
          <motion.div
            style={{ opacity: checked.every(v => v) ? 1 : 0 }}
            transition={{ duration: 7 }}
            animate={{ opacity: checked.every(v => v) ? 1 : 0 }}
          >
            <Icon as={BsLadder} boxSize={'64px'} color={'#A0522D'} />
          </motion.div>
          <Box
            position={'absolute'}
            bottom={0}
            opacity={checked.every(v => v) ? 1 : 0}
            zIndex={3}
          >
            <Player
              autoplay
              loop
              src={
                'https://lottie.host/4efa31c8-b314-4822-aa30-a1b0ea7fab8d/RHoo0hjnk6.json'
              }
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

QuestAchivementProgress.getLayout = page => <Layout>{page}</Layout>;

export default QuestAchivementProgress;
