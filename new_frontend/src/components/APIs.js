import React, { useCallback, useState } from 'react'
import PopularServices from './PopularServices';



export const fetchPopularService = useCallback( async () => {
  try{
    const response =  await fetch(
      `http://localhost:5000/services/pupolar_services`
    )

    if (!response) {
      const errorData  = await response.json()
      throw new Error(errorData.error || 'Failed to fetch data')
    }

    const data = await response.json()
    return data.services
  } catch (err) {
    throw new Error (err.error);
  }
 })
