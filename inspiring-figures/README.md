# ✨ דמויות מעוררות השראה

אפליקציית Web לחיפוש דמויות מעוררות השראה, מופעלת על ידי Claude AI.

## מה האפליקציה עושה?
- 🔍 חפש כל דמות היסטורית, מדעית, אמנותית או ספורטאית
- 📸 תמונה אוטומטית מ-Wikipedia
- 📖 סיפור חיים מפורט
- 💬 ציטוט מפורסם
- 💡 שלושה רעיונות לסיפורים מעוררי השראה

## התקנה והרצה מקומית

```bash
# 1. התקן תלויות
npm install

# 2. הגדר API key
cp .env.example .env
# ערוך את .env והכנס את המפתח שלך מ-console.anthropic.com

# 3. הרץ
npm run dev
```

## העלאה ל-GitHub Pages

```bash
npm run build
# העלה את תיקיית dist/ ל-GitHub Pages
```

או השתמש ב-[Netlify](https://netlify.com) / [Vercel](https://vercel.com) לדפלוי אוטומטי.

> ⚠️ **חשוב:** אל תעלה את קובץ `.env` לגיט! הוא נמצא ב-`.gitignore` אוטומטית.

## טכנולוגיות
- React + Vite
- Claude API (Anthropic)
- Wikipedia REST API לתמונות
