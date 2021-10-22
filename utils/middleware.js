const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.status) {
    return response
      .status(error.status)
      .send({ error: true, message: error.message });
  }
  if (error.name === "CastError") {
    return response.json({
      error: error.name,
      message: `Invalid Data in ${error.path}`,
    });
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
