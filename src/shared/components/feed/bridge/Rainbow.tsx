import { Box, Flex, FlexProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const Rainbow = ({ ...rest }: FlexProps) => {
  return (
    <Flex {...rest}>
      <Box bg={'red'} w={'full'} h={'fll'} />
      <Box bg={'orange'} w={'full'} h={'full'} />
      <Box bg={'yellow'} w={'full'} h={'full'} />
      <Box bg={'green'} w={'full'} h={'full'} />
      <Box bg={'cyan'} w={'full'} h={'full'} />
      <Box bg={'blue'} w={'full'} h={'full'} />
      <Box bg={'purple'} w={'full'} h={'full'} />
    </Flex>
  );
};
