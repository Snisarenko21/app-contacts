const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Email verification",
    text: "and easy to do anywhere, even with Node.js",
    html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank"><strong>Please verify email</strong></a>`,
  };

  return mail;
};

module.exports = createVerifyEmail;
