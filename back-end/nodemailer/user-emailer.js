const nodemailer = require('nodemailer');

module.exports = async (userMail) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'atm.software0@gmail.com',
            pass: 'Qwerty123!'
        }
    })
    
    const result = await transporter.sendMail({
    from: '<atm.software0@gmail.com>',
    to: `${userMail}`,
    subject: 'Message from ATM Software',
    // text: 'This message was sent from Node js server.',
    html: `This message was sent from <strong>ATM Software</strong> server. 
    Confirm your registration by following this <a href="http://localhost:3000/mailConfirmation?user=${userMail}">link<a>.`
})
console.log(result);

}
