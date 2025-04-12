# API Documentation

## 1. Authentication Endpoints

### 1.1 User Registration (Signup)
**Endpoint:**  
`POST http://localhost:3000/api/auth/signup`  

**Request Body (JSON):**  
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Token Required:** No  

**Expected Response (JSON):**  
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "636c9d1dabc1234567890abc",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "status": "active"
  }
}
```

---

### 1.2 User Login
**Endpoint:**  
`POST http://localhost:3000/api/auth/login`  

**Request Body (JSON):**  
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Token Required:** No  

**Expected Response (JSON):**  
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
}
```

**Note:** Use the returned token in the `Authorization: Bearer <token>` header for authenticated requests.

---

## 2. User Profile Endpoints  
*Requires JWT token in the `Authorization` header.*

### 2.1 Get User Profile  
**Endpoint:**  
`GET http://localhost:3000/api/user/profile`  

**Headers:**  
```
Authorization: Bearer <your_JWT_token>
```

**Expected Response (JSON):**  
```json
{
  "_id": "636c9d1dabc1234567890abc",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "status": "active"
}
```

---

### 2.2 Update User Profile  
**Endpoint:**  
`PUT http://localhost:3000/api/user/profile`  

**Headers:**  
```
Authorization: Bearer <your_JWT_token>
```

**Request Body (JSON):**  
```json
{
  "name": "Johnny Doe"
}
```

**Expected Response (JSON):**  
```json
{
  "_id": "636c9d1dabc1234567890abc",
  "email": "user@example.com",
  "name": "Johnny Doe",
  "role": "user",
  "status": "active"
}
```

---

## 3. Wallet Endpoints  
*Requires JWT token in the `Authorization` header.*

### 3.1 Get Wallet Balance  
**Endpoint:**  
`GET http://localhost:3000/api/wallet/balance`  

**Headers:**  
```
Authorization: Bearer <your_JWT_token>
```

**Expected Response (JSON):**  
```json
{
  "balance": 0
}
```

---

### 3.2 Top-Up Wallet  
**Endpoint:**  
`POST http://localhost:3000/api/wallet/topup`  

**Headers:**  
```
Authorization: Bearer <your_JWT_token>
```

**Request Body (JSON):**  
```json
{
  "amount": 100
}
```

**Expected Response (JSON):**  
```json
{
  "balance": 100
}
```

---

### 3.3 Withdraw Funds  
**Endpoint:**  
`POST http://localhost:3000/api/wallet/withdraw`  

**Headers:**  
```
Authorization: Bearer <your_JWT_token>
```

**Request Body (JSON):**  
```json
{
  "amount": 50
}
```

**Expected Response (JSON):**  
```json
{
  "balance": 50
}
```

---

### 3.4 Peer-to-Peer Transfer (Send Money)  
**Endpoint:**  
`POST http://localhost:3000/api/wallet/send`  

**Headers:**  
```
Authorization: Bearer <your_JWT_token>
```

**Request Body (JSON):**  
```json
{
  "recipientId": "636c9d1dabc9876543210fed",
  "amount": 20
}
```

**Expected Response (JSON):**  
```json
{
  "senderWallet": {
    "_id": "636c9d1dabc1234567890abc",
    "userId": "636c9d1dabc1234567890abc",
    "balance": 80
  },
  "recipientWallet": {
    "_id": "636c9d1dabc9876543210fed",
    "userId": "636c9d1dabc9876543210fed",
    "balance": 20
  }
}
```

---

## 4. Transaction Endpoints  
*Requires JWT token in the `Authorization` header.*

### 4.1 Get Transaction History  
**Endpoint:**  
`GET http://localhost:3000/api/transaction/history`  

**Headers:**  
```
Authorization: Bearer <your_JWT_token>
```

**Expected Response (JSON):**  
```json
[
  {
    "_id": "636ca0adabc1234567890aaa",
    "userId": "636c9d1dabc1234567890abc",
    "type": "topup",
    "amount": 100,
    "description": "Wallet Top-up",
    "createdAt": "2023-11-25T12:00:00.000Z"
  },
  {
    "_id": "636ca0bdabc1234567890aab",
    "userId": "636c9d1dabc1234567890abc",
    "type": "withdraw",
    "amount": -50,
    "description": "Wallet Withdrawal",
    "createdAt": "2023-11-25T12:05:00.000Z"
  }
]
```

---

## 5. QR Code Endpoints  
*Requires JWT token in the `Authorization` header.*

### 5.1 Generate QR Code  
**Endpoint:**  
`POST http://localhost:3000/api/qr-code/generate`  

**Headers:**  
```
Authorization: Bearer <your_JWT_token>
```

**Request Body (JSON):**  
```json
{
  "recipientId": "636c9d1dabc9876543210fed",
  "amount": 30,
  "description": "Payment for services"
}
```

**Expected Response (JSON):**  
```json
{
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

**Note:** The QR code is returned as a Base64-encoded image URL.

---

## 6. OTP Endpoints  

### 6.1 Request OTP via Email  
**Endpoint:**  
`POST http://localhost:3000/api/otp/request`  

**Request Body (JSON):**  
```json
{
  "email": "user@example.com"
}
```

**Expected Response (JSON):**  
```json
{
  "message": "OTP sent to your email"
}
```

**Note:** The OTP is sent via email (logged server-side for testing).

---

### 6.2 Verify OTP  
**Endpoint:**  
`POST http://localhost:3000/api/otp/verify`  

**Request Body (JSON):**  
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Expected Response (JSON):**  
```json
{
  "valid": true
}
```

---

## 7. Admin Endpoints  
*Requires JWT token with `"role": "admin"`.*

### 7.1 List All Users  
**Endpoint:**  
`GET http://localhost:3000/api/admin/users`  

**Headers:**  
```
Authorization: Bearer <admin_JWT_token>
```

**Expected Response (JSON):**  
```json
[
  {
    "_id": "636c9d1dabc1234567890abc",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "status": "active"
  }
]
```

---

*(Continue similarly for other admin endpoints, following the structure above.)*

---

**Notes:**  
- Replace `<your_JWT_token>` with the actual token obtained from the login endpoint.  
- Admin endpoints require a valid admin token in the `Authorization` header.  
- For errors, refer to standard HTTP status codes (e.g., `401 Unauthorized`, `404 Not Found`).
