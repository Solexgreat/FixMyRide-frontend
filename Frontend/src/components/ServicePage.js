import { useEffect, useMemo, useState } from 'react'
import { fetchServices } from './APIs';
import { useFetchCategories } from '../Hook/useFetch';
import { useNavigate } from 'react-router-dom'
import '../Css-folder/servicePage.css'

function ServicePage() {
  const [servicesByCategory, setServicesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const {data: categories = [], error: categoryError, fetchData: localFetchCategories} = useFetchCategories([]);
	const navigate = useNavigate();


  // Cache services to avoid re-fetching
  const cachedServices = useMemo(() => servicesByCategory, [servicesByCategory]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      try {

        // Check if categories are already available in state or localStorage
        if (categories.length === 0) {
          // If categories are not available, call localFetchCategories
          await localFetchCategories();
        }

        // Fetch services if categories exist
        if (categories.length > 0) {
          const servicePromises = categories.map(async (category) => {
            if (cachedServices[category]) {
              return { category, services: cachedServices[category] }; // Use cached data
            }
            const services = await fetchServices(category);
            return { category, services };
          });

          const allPromises = await Promise.all(servicePromises);
          const servicesMap = allPromises.reduce((acc, { category, services }) => {
            acc[category] = services;
            return acc;
          }, {});

          setServicesByCategory(servicesMap);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [categories, cachedServices, localFetchCategories]);

  const handleServiceClick = (serviceId, serviceName, categoryName, price) =>{
    navigate('/appointments', {state: {selectedServiceId: serviceId, selectedServiceName: serviceName, selectedServiceCategory: categoryName, selectedServicePrice: price}})
  }


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
                servicesByCategory[category]?.map((service, index) => (
                <div className='service-card' onClick={()=> handleServiceClick(service.service_id, service.name, service.category, service.price)} key={index}>
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