import React, { useEffect, useState } from 'react'
import '../Css-folder/Appointment.css'
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { API_BASE_URL } from '../constant';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { validatePhoneNumber } from '../utils/validationUtils';
import { useFetch } from '../Hook/useFetch';
import { fetchAvailableTime, fetchCategories, fetchServices } from './APIs';


function Appointments() {
    const location = useLocation();
    const {
      selectedServiceId: initialSelectedServiceId,
      selectedServiceName: initialSelectedServiceName,
      selectedServiceCategory: initialSelectedServiceCategory,
    } = location.state || {};
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(initialSelectedServiceCategory ||"");
    const [selectedServiceId, setSelectedServiceId] = useState(initialSelectedServiceId || '');
    const [selectedServiceName, setSelectedServiceName] = useState(initialSelectedServiceName || '');
    const {data: availableSlots, error: slotError, fetchData: localFetchAvailableSlots} = useFetch(fetchAvailableTime, [date])
    const {data: categories, error: categoryError, fetchData: localFetchCategories} = useFetch(fetchCategories);
    const {data: services, error: serviceError, fetchData: localFetchServices} = useFetch(fetchServices, [selectedCategory]);



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
    }
    if(initialSelectedServiceId){
      setSelectedServiceId(initialSelectedServiceId)
    }
  }, [initialSelectedServiceCategory, initialSelectedServiceName, initialSelectedServiceId])


  const handleServiceChange = (e) => {
    const [id, name] = e.target.value.split('|');
    setSelectedServiceId(id);
    setSelectedServiceName(name);
  };

  const handleDateChange = (e) => {
    const rawDate = new Date(e.target.value);
    const formattedDate = format(rawDate, 'EEE, dd MMM yyyy');
    setDate(formattedDate);
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
        `${API_BASE_URL}/appointments/appointments`,
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
        throw new Error(errorData.message || 'Failed to create appointment');
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
      toast.error(`Error: ${error.message}`);
    }
  };


  return (
    <header className='appointments'>
      <section>
          <ToastContainer/>
          <form onSubmit={handleSubmit} className='form-field'>
              <fieldset>
                  <div className={'customerDetails'}>
                      <div className='customerDetails-row'>
                          <label htmlFor='Name' >Name</label>
                          <input id='Name'
                          type='text'
                          value={name}
                          onChange={(e) => setName(e.target.value)}  required />
                      </div>

                      <div className='customerDetails-row' >
                          <label htmlFor='email' >Email</label>
                          <input id='email'
                          type='email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required />
                      </div>

                      <div className='customerDetails-row' >
                          <label htmlFor='phoneNumber' >Phone</label>
                          <input id='phoneNumber'
                          type='text'
                          pattern="[0-9]{10}"
                          title="Enter a valid 10-digit phone number"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          required />
                      </div>
                  </div>

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
                      value={`${selectedServiceId}|${selectedServiceName}`}
                      onChange={handleServiceChange}
                      >
                          <option className="option" value="">
                              -- Select services --
                          </option>
                          {services.map((service) => (
                              <option className="option" key={service.service_id}
                                value={`${service.service_id}|${service.name}`}
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
                  </div>
              </fieldset>
              <button type="submit" className="submit-button">Book Appointment</button>
          </form>
      </section>
    </header>
  )
}

export default Appointments