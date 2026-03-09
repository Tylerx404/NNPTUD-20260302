# NNPTUD-20260302

REST API cho 2 object `User` và `Role` với MongoDB (no auth), hỗ trợ:
- CRUD cho `User` và `Role`
- Read gồm: get all, get by id
- Delete là soft delete (`isDeleted`, `deletedAt`)
- `POST /enable` và `POST /disable` theo `email` + `username`

## 1) Cài đặt

```bash
npm install
cp .env.example .env
npm run dev
```

## 2) MongoDB no auth

Mặc định dùng chuỗi kết nối (không username/password):

```env
MONGO_URI=mongodb://127.0.0.1:27017/nnptud
```

## 3) API endpoints

### Role
- `POST /api/roles`
- `GET /api/roles`
- `GET /api/roles/:id`
- `PUT /api/roles/:id`
- `DELETE /api/roles/:id` (soft delete)

### User
- `POST /api/users`
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id` (soft delete)

### Enable/Disable
- `POST /enable`
- `POST /disable`
- `POST /api/enable`
- `POST /api/disable`
- (có thêm alias) `POST /api/users/enable`, `POST /api/users/disable`

Body mẫu:

```json
{
  "email": "test@example.com",
  "username": "testuser"
}
```

## 4) Req/Res mẫu cho từng endpoint

Base URL ví dụ: `http://localhost:3000`

### 4.1 Role

`POST /api/roles`

Request body:
```json
{
  "name": "admin",
  "description": "Administrator role"
}
```

Response `201`:
```json
{
  "name": "admin",
  "description": "Administrator role",
  "isDeleted": false,
  "deletedAt": null,
  "_id": "65f000000000000000000001",
  "createdAt": "2026-03-02T08:00:00.000Z",
  "updatedAt": "2026-03-02T08:00:00.000Z",
  "__v": 0
}
```

`GET /api/roles`

Response `200`:
```json
[
  {
    "_id": "65f000000000000000000001",
    "name": "admin",
    "description": "Administrator role",
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2026-03-02T08:00:00.000Z",
    "updatedAt": "2026-03-02T08:00:00.000Z",
    "__v": 0
  }
]
```

`GET /api/roles/:id`

Response `200`:
```json
{
  "_id": "65f000000000000000000001",
  "name": "admin",
  "description": "Administrator role",
  "isDeleted": false,
  "deletedAt": null,
  "createdAt": "2026-03-02T08:00:00.000Z",
  "updatedAt": "2026-03-02T08:00:00.000Z",
  "__v": 0
}
```

`PUT /api/roles/:id`

Request body:
```json
{
  "description": "Updated admin role"
}
```

Response `200`:
```json
{
  "_id": "65f000000000000000000001",
  "name": "admin",
  "description": "Updated admin role",
  "isDeleted": false,
  "deletedAt": null,
  "createdAt": "2026-03-02T08:00:00.000Z",
  "updatedAt": "2026-03-02T08:05:00.000Z",
  "__v": 0
}
```

`DELETE /api/roles/:id` (soft delete)

Response `200`:
```json
{
  "message": "Role deleted (soft delete)",
  "role": {
    "_id": "65f000000000000000000001",
    "name": "admin",
    "description": "Updated admin role",
    "isDeleted": true,
    "deletedAt": "2026-03-02T08:10:00.000Z",
    "createdAt": "2026-03-02T08:00:00.000Z",
    "updatedAt": "2026-03-02T08:10:00.000Z",
    "__v": 0
  }
}
```

### 4.2 User

`POST /api/users`

Request body:
```json
{
  "username": "tai",
  "password": "123456",
  "email": "tai@example.com",
  "fullName": "Dinh Van Tai",
  "role": "65f000000000000000000001"
}
```

Response `201`:
```json
{
  "username": "tai",
  "password": "123456",
  "email": "tai@example.com",
  "fullName": "Dinh Van Tai",
  "avatarUrl": "https://i.sstatic.net/l60Hf.png",
  "status": false,
  "role": "65f000000000000000000001",
  "loginCount": 0,
  "isDeleted": false,
  "deletedAt": null,
  "_id": "65f000000000000000000010",
  "createdAt": "2026-03-02T08:20:00.000Z",
  "updatedAt": "2026-03-02T08:20:00.000Z",
  "__v": 0
}
```

`GET /api/users`

Response `200`:
```json
[
  {
    "_id": "65f000000000000000000010",
    "username": "tai",
    "password": "123456",
    "email": "tai@example.com",
    "fullName": "Dinh Van Tai",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png",
    "status": false,
    "role": {
      "_id": "65f000000000000000000001",
      "name": "admin",
      "description": "Administrator role",
      "isDeleted": false,
      "deletedAt": null,
      "createdAt": "2026-03-02T08:00:00.000Z",
      "updatedAt": "2026-03-02T08:00:00.000Z",
      "__v": 0
    },
    "loginCount": 0,
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2026-03-02T08:20:00.000Z",
    "updatedAt": "2026-03-02T08:20:00.000Z",
    "__v": 0
  }
]
```

`GET /api/users/:id`

