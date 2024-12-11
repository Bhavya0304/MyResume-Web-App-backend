const nodemailer = require('nodemailer');

const sendEmail = async (recipient, subject, body) => {
    try {
        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email provider, e.g., Gmail
            secure:true,
            port:465,
            auth: {
                user: process.env.Email, // Replace with your email
                pass: process.env.Email_Password  // Replace with your email password
            }
        });

        // Email options
        const mailOptions = {
            from: 'jshi.bhavya@gmail.com', // Sender address
            to: recipient, // Recipient email address
            subject: subject, // Subject line
            html: body, // HTML content
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return { success: true, info };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};

module.exports = sendEmail;
