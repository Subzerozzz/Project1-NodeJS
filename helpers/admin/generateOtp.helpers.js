module.exports.generateOtp = (number) => {
  const chuoiNgauNhien = "0123456789";
  let otp = "";
  for (let i = 0; i < number; i++) {
    const randomIndex = Math.floor(Math.random() * chuoiNgauNhien.length);
    otp += chuoiNgauNhien[randomIndex];
  }
  return otp;
};
