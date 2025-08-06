const validator = require("fastest-validator");

const v = new validator();

const schema = {
  email: {
    type: "email",
    messages: {
      required: "ادرس ایمیل را وارد نکردید ",
      email: "ایمیل نادرست میباشد",
      emailEmpty: "ادرس ایمیل را وارد نکردید ",
    },
  },
  password: {
    type: "string",
    min: 8,
    max: 20,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
    messages: {
      stringMin: "رمز عبور حداقل باید 8 کاراکتر باشد ",
      stringPattern: "پسورد حداقل باید داری یک حرف کوچک و حرف بزرگ و عدد باشد ",
    },
  },
};

const Validate = v.compile(schema);

function ValidateAndSanatize(data) {
  const result = Validate(data);
  if (result !== true) {
    const sanatizeError = result.map((error) => {
      const { expected, type, actual, field, ...rest } = error;
      return rest;
    });
    return sanatizeError;
  } else {
    return true;
  }
}

module.exports = ValidateAndSanatize;
