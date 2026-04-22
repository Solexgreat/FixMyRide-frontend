import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchPopularService } from './APIs';
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



const NextArrow = ({ onClick }) => (
    <div
        className="slick-arrow slick-next"
        onClick={onClick}
        style={{
            fontSize: '3rem',
            color: '#002B5B',
            right: '5px',
            zIndex: 1
        }}
    >
        &#10095;
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div
        className="slick-arrow slick-prev"
        onClick={onClick}
        style={{
            fontSize: '3rem',
            color: '#002B5B',
            left: '-16px',
            zIndex: 1
        }}
    >
        &#10094;
    </div>
);

const ServiceImage = ({ service }) => {
	const [isImageLoading, setIsImageLoading] = useState(true);
	const [hasImageError, setHasImageError] = useState(false);

	const imageName = service?.image ? service.image.split('/').pop() : '';
	const imageSrc = `${process.env.PUBLIC_URL}/images/${imageName}`;

	return (
		<div className='image'>
			{isImageLoading ? <Skeleton height={200} /> : null}
			{hasImageError ? (
				<div className='image-fallback'>Image unavailable</div>
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


function PopularServices() {

	const [popularServices, setPopularServices] = useState([])
	const [loading, setLoading] = useState(true)
	const [fetchFailed, setFetchFailed] = useState(false)
	const navigate = useNavigate();


	useEffect(() => {
		let isMounted = true;

		const loadServices = async () => {
			try{
				setFetchFailed(false)
				const services = await fetchPopularService();
				if (isMounted) {
					setPopularServices(services);
				}
			} catch (err){
				if (isMounted) {
					setFetchFailed(true)
					toast.error(err.message)
					setPopularServices([])
				}
			} finally {
				if (isMounted) {
					setLoading(false)
				}
			}
		};

		loadServices();

		return () => {
			isMounted = false;
		};
	  }, []);


	const handelServiceClick = (serviceId, serviceName, categoryName, price) => {
		// console.log({ serviceId, serviceName, categoryName });
		navigate('/appointments', { state: {selectedServiceId: serviceId, selectedServiceName: serviceName, selectedServiceCategory: categoryName, selectedServicePrice: price}});
	}

	const shouldShowPlaceholder = loading || fetchFailed;

	var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
	DefaultArrows: true,
	nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
	SwipeToSlide: true,
	draggable: true,
	TouchMove: true,
  };
	return (
	<section className="popular-service">
		<ToastContainer/>
		<h2>Popular Services</h2>
		 <div className='phone-slider'>
			{shouldShowPlaceholder ?
			Array.from({length: 3}).map((_, index) => (
				<div className='Card' key={index}>
					<div className='image'>
						<Skeleton height={200} />
					</div>
					<div className='card-text'>
						<h3><Skeleton height={20} width={100} /></h3>
					</div>
					<div className='card-text'>
						<p><Skeleton count={3} /></p>
					</div>
				</div>
			)) : popularServices.map(service => (
				<div className="Card" key={service.service_id} onClick={() => handelServiceClick(service.service_id, service.name, service.category, service.price)}>
					<ServiceImage service={service} />
					<div className='card-text'>
						<h3>{service.name}</h3>
						<p>{service.description}</p>
					</div>
				</div>
			))}
		</div>
		<div className='slider'>
			<Slider {...settings}>
			{shouldShowPlaceholder ?
				Array.from({length: 3}).map((_, index) => (
					<div className='Card' key={index}>
						<div className='image'>
							<Skeleton height={200} />
						</div>
						<div className='card-text'>
							<h3><Skeleton height={20} width={100} /></h3>
						</div>
						<div className='card-text'>
							<p><Skeleton count={3} /></p>
						</div>
					</div>
				)) : popularServices.map(service => (
					<div className="Card" key={service.service_id} onClick={() => handelServiceClick(service.service_id, service.name, service.category, service.price)}>
						<ServiceImage service={service} />
						<div className='card-text'>
							<h3>{service.name}</h3>
							<p>{service.description}</p>
						</div>
					</div>
				))
			}
			</Slider>
		</div>
	</section>
	)
}

export default PopularServices;