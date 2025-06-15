# 🍽️ Kraving App

Kraving is a modern food ordering application powered by AWS infrastructure. It’s built with a microservice approach using Docker containers for the frontend and backend, and leverages scalable AWS resources for high availability, performance, and security.

---

## 📦 Repository Structure

```
.
├── client/            # Frontend React app
├── backend/           # Backend Node.js server
├── docker-compose.yml
├── cloudformation.yml # AWS infrastructure template
└── README.md
```

---

## 🚀 How to Run the App (Locally or in EC2)

The application is split into two services — frontend and backend — each containerized and orchestrated via Docker Compose.

### 🧰 Prerequisites

- Node.js & npm
- Docker & Docker Compose
- AWS CLI (if deploying infrastructure)
- AWS credentials configured

### 🔧 Local Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Ali-Shan-Khawaja/Kraving_App.git
   cd Kraving_App
   ```

2. **Start the app using Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Alternatively, run manually inside EC2 (as done in production):**
   ```bash
   cd client
   npm install
   npm start

   # In a new terminal
   cd ../backend
   npm install
   npm start
   ```

---

## ☁️ AWS Infrastructure Overview

The app is deployed via CloudFormation using the `cloudformation.yml` template in this repo. It provisions the following:

### 🔐 **VPC Structure**

- **Public Subnets:** 
  - Hosts Application Load Balancer (ALB), Network Load Balancer (NLB), and NAT Gateway
- **Private Subnets:** 
  - Hosts EC2 instance running the application
  - Connects to DynamoDB and Lambda functions
- **Internet Gateway:** 
  - Allows inbound access to public-facing resources

### 🧱 **Services Used**

| Service       | Purpose |
|---------------|---------|
| **VPC**       | Isolated network infrastructure |
| **EC2**       | Hosts the Node.js and React app in Docker containers |
| **ALB**       | Routes HTTP traffic to the frontend |
| **NLB**       | Routes TCP traffic (e.g. SSH or backend API) |
| **DynamoDB**  | Stores users, restaurants, menu, and order history |
| **Lambda**    | Performs tasks like SMS notifications via AWS SNS |
| **Cognito**   | Handles user authentication and secure sign-in flows |

---

## 🧭 Network Interaction Flow

1. **User Request:**
   - User accesses the app via a public ALB
   - Traffic flows through the Internet Gateway to the public subnet

2. **Load Balancer:**
   - ALB/NLB forwards the request to EC2 in the private subnet

3. **App Logic (EC2):**
   - Frontend and backend containers handle logic and API processing

4. **Data Access:**
   - EC2 securely accesses DynamoDB tables (users, menu, restaurants, orders)
   - Lambda functions are invoked for background operations (e.g., sending SMS)

5. **Security:**
   - Only ALB/NLB are exposed publicly
   - EC2 and databases are in a private network
   - Cognito provides secure, managed authentication for users

---

## 🔐 Authentication with AWS Cognito

The app uses AWS Cognito to manage:
- User signup and login
- JWT token-based session handling
- Role-based access to protected backend routes

---

## 🧾 License

This project is licensed under the MIT License.
