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
import React, { useState } from 'react';
import { UserCardBanner } from './UserCardBanner';
import { ImageMemory, Member } from 'pages/feed';

type Props = ImageMemory & BoxProps;

export const ChekiCard = ({
  uuid: memoryId,
  imageUrl,
  caption,
  timeLabel: memoryTimeContext,
  members,
  ...rest
}: Props) => {
  const [flip, setFlip] = useState(true);
  return (
    <Box {...rest}>
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
            <FrontFace
              {...{ imageUrl, caption, memoryTimeContext }}
              imageUrl={process.env.NEXT_PUBLIC_STORAGE_ORIGIN + imageUrl}
            />
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
            <BackFace {...{ memoryId, members }} />
          </motion.div>

          {/* カードがある領域の高さを維持するため、不可視のカード要素を導入 */}
          <Box visibility={'hidden'}>
            <FrontFace
              imageUrl={process.env.NEXT_PUBLIC_STORAGE_ORIGIN + imageUrl}
              caption={caption}
              memoryTimeContext={memoryTimeContext}
            />
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  );
};

type FrontFaceProps = {
  imageUrl: string;
  caption: string;
  memoryTimeContext: string;
};

const FrontFace = ({
  imageUrl,
  caption,
  memoryTimeContext,
}: FrontFaceProps) => {
  return (
    <Card maxW='sm'>
      <CardBody>
        <Image src={imageUrl} alt='sample' borderRadius='sm' />
        <HStack mt='4'>
          <Heading variant={'handwriting'} size={'sm'} maxWidth={'70%'}>
            {caption}
          </Heading>
          <Spacer />
          <Text variant={'handwriting'} fontSize='xs'>
            {memoryTimeContext}
          </Text>
        </HStack>
      </CardBody>
    </Card>
  );
};

type BackFaceProps = {
  memoryId: string;
  members: Member[];
};

const BackFace = ({ memoryId, members }: BackFaceProps) => {
  return (
    <Card maxW='sm' position='absolute' height={'100%'} width={'100%'}>
      <CardBody overflow='hidden' position={'relative'}>
        <Stack>
          <Heading size='sm'>思い出のメンバー</Heading>
          <Stack marginTop={2} paddingLeft={2} spacing={4}>
            {members.map(member => (
              <UserCardBanner
                key={member.uuid}
                screenName={member.screenName}
                iconImageUrl={member.iconUrl ? member.iconUrl : ''}
              />
            ))}
          </Stack>
        </Stack>
        <NextLink href={`/memory/${memoryId}`} passHref>
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
