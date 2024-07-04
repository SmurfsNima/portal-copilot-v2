import { User } from "@/model";
import { PropsWithChildren, createContext, useState } from "react";

interface AppContextProp {
    user:User
    token:string | null
    setUser:(user:User) => void
    login: (token: string) => void;
}

export const AppContext = createContext<AppContextProp>({
    user:new User(),
    token:null,
    setUser:() => {},
    login:() => {}
})

const AppContextProvider =({children}:PropsWithChildren) => {
    const [token,setToken] = useState<string | null>(localStorage.getItem("token") || null)
    const localuser = localStorage.getItem('authUser')
    const resolveUser:User = Object.assign(new User(),JSON.parse(localuser as string))
    const [user,setUser] = useState<User>(resolveUser ? resolveUser : new User());
    const contextValue:AppContextProp = {
        token:token,
        user:user,
        setUser:(user:User) => {
            localStorage.setItem('authUser',JSON.stringify(user))
            setUser(user)
        },
        login:(token:string) =>{
            setToken(token)
            localStorage.setItem("token",token)
        }
    }
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export default AppContextProvider;