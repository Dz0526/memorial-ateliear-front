import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import type { AppPropsWithLayout } from 'next/app';
import theme from 'config/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  const queryClient = new QueryClient();
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap" rel="stylesheet" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
