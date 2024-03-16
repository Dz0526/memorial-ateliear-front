import { HStack, Heading, Spacer, Text } from '@chakra-ui/react';
import { TextMemory } from 'pages/feed';

export const StickeyNoteCard = ({ title, timeLabel }: TextMemory) => {
  return (
    <HStack
      width={'100%'}
      maxWidth={'sm'}
      minHeight={20}
      paddingX={4}
      paddingY={4}
      bgColor='#FFADAD'
      shadow='md'
      transform='rotate(1deg)'
    >
      <Heading variant={'handwriting'} size='md' fontWeight='semibold'>
        {title}
      </Heading>
      <Spacer />
      <Text variant={'handwriting'} fontSize='xs'>
        {timeLabel}
      </Text>
    </HStack>
  );
};
