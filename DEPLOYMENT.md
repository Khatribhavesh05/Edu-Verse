# EduVerse - Deployment & Environment Variables Guide

## 🚀 Quick Setup for Production (Vercel)

### 1. Environment Variables

Add these environment variables in your Vercel project settings:

#### **Firebase (Client-side)**
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

#### **Firebase Admin (Server-side only)**
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourKey\n-----END PRIVATE KEY-----\n"
```

#### **OpenAI API Key (Server-side only)**
```
OPENAI_API_KEY=sk-your-openai-key
```

### 2. Important Notes

#### ✅ **Client vs Server Variables**
- **Client-side** variables MUST start with `NEXT_PUBLIC_`
  - These are visible in the browser
  - Used in React components
  - Example: `NEXT_PUBLIC_FIREBASE_API_KEY`

- **Server-side** variables have NO prefix
  - Only available in API routes and server components
  - Never exposed to the browser
  - Example: `OPENAI_API_KEY`, `FIREBASE_PRIVATE_KEY`

#### 🔒 **Security Best Practices**
1. Never use `process.env.OPENAI_API_KEY` in client components
2. Always use API routes for sensitive operations
3. Firebase client keys (NEXT_PUBLIC_*) are safe to expose
4. Admin SDK private keys should NEVER have NEXT_PUBLIC_ prefix

#### 🐛 **Common SSR Issues Fixed**
This codebase now handles:
- ✅ localStorage access with `typeof window !== 'undefined'` checks
- ✅ window/document access guarded in useEffect hooks
- ✅ Canvas/confetti loaded dynamically
- ✅ Proper null checks for .map() operations
- ✅ Environment variables properly scoped (client vs server)

### 3. Deployment Steps

#### **Option A: Deploy to Vercel**
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

#### **Option B: Local Production Build**
```bash
# Test production build locally
npm run build
npm start
```

### 4. Troubleshooting

#### ❌ Error: "Minified React error #321"
**Cause**: Hydration mismatch (server HTML ≠ client HTML)

**Solutions**:
- ✅ All localStorage/window access now inside useEffect
- ✅ Initial state matches server (no undefined → true transitions)
- ✅ Components that need browser APIs are 'use client'

#### ❌ Error: "Can't resolve 'canvas-confetti'"
**Cause**: SSR trying to load browser-only package

**Solution**: 
✅ Now using dynamic imports:
```typescript
import('canvas-confetti').then(module => {
  const confetti = module.default;
  confetti({...});
});
```

#### ❌ Error: "localStorage is not defined"
**Cause**: Code running during server-side render

**Solution**:
✅ All localStorage now wrapped:
```typescript
if (typeof window !== 'undefined') {
  localStorage.setItem('key', 'value');
}
```

#### ❌ Error: "process.env.NEXT_PUBLIC_X is undefined"
**Cause**: Environment variable not set in Vercel

**Solution**:
1. Go to Vercel → Project Settings → Environment Variables
2. Add the variable
3. Redeploy

### 5. Demo Mode Fallback

The app supports demo mode if Firebase is not configured:
- Users can still explore features
- Data stored in localStorage only
- No real authentication required

To enable full features, configure all environment variables properly.

### 6. Verification Checklist

Before deploying, verify:
- [ ] All `NEXT_PUBLIC_*` variables set in Vercel
- [ ] Firebase Admin SDK credentials set (no NEXT_PUBLIC_ prefix)
- [ ] OpenAI API key set (if using AI features)
- [ ] Production build works locally (`npm run build`)
- [ ] No console errors in production build
- [ ] Authentication works (Firebase or demo mode)

### 7. Performance Tips

- Firebase keys with fallbacks allow instant demo mode
- All browser APIs accessed inside useEffect
- Components are properly marked as 'use client'
- Dynamic imports for heavy libraries

## 📚 Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Deployment](https://vercel.com/docs/deployments/overview)
- [Firebase Setup](https://firebase.google.com/docs/web/setup)
- [OpenAI API](https://platform.openai.com/docs)

## 🎯 Quick Commands

```bash
# Development
npm run dev

# Production build and test
npm run build
npm start

# Deploy to Vercel
vercel --prod
```

---

**Made with ❤️ for EduVerse**
