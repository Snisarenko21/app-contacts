const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/users");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../../helpers/sendEmail");
const createVerifyEmail = require("../../helpers/createVerifyEmail");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = uuidv4();

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  await result.save();
  await sendEmail(email);
  const mail = createVerifyEmail(email, verificationToken);
  await sendEmail(mail)
    .then(() => {
      console.log("Email send successful");
    })
    .catch((error) => {
      console.error(error.message);
    });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
