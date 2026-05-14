# API Documentation - توثيق API

## Base URL
```
http://localhost:5000/api
```

## Authentication
جميع الطلبات (ما عدا التسجيل والدخول) تحتاج على Authorization Header:
```
Authorization: Bearer {token}
```

---

## 🔐 Auth Endpoints

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "اسم المستخدم",
  "email": "email@example.com",
  "password": "password123"
}

Response: 201
{
  "message": "✅ User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "اسم المستخدم",
    "email": "email@example.com"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "email@example.com",
  "password": "password123"
}

Response: 200
{
  "message": "✅ Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "اسم المستخدم",
    "email": "email@example.com"
  }
}
```

---

## 📚 Subjects Endpoints

### Get All Subjects
```http
GET /subjects
Authorization: Bearer {token}

Response: 200
[
  {
    "_id": "subject_id",
    "code": "MAT",
    "name": "الرياضيات",
    "icon": "🧮",
    "color": "#3B82F6",
    "totalCards": 50,
    "masteredCards": 25
  }
]
```

### Create Subject
```http
POST /subjects
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "MAT",
  "name": "الرياضيات",
  "description": "وصف المادة"
}

Response: 201
{
  "message": "✅ Subject created",
  "subject": {...}
}
```

### Update Subject
```http
PUT /subjects/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "اسم جديد",
  "description": "وصف جديد"
}

Response: 200
{
  "message": "✅ Subject updated",
  "subject": {...}
}
```

### Delete Subject
```http
DELETE /subjects/:id
Authorization: Bearer {token}

Response: 200
{
  "message": "✅ Subject deleted"
}
```

---

## 📖 Lessons Endpoints

### Get Lessons by Subject
```http
GET /lessons/subject/:subjectId
Authorization: Bearer {token}

Response: 200
[
  {
    "_id": "lesson_id",
    "title": "الدرس الأول",
    "description": "وصف الدرس",
    "totalCards": 10,
    "masteredCards": 5,
    "progress": 50
  }
]
```

### Create Lesson
```http
POST /lessons
Authorization: Bearer {token}
Content-Type: application/json

{
  "subjectId": "subject_id",
  "title": "اسم الدرس",
  "description": "وصف الدرس",
  "content": "محتوى الدرس"
}

Response: 201
{
  "message": "✅ Lesson created",
  "lesson": {...}
}
```

---

## 🎴 Cards Endpoints

### Get Cards by Lesson
```http
GET /cards/lesson/:lessonId
Authorization: Bearer {token}

Response: 200
[
  {
    "_id": "card_id",
    "question": "السؤال",
    "answer": "الإجابة",
    "difficulty": "medium",
    "status": "learning",
    "nextReviewDate": "2026-05-20T10:00:00Z"
  }
]
```

### Get Due Cards for Review
```http
GET /cards/review/due
Authorization: Bearer {token}

Response: 200
[
  {...card objects...}
]
```

### Create Card
```http
POST /cards
Authorization: Bearer {token}
Content-Type: application/json

{
  "lessonId": "lesson_id",
  "subjectId": "subject_id",
  "question": "السؤال",
  "answer": "الإجابة",
  "difficulty": "medium"
}

Response: 201
{
  "message": "✅ Card created",
  "card": {...}
}
```

### Update Card
```http
PUT /cards/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "question": "سؤال جديد",
  "answer": "إجابة جديدة"
}

Response: 200
{
  "message": "✅ Card updated",
  "card": {...}
}
```

### Delete Card
```http
DELETE /cards/:id
Authorization: Bearer {token}

Response: 200
{
  "message": "✅ Card deleted"
}
```

---

## 📊 Reviews Endpoints

### Submit Review
```http
POST /reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "cardId": "card_id",
  "quality": 5,
  "timeSpent": 30
}

Quality Scale:
  0 = Forgot (نسيت)
  1 = Incorrect response
  2 = Serious difficulty
  3 = Difficult but correct (صعب لكن صحيح)
  4 = Correct after pause
  5 = Perfect (مثالي)

Response: 201
{
  "message": "✅ Review submitted",
  "review": {...},
  "card": {...updated card...}
}
```

### Get All Reviews
```http
GET /reviews
Authorization: Bearer {token}

Response: 200
[
  {
    "_id": "review_id",
    "cardId": "card_id",
    "quality": 5,
    "reviewedAt": "2026-05-14T10:00:00Z"
  }
]
```

---

## ���� Statistics Endpoints

### Get Overall Stats
```http
GET /stats
Authorization: Bearer {token}

Response: 200
{
  "totalCards": 100,
  "masteredCards": 45,
  "learningCards": 30,
  "reviewingCards": 20,
  "newCards": 5,
  "totalReviews": 250,
  "totalSubjects": 5,
  "masteryPercentage": 45
}
```

### Get Subject Stats
```http
GET /stats/subject/:subjectId
Authorization: Bearer {token}

Response: 200
{
  "subject": "الرياضيات",
  "totalCards": 50,
  "masteredCards": 25,
  "learningCards": 20,
  "masteryPercentage": 50
}
```

### Get Today's Progress
```http
GET /stats/today/progress
Authorization: Bearer {token}

Response: 200
{
  "reviewsToday": 10,
  "dueCards": 5,
  "completedToday": 10
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "errors": [
    {
      "param": "email",
      "msg": "Invalid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "❌ No token, authorization denied"
}
```

### 404 Not Found
```json
{
  "message": "Subject not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Error details here"
}
```

---

**آخر تحديث**: 2026-05-14
