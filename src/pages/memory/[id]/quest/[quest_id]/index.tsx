import { Box, Button, Flex, FlexProps, Icon, Text } from '@chakra-ui/react';
import { NextPageWithLayout } from 'next';
import { Layout } from 'shared/components/layouts/Layout';
import { BackHeader } from 'shared/components/layouts/BackHeader';
import { FaCheckCircle } from 'react-icons/fa';
import { ChekiCard } from 'shared/components/feed/ChekiCard';

const QuestDetail: NextPageWithLayout = () => {
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
        <Button variant={'outline'} w={'70%'} alignSelf={'center'}>
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

QuestDetail.getLayout = page => <Layout>{page}</Layout>;

export default QuestDetail;
