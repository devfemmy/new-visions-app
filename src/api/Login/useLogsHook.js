import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../context/AppState'

const useLogsHook = () => {
    // const [data, setData] = useState(null)
    const { onLogout, lang } = useContext(AppContext)

    // useEffect(() => {
    //     fetch(url)
    //         .then((res) => res.json())
    //         .then((data) => setData(data))
    // }, [url])

    // return [data]
    return onLogout
}

export default useLogsHook
