import { HStack, Heading, Spacer, Text } from "@chakra-ui/react";

export const StickeyNoteCard = () => {
  return (
    <HStack
      width={'100%'}
      maxWidth={'sm'}
      minHeight={20}
      paddingX={4}
      paddingY={4}
      bgColor='#FFADAD'
      shadow="md"
      transform="rotate(1deg)"
    >
      <Heading variant={'handwriting'} size='md' fontWeight='semibold'>早朝龍泉寺</Heading>
      <Spacer />
      <Text variant={'handwriting'} fontSize='xs'>寮生活時代</Text>
    </HStack>
  );
}