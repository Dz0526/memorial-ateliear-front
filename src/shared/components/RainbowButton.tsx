import { Button, keyframes, Box, ButtonProps } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa6';

const fancyButton = keyframes`
from {
  background-position: 0 0;
}
to {
  background-position: 500% 500%;
}
`;

export const RainbowButton = ({
  children,
  ...rest
}: { children: React.ReactNode } & ButtonProps) => {
  return (
    <Box
      padding={1}
      alignSelf={'center'}
      backgroundImage={`repeating-linear-gradient(
            to bottom right,
            hsl(0deg, 80%, 50%),
            hsl(60deg, 80%, 50%),
            hsl(120deg, 80%, 50%),
            hsl(180deg, 80%, 50%),
            hsl(240deg, 80%, 50%),
            hsl(300deg, 80%, 50%),
            hsl(360deg, 80%, 50%) 50%
          );`}
      backgroundSize={'1000% 1000%'}
      // animation={`${fancyButton} 60s linear 0s infinite`}
      animation={`${fancyButton} 50s infinite`}
      borderRadius={'40'}
    >
      <Button
        variant={'outline'}
        alignSelf={'center'}
        rightIcon={<FaArrowRight />}
        backgroundColor={'white'}
        // backdropFilter={'blur(1000px)'}
        {...rest}
      >
        {children}
      </Button>
    </Box>
  );
};
