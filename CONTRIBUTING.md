# مساهمة في Bac Review App

## 🤝 نرحب بمساهماتك!

شكراً على اهتمامك بمشروعنا. يرجى اتباع هذه الإرشادات عند المساهمة.

## 📋 قبل البدء

1. اقرأ [README.md](README.md) و [SETUP.md](SETUP.md)
2. اقرأ [API.md](API.md) لفهم الواجهة البرمجية
3. تحقق من [Issues](https://github.com/ismailrossafi55-collab/Bac-Review-App/issues) الموجودة

## 🔄 خطوات المساهمة

### 1. عمل Fork
```bash
# انقر على زر Fork على GitHub
```

### 2. استنساخ المشروع
```bash
git clone https://github.com/YOUR_USERNAME/Bac-Review-App.git
cd Bac-Review-App
```

### 3. إنشاء فرع جديد
```bash
git checkout -b feature/اسم-الميزة
# أو
git checkout -b fix/اسم-الإصلاح
```

### 4. إجراء التغييرات
- اكتب الكود الخاص بك
- اتبع معايير الكود (راجع القسم أدناه)
- اختبر التغييرات بشكل شامل

### 5. Commit والـ Push
```bash
git add .
git commit -m "وصف واضح للتغييرات"
git push origin feature/اسم-الميزة
```

### 6. عمل Pull Request
- انتقل إلى مستودعك على GitHub
- انقر على "New Pull Request"
- املأ الوصف بوضوح
- انتظر مراجعة الكود

## 📝 معايير الكود

### JavaScript/React
```javascript
// استخدم camelCase للمتغيرات والدوال
const getUserData = () => {
  // استخدم const/let بدلاً من var
  const user = {};
  return user;
};

// أضف تعليقات واضحة
// هذه الدالة تحسب مجموع الأرقام
const calculateSum = (numbers) => {
  return numbers.reduce((a, b) => a + b, 0);
};
```

### HTML/CSS
```html
<!-- استخدم الفئات بدلاً من الـ IDs للتنسيق -->
<div class="card-container">
  <h3>العنوان</h3>
  <p>الوصف</p>
</div>
```

### Naming Conventions
- **المكونات**: PascalCase (Dashboard.js)
- **الملفات: kebab-case (auth-service.js)
- **المتغيرات والدوال**: camelCase (getUserData)
- **الثوابت**: UPPER_CASE (API_URL)

## 🧪 الاختبار

### اختبار Backend
```bash
cd backend
npm test
```

### اختبار Frontend
```bash
cd frontend
npm test
```

## 📦 أنواع المساهمات المرحب بها

### 🐛 إصلاح الأخطاء
- وصف المشكلة بوضوح
- اشرح كيف تحل المشكلة
- أضف اختبارات إذا أمكن

### ✨ ميزات جديدة
- اقترح الميزة أولاً في Issue
- اشرح الفائدة والحالات الاستخدام
- اتبع البنية الموجودة

### 📚 توثيق
- تحديث الـ README
- إضافة تعليقات في الكود
- تصحيح الأخطاء الإملائية

### 🎨 تحسينات الواجهة
- اشرح التحسين
- أرفق صورة قبل/بعد
- تأكد من توافقية المتصفحات

## ✅ قائمة التحقق قبل الـ PR

- [ ] الكود يتبع معايير المشروع
- [ ] تم اختبار التغييرات محلياً
- [ ] تم تحديث التوثيق إن لزم
- [ ] لا توجد أخطاء في Console
- [ ] الـ Commit messages واضحة
- [ ] لا توجد ملفات غير ضرورية

## 💬 مراجعة الكود

عند مراجعة الكود، قد نطلب منك:
- تحسين الأداء
- إضافة اختبارات
- توضيح ال��ود
- اتباع معايير المشروع

يرجى تقبل الملاحظات بصدر رحب - الهدف هو تحسين المشروع معاً!

## 📞 الأسئلة والمساعدة

- اسأل في [Discussions](https://github.com/ismailrossafi55-collab/Bac-Review-App/discussions)
- افتح [Issue](https://github.com/ismailrossafi55-collab/Bac-Review-App/issues) إذا لم تعثر على إجابة

## 📄 الترخيص

بمساهمتك في هذا المشروع، توافق على أن تكون مساهمتك تحت ترخيص MIT.

---

شكراً لك على المساهمة! 🎉