Response `200`:
```json
{
  "_id": "65f000000000000000000010",
  "username": "tai",
  "password": "123456",
  "email": "tai@example.com",
  "fullName": "Dinh Van Tai",
  "avatarUrl": "https://i.sstatic.net/l60Hf.png",
  "status": false,
  "role": {
    "_id": "65f000000000000000000001",
    "name": "admin",
    "description": "Administrator role",
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2026-03-02T08:00:00.000Z",
    "updatedAt": "2026-03-02T08:00:00.000Z",
    "__v": 0
  },
  "loginCount": 0,
  "isDeleted": false,
  "deletedAt": null,
  "createdAt": "2026-03-02T08:20:00.000Z",
  "updatedAt": "2026-03-02T08:20:00.000Z",
  "__v": 0
}
```

`PUT /api/users/:id`

Request body:
```json
{
  "fullName": "Dinh Van Tai Updated",
  "loginCount": 1
}
```

Response `200`:
```json
{
  "_id": "65f000000000000000000010",
  "username": "tai",
  "password": "123456",
  "email": "tai@example.com",
  "fullName": "Dinh Van Tai Updated",
  "avatarUrl": "https://i.sstatic.net/l60Hf.png",
  "status": false,
  "role": {
    "_id": "65f000000000000000000001",
    "name": "admin",
    "description": "Administrator role",
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2026-03-02T08:00:00.000Z",
    "updatedAt": "2026-03-02T08:00:00.000Z",
    "__v": 0
  },
  "loginCount": 1,
  "isDeleted": false,
  "deletedAt": null,
  "createdAt": "2026-03-02T08:20:00.000Z",
  "updatedAt": "2026-03-02T08:25:00.000Z",
  "__v": 0
}
```

`DELETE /api/users/:id` (soft delete)

Response `200`:
```json
{
  "message": "User deleted (soft delete)",
  "user": {
    "_id": "65f000000000000000000010",
    "username": "tai",
    "password": "123456",
    "email": "tai@example.com",
    "fullName": "Dinh Van Tai Updated",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png",
    "status": false,
    "role": "65f000000000000000000001",
    "loginCount": 1,
    "isDeleted": true,
    "deletedAt": "2026-03-02T08:30:00.000Z",
    "createdAt": "2026-03-02T08:20:00.000Z",
    "updatedAt": "2026-03-02T08:30:00.000Z",
    "__v": 0
  }
}
```

### 4.3 Enable/Disable User

Áp dụng giống nhau cho các endpoint sau:
- `POST /enable`
- `POST /disable`
- `POST /api/enable`
- `POST /api/disable`
- `POST /api/users/enable`
- `POST /api/users/disable`

Request body:
```json
{
  "email": "tai@example.com",
  "username": "tai"
}
```

`POST /enable` response `200`:
```json
{
  "message": "User status set to true",
  "user": {
    "_id": "65f000000000000000000010",
    "username": "tai",
    "password": "123456",
    "email": "tai@example.com",
    "fullName": "Dinh Van Tai",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png",
    "status": true,
    "role": {
      "_id": "65f000000000000000000001",
      "name": "admin",
      "description": "Administrator role",
      "isDeleted": false,
      "deletedAt": null,
      "createdAt": "2026-03-02T08:00:00.000Z",
      "updatedAt": "2026-03-02T08:00:00.000Z",
      "__v": 0
    },
    "loginCount": 0,
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2026-03-02T08:20:00.000Z",
    "updatedAt": "2026-03-02T08:35:00.000Z",
    "__v": 0
  }
}
```

`POST /disable` response `200`:
```json
{
  "message": "User status set to false",
  "user": {
    "_id": "65f000000000000000000010",
    "username": "tai",
    "password": "123456",
    "email": "tai@example.com",
    "fullName": "Dinh Van Tai",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png",
    "status": false,
    "role": {
      "_id": "65f000000000000000000001",
      "name": "admin",
      "description": "Administrator role",
      "isDeleted": false,
      "deletedAt": null,
      "createdAt": "2026-03-02T08:00:00.000Z",
      "updatedAt": "2026-03-02T08:00:00.000Z",
      "__v": 0
    },
    "loginCount": 0,
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2026-03-02T08:20:00.000Z",
    "updatedAt": "2026-03-02T08:40:00.000Z",
    "__v": 0
  }
}
```

Response lỗi thường gặp:
```json
{
  "message": "email and username are required"
}
```

```json
{
  "message": "User not found or information is incorrect"
}
```

## 5) Schema chính

### User
- `username`: string, unique, required
- `password`: string, required
- `email`: string, unique, required
- `fullName`: string, default `""`
- `avatarUrl`: string, default `"https://i.sstatic.net/l60Hf.png"`
- `status`: boolean, default `false`
- `role`: ObjectId ref `Role`
- `loginCount`: number, default `0`, min `0`
- `timestamps`
- `isDeleted`, `deletedAt` cho soft delete

### Role
- `name`: string, unique, required
- `description`: string, default `""`
- `timestamps`
- `isDeleted`, `deletedAt` cho soft delete
