import { getAuthorizationProps } from "middleware/getAuthorizationProps";
import { GetServerSideProps, NextPageWithLayout } from "next";
import { Layout } from "shared/components/layouts/Layout";

const TextMemoryDetail: NextPageWithLayout = () => {
  return (
    <div>TextMemoryDetail</div>
  )
}
TextMemoryDetail.getLayout = page => <Layout>{page}</Layout>;

export const getServerSideProps: GetServerSideProps =
  getAuthorizationProps;

export default TextMemoryDetail