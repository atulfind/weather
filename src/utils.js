export const isValue = (value) => {
  return (value && value.trim() && value.trim().length > 0) || false;
};


export const isEmail = (value) => {
  return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
};


export const emailValidate = (value, authValue) => {
  if (!isValue(value)) {
    return 'Please enter email id';
  } else if (!isEmail(value)) {
    return 'Please enter valid email id';
  } else if(authValue && value !== authValue){
    return 'Email does not exist';
  }
};


export const passwordValidate = (value, authValue) => {
  if (!isValue(value)) {
    return 'Please enter the password';
  } else if (value.trim().length < 8 || value.trim().length > 32) {
    return 'Password should be 8 to 32 character';
  } else if (authValue && value !== authValue){
    return 'Please enter correct password';
  }
};

const getAuthArray = () => {
  return JSON.parse(localStorage.getItem('weatherAuthArray')) || []
}

export const addAuthUser = (obj) => {
  setAuth(obj);
  const dataArray = getAuthArray();
  localStorage.setItem('weatherAuthArray', JSON.stringify([...dataArray, obj]));
}

export const getAuthUser = (id) => {
  const dataArray = getAuthArray();
  return dataArray.find(item => item.email === id);
}

export const setAuth = (obj) => {
  localStorage.setItem('weatherSession', JSON.stringify(obj));
}

export const getAuth = () => {
  return JSON.parse(localStorage.getItem('weatherSession'));
}