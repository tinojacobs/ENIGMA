// ==============================================
// ✅ ENIGMA Drive — Cloud Storage • Files • Media
// ==============================================

(function () {
  'use strict';

  // --- Get Firestore ---
  function getDb() {
    if (typeof db !== 'undefined' && db) return db;
    if (typeof window.db !== 'undefined' && window.db) return window.db;
    console.warn('⚠️ Database not available');
    return null;
  }

  // --- Get Storage ---
  function getStorage() {
    if (typeof storage !== 'undefined' && storage) return storage;
    if (window.firebase?.storage) return firebase.storage();
    return null;
  }

  // --- Upload File ---
  async function uploadFile(file, folder = 'uploads') {
    const store = getStorage();
    if (!store) return { success: false, error: 'Storage unavailable' };

    const path = `${folder}/${Date.now()}_${file.name}`;
    const ref = store.ref(path);
    
    try {
      const snapshot = await ref.put(file);
      const url = await snapshot.ref.getDownloadURL();
      console.log(`📤 Uploaded: ${path}`);
      return { success: true, url, path };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  // --- Save File Record ---
  async function saveFileRecord(fileData) {
    const database = getDb();
    if (!database) return { success: false };

    const record = {
      ...fileData,
      uploadedAt: new Date(),
      downloads: 0
    };

    const docRef = await database.collection('files').add(record);
    return { success: true, id: docRef.id };
  }

  // --- Get My Files ---
  async function getMyFiles(userId) {
    const database = getDb();
    if (!database) return [];

    const snap = await database.collection('files')
      .where('ownerId', '==', userId)
      .orderBy('uploadedAt', 'desc')
      .limit(50)
      .get();

    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  // --- Expose Globally ---
  window.EnigmaDrive = {
    uploadFile,
    saveFileRecord,
    getMyFiles
  };

  console.log('📂 ENIGMA Drive — Ready!');
})();
