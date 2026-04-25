import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    interés: '',
    teléfono: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('inscripciones')
        .insert([formData]);

      if (error) throw error;
      
      setMessage('¡Registro exitoso! Te contactaremos pronto.');
      setFormData({ nombre: '', interés: '', teléfono: '', mensaje: '' });
    } catch (err: any) {
      console.error(err);
      setMessage('Error al registrar: ' + (err.message || 'Inténtalo de nuevo.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-col" style={{ background: 'white', padding: '2rem', borderRadius: '12px' }}>
      <div className="section-title">Registro de Interés</div>
      <form className="reg-form" onSubmit={handleSubmit}>
        <div>
          <label className="reg-label">Nombre</label>
          <input
            className="reg-input"
            type="text"
            placeholder="Tu nombre completo"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="reg-label">Producto/Servicio de interés</label>
          <input
            className="reg-input"
            type="text"
            placeholder="¿Qué buscas?"
            value={formData.interés}
            onChange={(e) => setFormData({ ...formData, interés: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="reg-label">Teléfono</label>
          <input
            className="reg-input"
            type="tel"
            placeholder="Número de contacto"
            value={formData.teléfono}
            onChange={(e) => setFormData({ ...formData, teléfono: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="reg-label">Mensaje (opcional)</label>
          <textarea
            className="reg-input"
            style={{ height: '80px', resize: 'none' }}
            placeholder="Cuéntanos más detalles..."
            value={formData.mensaje}
            onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
          />
        </div>
        <button className="btn-register" type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar registro →'}
        </button>
        {message && <p style={{ fontSize: '11px', marginTop: '8px', color: message.includes('Error') ? '#d32f2f' : '#2e7d32' }}>{message}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;
