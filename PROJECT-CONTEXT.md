# 🤖 PROJECT CONTEXT - Roblox AI Studio

## 📌 PROJECT IDENTITY
**Name:** Roblox AI Studio  
**Type:** Full Stack React.js Web Application  
**Purpose:** AI Assistant untuk membantu Roblox Studio Developers  
**Tech Stack:** React.js + Tailwind CSS + Claude AI API  
**Status:** Active Development  

---

## 🎯 PROJECT OVERVIEW

Ini adalah **FULL REACT.JS APPLICATION** (bukan single-file artifact) yang didesign untuk membantu Roblox Studio developers dengan:
- ✅ AI Chat dengan multiple categories (Coding, Design, Optimization, Learning)
- ✅ Complete Admin Panel dengan dashboard, analytics, user management
- ✅ Full authentication system (login/register)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Professional UI dengan glassmorphism & gradients

---

## 📁 PROJECT STRUCTURE

```
roblox-ai-studio/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── admin/          # Admin panel components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── UserManagement.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── PromptManager.jsx
│   │   ├── chat/           # Chat interface components
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── MessageItem.jsx
│   │   │   ├── InputBox.jsx
│   │   │   └── CodeBlock.jsx
│   │   └── common/         # Reusable components
│   │       ├── Header.jsx
│   │       ├── Sidebar.jsx
│   │       ├── Footer.jsx
│   │       ├── LoadingSpinner.jsx
│   │       └── Button.jsx
│   ├── pages/              # Main pages
│   │   ├── Home.jsx
│   │   ├── Chat.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Admin.jsx
│   ├── context/            # React Context (state management)
│   │   ├── AuthContext.jsx
│   │   ├── ChatContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useChat.js
│   │   ├── useLocalStorage.js
│   │   └── useApi.js
│   ├── services/           # API & external services
│   │   ├── api.js
│   │   ├── anthropic.js
│   │   └── storage.js
│   ├── utils/              # Utility functions
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── routes/
│   │   └── AppRouter.jsx
│   ├── styles/
│   │   ├── index.css
│   │   ├── animations.css
│   │   └── components.css
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── .env
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🔑 KEY FEATURES

### 1. **Multi-Category AI Chat**
- 5 Categories: General, Coding, Design, Optimization, Learning
- Each category has custom AI system prompt
- Quick prompts untuk memulai
- Code syntax highlighting dengan copy button
- Real-time streaming responses

### 2. **Complete Admin Panel** (`/admin`)
- **Dashboard**: Statistics, charts, recent activity
- **User Management**: CRUD operations untuk users
- **Analytics**: Category usage, top prompts, engagement metrics
- **Settings**: API configuration, feature toggles
- Protected routes (admin only)

### 3. **Authentication System**
- Login page dengan validation
- Register page dengan password confirmation
- Protected routes dengan React Router
- Demo credentials:
  - Admin: admin@roblox.ai / password123
  - User: user@roblox.ai / password123

### 4. **Responsive Design**
- Mobile-first approach
- Sidebar hamburger menu untuk mobile
- Responsive grid layouts
- Touch-friendly UI elements

---

## 🛠️ TECH STACK DETAILS

### Core
- **React 18.2** - UI library
- **React Router v6** - Client-side routing
- **Context API** - State management

### Styling
- **Tailwind CSS 3.3** - Utility-first CSS
- **Custom animations** - animations.css, components.css
- **Glassmorphism effects** - backdrop-blur, rgba colors

### Icons & UI
- **Lucide React** - Modern icon library
- **Recharts** - Data visualization untuk admin panel

### AI Integration
- **Claude Sonnet 4** - via Anthropic API
- Model: claude-sonnet-4-20250514
- Streaming responses support

### HTTP Client
- **Axios** - Promise-based HTTP client

---

## 🎨 DESIGN SYSTEM

### Color Palette
- **Primary**: Purple (#8b5cf6) - Untuk main actions
- **Secondary**: Blue (#3b82f6) - Untuk secondary actions
- **Gradients**: Blue to Purple, Purple to Pink
- **Background**: Dark theme dengan slate-900, purple-900
- **Glass effects**: rgba(255, 255, 255, 0.05-0.1)

### Typography
- **Headings**: Bold, gradient text-fill
- **Body**: Gray-300 to Gray-400
- **Code**: Monospace, green-400

### Components
- **Cards**: Glass effect dengan border glow
- **Buttons**: Gradient background, hover lift
- **Inputs**: Glass effect, purple focus ring
- **Messages**: User (gradient), AI (glass effect)

---

## 📝 IMPORTANT NOTES

### 1. **Environment Variables**
```env
REACT_APP_ANTHROPIC_API_KEY=your_key_here
REACT_APP_ENV=development
```

### 2. **Demo Accounts**
- Admin role dapat akses `/admin`
- User role hanya dapat akses `/chat`
- Credentials tersimpan di `constants.js`

### 3. **File Dependencies**
- Semua components import dari `lucide-react`
- Context providers dibungkus di `App.jsx`
- Routes protected via `AppRouter.jsx`

### 4. **Styling Approach**
- Prioritas: Tailwind utility classes
- Custom styles di: `animations.css`, `components.css`
- Inline styles: AVOID (use Tailwind)

---

## 🚀 DEPLOYMENT INFO

### Vercel Configuration
```
Framework: Create React App
Build Command: npm run build
Output Directory: build
Install Command: npm install

