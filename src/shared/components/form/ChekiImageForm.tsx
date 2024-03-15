import {
  Card,
  CardBody,
  Image,
  HStack,
  Input,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useRef } from 'react';

type Props = {
  message: string | undefined;
  imgSrc: string;
  onChange: (file: File) => void;
};

export const ChekiImageForm = ({ message, imgSrc, onChange }: Props) => {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <Card
      maxW='sm'
      onClick={() => {
        if (ref.current) ref.current?.click();
      }}
    >
      <CardBody>
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt='Green double couch with wooden legs'
            borderRadius='sm'
          />
        ) : (
          <Flex
            borderRadius='sm'
            w={'full'}
            h={'150px'}
            bg={'gray.100'}
            alignItems={'center'}
            justifyContent={'center'}
            flexDir={'column'}
          >
            <Text textAlign={'center'} fontWeight={'bold'}>
              {message ?? '画像を入力してください'}
            </Text>
          </Flex>
        )}
        <HStack mt='4'></HStack>
      </CardBody>
      <Input
        type='file'
        display={'none'}
        ref={ref}
        onChange={e => {
          if (e.target.files) {
            imgSrc && URL.revokeObjectURL(imgSrc);
            const file = e.target.files[0];
            onChange(file);
          }
        }}
      />
    </Card>
  );
};
