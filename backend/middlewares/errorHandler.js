const errorHandler = (err, req, res, next) => {
  res.status(500).send("در حال حاظر مشکلی پیش امده لطفا دوباره امتحان کنید  ");
};
module.exports = errorHandler;
