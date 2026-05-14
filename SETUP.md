# 📚 Bac Review App - دليل البدء السريع

## 🎯 نظرة عامة

تطبيق ويب متكامل لمساعدة طلاب البكالوريا على المراجعة الفعالة باستخدام تقنية التدكر المتباعد (Spaced Repetition).

## 📋 المتطلبات

- Node.js v14+
- npm أو yarn
- MongoDB (محلي أو سحابي مثل MongoDB Atlas)

## 🚀 التثبيت والتشغيل

### 1. استنساخ المشروع

```bash
git clone https://github.com/ismailrossafi55-collab/Bac-Review-App.git
cd Bac-Review-App
```

### 2. إعداد Backend

```bash
cd backend
npm install
```

أنشئ ملف `.env`:

```bash
MONGODB_URI=mongodb://localhost:27017/bac-review
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

تشغيل الخادم:

```bash
npm start
# أو للتطوير مع nodemon
npm run dev
```

الخادم سيعمل على: `http://localhost:5000`

### 3. إعداد Frontend

```bash
cd frontend
npm install
```

أنشئ ملف `.env` (اختياري):

```bash
REACT_APP_API_URL=http://localhost:5000/api
```

تشغيل التطبيق:

```bash
npm start
```

التطبيق سيفتح على: `http://localhost:3000`

## 📚 المواد الدراسية المتاحة

| الرمز | المادة | الأيقونة |
|------|--------|----------|
| MAT | الرياضيات | 🧮 |
| PC | الفيزياء والكيمياء | ⚗️ |
| SVT | العلوم الطبيعية | 🧬 |
| PH | الفلسفة | 🤔 |
| FR | اللغة الفرنسية | 🇫🇷 |
| AR | اللغة العربية | 📖 |
| IS | الدراسات الإسلامية | ☪️ |
| HG | التاريخ والجغرافيا | 🗺️ |
| EN | اللغة الإنجليزية | 🇬🇧 |

## 🎓 كيفية استخدام التطبيق

### 1. التسجيل والدخول
- انقر على "Register" لإنشاء حساب جديد
- أدخل اسمك وبريدك الإلكتروني وكلمة المرور
- انقر على "Login" للدخول بعد التسجيل

### 2. إضافة المواد
- انتقل إلى "Subjects"
- انقر على "Add Subject"
- اختر المادة التي تريد إضافتها
- سيتم إنشاء المادة تلقائياً مع الأيقونة واللون المناسب

### 3. إضافة الدروس
- اختر مادة من قائمة المواد
- انقر على "View Lessons"
- أضف درس جديد بكتابة العنوان والوصف

### 4. إضافة البطاقات (Flash Cards)
- اختر درس من الدروس
- انقر على "View Cards"
- أضف بطاقة جديدة:
  - اكتب السؤال
  - اكتب الإجابة
  - اختر مستوى الصعوبة

### 5. جلسة المراجعة
- انقر على "Start Review Session" من الصفحة الرئيسية
- اقرأ السؤال ثم انقر على البطاقة لعرض الإجابة
- اختر أحد الخيارات:
  - **Forgot** (نسيت): للبطاقات التي نسيتها
  - **Difficult** (صعب): للبطاقات الصعبة
  - **Perfect** (مثالي): للبطاقات التي أجبت عليها بشكل صحيح

### 6. عرض الإحصائيات
- انتقل إلى "Statistics"
- شاهد:
  - عدد البطاقات الإجمالي
  - البطاقات المتقنة
  - نسبة الإتقان
  - رسوم بيانية توضيحية

## ⏰ نظام التدكر المتباعد

التطبيق يستخدم خوارزمية SM-2 (Super Memo 2) لحساب مواعيد المراجعة:

- **المراجعة الأولى**: بعد 1 يوم
- **الثانية**: بعد 3 أيام
- **الثالثة**: بعد 7 أيام
- **الرابعة**: بعد 15 يوم
- **الخامسة**: بعد 20 يوم

كل مراجعة ناجحة تزيد الفترة الزمنية، والمراجعة الفاشلة تعيد تشغيل العملية.

## 🏗️ بنية المشروع

