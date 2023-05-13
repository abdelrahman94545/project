import { Instance } from "./axios/axios";
import { toast } from 'react-toastify';

const Token = localStorage.getItem('token')
// const Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjAzMDcwLCJqdGkiOiI5NjgxMGVmM2FmMzU0NDI3YjY5NTJhY2IxMmViN2Q3ZiIsInVzZXJfaWQiOjEsImZ1bGxfbmFtZSI6ImFkbWluIGFkbWluIiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJjb21wYW55IjoiTXkgQ29tcGFueSIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaXNfc3VwZXJ1c2VyIjp0cnVlLCJpc19zdGFmZiI6dHJ1ZSwiaXNfYWN0aXZlIjp0cnVlfQ.UvWgSfNRakljdJzmkkx_1fMx8DfZOmkzjJ2RC7X7gh4"


const AuthAxios =  () =>{

const authAxios = {};


authAxios.verifyAndRefreshToken = async (tokenVal, refreshVal) => {
  try
  {
    const verifyData = await Instance.post('/api/token/verify/', {token: tokenVal})

    return verifyData.status;
    
  }
  catch(error)
  {
    // console.log("verify api error =", error.response.status);
      try
      {
        // console.log("refresh api =", refreshVal);
        const refreshData = await Instance.post('/api/token/refresh/' ,{refresh: refreshVal})
        // console.log("refresh api seccess =", refreshData)
        // console.log("refresh2 api seccess =", refreshData.data.access)

          // save new token in local storage
          localStorage.setItem("token", refreshData.data.access)
        return refreshData.status;
      }
      catch(error)
      {
        
        // console.log("refresh api  error =", error.response)
        // remove token from local storage and log out
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("whatsAccount");

        toast.error("Your Session Has Been Expired",{
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });

        return false
      }
  }
}





authAxios.createUser = async (userData,Token, refreshVal) => {
  const status = await authAxios.verifyAndRefreshToken(Token, refreshVal)
  if(status === 200)
  {
    const {data} = await Instance.post('/api/user/', userData , { 
      headers: {
          "Authorization" : `Bearer ${Token}`,
          "Connection":"keep-alive",
          "Content-Type":"application/json"
      }
  })
    return data;
  }
  else
  {
    return false
  }
}

authAxios.getEditUser = async (Id, Token, refreshVal) => {
  const status = await authAxios.verifyAndRefreshToken(Token, refreshVal)
  if(status === 200)
  {
  const {data} = await Instance.get(`/api/user/${Id}/`, { 
    headers: {
        "Authorization" : `Bearer ${Token}`,
        "Connection":"keep-alive",
        "Content-Type":"application/json"
    }
})
  return data;
  }
  else
  {
    return false
  }
}

authAxios.editUser = async (Id, userData, Token, refreshVal) => {
  const status = await authAxios.verifyAndRefreshToken(Token, refreshVal)
  if(status === 200)
  {
  const {data} = await Instance.put(`/api/user/${Id}/`,userData , { 
    headers: {
        "Authorization" : `Bearer ${Token}`,
        "Connection":"keep-alive",
        "Content-Type":"application/json"
    }
})
  return data;
  }
  else
  {
    return false
  }
}

authAxios.deleteUser = async (Id, Token, refreshVal) => {
  const status = await authAxios.verifyAndRefreshToken(Token, refreshVal)
  if(status === 200)
  {
  const {data} = await Instance.delete(`/api/user/${Id}/`, { 
    headers: {
        "Authorization" : `Bearer ${Token}`,
        "Connection":"keep-alive",
        "Content-Type":"application/json"
    }
})
  return data;
  }
  else
  {
    return false
  }
}
///////////
authAxios.usersList =  async(Token, refreshVal) => {
   const status = await authAxios.verifyAndRefreshToken(Token, refreshVal)

  if(status === 200)
  {
    const {data} = await Instance.get('/api/user/',{ 
      headers: {
          "Authorization" : `Bearer ${Token}`,
          "Connection":"keep-alive",
          "Content-Type":"application/json"
      }
  })
  return data;
  }
  else
  {
    return false
  }
}
////////////////
authAxios.logIn = async (loginCreds) => {
  const {data} = await Instance.post('/api/login/' ,loginCreds);
  return data;
};

authAxios.forgotPass = async (resetData, code) => { 
  const {data} = await Instance.post(`/api/reset/${code ? `${code}`:''}` ,resetData);
  return data;
};

authAxios.register = async (registerData) => {
  const {data} = await Instance.post('/api/register/' ,registerData);
  return data;
};


    return authAxios
}

export default AuthAxios;