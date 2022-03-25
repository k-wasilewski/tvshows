const mailer = require("nodemailer");

const smtp = mailer.createTransport({
  host: "0.0.0.0",
  port: "1025",
});

const mailOptions = {
  from: "noreply@test.com",
  to: "johndoe@test.com",
  subject: "Your account is now confirmed",
  html: "<h1>Thanks for the verification</h1><p>Your username is: johndoe</p>",
};

smtp.sendMail(mailOptions, function (err, info) {
  if (!err) {
    console.log("Mail success: " + info.response);
  } else {
    console.log("Mail err", err);
  }
  smtp.close();
});
