module.exports = (success, message, httpCode, data = {}) => {
  if (!process.env.NODE_ENV !== 'production') console.log(message); // debug output                   
  return (req, res) => {
    return res.status(httpCode).json(Object.assign({
      success: success,
      message: message
    }, data));
  };
};
