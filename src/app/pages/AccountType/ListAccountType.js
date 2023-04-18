
import AuthAxios from "../../../services/auth-axios";


const ListAccountType = () => {

    const localStorageToken = localStorage.getItem('token')
    const localStorageRefresh = localStorage.getItem('refresh')

    const getAccountTypeDataFun = async (Token, refreshVal) => {

        try{
            // console.log("axios =", AuthAxios().usersList());
            // if(usersListData === null)
            // {
            await AuthAxios().listAccountType(Token, refreshVal)
            // await AuthAxios.usersList(Token, refreshVal)
            .then((data) => {
                // console.log("data3=", data);
                // console.log("local =", localStorage.getItem('token'));

                if(data === false)
                {
                    navigate("/user/login");
                    return false
                }

                // dispatch(addUsers(data))
            })
            // }
           
        }
        catch(error){
            console.log("list error =" ,error);
            toast.error("Network Error",{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    // useEffect( async ()=>{
    //     // if(usersListData === null)
    //     // {
    //         getAccountTypeDataFun(localStorageToken, localStorageRefresh)
    //     // }
    // },[])


    return (
        <div></div>
    )
}


export default ListAccountType