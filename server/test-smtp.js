import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

console.log('Testing SMTP connection with:');
console.log('Host:', process.env.SMTP_HOST);
console.log('Port:', process.env.SMTP_PORT);
console.log('User:', process.env.SMTP_USER);
console.log('Pass:', process.env.SMTP_PASS ? '********' : 'NOT SET');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function testConnection() {
  try {
    const success = await transporter.verify();
    console.log('✅ SMTP connection successful!', success);
    
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: `"Admin Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "Test Email Deployment",
      text: "If you are reading this, your SMTP settings are working perfectly!",
    });
    console.log('✅ Test email sent: %s', info.messageId);
  } catch (error) {
    console.error('❌ SMTP connection failed:', error);
  }
}

testConnection();
