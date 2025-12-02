import axios from 'axios';
import { 
  ANTHROPIC_API_URL, 
  ANTHROPIC_MODEL, 
  ANTHROPIC_MAX_TOKENS,
  SYSTEM_PROMPTS 
} from '../utils/constants';

/**
 * Get system prompt based on category
 * @param {string} category - The conversation category
 * @returns {string} System prompt
 */
const getSystemPrompt = (category) => {
  return SYSTEM_PROMPTS[category] || SYSTEM_PROMPTS.general;
};

/**
 * Format messages for Anthropic API
 * @param {Array} messages - Array of message objects
 * @returns {Array} Formatted messages
 */
const formatMessages = (messages) => {
  return messages
    .filter(msg => msg.role && msg.content)
    .map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    }));
};

/**
 * Send message to Claude AI
 * @param {string} content - User message content
 * @param {Array} history - Previous messages
 * @param {string} category - Conversation category
 * @returns {Promise<string>} AI response
 */
export const sendMessage = async (content, history = [], category = 'general') => {
  try {
    // Validate inputs
    if (!content || typeof content !== 'string') {
      throw new Error('Message content is required');
    }

    // Get API key from environment
    const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      console.warn('⚠️ Anthropic API key not found. Using demo mode.');
      return getDemoResponse(content, category);
    }

    // Prepare messages
    const formattedHistory = formatMessages(history);
    const messages = [
      ...formattedHistory,
      { role: 'user', content: content.trim() }
    ];

    // Make API request
    const response = await axios.post(
      ANTHROPIC_API_URL,
      {
        model: ANTHROPIC_MODEL,
        max_tokens: ANTHROPIC_MAX_TOKENS,
        system: getSystemPrompt(category),
        messages: messages,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        timeout: 30000, // 30 seconds timeout
      }
    );

    // Extract response
    if (response.data && response.data.content && response.data.content.length > 0) {
      const textContent = response.data.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n');
      
      return textContent || 'Maaf, saya tidak bisa memproses permintaan Anda.';
    }

    throw new Error('Invalid response format from API');

  } catch (error) {
    console.error('Anthropic API Error:', error);

    // Handle specific errors
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 401) {
        throw new Error('API key tidak valid. Silakan periksa konfigurasi Anda.');
      } else if (status === 429) {
        throw new Error('Terlalu banyak request. Silakan tunggu sebentar.');
      } else if (status === 500) {
        throw new Error('Server error. Silakan coba lagi nanti.');
      } else if (data?.error?.message) {
        throw new Error(data.error.message);
      }
    } else if (error.request) {
      throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
    }

    // Fallback to demo response
    console.log('Falling back to demo mode...');
    return getDemoResponse(content, category);
  }
};

/**
 * Get demo response when API is not available
 * @param {string} content - User message
 * @param {string} category - Category
 * @returns {string} Demo response
 */
