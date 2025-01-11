import React, { useCallback, useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchPopularService } from './APIs';
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// // import 'swiper/swiper-bundle.min.css';



const NextArrow = ({ onClick }) => (
    <div
        className="slick-arrow slick-next"
        onClick={onClick}
        style={{
            fontSize: '3rem',
            color: '#002B5B',
            right: '10px',
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
            left: '2px',
            zIndex: 1
        }}
    >
        &#10094;
    </div>
);


function PopularServices() {

	const [popularServices, setPopularServices] = useState([])
	// const [error, setError] = useState(null)
	const navigate = useNavigate();

	const fetchServices = useCallback( async () => {
		try{
			const services = await fetchPopularService();
			setPopularServices(services);
			console.log('services:', services)

		} catch (err){
			toast.error(err.message)
			setPopularServices([])
		}
	}, [])


	useEffect(() => {
		fetchServices();
	  }, [fetchServices]);


	const handelServiceClick = (serviceId, serviceName, categoryName, price) => {
		// console.log({ serviceId, serviceName, categoryName });
		navigate('/appointments', { state: {selectedServiceId: serviceId, selectedServiceName: serviceName, selectedServiceCategory: categoryName, selectedServicePrice: price}});
	}

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
			{popularServices.map(service => (
				<div className="Card" key={service.service_id} onClick={() => handelServiceClick(service.service_id, service.name, service.category, service.price)}>
					<div className='image'>
						<img src={`${process.env.PUBLIC_URL}/images/${service.image.split('/').pop()}`} alt={service.title} />
					</div>
					<div className='card-text'>
						<h3>{service.name}</h3>
						<p>{service.description}</p>
					</div>
				</div>
			))}
		</div>
		<div className='slider'>
			<Slider {...settings}>
				{popularServices.map((service) => (
						<div className='Card' key={service.service_id}  onClick={() => handelServiceClick(service.service_id, service.name, service.category, service.price)}>
							<div className='image'>
								<img src={`${process.env.PUBLIC_URL}/images/${service.image.split('/').pop()}`} alt="" / >
							</div>
							<div className='card-text'>
								<h3>{service.name}</h3>
								<p>{service.description}</p>
							</div>
						</div>
				))}
			</Slider>
		</div>
	</section>
	)
}

export default PopularServices;