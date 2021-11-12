import { useState } from 'react';

function useForm(callback) {
  const [values, setValues] = useState({});
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    callback(); 
  };

  const handleChange = (event) => {
    event.persist();
    
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    
    if (Object.values(values).some(value =>  value.trim() === '')) {
      setDisabled(true);  
    } else {
      setDisabled(false);
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
    disabled
  }
};

export default useForm;