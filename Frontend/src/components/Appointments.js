import { useEffect, useState } from 'react'
import '../Css-folder/Appointment.css'
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { API_BASE_URL } from '../constant';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { validatePhoneNumber } from '../utils/validationUtils';
import{ useFetchCategories, useFetchAvailableTimeSlot, useFetchServices}  from '../Hook/useFetch';
import { useAuth } from '../context/AuthContext';
import CheckOutPage from './CheckOutButton';
import CheckOutButton from './CheckOutButton';
import CheckOutDialogBox from './CheckOutDialogBox';


// console.log('fetchAvailableTime:', fetchAvailableTime);

function Appointments() {
    const location = useLocation();
    const {
      selectedServiceId: initialSelectedServiceId,
      selectedServiceName: initialSelectedServiceName,
      selectedServiceCategory: initialSelectedServiceCategory,
      selectedServicePrice: initialSelectedServicePrice,
    } = location.state || {};
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedServicePrice, setSelectedServicePrice] = useState(initialSelectedServicePrice ||'');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [userFriendlyDate, setUserFriendlyDate] = useState('');
    const [time, setTime] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(initialSelectedServiceCategory ||"");
    const [selectedServiceId, setSelectedServiceId] = useState(initialSelectedServiceId ||'');
    const [selectedServiceName, setSelectedServiceName] = useState(initialSelectedServiceName ||'');
    const {data: availableSlots, error: slotError, fetchData: localFetchAvailableSlots} = useFetchAvailableTimeSlot([date])
    const {data: categories, error: categoryError, fetchData: localFetchCategories} = useFetchCategories([]);
    const {data: services, error: serviceError, fetchData: localFetchServices} = useFetchServices([selectedCategory]);


  useEffect(() => {
    if (date) localFetchAvailableSlots(date);
  }, [date, localFetchAvailableSlots]);

  useEffect(() => {
    localFetchCategories();
  }, [localFetchCategories]);

  useEffect(() => {
    if (selectedCategory) localFetchServices(selectedCategory);
  }, [selectedCategory, localFetchServices]);

  useEffect (() => {
    if(initialSelectedServiceCategory){
      setSelectedCategory(initialSelectedServiceCategory)
    }
    if(initialSelectedServiceName){
      setSelectedServiceName(initialSelectedServiceName)
      console.log('serviceName', selectedServiceName)
    }
    if(initialSelectedServiceId){
      setSelectedServiceId(initialSelectedServiceId)
    }
    if(initialSelectedServicePrice){
      setSelectedServicePrice(initialSelectedServicePrice)
    }
  }, [initialSelectedServiceCategory, initialSelectedServiceName, initialSelectedServiceId, initialSelectedServicePrice])

  const handleServiceChange = (e) => {
    const [id, name, price] = e.target.value.split('|');
    setSelectedServiceId(id);
    console.log('serviceId', selectedServiceId)
    setSelectedServiceName(name);
    console.log('serviceName', selectedServiceName)
    setSelectedServicePrice(price);
    console.log('serviceId', selectedServicePrice)

  };

  const handleDateChange = (e) => {
    const rawDate = new Date(e.target.value);
    setDate(e.target.value);
  }


  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      toast.error('Please select a category.');
      return;
    }

    if (!selectedServiceName) {
      toast.error('Please select a service.');
      return;
    }

    if(!time){
      toast.error('Please select a convinent time.');
      return
    }

    setIsDialogOpen(true);
  }

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value
    if (validatePhoneNumber(value)){
      setPhoneNumber(value)
    }
    else{
      toast.error('Invalid phone number! Enter a 10-digit number.');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      date,
      time,
      service_id: selectedServiceId,
      status: 'pending',
    };

    try {
      const response = await fetch(
        'http://127.0.0.1:5000/appointments/create',
        // `${API_BASE_URL}/appointments/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointmentData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || errorData.error || 'Failed to create appointment');
      }

      const result = await response.json();
      console.log('Appointment created successfully:', result);
      toast.success('Appointment created successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      throw new Error (`Error: ${error.msg, error.error}`);
    }
  };


  return (
    <header className='appointments'>
      <section>
          <ToastContainer/>
          <form className='form-field'>
              <fieldset>
                  <div className='category-services'>
                    <div className='category-services-row'>
                      <label htmlFor='category'> Category </label>
                      <select id='category'
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}>
                          <option className="option" value="">
                              -- Category --
                          </option>
                          {categories.map((category, index) =>(
                              <option className="option" key={index} value={category}>
                                  {category}
                              </option>
                          ))}
                      </select>
                    </div>
                    <div className='category-services-row'>
                      <label htmlFor='Service-Type'>Service Type </label>
                      <select id='Service-Type'
                      value={`${selectedServiceId}|${selectedServiceName}|${selectedServicePrice}`}
                      onChange={handleServiceChange}
                      required
                      >
                          <option className="option" value="">
                              -- Select services --
                          </option>
                          {services.map((service) => (
                              <option className="option" key={service.service_id}
                                value={`${service.service_id}|${service.name}|${service.price}`}
                              >
                                  {service.name}
                              </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className='time-date'>
                    <div className='time-date-row'>
                      <label htmlFor='date'>
                          Select date
                       </label>
                          <input
                          id='date'
                          type='date'
                          min={new Date().toISOString().split('T')[0]}
                          value={date}
                          onChange={handleDateChange}
                          />
                    </div>

                    <div className='time-date-row'>
                      <label htmlFor='time'>Select Time</label>
                      <select id='time'
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      >
                          <option className="option"  value="">
                              -- Select-Time --
                          </option>
                              {availableSlots.map((slot, index) =>(
                                  <option key={index} value={slot}>
                                      {slot}
                                  </option>
                              ))}
                      </select>
                    </div>

                    <div className='customerPhoneNumber-row' >
                          <label htmlFor='phoneNumber' >Phone Number</label>
                          <input id='phoneNumber'
                          type='text'
                          pattern="[0-9]{10}"
                          title="Enter a valid 10-digit phone number"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          required />
                      </div>
                  </div>
                <button type="submit" className="submit-button"
                onClick={handleBookAppointment}
                >
                Book Appointment
                </button>
              </fieldset>
          </form>
      </section>
      <div>
        <CheckOutDialogBox handleSubmit={handleSubmit}
        isOpen={isDialogOpen}
        onClose={ () => setIsDialogOpen(false)}
        price={selectedServicePrice}
        description={selectedServiceName}
        />
      </div>
    </header>
  )
}

export default Appointments