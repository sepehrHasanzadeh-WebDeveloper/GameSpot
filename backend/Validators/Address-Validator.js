const Validator = require("fastest-validator");
const v = new Validator();

const addressSchema = {
  street: {
    type: "string",
    min: 10,
    max: 100,
    messages: {
      required: "ادرس را وارد نکردید",
      stringMin: "ادرس باید بیشتر از 10 کاراکتر باشد",
    },
  },
  city: {
    type: "string",
    min: 2,
    max: 50,
    messages: {
      required: "نام شهر را وارد نکردید",
      stringMin: "نام شهر باید از 3 حرف بیشتر باشد ",
    },
  },
  postalcode: {
    type: "string",
    pattern: /^\d{10}$/,
    messages: {
      required: "ادرس را وارد نکردید",
      stringPattern: "کد پستی باید فقط عدد باشد  و 10 رقم باشد",
    },
  },
  country: {
    type: "string",
    min: 3,
    max: 50,
    messages: {
      required: "نام کشور را وارد نکردید",
      stringMin: "نام کشور باید از 3 حرف بیشتر باشد ",
    },
  },
};

const validateAddress = v.compile(addressSchema);

function ValidateAndSanatize(data) {
  const result = validateAddress(data);
  if (result !== true) {
    const sanatizeError = result.map((err) => {
      const { expected, type, actual, field, ...rest } = err;
      return rest;
    });
    return sanatizeError;
  } else {
    return true;
  }
}
module.exports = ValidateAndSanatize;
