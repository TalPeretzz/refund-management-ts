# Refund Management System

## Overview
The **Refund Management System** is a web-based application designed to streamline the process of submitting, reviewing, and approving refund requests within an organization. Employees can submit refund requests, managers can review and approve/reject them, and account managers can provide final approvals.

## Features
- **User Authentication**: Secure login using JWT authentication.
- **Role-Based Access**: Supports Employees, Managers, Account Managers, and Admins.
- **Request Submission**: Employees can submit refund requests with descriptions, attachments, and requested amounts.
- **Approval Workflow**:
  - Managers approve requests before forwarding them to Account Managers.
  - Account Managers review manager-approved requests before finalizing them.
- **Email Notifications**: Automated notifications to managers when new requests are submitted.
- **Request History**: View past refund requests with filtering options.
- **Export Reports**: Download reports in CSV, PDF, or Excel format.

## Technology Stack
### Backend
- **Node.js** with **Express.js**
- **Sequelize ORM** with **PostgreSQL**
- **JWT Authentication**
- **Nodemailer** for email notifications

### Frontend
- **React.js** with TypeScript
- **React Router** for navigation
- **Axios** for API calls
- **CSS Modules** for styling

## Installation
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or later)
- **PostgreSQL**
- **Git**

### Clone the Repository
```sh
git clone https://github.com/your-repo/refund-management.git
cd refund-management
```

### Backend Setup
1. Navigate to the `server` folder:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure the `.env` file:
   ```sh
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials and JWT secret.
4. Run database migrations:
   ```sh
   npx sequelize-cli db:migrate
   ```
5. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `client` folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```

## Usage
1. **Login** as an employee to submit refund requests.
2. **Managers** can review and approve/reject requests.
3. **Account Managers** finalize approvals.
4. Use the **History Tab** to view past requests.
5. **Export** reports for auditing purposes.

## Contribution
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m 'Added feature X'`.
4. Push to branch: `git push origin feature-name`.
5. Submit a pull request.

## License
This project is licensed under the **MIT License**.

## Contact
For issues or feature requests, please open a GitHub issue or contact the development team.

---

**Happy Coding! 🚀**

