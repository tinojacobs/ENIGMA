// ==============================================
// ✅ ENIGMA Moderation — Safe • Respectful • Clean
// ==============================================

(function () {
  'use strict';

  // --- Banned Words List ---
  const bannedWords = [
    // English / General
    "fuck","fukk","fuckyou","fukkoff","fuckoff","fok","fokkof",
    "shit","bullshit","bitch","ass","asshole","dick","cock","pussy","cunt",
    "motherfucker","mofo","bastard","slut","whore","hoer","hoe",
    
    // Explicit / Harmful
    "rape","rapist","molest","sexual assault",
    "blowjob","handjob","deepthroat","cum","ejaculate",
    "incest","pedo","child porn",
    
    // Hate / Discrimination
    "k*ffir","kaffir","k****r","boer haat","kill all",
    "suicide method","how to kill yourself"
  ];

  // --- Spam & Flood Control ---
  let lastMessageTime = 0;
  let messageCount = 0;
  const FLOOD_LIMIT = 5;
  const FLOOD_WINDOW = 5000; // 5 seconds
  const MIN_MESSAGE_GAP = 300; // 0.3 seconds

  // --- Check Message ---
  function checkMessage(text) {
    if (!text || typeof text !== 'string') return { safe: false, reason: 'Empty message' };
    
    const lower = text.toLowerCase();
    
    // Word filter
    for (const word of bannedWords) {
      if (lower.includes(word)) {
        return { 
          safe: false, 
          reason: 'Inappropriate language',
          severity: 'warning'
        };
      }
    }
    
    // Flood check
    const now = Date.now();
    if (now - lastMessageTime < MIN_MESSAGE_GAP) {
      return { safe: false, reason: 'Please slow down — take a breath 💜', severity: 'info' };
    }
    if (now - lastMessageTime < FLOOD_WINDOW) {
      messageCount++;
      if (messageCount >= FLOOD_LIMIT) {
        return { safe: false, reason: 'Too many messages — take a break', severity: 'mute' };
      }
    } else {
      messageCount = 1;
    }
    lastMessageTime = now;
    
    return { safe: true };
  }

  // --- Clean Text (Auto-replace mild words) ---
  function cleanText(text) {
    let cleaned = text;
    const mildReplacements = {
      'fuck': '***',
      'shit': '***',
      'bitch': '***',
      'asshole': '***'
    };
    for (const [word, repl] of Object.entries(mildReplacements)) {
      const regex = new RegExp(word, 'gi');
      cleaned = cleaned.replace(regex, repl);
    }
    return cleaned;
  }

  // --- Report Message ---
  async function reportMessage(messageId, fromUser, reason) {
    const db = typeof getDb === 'function' ? getDb() : null;
    if (!db) return;
    
    await db.collection('reports').add({
      messageId,
      fromUser,
      reason,
      reportedAt: new Date(),
      status: 'pending'
    });
    
    alert('✅ Report sent — thank you for keeping ENIGMA safe! 💜');
  }

  // --- Expose Globally ---
  window.Moderation = {
    checkMessage,
    cleanText,
    reportMessage
  };

  console.log('🛡️ ENIGMA Moderation — Active & Protecting!');
})();
