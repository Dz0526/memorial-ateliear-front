import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Image,
  HStack,
  Spacer,
  Button,
  BoxProps,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { UserCardBanner } from '../UserCardBanner';

type Member = {
  screenName: string;
  iconImageUrl: string;
};
type Props = {
  imageUrl: string;
  caption: string;
  memoryTimeContext: string; // いつの思い出か
  members: Member[];
} & BoxProps;

export const BridgeChekiCard = ({ ...rest }: BoxProps) => {
  const [flip, setFlip] = useState(true);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (ref.current) {
      const rect = ref.current?.getBoundingClientRect();
      console.log(rect);
      if (rect.top < 240) {
        setVisible(false);
      }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <Box {...rest} ref={ref} position={'relative'}>
      {/* カードの領域 */}
      <motion.div
        transition={{ duration: 0.3 }}
        animate={{ rotateY: flip ? 0 : 180 }}
        onClick={() => setFlip(prevState => !prevState)}
      >
        {/* both side content */}
        <motion.div
          transition={{ duration: 0.3 }}
          animate={{ rotateY: flip ? 0 : 180 }}
          style={{ width: '100%', height: '100%', position: 'relative' }}
        >
          {/* frontside content */}
          <motion.div
            style={{
              backfaceVisibility: 'hidden',
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
            transition={{ duration: 0.3 }}
            animate={{ rotateY: flip ? 0 : 180 }}
          >
            <FrontFace />
          </motion.div>

          {/* backside content */}
          <motion.div
            style={{
              backfaceVisibility: 'hidden',
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
            initial={{ rotateY: 180 }}
            animate={{ rotateY: flip ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <BackFace />
          </motion.div>

          {/* カードがある領域の高さを維持するため、不可視のカード要素を導入 */}
          <Box visibility={'hidden'}>
            <FrontFace />
          </Box>
        </motion.div>
      </motion.div>
      <motion.div
        transition={{ duration: 0.5 }}
        style={{ opacity: visible ? 1 : 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <Box
          position={'absolute'}
          top={0}
          left={0}
          w={'full'}
          h={'full'}
          filter={'auto'}
          blur={'1px'}
          opacity={0.4}
          bg={'black'}
        />
      </motion.div>
    </Box>
  );
};

type FrontFaceProps = {
  imageUrl: string;
  caption: string;
  memoryTimeContext: string;
};

const FrontFace = () => {
  return (
    <Card maxW='sm'>
      <CardBody>
        <Image
          src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          alt='Green double couch with wooden legs'
          borderRadius='sm'
        />
        <HStack mt='4'>
          <Heading size={'sm'} maxWidth={'70%'}>
            ふかふかソファに座ってたのしい談笑
          </Heading>
          <Spacer />
          <Text fontSize='xs'>寮生活時代</Text>
        </HStack>
      </CardBody>
    </Card>
  );
};

type BackFaceProps = {
  memoryTimeContext: string;
  members: Member[];
};

const BackFace = () => {
  return (
    <Card maxW='sm' position='absolute' height={'100%'} width={'100%'}>
      <CardBody overflow='hidden' position={'relative'}>
        <Stack>
          <Heading size='sm'>思い出のメンバー</Heading>
          <Stack marginTop={2} paddingLeft={2} spacing={4}>
            <UserCardBanner screenName='Daiki Ito' iconImageUrl={''} />
            <UserCardBanner screenName='Manato Kato' iconImageUrl={''} />
            <UserCardBanner screenName='Taishi Naka' iconImageUrl={''} />
          </Stack>
        </Stack>
        <NextLink href='/' passHref>
          <Button
            position={'absolute'}
            bottom={4}
            right={4}
            size={'sm'}
            padding={6}
            // hack
            as={'p'}
          >
            詳細を見る
          </Button>
        </NextLink>
      </CardBody>
    </Card>
  );
};
