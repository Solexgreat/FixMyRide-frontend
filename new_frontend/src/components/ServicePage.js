import { useEffect, useState } from 'react'
import { fetchServices } from './APIs';
import { useFetchCategories } from '../Hook/useFetch';
import '../Css-folder/servicePage.css'

function ServicePage() {
  const [servciesByCategory, setServciesByCategory] = useState({});
  const {data: categories = [], error: categoryError, fetchData: localFetchCategories} = useFetchCategories([]);

  useEffect(() => {
    localFetchCategories();
  }, [localFetchCategories]);

  useEffect(() => {
    const fetchAllservices = async () => {
      if (categories.length > 0){
        const servicePromise = categories.map(async (category) =>{
          const services = await fetchServices(category);
          return {category, services}
        });
        const allPromises = await Promise.all(servicePromise);
        const servicesMap = allPromises.reduce(( acc, {category, services}) =>{
          acc[category] = services
          return acc
        }, {})
        setServciesByCategory(servicesMap)
      }
    }
    fetchAllservices();
    }, [categories]);


  return (
    <header className='servicePage'>
      <h1>Services</h1>
        {categories.map((category, index) => (
          <section className='service_category'>
            <h2>
              {category}
            </h2>
            <div className='services'>
              {
                servciesByCategory[category]?.map((service, index) => (
                <div className='service-card'>
                  <div className='service-cardImage'>
                    <img src={`${process.env.PUBLIC_URL}/images/${service.image.split('/').pop()}`} alt={service.title} />
                  </div>
                  <div className='service-cardText'>
                   <h3>{service.name}</h3>
                   <p>{service.description}</p>
                  </div>
                </div>
                ))
              }
            </div>
          </section>
        ))}
    </header>
  )
}

export default ServicePage