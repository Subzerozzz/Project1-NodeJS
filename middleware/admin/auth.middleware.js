const jwt = require("jsonwebtoken");
const { urlAdmin } = require("../../config/variable");
const AccountAdmin = require("../../models/account.model");

module.exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  //Giải mã token
  if (!token) {
    res.redirect(`/${urlAdmin}/account/login`);
    return;
  }
  try {
    //Giải mã token
    const { id, email } = jwt.verify(token, process.env.JWT_SECRET);
    //Tìm xem với id và email này có tồn tại trong DB không
    const existAccount = await AccountAdmin.findOne({ _id: id, email: email });
    if (!existAccount) {
      res.redirect(`/${urlAdmin}/account/login`);
      return;
    }
    req.account = existAccount;
    res.locals.account = existAccount;
    next();
  } catch (error) {
    res.redirect(`/${urlAdmin}/account/login`);
    return;
  }
};
