import { API_BASE_URL } from '../constant'




export async function fetchPopularService (){
  try{
    const response =  await fetch(
      `${API_BASE_URL}http://localhost:5000/services/pupolar_services`
    )

    if (!response.ok) {
      const errorData  = await response.json()
      throw new Error(errorData.error || 'Failed to fetch data')
    }

    const data = await response.json()
    return data.services
  } catch (err) {
    throw new Error (err.error);
  }
 }

export async function fetchAvailableTime(date) {
  const response = await fetch(`${API_BASE_URL}/appointments/available_slots?date=${date}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch data');
  }
  return response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE_URL}/services/categories`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch data');
  }
  return response.json();
}

export async function fetchServices(selectedCategory) {
  const queryParam = new URLSearchParams({ selectedCategory }).toString();
  const response = await fetch(`${API_BASE_URL}/services/category_service?${queryParam}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch data');
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