Environment Variables:
- REACT_APP_ANTHROPIC_API_KEY
- REACT_APP_ENV=production
```

### GitHub Structure
```
main branch (production)
├── All source files
├── .gitignore (excludes node_modules, .env)
└── README.md
```

---

## 🔄 DEVELOPMENT WORKFLOW

### Local Development
```bash
npm start  # Run dev server on localhost:3000
```

### Build for Production
```bash
npm run build  # Creates optimized build/
```

### Git Workflow
```bash
git add .
git commit -m "Description"
git push origin main  # Auto-deploys to Vercel
```

---

## 🐛 COMMON ISSUES & SOLUTIONS

### Issue: Tailwind styles not working
**Solution:** 
- Check `tailwind.config.js` content paths
- Restart dev server
- Ensure `@tailwind` directives in `index.css`

### Issue: Build fails
**Solution:**
- Check all imports are correct
- Ensure all dependencies in `package.json`
- Run `npm install` to update packages

### Issue: API calls failing
**Solution:**
- Check `.env` file has correct API key
- Verify API key is prefixed with `REACT_APP_`
- Check Anthropic API key is valid

---

## 📊 FILE STATUS TRACKER

### ✅ COMPLETED FILES (40+)
- All pages (Home, Chat, Login, Register, Admin)
- All common components (Header, Sidebar, Footer, etc)
- All context providers
- All hooks
- All services
- All utils
- All styles
- Configuration files
- Documentation files

### 🔄 IN PROGRESS
- Admin panel components (Dashboard, Analytics, etc) - TEMPLATE PROVIDED
- Chat components (ChatContainer, MessageList, etc) - TEMPLATE PROVIDED

### 📝 TEMPLATE FILES
Components marked as "template" sudah ada struktur kode tapi bisa di-customize sesuai kebutuhan.

---

## 🎯 WHEN CONTINUING THIS PROJECT

If this conversation restarts or you hit chat limits:

1. **Check this file first** untuk context lengkap
2. **Verify file structure** di GitHub/local
3. **Check package.json** untuk dependencies
4. **Review constants.js** untuk configuration
5. **Test locally** dengan `npm start`

### Quick Recovery Commands
```bash
# If starting fresh session
git clone <repo-url>
cd roblox-ai-studio
npm install
cp .env.example .env
# Edit .env dengan API key
npm start
```

---

## 💡 FUTURE ENHANCEMENTS

### Priority 1 (Core Features)
- [ ] Backend API dengan Node.js + Express
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Real JWT authentication
- [ ] File upload untuk assets
- [ ] Export chat history

### Priority 2 (UX Improvements)
- [ ] Code playground/editor
- [ ] Syntax highlighting themes
- [ ] Dark/Light mode toggle
- [ ] Multi-language support (EN/ID)

### Priority 3 (Advanced)
- [ ] WebSocket untuk real-time
- [ ] Voice input/output
- [ ] Image generation integration
- [ ] Mobile app (React Native)

---

## 📞 CONTACT & SUPPORT

**GitHub Repository:** https://github.com/YOUR_USERNAME/roblox-ai-studio  
**Live Demo:** https://roblox-ai-studio.vercel.app  
**Documentation:** See README.md dan SETUP-GUIDE.md  

---

**Last Updated:** December 2024  
**Version:** 1.0.0  
**Status:** ✅ Production Ready

---

## 🤖 FOR CLAUDE AI

Ketika user kembali dan menyebut project ini:
1. Load context dari file ini
2. Check struktur folder yang sudah ada
3. Tanyakan: "File apa yang perlu saya buatkan atau perbaiki?"
4. Jangan ulangi penjelasan setup - langsung ke coding
5. Gunakan constants dan patterns yang sudah established

**Key Phrases User Might Use:**
- "lanjutkan project roblox ai studio"
- "file yang kurang untuk roblox ai"
- "admin panel belum selesai"
- "buatkan component yang missing"

**Your Response Should Be:**
"Saya sudah load context project Roblox AI Studio. Saya lihat [status current]. Yang mana yang ingin Anda kerjakan:
1. Component admin panel yang belum selesai
2. Chat components yang perlu dibuat
3. Fix bugs atau improve existing code
4. Deploy ke production"

---

**END OF PROJECT CONTEXT**
