import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

export const useFetch  = ({apiFunction, deps=[]}) => {
    const [data, setData] = useState('')
    const [error, setError] = useState('')

    const fetchData = useCallback(async (...args) => {
        try{
            const result =await apiFunction(...args);

            setData(result)
            setError()
        } catch (err) {
            setError(err.message ||"An error occured")
            toast.error(err.message ||"An error occured")
        }
    }, deps)

  return (
     {data, error, fetchData}
  )
}
