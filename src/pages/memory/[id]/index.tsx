import React from 'react'
import { Layout } from 'shared/components/layouts/Layout';
import type * as next from 'next';
import { BackAndKebabHeader } from 'shared/components/layouts/BackAndKebabHeader';

const Memory: next.NextPageWithLayout = () => {
  return (
    <>
      <BackAndKebabHeader backHref='/feed' kebabHref='edit' />
      <div> Memory</ div>
    </>
  );
}

Memory.getLayout = page => <Layout>{page}</Layout>;
export default Memory
