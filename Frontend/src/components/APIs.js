import { toast } from 'react-toastify'
import { API_BASE_URL } from '../constant'




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
