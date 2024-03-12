import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import type { AppPropsWithLayout } from 'next/app';
import theme from 'config/theme';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  return (
    <ChakraProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}

export default MyApp;