```
Bac-Review-App/
├── backend/
│   ├── models/              # نماذج MongoDB
│   │   ├── User.js
│   │   ├── Subject.js
│   │   ├── Lesson.js
│   │   ├── Card.js
│   │   └── Review.js
│   ├── routes/              # مسارات API
│   │   ├── auth.js
│   │   ├── subjects.js
│   │   ├── lessons.js
│   │   ├── cards.js
│   │   ├── reviews.js
│   │   └── stats.js
│   ├── middleware/          # Middleware
│   │   └── auth.js
│   ├── utils/               # أدوات مساعدة
│   │   └── spacedRepetition.js
│   ├── server.js            # نقطة البداية
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/              # الملفات العامة
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # المكونات
│   │   │   └── Navbar.js
│   │   ├── pages/           # الصفحات
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Subjects.js
│   │   │   ├── Lessons.js
│   │   │   ├── Cards.js
│   │   │   ├── ReviewSession.js
│   │   │   └── Statistics.js
│   │   ├── services/        # خدمات API
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── subjectService.js
│   │   │   ├── lessonService.js
│   │   │   ├── cardService.js
│   │   │   ├── reviewService.js
│   │   │   └── statsService.js
│   │   ├── store/           # State Management (Zustand)
│   │   │   ├── authStore.js
│   │   │   └── subjectStore.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── README.md                # هذا الملف
├── package.json             # Root package.json
└── .gitignore
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - التسجيل
- `POST /api/auth/login` - الدخول

### Subjects
- `GET /api/subjects` - الحصول على جميع المواد
- `POST /api/subjects` - إضافة مادة جديدة
- `PUT /api/subjects/:id` - تحديث مادة
- `DELETE /api/subjects/:id` - حذف مادة

### Lessons
- `GET /api/lessons/subject/:subjectId` - الحصول على دروس مادة معينة
- `POST /api/lessons` - إضافة درس جديد
- `PUT /api/lessons/:id` - تحديث درس
- `DELETE /api/lessons/:id` - حذف درس

### Cards
- `GET /api/cards/lesson/:lessonId` - الحصول على بطاقات درس معين
- `GET /api/cards/review/due` - الحصول على البطاقات المستحقة للمراجعة
- `POST /api/cards` - إضافة بطاقة جديدة
- `PUT /api/cards/:id` - تحديث بطاقة
- `DELETE /api/cards/:id` - حذف بطاقة

### Reviews
- `POST /api/reviews` - تقديم مراجعة
- `GET /api/reviews` - الحصول على جميع المراجعات

### Statistics
- `GET /api/stats` - الإحصائيات العامة
- `GET /api/stats/subject/:subjectId` - إحصائيات مادة معينة
- `GET /api/stats/today/progress` - تقدم اليوم

## 🔐 المصادقة

التطبيق يستخدم JWT (JSON Web Tokens) للمصادقة:
- التوكن يُحفظ في localStorage
- يُرسل مع كل طلب في رأس Authorization
- مدة صلاحية التوكن: 7 أيام

## 📱 تحويل إلى تطبيق موبايل

بعد إكمال التطبيق، يمكنك تحويله إلى تطبيق موبايل باستخدام:

### الخيار 1: PWA (Progressive Web App)
```bash
npm install workbox-cli
```

### الخيار 2: React Native
```bash
npx create-react-native-app BacReviewApp
```

### الخيار 3: Electron (Desktop)
```bash
npm install electron --save-dev
```

### الخيار 4: App Maker
- استخدم رابط التطبيق المنشور
- اتبع خطوات App Maker

## 🐛 حل المشاكل

### المشكلة: لا يمكن الاتصال بـ MongoDB
**الحل**: تأكد من أن MongoDB يعمل بشكل صحيح
```bash
# للتحقق من الاتصال
mongo
```

### المشكلة: خطأ CORS
**الحل**: تأكد من تثبيت cors في backend
```bash
cd backend
npm install cors
```

### المشكلة: صفحة بيضاء في Frontend
**الحل**: امسح ذاكرة التخزين المؤقت (Cache)
```bash
ctrl+shift+delete  # أو cmd+shift+delete على Mac
```

## 📝 ملاحظات مهمة

1. **حفظ البيانات**: جميع البيانات تُحفظ تلقائياً في MongoDB
2. **النسخ الاحتياطية**: نوصي بإنشاء نسخ احتياطية منتظمة
3. **الأمان**: لا تشارك JWT_SECRET في الإنتاج
4. **التحديثات**: تحقق من التحديثات الأمنية بانتظام

## 🤝 المساهمة

نرحب بمساهماتك! يمكنك:
1. عمل Fork للمشروع
2. إنشاء فرع جديد
3. عمل Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت MIT License

## 📞 التواصل

للأسئلة والملاحظات، يرجى فتح issue جديد على GitHub.

---

**آخر تحديث**: 2026-05-14

**تم إنشاؤه بواسطة**: GitHub Copilot
