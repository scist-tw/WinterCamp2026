/**
 * 安全工具函數
 * 用於防範常見的前端安全漏洞
 */

/**
 * 安全地開啟外部連結
 * 防止 tabnabbing 攻擊
 * @param {string} url - 要開啟的 URL
 * @param {string} windowName - 視窗名稱 (預設 '_blank')
 */
export function safeWindowOpen(url, windowName = '_blank') {
  // 驗證 URL 格式
  try {
    const urlObj = new URL(url);
    // 只允許 http 和 https 協議
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      console.error('不允許的協議:', urlObj.protocol);
      return null;
    }
  } catch (e) {
    console.error('無效的 URL:', url);
    return null;
  }

  const newWindow = window.open(url, windowName);

  // 防止 tabnabbing: 清除 opener 引用
  if (newWindow) {
    newWindow.opener = null;
  }

  return newWindow;
}

/**
 * 驗證和清理 JSON 資料
 * @param {any} data - 要驗證的資料
 * @param {object} schema - 簡單的 schema 定義
 * @returns {boolean} 是否通過驗證
 */
export function validateData(data, schema) {
  if (!data || typeof data !== 'object') {
    return false;
  }

  for (const [key, type] of Object.entries(schema)) {
    if (type === 'required' && !(key in data)) {
      return false;
    }
    if (key in data && typeof data[key] !== type && type !== 'required') {
      return false;
    }
  }

  return true;
}

/**
 * 安全的 fetch 包裝
 * 加入超時和基本驗證
 * @param {string} url - 請求的 URL
 * @param {object} options - fetch 選項
 * @param {number} timeout - 超時時間 (毫秒)
 */
export async function secureFetch(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      // 確保不發送認證資訊到其他域
      credentials: url.startsWith('/') ? 'same-origin' : 'omit',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('請求超時');
    }
    throw error;
  }
}

/**
 * 清理使用者輸入 (防止 XSS)
 * @param {string} input - 使用者輸入
 * @returns {string} 清理後的字串
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/[<>]/g, '') // 移除 < 和 >
    .replace(/javascript:/gi, '') // 移除 javascript: 協議
    .replace(/on\w+=/gi, '') // 移除事件處理器
    .trim();
}

/**
 * 驗證 email 格式
 * @param {string} email - email 地址
 * @returns {boolean} 是否為有效的 email
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Content Security Policy nonce 生成器
 * @returns {string} 隨機 nonce
 */
export function generateNonce() {
  if (typeof window !== 'undefined' && window.crypto) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  // 後備方案
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
