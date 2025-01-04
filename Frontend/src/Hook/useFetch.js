import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { createAppointment, fetchAllAppointments, fetchAllAppointmentsBetween, fetchAllRevenues, fetchAllRevenuesBetween, fetchAvailableTime, fetchCategories, fetchServices } from '../components/APIs';


export function useFetchAllRevenues ({deps=[]}) {
    const [data, setData] = useState([])

    const fetchData = useCallback(async (...args) => {
        try{
            const result = await fetchAllRevenues(...args);

            setData(result)
            console.log('result', result)
        } catch (error) {
            toast.error(error)
        }
    }, deps)

    return (
        {data, fetchData}
    )
}

export function useFetchAllRevenuesBetween ({deps=[]}) {
    const [data, setData] = useState([])

    const fetchData = useCallback(async (...args) => {
        try{
            const result = await fetchAllRevenuesBetween(...args);

            setData(result)
            console.log('result', result)
        } catch (error) {
            toast.error(error)
        }
    }, deps)

    return (
        {data, fetchData}
    )
}

export function useFetchAllAppointments ({deps=[]}) {
    const [data, setData] = useState([])

    const fetchData = useCallback(async (...args) => {
        try{
            const result = await fetchAllAppointments(...args);

            setData(result)
            console.log('result', result)
        } catch (error) {
            toast.error(error)
        }
    }, deps)

    return (
        {data, fetchData}
    )
}

export function useFetchAllAppointmentsBetween ({deps=[]}) {
    const [data, setData] = useState([])

    const fetchData = useCallback(async (...args) => {
        try{
            const result = await fetchAllAppointmentsBetween(...args);

            setData(result)
            console.log('result', result)
        } catch (error) {
            toast.error(error)
        }
    }, deps)

    return (
        {data, fetchData}
    )
}

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