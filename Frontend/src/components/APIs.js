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
      throw new Error (errorData.message || 'Failed to fetch revenues history')
    }

    const result = await response.json()
    return result

  } catch (error){
    throw new Error (error.message || 'An error when fetching revenues history')
  }
}

export async function fetchAllRevenuesBetween ({startDate, endDate}) {
  const token =  localStorage.getItem('sessionToken')

  const initial_date= startDate
  const current_date= startDate

  try{
    const response = await fetch(`${API_BASE_URL}/revenues/history_between?initial_date=${initial_date}&current_date=${current_date}`, {
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    })

    if (!response.ok){
      const errorData = await response.json()
      throw new Error (errorData.message || 'Failed to fetch revenues history')
    }

    const result = await response.json()
    return result

  } catch (error){
    throw new Error (error.message || 'An error when fetching revenues history')
  }
}

export async function fetchAllAppointments () {
  try{
    const response = await fetch(`${API_BASE_URL}/appointments/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok){
      const errorData = await response.json()
      throw new Error (errorData.message || 'Failed to fetch revenues history')
    }

    const result = await response.json()
    return result

  } catch (error){
    throw new Error (error.message || 'An error when fetching revenues history')
  }
}

export async function fetchAllAppointmentsBetween ({startDate, endDate}) {

  const initial_date= startDate
  const current_date= endDate

  try{
    const response = await fetch(`${API_BASE_URL}/appointments/history_between?initial_date=${initial_date}&current_date=${current_date}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok){
      const errorData = await response.json()
      throw new Error (errorData.message || 'Failed to fetch appointments history')
    }

    const result = await response.json()
    return result

  } catch (error){
    throw new Error(error.message || 'An error when fetching appointments history')
  }
}

export async function fetchPopularService (){
  try{
    const response =  await fetch(
      `${API_BASE_URL}/services/popular_services`
    )

    if (!response.ok) {
      const errorData  = await response.json()
      throw new Error(errorData.message || 'Failed to fetch data')
    }

    const data = await response.json()
    return data
  } catch (err) {
    throw new Error (err.message);
  }
 }

export async function fetchAvailableTime(date) {
  const response = await fetch(`${API_BASE_URL}/appointments/available_slots?date=${date}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch data');
  }
  return response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE_URL}/services/categories`);
  if (!response.ok) {
    const errorData = await response.json();
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
    throw new Error(errorData.message || 'Failed to create appointment');
  }
  return response.json();
}
