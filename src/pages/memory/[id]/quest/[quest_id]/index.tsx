import {
  Box,
  Button,
  Checkbox,
  Flex,
  FlexProps,
  FormControl,
  Icon,
  Text,
  VStack,
  keyframes,
} from '@chakra-ui/react';
import { NextPageWithLayout } from 'next';
import { Layout } from 'shared/components/layouts/Layout';
import { BackHeader } from 'shared/components/layouts/BackHeader';
import { FaCheckCircle } from 'react-icons/fa';
import { ChekiImageForm } from 'shared/components/form/ChekiImageForm';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createContext } from 'shared/components/utils/react';
import { MiniChekiCard } from 'shared/components/quest/achive/ChekiCard';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { Rainbow } from 'shared/components/feed/bridge/Rainbow';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { authClient, authClientForm } from 'libs/axios/client';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Bridge } from 'pages/quest';
import { ChekiCard } from 'shared/components/feed/ChekiCard';

type QuestAchivementProgressContext = {
  setPage: Dispatch<SetStateAction<number>>;
  newImgSrc: string;
  setNewImgSrc: Dispatch<SetStateAction<string>>;
  quest: Bridge;
  ref: MutableRefObject<File | undefined>;
};

const [QuestAchivementProgressProvider, useQuestAchivementProgressContext] =
  createContext<QuestAchivementProgressContext>({
    name: 'QuestAchivementProgressContext',
  });

const QuestAchivementProgress: NextPageWithLayout = () => {
  const ref = useRef<File>();
  const [page, setPage] = useState(0);
  const [newImgSrc, setNewImgSrc] = useState<string>('');
  const router = useRouter();
  const quest_uuid = router.query.quest_id;
  const { data: quest } = useQuery<Bridge, AxiosError>({
    queryKey: [`quet-detail-${quest_uuid}`],
    queryFn: () =>
      authClient(localStorage.getItem('access-token') as string)
        .get<Bridge>(`/bridges/${quest_uuid}`)
        .then(res => res.data),
    enabled: !!quest_uuid,
  });
  return quest ? (
    <QuestAchivementProgressProvider
      value={{ setPage, newImgSrc, setNewImgSrc, quest, ref }}
    >
      {page == 0 ? (
        <QuestDetail />
      ) : page == 1 ? (
        <QuestAchivementJudge />
      ) : (
        <></>
      )}
    </QuestAchivementProgressProvider>
  ) : (
    <></>
  );
};

const QuestDetail = () => {
  const { setPage, newImgSrc, setNewImgSrc, quest, ref } =
    useQuestAchivementProgressContext();
  return (
    <>
      <BackHeader href='/quest' />
      {quest.originMemory.memoryType == 'image-memory' && (
        <Flex flexDir={'column'} gap={'32px'} p={4} pb={32}>
          <Box>
            <Text fontSize={'24px'} fontWeight={'semibold'}>
              クエスト
            </Text>
            <Text fontSize={'32px'} fontWeight={'semibold'} pl={4}>
              {quest.name}
            </Text>
          </Box>
          <Box>
            <Text fontSize={'24px'} fontWeight={'semibold'}>
              達成条件
            </Text>
            {quest.requirements.map(requiremnt => (
              <AchivementConditionText
                key={requiremnt.uuid}
                text={requiremnt.detail}
                pl={4}
              />
            ))}
          </Box>
          <ChekiImageForm
            message='画像を選択する'
            imgSrc={newImgSrc}
            onChange={file => {
              console.log(file);
              ref.current = file;
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
            <ChekiCard {...quest.originMemory} transform={'rotate(2deg)'} />
          </Flex>
        </Flex>
      )}
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

const animationPrev = `${animationKeyframesPrev} 4s linear`;
const animationNext = `${animationKeyframesNext} 4s linear`;

type CreateBridgeNodeMemoryInput = {
  bridgeUuid: string;
  text: string;
  achievedRequirementUuids: string[];
  memberUuids: string[];
  timeLabel: string;
  timestamp: Date;
  description: string;
};

const QuestAchivementJudge = () => {
  const [success, setSuccess] = useState(false);
  const { newImgSrc, quest, ref } = useQuestAchivementProgressContext();
  const [checked, setChecked] = useState(
    [...Array(quest.requirements.length)].map(() => false),
  );
  const mutation = useMutation({
    mutationFn: (input: FormData) =>
      authClientForm(localStorage.getItem('access-token') as string)
        .post('/bridge-node-memories/', input)
        .then(res => res.data),
    onSuccess: data => {
      console.log(data);
      setSuccess(true);
    },
    onError: error => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (ref.current && checked.every(check => check == true)) {
      console.log(ref.current);
      const schema: CreateBridgeNodeMemoryInput = {
        bridgeUuid: quest.uuid,
        text: `${quest.name}達成`,
        achievedRequirementUuids: quest.requirements.map(
          requirement => requirement.uuid,
        ),
        memberUuids: quest.originMemory.members.map(member => member.uuid),
        timeLabel: new Date().getFullYear().toString(),
        timestamp: new Date(),
        description: '',
      };
      const formData = new FormData();
      formData.append('image', ref.current);
      formData.append('schema', JSON.stringify(schema));
      mutation.mutate(formData);
    }
  }, [checked]);
  return (
    <>
      <BackHeader href='/quest' />
      <Flex flexDir={'column'} gap={'16px'} p={4} pb={32} height={'100%'}>
        <Box>
          {/* <Text fontSize={'16px'} fontWeight={'semibold'}>
            クエスト
          </Text> */}
          <Text fontSize={'20px'} fontWeight={'semibold'} pl={4}>
            {quest.name}
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
          {/* <FormLabel>達成条件</FormLabel> */}
          <VStack alignItems={'start'}>
            {quest.requirements.map((requirement, index) => (
              <Checkbox
                key={requirement.uuid}
                variant={'primary'}
                colorScheme='blackScheme'
                size={'md'}
                onChange={e => {
                  if (e.target.checked) {
                    const copyChecked = checked.slice();
                    copyChecked[index] = true;
                    setChecked(copyChecked);
                  } else {
                    const copyChecked = checked.slice();
                    copyChecked[index] = false;
                    setChecked(copyChecked);
                  }
                }}
              >
                {requirement.detail}
              </Checkbox>
            ))}
            {/* <Checkbox
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
            </Checkbox> */}
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
            maxW={'270px'}
            imageUrl={
              process.env.NEXT_PUBLIC_STORAGE_ORIGIN +
              (quest.originMemory.memoryType == 'image-memory'
                ? quest.originMemory.imageUrl
                : '')
            }
            zIndex={1}
            as={motion.div}
            animation={animationPrev}
          />
          <MiniChekiCard
            maxW={'270px'}
            position={'absolute'}
            top={250}
            imageUrl={newImgSrc}
            as={motion.div}
            animation={animationNext}
          />
          <motion.div
            style={{ opacity: success ? 1 : 0 }}
            transition={{ duration: 4 }}
            animate={{ opacity: success ? 1 : 0 }}
          >
            {/* <Icon as={BsLadder} boxSize={'64px'} color={'#A0522D'} /> */}
            <Rainbow
              width={'100px'}
              height={'50px'}
              // position={'absolute'}
              // top={200}
              opacity={success ? 1 : 0}
              zIndex={3}
            />
          </motion.div>
          <Box
            position={'absolute'}
            bottom={0}
            opacity={success ? 1 : 0}
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
