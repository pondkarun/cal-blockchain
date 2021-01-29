import Head from "next/head";
import Layout from "../components/Layout";
import Symbol from "../routes/Symbol";

export default function Home({ cryptoList }) {
  return (
    <Layout>
      <Head>
        <title>จำลอง คำนวณไม้</title>
      </Head>
      <Symbol cryptoList={cryptoList} />
      <br />
      <br />
    </Layout>
  );
}
