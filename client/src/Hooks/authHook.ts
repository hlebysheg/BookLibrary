import {useState, useCallback, useEffect} from "react";

export const useAuth = () => {
    const storageName: string = 'userData'

    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)

    const login = useCallback((jwt: string, userId: string) => {
        setToken(jwt)
        setUserId(userId)

        localStorage.setItem(storageName, JSON.stringify({
            userId,
            token,
        }))
    }, [])
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName) || '')

        if (data && data.token){
            login(data.token, data.userId)
        }

    }, [login])

    return {login, logout, token, userId}
}