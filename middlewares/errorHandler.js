const Response = require("../classes/Response");

exports.notFoundErrorHandler = (req, res, next) => {
  const error = new Error("API endpoint not found");
  const responseData = new Response({
    Status: 404,
    Error: error,
  });
  res.send(responseData.getResponse());
};
