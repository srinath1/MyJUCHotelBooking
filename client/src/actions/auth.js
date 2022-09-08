import axios from 'axios'
export const register=async(user) =>await axios.post(`https://myjuchotelbooking.herokuapp.com/register`,user)
export const login=async(user) =>await axios.post(`https://myjuchotelbooking.herokuapp.com/login`,user);
export const updateUserInLocalStorage = (user, next) => {
    if (window.localStorage.getItem("auth")) {
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = user;
      localStorage.setItem("auth", JSON.stringify(auth));
      next();
    }
  };

  
