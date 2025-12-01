# 🎯 PANDUAN SETUP LENGKAP - Roblox AI Studio

Panduan step-by-step untuk setup project dari nol hingga deploy ke Vercel.

---

## 📦 STEP 1: Persiapan Environment

### Install Node.js

1. Download Node.js dari https://nodejs.org/ (LTS version)
2. Install dan verify:

```bash
node --version  # Should be v14 or higher
npm --version   # Should be 6 or higher
```

### Install Git

1. Download Git dari https://git-scm.com/
2. Install dan verify:

```bash
git --version
```

---

## 🚀 STEP 2: Buat Project React

### Opsi A: Menggunakan Create React App (Recommended)

```bash
# 1. Buat project baru
npx create-react-app roblox-ai-studio

# 2. Masuk ke folder project
cd roblox-ai-studio

# 3. Install dependencies tambahan
npm install react-router-dom lucide-react recharts axios date-fns

# 4. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Opsi B: Clone dari Template

```bash
# Clone repository template
git clone https://github.com/yourusername/roblox-ai-studio.git
cd roblox-ai-studio

# Install dependencies
npm install
```

---

## 📁 STEP 3: Setup Struktur Folder

Buat struktur folder berikut:

```bash
# Buat semua folder sekaligus
mkdir -p src/components/common src/components/chat src/components/admin
mkdir -p src/pages src/context src/hooks src/services src/utils src/routes src/styles
```

**Hasil akhir:**

```
src/
├── components/
│   ├── common/
│   ├── chat/
│   └── admin/
├── pages/
├── context/
├── hooks/
├── services/
├── utils/
├── routes/
└── styles/
```

---

## ⚙️ STEP 4: Configure Tailwind CSS

### 1. Edit `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',
        secondary: '#3B82F6',
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
```

### 2. Edit `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

---

## 📝 STEP 5: Copy Semua File

Sekarang copy semua file yang sudah saya buat ke folder yang sesuai:

### File Structure:

```
src/
├── App.jsx                        ← Copy dari artifact
├── index.js                       ← Copy dari artifact
├── routes/
│   └── AppRouter.jsx              ← Copy dari artifact
├── context/
│   ├── AuthContext.jsx            ← Copy dari artifact
│   └── ChatContext.jsx            ← Copy dari artifact
├── services/
│   ├── api.js                     ← Copy dari artifact
│   └── anthropic.js               ← Copy dari artifact
├── utils/
│   └── constants.js               ← Copy dari artifact
├── hooks/
│   ├── useAuth.js                 ← Copy dari artifact
│   └── useChat.js                 ← Copy dari artifact
├── pages/
│   ├── Home.jsx                   ← Copy dari artifact
│   ├── Chat.jsx                   ← Copy dari artifact
│   ├── Login.jsx                  ← Copy dari artifact
│   ├── Register.jsx               ← Copy dari artifact
│   └── Admin.jsx                  ← Copy dari artifact
└── components/
    ├── common/
    │   ├── Header.jsx             ← Copy dari artifact
    │   ├── Sidebar.jsx            ← Copy dari artifact
    │   ├── LoadingSpinner.jsx     ← Copy dari artifact
    │   └── Button.jsx             ← Copy dari artifact
    └── chat/
        └── MessageItem.jsx        ← Copy dari artifact
```

---

## 🔐 STEP 6: Setup Environment Variables

### 1. Buat file `.env` di root folder

```env
REACT_APP_ANTHROPIC_API_KEY=your_api_key_here
REACT_APP_ENV=development
```

### 2. Buat file `.env.example` (untuk GitHub)

```env
REACT_APP_ANTHROPIC_API_KEY=your_api_key_here
REACT_APP_ENV=development
```

### 3. Update `.gitignore`

Pastikan ada:

```
# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

---

## ▶️ STEP 7: Test Aplikasi Locally

```bash
# Start development server
npm start
```

Aplikasi akan buka di `http://localhost:3000`

### Test Checklist:

- [ ] Homepage muncul dengan benar
- [ ] Bisa login dengan demo account
- [ ] Chat interface berfungsi
- [ ] Admin panel accessible (login sebagai admin)
- [ ] Responsive di mobile

---

## 🌐 STEP 8: Push ke GitHub

### 1. Initialize Git

```bash
# Initialize git repository
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - Roblox AI Studio"
```

### 2. Create GitHub Repository

1. Buka https://github.com
2. Click "New repository"
3. Nama: `roblox-ai-studio`
4. Description: "AI Assistant for Roblox Studio Developers"
5. Public/Private (pilih sesuai kebutuhan)
6. **JANGAN** centang "Initialize with README"
7. Click "Create repository"

### 3. Push ke GitHub

