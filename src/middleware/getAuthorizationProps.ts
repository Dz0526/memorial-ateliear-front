import { authClient } from 'libs/axios/client';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export const getAuthorizationProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const cookies = parseCookies(context);
  const token = cookies['access-token'];
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    await authClient(token).get('/users/');
  } catch {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
