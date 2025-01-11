import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function AuthProvide({children}) {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [filterDate, setFilterDate] = useState({start: ' ', end: ' '})
  return (
    <AuthContext.Provider value={{isLoggedIn, setisLoggedIn, filterDate, setFilterDate}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);