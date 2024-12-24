import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { createAppointment, fetchAvailableTime, fetchCategories, fetchServices } from '../components/APIs';

export function useFetchCategories ({deps=[]}) {

    const [data, setData] = useState([])
    const [error, setError] = useState('')

    const fetchData = useCallback(async (...args) => {
        try{
            const result = await fetchCategories(...args);

            setData(result)
            console.log('result', result)
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

export function useFetchAvailableTimeSlot ({deps=[]}) {

  const [data, setData] = useState([])
  const [error, setError] = useState('')

  const fetchData = useCallback(async (...args) => {
      try{
          const result = await fetchAvailableTime(...args);

          setData(result)
          console.log('result', result)
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

export function useFetchServices ({deps=[]}) {

  const [data, setData] = useState([])
  const [error, setError] = useState('')

  const fetchData = useCallback(async (...args) => {
      try{
          const result = await fetchServices(...args);

          setData(result)
          console.log('result', result)
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

export function useFetchCreatAppointment ({deps=[]}) {

  const [data, setData] = useState([])
  const [error, setError] = useState('')

  const fetchData = useCallback(async (...args) => {
      try{
          const result = await createAppointment(...args);

          setData(result)
          console.log('result', result)
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