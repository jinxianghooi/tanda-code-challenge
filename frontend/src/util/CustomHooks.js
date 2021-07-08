import { useState } from 'react';

const FormHook = (callback, initialValue) => {
  const [inputs, setInputs] = useState(initialValue);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  }

  const handleInputChange = (event) => {
    console.log(inputs)
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  }

  return {
    inputs,
    handleInputChange,
    handleSubmit,
  };
}

export default FormHook;