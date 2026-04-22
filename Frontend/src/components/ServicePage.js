import { useEffect, useState } from 'react'
import { fetchServices } from './APIs';
import { useFetchCategories } from '../Hook/useFetch';
import { useNavigate } from 'react-router-dom'
import '../Css-folder/servicePage.css'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ServiceImage = ({ service }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasImageError, setHasImageError] = useState(false);

  const imageName = service?.image ? service.image.split('/').pop() : '';
  const imageSrc = `${process.env.PUBLIC_URL}/images/${imageName}`;

  return (
    <div className='service-cardImage'>
      {isImageLoading ? <Skeleton height={200} className='bg-gray-400' /> : null}
      {hasImageError ? (
        <div className='service-cardImageFallback'>Image unavailable</div>
      ) : (
        <img
          src={imageSrc}
          alt={service?.title || service?.name || 'service image'}
          onLoad={() => setIsImageLoading(false)}
          onError={() => {
            setHasImageError(true);
            setIsImageLoading(false);
          }}
          style={{ display: isImageLoading ? 'none' : 'block' }}
        />
      )}
    </div>
  );
};

function ServicePage() {
  const [servicesByCategory, setServicesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
	const [fetchFailed, setFetchFailed] = useState(false);
	const {data: categories = [], fetchData: localFetchCategories} = useFetchCategories();
	const navigate = useNavigate();


  // Cache services to avoid re-fetching
  // const cachedServices = useMemo(() => servicesByCategory, [servicesByCategory]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setFetchFailed(false);

      try {

        // Check if categories are already available in state or localStorage
        if (categories.length === 0) {
          // If categories are not available, call localFetchCategories
          await localFetchCategories();
        }

        // Fetch services if categories exist
        if (categories.length > 0) {
          const servicePromises = categories.map(async (category) => {
            // if (cachedServices[category]) {
            //   return { category, services: cachedServices[category] }; // Use cached data
            // }
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
        setFetchFailed(true);
        setServicesByCategory({});
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [categories, localFetchCategories]);

  const handleServiceClick = (serviceId, serviceName, categoryName, price) =>{
    navigate('/appointments', {state: {selectedServiceId: serviceId, selectedServiceName: serviceName, selectedServiceCategory: categoryName, selectedServicePrice: price}})
  }

  const shouldShowPlaceholder = loading || fetchFailed;


  return (
    <header className='servicePage'>
      <h1>Services</h1>
      { shouldShowPlaceholder ?
        Array.from({ length: 4 }).map((_, index) => (
          <section className='service_category' key={index}>
            <h2>Service Category</h2>
            <div className='services'>
              {
                Array.from({ length: 3 }).map((_, index) => (
                  <div className='service-card' key={index}>
                    <div className='image'>
                      <Skeleton height={200} className='bg-gray-400' />
                    </div>
                    <div className='card-text'>
                      <h3>
                      <Skeleton height={20} width={100}  />
                      </h3>
                    </div>
                    <div className='card-text'>
                      <p><Skeleton count={3} /></p>
                    </div>
                  </div>
                ))
              }
            </div>
          </section>
        )) : categories.map((category, index) => (
          <section className='service_category' key={index}>
            <h2>
              {category}
            </h2>
            <div className='services'>
              {
                servicesByCategory[category]?.map((service, index) => (
                <div className='service-card' onClick={()=> handleServiceClick(service.service_id, service.name, service.category, service.price)} key={index}>
                  <ServiceImage service={service} />
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