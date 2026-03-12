import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendBookingEmail = async (toEmail, bookingDetails) => {
  const { name, date, startTime, endTime } = bookingDetails;
  
  const mailOptions = {
    from: process.env.SMTP_USER ? `"Admin" <${process.env.SMTP_USER}>` : '"Admin" <admin@example.com>',
    to: toEmail,
    subject: `Your Booking Confirmation for ${date}`,
    text: `Hi ${name},\n\nYour booking has been successfully scheduled.\n\nDate: ${date}\nTime: ${startTime} to ${endTime}\n\nThank you!`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Booking Confirmation</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Your booking has been successfully scheduled.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${startTime} to ${endTime}</p>
        </div>
        <p>Thank you!</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
