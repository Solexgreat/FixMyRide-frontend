import React, { useEffect } from 'react'
import { fetchCategories, fetchServices } from './APIs';
import { useFetch } from '../Hook/useFetch';

function servicePage() {
  const [servciesByCategory, setServciesByCategory] = useState({});
  const {data: categories, error: categoryError, fetchData: localFetchCategories} = useFetch(fetchCategories);

  useEffect(() => {
    localFetchCategories();
  }, [localFetchCategories]);

  useEffect(() => {
    const fetchAllservices = async () => {
      if (categories && categories.length > 0){
        const servicePromise = await categories.map(async (category) =>{
          const services = await fetchServices(category);
          return {category, services}
        });
        const allPromises = await Promise.all(servicePromise);
        const servicesMap = allPromises.reduce(( acc, {category, services}) =>{
          acc[category] = services
        })
        setServciesByCategory(servicesMap)
      }
    }
    fetchAllservices();
    }, [categories]);


  return (
    <header>
      <h1>Services</h1>
        {categories.map((category, index) => (
          <section>
            <h2>
              {category}
            </h2>
            <div className='servcies'>
              {
                servciesByCategory[category] &&
                servciesByCategory[category].map((service) => (
                <div className='service-card'>
                  <div className='service-cardImage'>
                    <img src={require(`${service.image}`)} alt={service.title} />
                  </div>
                  <div className='service-cardText'>
                   <h3>{service.Name}</h3>
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

export default servicePage