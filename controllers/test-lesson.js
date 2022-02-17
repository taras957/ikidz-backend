const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
  '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'
);

exports.createTestLesson = async function (req, res, next) {
  const { name, email = 'Не вказано', phone } = req.body;
  const msg = {
    to: 'ikidzschool2017@gmail.com', // Change to your recipient
    from: 'ikidzschool2017@gmail.com', // Change to your verified sender
    subject: 'Реєстрація на пробний урок',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<strong>Ім'я</strong> <p>${name} </p> <br/> 
        <strong>Email</strong> <a href='mailto:${email}'>${email} </a> <br/>
        <strong>Телефон</strong> <a href='mailto:${phone}'>${phone} </a> <br/> `,
  };

  try {
    sgMail
      .send(msg)
      .then((response) => {
        res.json({ status: response[0].statusCode });
        console.log('Email sent');

        console.log(response[0].statusCode);
        // console.log(response[0].headers);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (e) {
    res.json({ message: e });
  }
};
