import { toast } from 'react-toastify'
import { API_BASE_URL } from '../constant'


export async function fetchAllRevenues () {

  const token =  localStorage.getItem('sessionToken')

  try{
    const response = await fetch(`${API_BASE_URL}/revenues/`, {
      headers: {
        'Authorization' : `Bearer ${token}`,
      }
    })

    if (!response.ok){
      const errorData = await response.json()
      toast.error(errorData.message || 'Failed to fetch revenues history')
    }

    const result = await response.json()
    return result

  } catch (error){
    toast.error(error.message || 'An error when fetching revenues history')
  }
}

export async function fetchAllRevenuesBetween ({startDate, endDate}) {
  const token =  localStorage.getItem('sessionToken')
  const qeuryDate = {
    initial_date: startDate,
    current_date: endDate,
  }
  try{
    const response = await fetch(`${API_BASE_URL}/revenues/history_between`, {
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify(qeuryDate)
    })

    if (!response.ok){
      const errorData = await response.json()
      toast.error(errorData.message || 'Failed to fetch revenues history')
    }

    const result = await response.json()
    return result

  } catch (error){
    toast.error(error.message || 'An error when fetching revenues history')
  }
}

export async function fetchAllAppointments () {

  const token =  localStorage.getItem('sessionToken')

  try{
    const response = await fetch(`${API_BASE_URL}/appointments/`, {
      headers: {
        'Authorization' : `Bearer ${token}`,
      }
    })

    if (!response.ok){
      const errorData = await response.json()
      toast.error(errorData.message || 'Failed to fetch revenues history')
    }

    const result = await response.json()
    return result

  } catch (error){
    toast.error(error.message || 'An error when fetching revenues history')
  }
}

export async function fetchAllAppointmentsBetween ({startDate, endDate}) {
  const token =  localStorage.getItem('sessionToken')
  const qeuryDate = {
    initial_date: startDate,
    current_date: endDate,
  }
  try{
    const response = await fetch(`${API_BASE_URL}/appointments/history_between`, {
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify(qeuryDate)
    })

    if (!response.ok){
      const errorData = await response.json()
      toast.error(errorData.message || 'Failed to fetch appointments history')
    }

    const result = await response.json()
    return result

  } catch (error){
    toast.error(error.message || 'An error when fetching appointments history')
  }
}

export async function fetchPopularService (){
  try{
    const response =  await fetch(
      `${API_BASE_URL}/services/pupolar_services`
    )

    if (!response.ok) {
      const errorData  = await response.json()
      toast.error(errorData.message || 'Failed to fetch data')
      throw new Error(errorData.message || 'Failed to fetch data')
    }

    const data = await response.json()
    return data
  } catch (err) {
    toast.error(err.message)
    throw new Error (err.message);
  }
 }

export async function fetchAvailableTime(date) {
  const response = await fetch(`${API_BASE_URL}/appointments/available_slots?date=${date}`);
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message || 'Failed to fetch data')
    throw new Error(errorData.message || 'Failed to fetch data');
  }
  return response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE_URL}/services/categories`);
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message || 'Failed to fetch data')
    throw new Error(errorData.message || 'Failed to fetch data');
  }
  return response.json();
}

export async function fetchServices(selectedCategory) {
  const category = selectedCategory;
  const queryParam = new URLSearchParams({category}).toString();
  const response = await fetch(`${API_BASE_URL}/services/category_services?${queryParam}`);
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message || 'Failed to fetch data')
    throw new Error(errorData.message || 'Failed to fetch data');
  }
  return response.json();
}

export async function createAppointment(appointmentData) {
  const response = await fetch(`${API_BASE_URL}/appointments/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(appointmentData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message || 'Failed to fetch data')
    throw new Error(errorData.message || 'Failed to create appointment');
  }
  return response.json();
}
