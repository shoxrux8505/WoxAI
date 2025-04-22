import emailjs from 'emailjs-com';

const initEmailJS = () => {
  emailjs.init(process.env.VUE_APP_EMAILJS_USER_ID);
};

export { initEmailJS };