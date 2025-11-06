const Joi = require("joi");

module.exports.registerPost = async (req, res, next) => {
  //Lấy ra các thuộc tính
  const { fullName, email, password } = req.body;
  //Dùng joi để validate
  const schemaValidate = Joi.object({
    fullName: Joi.string().min(5).max(50).required().messages({
      "string.empty": "Vui lòng nhập họ tên!",
      "string.min": "Họ tên phải có ít nhất 5 ký tự!",
      "string.max": "Họ tên không được vượt quá 50 ký tự!",
    }),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "Vui lòng nhập email của bạn!",
        "string.email": "Email không đúng định dạng!",
      }),

    password: Joi.string()
      .pattern(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$")
      )
      .required()
      .messages({
        "string.empty": "Vui lòng nhập mật khẩu!",
        "string.pattern.base":
          "Mật khẩu phải chứa ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt!",
      }),
  });
  try {
    await schemaValidate.validateAsync({
      fullName: fullName,
      email: email,
      password: password,
    });
    next();
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: error.details[0].message,
    });
  }
};
