const app = require("./app");
const config = require("./src/config/config");
const createError = require("http-errors");
const { errorResponse } = require("./src/helpers/responseHelpers");

//client error handling
app.use((req, res, next) => {
  next(createError(404, "route not found"));
});

//server error handling
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.statusCode,
    message: err.message,
  });
});

// app.js (Main Express Application)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = config.app.port;

app.listen(PORT, () => console.log(`server start at http://localhost:${PORT}`));
