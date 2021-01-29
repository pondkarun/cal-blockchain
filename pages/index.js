import Symbol from "./symbol"
import { getCrypto } from "../service";

export default function Home({ cryptoList }) {
    return (
        <Symbol cryptoList={cryptoList} />
    );
}

export async function getStaticProps() {
    const res = await getCrypto()
    const cryptoList = res.data.items;
    return {
        props: { cryptoList }, // will be passed to the page component as props
        revalidate: 60, // In seconds
    };
}
