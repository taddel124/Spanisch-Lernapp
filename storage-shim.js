/* Ersetzt die Claude-Artefakt-Speicherfunktion durch echten Browser-Speicher (localStorage).
   Jedes Gerät speichert seine eigenen Profile lokal — genau richtig für zwei Personen
   auf zwei eigenen Handys. */
(function () {
  const PREFIX = "gr:";
  window.storage = {
    async get(key) {
      const raw = localStorage.getItem(PREFIX + key);
      if (raw === null) return null;
      return { key, value: raw };
    },
    async set(key, value) {
      localStorage.setItem(PREFIX + key, value);
      return { key, value };
    },
    async delete(key) {
      const existed = localStorage.getItem(PREFIX + key) !== null;
      localStorage.removeItem(PREFIX + key);
      return existed ? { key, deleted: true } : null;
    },
    async list(prefix) {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(PREFIX)) {
          const kk = k.slice(PREFIX.length);
          if (!prefix || kk.startsWith(prefix)) keys.push(kk);
        }
      }
      return { keys, prefix };
    },
  };
})();
