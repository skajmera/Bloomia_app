const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' });
  };

  const errorHandler = (error, request, response, next) => {
      console.log(error);
    if (error.status) {
      return response.status(error.status).send({ error: error.message });
    }
    if (error.message) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(500).json({ error: error.message });
  };
  
  module.exports = {
    unknownEndpoint,
    errorHandler,
  };
