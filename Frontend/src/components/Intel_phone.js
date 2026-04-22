// PhoneInput.js
import React, { useEffect, useRef } from 'react';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

const PhoneInput = () => {
  const inputRef = useRef(null);
  const itiRef = useRef(null); // For accessing the plugin instance if needed

  useEffect(() => {
    if (inputRef.current) {
      itiRef.current = intlTelInput(inputRef.current, {
        initialCountry: 'auto',
        geoIpLookup: callback => {
          fetch('https://ipapi.co/json')
            .then(res => res.json())
            .then(data => {
              callback(data.country_code);
            })
            .catch(() => callback('us'));
        },
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js', // Needed for formatting/validation
      });
    }

    return () => {
      if (itiRef.current) {
        itiRef.current.destroy();
      }
    };
  }, []);

  return (
    <input
      type="tel"
      ref={inputRef}
      className="form-control"
      placeholder="Enter phone number"
    />
  );
};

export default PhoneInput;
