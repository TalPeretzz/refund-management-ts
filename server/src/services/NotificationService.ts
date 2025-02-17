import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Logger from "../utils/logget";
import db from "../models";

dotenv.config();

class NotificationService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password (use app password for Gmail)
      },
    });
  }

  /**
   * Send an email notification to the manager
   * @param to - Manager's email
   * @param employeeName - Employee who submitted the request
   * @param requestTitle - Title of the refund request
   */
  async sendNewRequestNotification(
    to: string,
    employeeName: string,
    requestTitle: string,
    requestId: string,
    status: string
  ) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "New Refund Request Submitted",
      text: `Hello, 

You have a new refund request submitted by ${employeeName}.

Title: ${requestTitle}

Please log in to review and approve/reject the request.

Best regards,
Refund Management System`,
    };
    const message = JSON.stringify(mailOptions);
    const notification = await db.Notification.create({
      requestId,
      message,
      status,
    });

    try {
      await this.transporter.sendMail(mailOptions);
      Logger.info(`📧 Email sent to ${to}`);
    } catch (error) {
      Logger.error(`❌ Failed to send email: ${error}`);
    }
  }
}

export default new NotificationService();
