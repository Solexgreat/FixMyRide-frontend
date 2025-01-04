import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function AuthenticateContext({children}) {
    const [isLoggedIn, setisLoggedIn] = useState(false)
  return (
    <AuthContext.Provider value={{isLoggedIn, setisLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);