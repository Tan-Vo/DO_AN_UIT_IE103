import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <NotificationContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {toasts.length > 0 && (
        <div style={{ position:'fixed', top:20, right:20, zIndex:9999, display:'flex', flexDirection:'column', gap:8 }}>
          {toasts.map(t => (
            <div key={t.id} onClick={() => removeToast(t.id)} style={{
              padding:'12px 20px', borderRadius:8, color:'#fff', cursor:'pointer', minWidth:280,
              animation:'slideIn 0.3s ease', boxShadow:'0 4px 20px rgba(0,0,0,0.3)',
              background: t.type === 'success' ? '#10b981' : t.type === 'error' ? '#ef4444' : t.type === 'warning' ? '#f59e0b' : '#3b82f6'
            }}>
              {t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : t.type === 'warning' ? '⚠️' : 'ℹ️'} {t.message}
            </div>
          ))}
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
export default NotificationContext;
