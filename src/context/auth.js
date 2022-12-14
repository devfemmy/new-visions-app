import React, { useState } from 'react'

export const AuthContext = React.createContext()

export function AuthProvider({ children }) {
    const [hasToken, setHasToken] = useState(false)

    return (
        <AuthContext.Provider value={{ hasToken, setHasToken }}>
            {children}
        </AuthContext.Provider>
    )
}
