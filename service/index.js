import Axios from 'axios';
import config from '../config';

/* ส่งแบบประเมิน */
export const getCrypto = async () => {
    return await Axios({
        method: "get",
        url: `${config.API_URL}/master/getCrypto`,
        config: { headers: { "Content-Type": "multipart/form-data" } },
    })
};