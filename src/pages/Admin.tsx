import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [tab, setTab] = useState<'servicios' | 'inscripciones'>('servicios');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--soft-gray)', color: 'var(--ink)', fontFamily: '"Nunito", sans-serif' }}>
      <header style={{ background: 'var(--ink)', color: 'white', padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', margin: 0 }}>PANEL DE <span style={{ color: 'var(--magenta)' }}>ADMINISTRADOR</span></h1>
        <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #444', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Cerrar Sesión</button>
      </header>

      <div style={{ padding: '2rem 5%' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            onClick={() => setTab('servicios')}
            style={{ padding: '0.8rem 1.5rem', background: tab === 'servicios' ? 'var(--magenta)' : '#ddd', color: tab === 'servicios' ? 'white' : 'black', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Gestión de Servicios
          </button>
          <button 
            onClick={() => setTab('inscripciones')}
            style={{ padding: '0.8rem 1.5rem', background: tab === 'inscripciones' ? 'var(--magenta)' : '#ddd', color: tab === 'inscripciones' ? 'white' : 'black', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Contactos (Inscripciones)
          </button>
        </div>

        {tab === 'servicios' ? <ServiciosTab /> : <InscripcionesTab />}
      </div>
    </div>
  );
}

function ServiciosTab() {
  const [servicios, setServicios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ icono: '', nombre: '', descripción: '', clase_de_color: 'c1' });

  useEffect(() => {
    fetchServicios();
  }, []);

  const fetchServicios = async () => {
    setLoading(true);
    const { data } = await supabase.from('productos').select('*').order('id', { ascending: true });
    if (data) setServicios(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('productos').update(formData).eq('id', editingId);
    } else {
      await supabase.from('productos').insert([formData]);
    }
    setFormData({ icono: '', nombre: '', descripción: '', clase_de_color: 'c1' });
    setEditingId(null);
    fetchServicios();
  };

  const handleEdit = (s: any) => {
    setEditingId(s.id);
    setFormData({ icono: s.icono, nombre: s.nombre, descripción: s.descripción, clase_de_color: s.clase_de_color });
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      await supabase.from('productos').delete().eq('id', id);
      fetchServicios();
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--ink)' }}>Lista de Servicios</h3>
        {loading ? <p>Cargando...</p> : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '1rem 0.5rem', color: '#666' }}>Icono</th>
                  <th style={{ padding: '1rem 0.5rem', color: '#666' }}>Nombre</th>
                  <th style={{ padding: '1rem 0.5rem', color: '#666' }}>Descripción</th>
                  <th style={{ padding: '1rem 0.5rem', color: '#666' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem 0.5rem', fontSize: '1.5rem' }}>{s.icono}</td>
                    <td style={{ padding: '1rem 0.5rem', fontWeight: 'bold' }}>{s.nombre}</td>
                    <td style={{ padding: '1rem 0.5rem', fontSize: '0.9rem', color: '#555' }}>{s.descripción}</td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <button onClick={() => handleEdit(s)} style={{ marginRight: '0.5rem', padding: '0.3rem 0.6rem', cursor: 'pointer', background: '#e3f2fd', color: '#1565c0', border: 'none', borderRadius: '4px' }}>Editar</button>
                      <button onClick={() => handleDelete(s.id)} style={{ padding: '0.3rem 0.6rem', cursor: 'pointer', background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '4px' }}>Borrar</button>
                    </td>
                  </tr>
                ))}
                {servicios.length === 0 && <tr><td colSpan={4} style={{ padding: '1rem', textAlign: 'center' }}>No hay servicios registrados.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', alignSelf: 'start' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--ink)' }}>
          {editingId ? 'Editar Servicio' : 'Nuevo Servicio'}
        </h3>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Emoji/Icono</label>
            <input required type="text" value={formData.icono} onChange={e => setFormData({...formData, icono: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Ej: 👕" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Nombre</label>
            <input required type="text" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Ej: Estampados" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Descripción</label>
            <textarea required value={formData.descripción} onChange={e => setFormData({...formData, descripción: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }} placeholder="Breve descripción" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Color de Acento</label>
            <select value={formData.clase_de_color} onChange={e => setFormData({...formData, clase_de_color: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="c1">Magenta</option>
              <option value="c2">Cyan</option>
              <option value="c3">Amarillo</option>
              <option value="c4">Naranja</option>
              <option value="c5">Morado</option>
              <option value="c6">Verde</option>
            </select>
          </div>
          <button type="submit" style={{ background: 'var(--magenta)', color: 'white', padding: '0.8rem', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}>
            {editingId ? 'Guardar Cambios' : 'Agregar Servicio'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setFormData({ icono: '', nombre: '', descripción: '', clase_de_color: 'c1' }); }} style={{ background: '#eee', color: 'black', padding: '0.8rem', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              Cancelar Edición
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

function InscripcionesTab() {
  const [inscripciones, setInscripciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInscripciones();
  }, []);

  const fetchInscripciones = async () => {
    setLoading(true);
    const { data } = await supabase.from('inscripciones').select('*').order('created_at', { ascending: false });
    if (data) setInscripciones(data);
    setLoading(false);
  };

  return (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--ink)' }}>Contactos Recientes</h3>
      {loading ? <p>Cargando...</p> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '1rem 0.5rem', color: '#666' }}>Fecha</th>
                <th style={{ padding: '1rem 0.5rem', color: '#666' }}>Nombre</th>
                <th style={{ padding: '1rem 0.5rem', color: '#666' }}>Teléfono</th>
                <th style={{ padding: '1rem 0.5rem', color: '#666' }}>Interés</th>
                <th style={{ padding: '1rem 0.5rem', color: '#666' }}>Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {inscripciones.map(i => (
                <tr key={i.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem 0.5rem', fontSize: '0.9rem', color: '#555' }}>{new Date(i.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem 0.5rem', fontWeight: 'bold' }}>{i.nombre}</td>
                  <td style={{ padding: '1rem 0.5rem' }}>{i.teléfono}</td>
                  <td style={{ padding: '1rem 0.5rem' }}>{i.interés}</td>
                  <td style={{ padding: '1rem 0.5rem', fontSize: '0.9rem', color: '#555', maxWidth: '300px' }}>{i.mensaje || '-'}</td>
                </tr>
              ))}
              {inscripciones.length === 0 && <tr><td colSpan={5} style={{ padding: '1rem', textAlign: 'center' }}>No hay contactos registrados.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
