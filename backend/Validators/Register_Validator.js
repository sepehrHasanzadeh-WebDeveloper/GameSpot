const Validator = require("fastest-validator");

const v = new Validator();

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
  firstName: {
    type: "string",
    pattern: /^[A-Za-z\u0600-\u06FF\s]{2,20}$/,
    messages: {
      stringPattern:
        "نام باید فقط شامل حروف فارسی یا انگلیسی و حداقل ۲ حرف باشد.",
    },
  },
  lastName: {
    type: "string",
    pattern: /^[A-Za-z\u0600-\u06FF\s]{2,50}$/,
    messages: {
      stringPattern:
        "نام خانوادگی باید فقط شامل حروف فارسی یا انگلیسی و حداقل ۲ حرف باشد.",
    },
  },
  phoneNumber: {
    type: "string",
    pattern: /^09\d{9}$/,
    messages: {
      stringPattern: "شماره تلفن معتبر نیست",
    },
  },
};

const Validate = v.compile(schema);

function ValidateAndSanatize(data) {
  const result = Validate(data);
  if (result !== true) {
    const sanatizeError = result.map((error) => {
      const { field, expected, type, actual, ...rest } = error;
      return rest;
    });
    return sanatizeError;
  } else {
    return true;
  }
}

module.exports = ValidateAndSanatize;
