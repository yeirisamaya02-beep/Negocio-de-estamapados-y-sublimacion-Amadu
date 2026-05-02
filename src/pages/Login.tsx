import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ink)' }}>
      <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--ink)' }}>
          ADMIN <span style={{ color: 'var(--magenta)' }}>LOGIN</span>
        </h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--ink)' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc', color: 'black' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--ink)' }}>Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc', color: 'black' }}
              required
            />
          </div>
          {error && <p style={{ color: '#d32f2f', fontSize: '0.9rem' }}>{error}</p>}
          <button 
            type="submit" 
            disabled={loading}
            style={{ background: 'var(--magenta)', color: 'white', padding: '1rem', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="/" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>← Volver al sitio web</a>
        </div>
      </div>
    </div>
  );
}
