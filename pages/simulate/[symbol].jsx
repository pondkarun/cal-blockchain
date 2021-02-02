import Head from "next/head";
import { useRouter } from 'next/router';
import Simulate from '../../routes/Simulate';
import Layout from "../../components/Layout";
export default function SimulateSymbol() {
  const router = useRouter()
  return (
    <Layout>
      <Head>
        <title>จำลอง คำนวณไม้</title>
      </Head>
      {router.query.symbol ? (<Simulate symbol={router.query.symbol} />) : ""}
      <br />
      <br />
    </Layout>
  )
}

