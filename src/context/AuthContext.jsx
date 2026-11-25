import { createContext,useContext,useMemo,useState } from 'react'
import { authApi,clearAccessToken,getAccessToken,saveAccessToken } from '../services/api.js'
const AuthContext=createContext(null)
export function AuthProvider({children}){
  const [token,setToken]=useState(getAccessToken)
  const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('forma_user')||'null')}catch{return null}})
  async function login(credentials){
    const response=await authApi.login(credentials),data=response.data||{}
    const accessToken=data.access_token||data.token
    if(!accessToken)throw new Error('Le serveur n’a pas retourné de jeton d’accès.')
    saveAccessToken(accessToken);const profile=data.user||data.account||null
    if(profile)localStorage.setItem('forma_user',JSON.stringify(profile))
    setToken(accessToken);setUser(profile);return response
  }
  async function register(values){return authApi.register(values)}
  function logout(){clearAccessToken();localStorage.removeItem('forma_user');setToken(null);setUser(null)}
  const value=useMemo(()=>({token,user,role:user?.role||null,isAuthenticated:Boolean(token),login,register,logout,setUser}),[token,user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error('useAuth doit être utilisé dans AuthProvider.');return value}
