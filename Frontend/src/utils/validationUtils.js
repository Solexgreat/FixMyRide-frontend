export const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    console.log("Validating:", number);
    return phoneRegex.test(number);
  };