// API Configuration
export const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
export const ANTHROPIC_MODEL = 'claude-sonnet-4-20250514';
export const ANTHROPIC_MAX_TOKENS = 4096;

// Application Info
export const APP_NAME = 'Roblox AI Studio';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'AI Assistant for Roblox Studio Developers';

// Categories Configuration
export const CATEGORIES = [
  { 
    id: 'general', 
    name: 'General', 
    icon: 'Sparkles', 
    color: 'from-purple-500 to-pink-500',
    description: 'General questions and help'
  },
  { 
    id: 'coding', 
    name: 'Coding', 
    icon: 'Code', 
    color: 'from-blue-500 to-cyan-500',
    description: 'Lua/Luau code generation and help'
  },
  { 
    id: 'design', 
    name: 'Design', 
    icon: 'Palette', 
    color: 'from-orange-500 to-red-500',
    description: 'UI/UX design suggestions'
  },
  { 
    id: 'optimization', 
    name: 'Optimization', 
    icon: 'Zap', 
    color: 'from-green-500 to-emerald-500',
    description: 'Performance optimization tips'
  },
  { 
    id: 'learning', 
    name: 'Learning', 
    icon: 'BookOpen', 
    color: 'from-indigo-500 to-purple-500',
    description: 'Tutorials and learning resources'
  },
];

// Quick Prompts
export const QUICK_PROMPTS = [
  { 
    text: 'Buat sistem inventory sederhana', 
    category: 'coding',
    description: 'Generate basic inventory system code'
  },
  { 
    text: 'Cara optimize game untuk mobile', 
    category: 'optimization',
    description: 'Mobile optimization techniques'
  },
  { 
    text: 'Desain shop UI yang menarik', 
    category: 'design',
    description: 'Shop UI design suggestions'
  },
  { 
    text: 'Explain RemoteEvents vs RemoteFunctions', 
    category: 'learning',
    description: 'Learn about Roblox networking'
  },
  {
    text: 'Buat sistem combat sederhana',
    category: 'coding',
    description: 'Basic combat system implementation'
  },
  {
    text: 'Tips mengurangi lag di game',
    category: 'optimization',
    description: 'Lag reduction strategies'
  },
];

// System Prompts for AI
export const SYSTEM_PROMPTS = {
  general: 'Anda adalah AI assistant ahli dalam Roblox Studio development. Berikan jawaban yang jelas, praktis, dan mudah dipahami dalam Bahasa Indonesia. Sertakan contoh kode jika diperlukan.',
  
  coding: 'Anda adalah expert programmer Lua/Luau untuk Roblox Studio. Fokus pada penulisan kode yang clean, efficient, dan mengikuti best practices. Selalu sertakan penjelasan untuk setiap bagian kode. Gunakan Bahasa Indonesia untuk penjelasan, tapi kode tetap dalam Lua/Luau.',
  
  design: 'Anda adalah UI/UX designer untuk Roblox games. Berikan saran desain yang modern, user-friendly, dan sesuai dengan estetika Roblox. Sertakan contoh implementasi GUI jika relevan. Gunakan Bahasa Indonesia.',
  
  optimization: 'Anda adalah expert dalam optimasi performa Roblox games. Fokus pada techniques untuk meningkatkan FPS, mengurangi lag, dan membuat game lebih efficient. Berikan tips praktis yang bisa langsung diimplementasikan. Gunakan Bahasa Indonesia.',
  
  learning: 'Anda adalah mentor yang sabar untuk developer Roblox pemula hingga advanced. Jelaskan konsep dengan cara yang mudah dipahami, gunakan analogi, dan berikan step-by-step guide. Gunakan Bahasa Indonesia.'
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator',
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CHAT: '/chat',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_SETTINGS: '/admin/settings',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'roblox_ai_user',
  TOKEN: 'roblox_ai_token',
  THEME: 'roblox_ai_theme',
  CHAT_HISTORY: 'roblox_ai_chat_history',
  SETTINGS: 'roblox_ai_settings',
};

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 3,
  MAX_NAME_LENGTH: 50,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// UI Constants
export const UI_CONFIG = {
  MAX_CHAT_HISTORY: 50,
  TYPING_DELAY: 100,
  TOAST_DURATION: 3000,
  SIDEBAR_WIDTH: 256,
  HEADER_HEIGHT: 64,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Terjadi kesalahan jaringan. Silakan coba lagi.',
  AUTH_ERROR: 'Autentikasi gagal. Silakan login kembali.',
  VALIDATION_ERROR: 'Data yang Anda masukkan tidak valid.',
  SERVER_ERROR: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.',
  NOT_FOUND: 'Halaman tidak ditemukan.',
  UNAUTHORIZED: 'Anda tidak memiliki akses ke halaman ini.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login berhasil! Selamat datang kembali.',
  REGISTER_SUCCESS: 'Registrasi berhasil! Silakan login.',
  UPDATE_SUCCESS: 'Data berhasil diperbarui.',
  DELETE_SUCCESS: 'Data berhasil dihapus.',
  SAVE_SUCCESS: 'Data berhasil disimpan.',
};

// Demo Credentials
export const DEMO_CREDENTIALS = {
  ADMIN: {
    email: 'admin@roblox.ai',
    password: 'password123',
    role: 'admin',
  },
  USER: {
    email: 'user@roblox.ai',
    password: 'password123',
    role: 'user',
  },
};

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    LIST: '/users',
    GET: '/users/:id',
    UPDATE: '/users/:id',
    DELETE: '/users/:id',
  },
  CHAT: {
    SEND: '/chat/send',
    HISTORY: '/chat/history',
    DELETE: '/chat/:id',
  },
  ANALYTICS: {
    OVERVIEW: '/analytics/overview',
    USERS: '/analytics/users',
    CHATS: '/analytics/chats',
  },
};

export default {
  ANTHROPIC_API_URL,
  ANTHROPIC_MODEL,
  ANTHROPIC_MAX_TOKENS,
  APP_NAME,
  APP_VERSION,
  CATEGORIES,
  QUICK_PROMPTS,
  SYSTEM_PROMPTS,
  USER_ROLES,
  ROUTES,
  STORAGE_KEYS,
  VALIDATION,
  UI_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DEMO_CREDENTIALS,
  API_ENDPOINTS,
};
