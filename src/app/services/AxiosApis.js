import { Instance } from "./axios/axios";
import AuthAxios from "./auth-axios";

const AxiosApis = () => {

    const axiosApis = {};


    axiosApis.listAccountType = async (Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.get('/account/account-type/')
            return data;
        }
        else
        {
            return false
        }
    }






    

    return axiosApis;
}


export default AxiosApis;