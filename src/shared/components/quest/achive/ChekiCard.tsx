import {
  Card,
  CardBody,
  Heading,
  Text,
  Image,
  HStack,
  Spacer,
  CardProps,
} from '@chakra-ui/react';
import React from 'react';

type FrontFaceProps = {
  imageUrl: string;
  caption: string;
  memoryTimeContext: string;
};

export const MiniChekiCard = ({
  imageUrl,
  ...rest
}: { imageUrl: string } & CardProps) => {
  return (
    <Card maxW='sm' {...rest}>
      <CardBody>
        <Image
          src={imageUrl}
          alt='Green double couch with wooden legs'
          borderRadius='sm'
        />
      </CardBody>
    </Card>
  );
};