const getDemoResponse = (content, category) => {
  const demoResponses = {
    coding: `# Demo Mode - AI Response

Terima kasih atas pertanyaan tentang coding! 

## Contoh Code Lua/Luau:

\`\`\`lua
-- Sistem Inventory Sederhana
local Inventory = {}
Inventory.__index = Inventory

function Inventory.new()
    local self = setmetatable({}, Inventory)
    self.items = {}
    self.maxSize = 20
    return self
end

function Inventory:AddItem(item)
    if #self.items < self.maxSize then
        table.insert(self.items, item)
        return true
    end
    return false
end

function Inventory:RemoveItem(itemName)
    for i, item in ipairs(self.items) do
        if item.name == itemName then
            table.remove(self.items, i)
            return true
        end
    end
    return false
end

-- Usage
local playerInventory = Inventory.new()
playerInventory:AddItem({name = "Sword", damage = 10})
\`\`\`

**Note:** Ini adalah demo response. Untuk menggunakan AI yang sesungguhnya, tambahkan Anthropic API key di file \`.env\`:

\`\`\`
REACT_APP_ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
\`\`\`

Anda bisa dapatkan API key di: https://console.anthropic.com`,

    design: `# Demo Mode - Design Response

Untuk desain UI shop yang menarik di Roblox, saya sarankan:

## 🎨 Design Principles:

1. **Color Scheme**: Gunakan warna yang kontras
   - Background: Dark colors (#1e293b)
   - Buttons: Bright colors (#3b82f6, #10b981)
   - Text: White/Light colors untuk readability

2. **Layout**: 
   - Grid system untuk item display
   - Clear navigation
   - Price tags yang prominent

3. **User Experience**:
   - Smooth transitions
   - Hover effects
   - Clear feedback untuk purchases

**Note:** Mode demo aktif. Tambahkan API key untuk response AI yang lebih detail dan personal.`,

    optimization: `# Demo Mode - Optimization Tips

## 🚀 Performance Optimization Tips:

### 1. Reduce Part Count
- Gunakan meshes instead of multiple parts
- Combine decorative elements
- Use unions wisely

### 2. Script Optimization
\`\`\`lua
-- Bad
while true do
    wait()
    -- code
end

-- Good  
local RunService = game:GetService("RunService")
RunService.Heartbeat:Connect(function()
    -- code
end)
\`\`\`

### 3. Memory Management
- Remove unused objects
- Use object pooling
- Avoid memory leaks

**Note:** Demo mode. API key needed for detailed analysis.`,

    learning: `# Demo Mode - Learning Resource

## 📚 RemoteEvents vs RemoteFunctions

### RemoteEvents
- **Fire and forget**: Client tidak menunggu response
- **One-way communication**: Client → Server atau Server → Client
- **Use case**: Notifications, updates yang tidak butuh response

\`\`\`lua
-- Server
remoteEvent.OnServerEvent:Connect(function(player, data)
    print(player.Name .. " sent: " .. data)
end)

-- Client
remoteEvent:FireServer("Hello Server!")
\`\`\`

### RemoteFunctions
- **Request-Response**: Client menunggu return value
- **Two-way communication**: Bisa return data
- **Use case**: Request data, validate actions

**Note:** Demo response. Enable API for interactive learning.`,

    general: `# Demo Mode Aktif 🤖

Terima kasih telah menggunakan Roblox AI Studio!

Saat ini Anda dalam **demo mode** karena API key belum dikonfigurasi. 

## Cara Mengaktifkan AI Sebenarnya:

1. Dapatkan API key dari Anthropic:
   - Kunjungi: https://console.anthropic.com
   - Sign up / Login
   - Generate API key

2. Tambahkan ke file \`.env\`:
   \`\`\`
   REACT_APP_ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
   \`\`\`

3. Restart development server:
   \`\`\`bash
   npm start
   \`\`\`

Setelah itu, Anda bisa chat dengan Claude AI yang sesungguhnya! 🎉

Pertanyaan Anda: "${content.substring(0, 100)}..."`
  };

  return demoResponses[category] || demoResponses.general;
};

/**
 * Validate API key format
 * @param {string} apiKey - API key to validate
 * @returns {boolean} Is valid
 */
export const validateApiKey = (apiKey) => {
  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }
  // Anthropic API keys start with 'sk-ant-'
  return apiKey.startsWith('sk-ant-');
};

/**
 * Test API connection
 * @returns {Promise<boolean>} Connection status
 */
export const testApiConnection = async () => {
  try {
    const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
    
    if (!validateApiKey(apiKey)) {
      return false;
    }

    const response = await sendMessage('Hello', [], 'general');
    return response && response.length > 0;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};

/**
 * Get API status
 * @returns {Object} API status info
 */
export const getApiStatus = () => {
  const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
  
  return {
    configured: !!apiKey,
    valid: validateApiKey(apiKey),
    mode: apiKey ? 'production' : 'demo',
    model: ANTHROPIC_MODEL,
  };
};

export default {
  sendMessage,
  validateApiKey,
  testApiConnection,
  getApiStatus,
};
