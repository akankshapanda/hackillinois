export const sendEmail = (subject, body) => {
  window.open(`mailto:?subject=${subject}&body=${body}`);
};
