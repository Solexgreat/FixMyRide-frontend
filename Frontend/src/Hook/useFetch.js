import { useCallback, useState } from 'react'
import { createAppointment, fetchAllAppointments, fetchAllAppointmentsBetween, fetchAllRevenues, fetchAllRevenuesBetween, fetchAvailableTime, fetchCategories, fetchServices } from '../components/APIs';


export function useFetchAllRevenues () {
    const [data, setData] = useState([])

    const fetchData = useCallback(async (...args) => {
        try{
            const result = await fetchAllRevenues(...args);

            setData(result)
            console.log('result', result)
        } catch (error) {
            console.error(error)
        }
    }, [])

    return (
        {data, fetchData}
    )
}

export function useFetchAllRevenuesBetween () {
    const [data, setData] = useState([])

    const fetchData = useCallback(async (...args) => {
        try{
            const result = await fetchAllRevenuesBetween(...args);

            setData(result)
            console.log('result', result)
        } catch (error) {
            console.error(error)
        }
    }, [])

    return (
        {data, fetchData}
    )
}

export function useFetchAllAppointments () {
    const [data, setData] = useState([])

    const fetchData = useCallback(async (...args) => {
        try{
            const result = await fetchAllAppointments(...args);

            setData(result)
            console.log('result', result)
        } catch (error) {
            console.error(error)
        }
    }, [])

    return (
        {data, fetchData}
    )
}

export function useFetchAllAppointmentsBetween () {
    const [data, setData] = useState([])

    const fetchData = useCallback(async (...args) => {
        try{
            const result = await fetchAllAppointmentsBetween(...args);

            setData(result)
            console.log('result', result)
        } catch (error) {
            console.error(error)
        }
    }, [])

    return (
        {data, fetchData}
    )
}

export function useFetchCategories () {

    const [data, setData] = useState([])
    const [error, setError] = useState('')

    const fetchData = useCallback(async (...args) => {
        try{
            const result = await fetchCategories(...args);

            setData(result)
            console.log('result', result)
            setError('')
        } catch (err) {
            setError(err.message ||"An error occured")
            console.error(err.message ||"An error occured")
        }
    }, [])

  return (
     {data, error, fetchData}
  )
}

export function useFetchAvailableTimeSlot () {

  const [data, setData] = useState([])
  const [error, setError] = useState('')

    const fetchData = useCallback(async (...args) => {
      try{
          const result = await fetchAvailableTime(...args);

          setData(result)
          console.log('result', result)
          setError('')
      } catch (err) {
          setError(err.message ||"An error occured")
          console.error(err.message ||"An error occured")
      }
  }, [])

return (
   {data, error, fetchData}
)
}

export function useFetchServices () {

  const [data, setData] = useState([])
  const [error, setError] = useState('')

    const fetchData = useCallback(async (...args) => {
      try{
          const result = await fetchServices(...args);

          setData(result)
          console.log('result', result)
          setError('')
      } catch (err) {
          setError(err.message ||"An error occured")
          console.error(err.message ||"An error occured")
      }
  }, [])

return (
   {data, error, fetchData}
)
}

export function useFetchCreatAppointment () {

  const [data, setData] = useState([])
  const [error, setError] = useState('')

    const fetchData = useCallback(async (...args) => {
      try{
          const result = await createAppointment(...args);

          setData(result)
          console.log('result', result)
          setError('')
      } catch (err) {
          setError(err.message ||"An error occured")
          console.error(err.message ||"An error occured")
      }
  }, [])

return (
   {data, error, fetchData}
)
}