```bash
# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/roblox-ai-studio.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## 🚀 STEP 9: Deploy ke Vercel

### Metode 1: Via Vercel Dashboard (RECOMMENDED)

#### 1. Buat Account Vercel

1. Buka https://vercel.com
2. Sign up dengan GitHub account
3. Authorize Vercel untuk access GitHub repos

#### 2. Import Project

1. Di Vercel dashboard, click "Add New Project"
2. Click "Import" di repository `roblox-ai-studio`
3. Configure Project Settings:

```
Framework Preset: Create React App
Root Directory: ./
Build Command: npm run build (default)
Output Directory: build (default)
Install Command: npm install (default)
```

#### 3. Add Environment Variables

Di section "Environment Variables", tambahkan:

```
Name: REACT_APP_ANTHROPIC_API_KEY
Value: your_api_key_here

Name: REACT_APP_ENV
Value: production
```

#### 4. Deploy

1. Click "Deploy"
2. Wait 2-5 menit
3. Done! Aplikasi Anda live di `https://your-project.vercel.app`

### Metode 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (pilih account Anda)
# - Link to existing project? N
# - What's your project's name? roblox-ai-studio
# - In which directory is your code located? ./

# Deploy to production
vercel --prod
```

---

## 🎉 STEP 10: Post-Deployment

### 1. Verify Deployment

Test URL Vercel Anda:
- Homepage load dengan benar?
- Login berfungsi?
- Chat interface berfungsi?
- Admin panel accessible?

### 2. Setup Custom Domain (Optional)

Di Vercel Dashboard:
1. Click project Anda
2. Go to "Settings" → "Domains"
3. Add custom domain
4. Follow DNS configuration instructions

### 3. Configure Production Settings

Di Vercel Dashboard → Settings:

**Environment Variables:**
- Pastikan semua env vars sudah di-set
- Separate env vars untuk Production, Preview, Development

**Build & Development:**
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

**Git:**
- Production Branch: `main`
- Enable automatic deployments

---

## 🔧 TROUBLESHOOTING

### Issue 1: Build Gagal

**Error:** `Module not found`

**Solution:**
```bash
# Clear node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Try build again
npm run build
```

### Issue 2: Tailwind Tidak Muncul

**Solution:**
1. Check `tailwind.config.js` - pastikan content path benar
2. Check `index.css` - pastikan ada @tailwind directives
3. Restart dev server

### Issue 3: Environment Variables Tidak Bekerja

**Solution:**
1. Di Vercel, pastikan nama variable diawali `REACT_APP_`
2. Redeploy setelah menambah env vars
3. Clear cache di Vercel

### Issue 4: API Calls Failing

**Solution:**
1. Check browser console untuk error messages
2. Verify Anthropic API key di environment variables
3. Check network tab - lihat actual request/response

---

## 📊 Monitoring & Maintenance

### Vercel Analytics

1. Enable Vercel Analytics di dashboard
2. Monitor:
   - Page views
   - User sessions
   - Performance metrics
   - Error rates

### Git Workflow

```bash
# Buat branch baru untuk feature
git checkout -b feature/new-feature

# Make changes dan commit
git add .
git commit -m "Add new feature"

# Push branch
git push origin feature/new-feature

# Buat Pull Request di GitHub

# Merge to main
# Vercel akan auto-deploy!
```

---

## 🎓 Next Steps

Setelah aplikasi live:

1. **Add Backend API:**
   - Node.js + Express
   - Database (MongoDB/PostgreSQL)
   - Real authentication

2. **Enhanced Features:**
   - Code playground/editor
   - File uploads
   - Export chat history
   - Multi-language support

3. **Performance Optimization:**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Caching strategy

4. **Security:**
   - Rate limiting
   - Input validation
   - XSS protection
   - CSRF tokens

---

## 📞 Need Help?

Jika masih ada masalah:

1. **Check Documentation:**
   - React: https://react.dev/
   - Vercel: https://vercel.com/docs
   - Tailwind: https://tailwindcss.com/docs

2. **Community Support:**
   - Stack Overflow
   - Reddit r/reactjs
   - Discord communities

3. **Direct Support:**
   - GitHub Issues
   - Email support

---

## ✅ Checklist Final

Sebelum production:

- [ ] All pages working correctly
- [ ] Mobile responsive
- [ ] Environment variables configured
- [ ] Error handling implemented
- [ ] Loading states working
- [ ] Authentication working
- [ ] Admin panel secured
- [ ] Performance optimized
- [ ] SEO meta tags added
- [ ] Analytics configured
- [ ] Custom domain setup (optional)
- [ ] Backup & monitoring setup

---

**🎉 CONGRATULATIONS! Your Roblox AI Studio is now LIVE! 🎉**

Share your deployed URL and start helping Roblox developers! 🚀
