import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

export default function RegistroModal({ registro, onSave, onClose, isLoading }) {
  const [formData, setFormData] = useState({
    nui: '',
    modelo: '',
    aprobado: false,
    reparado: false,
    to_fly: false,
    diagnosticado: false,
    comentario: '',
  });

  useEffect(() => {
    if (registro) {
      setFormData({
        nui: registro.nui,
        modelo: registro.modelo,
        aprobado: registro.aprobado,
        reparado: registro.reparado,
        to_fly: registro.to_fly,
        diagnosticado: registro.diagnosticado || false,
        comentario: registro.comentario || '',
      });
    } else {
      setFormData({
        nui: '',
        modelo: '',
        aprobado: false,
        reparado: false,
        to_fly: false,
        diagnosticado: false,
        comentario: '',
      });
    }
  }, [registro]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isEditing = !!registro;

  return (
    <div 
      className="animate-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px'
      }}
    >
      <div 
        className="animate-modal-pop"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '460px',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            {isEditing ? 'Editar Ingreso' : 'Nuevo Ingreso'}
          </h2>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              transition: 'background-color var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* NUI Field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              NUI <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ej. NUI-98745"
              value={formData.nui}
              onChange={(e) => setFormData({ ...formData, nui: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color var(--transition-fast)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--border-focus)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>

          {/* Modelo Field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Modelo <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Boeing 737 Max"
              value={formData.modelo}
              onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color var(--transition-fast)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--border-focus)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>

          {/* Status Checkboxes Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
            marginTop: '4px'
          }}>
            {/* Aprobado Checkbox */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '6px',
              padding: '12px 8px',
              backgroundColor: 'var(--bg-muted)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)',
              userSelect: 'none'
            }}
            className="checkbox-label"
            >
              <input
                type="checkbox"
                checked={formData.aprobado}
                onChange={(e) => setFormData({ ...formData, aprobado: e.target.checked })}
                style={{
                  height: '16px',
                  width: '16px',
                  accentColor: 'var(--primary)',
                  cursor: 'pointer'
                }}
              />
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Aprobado</span>
            </label>

            {/* Reparado Checkbox */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '6px',
              padding: '12px 8px',
              backgroundColor: 'var(--bg-muted)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)',
              userSelect: 'none'
            }}
            className="checkbox-label"
            >
              <input
                type="checkbox"
                checked={formData.reparado}
                onChange={(e) => setFormData({ ...formData, reparado: e.target.checked })}
                style={{
                  height: '16px',
                  width: '16px',
                  accentColor: 'var(--primary)',
                  cursor: 'pointer'
                }}
              />
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Reparado</span>
            </label>

            {/* To Fly Checkbox */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '6px',
              padding: '12px 8px',
              backgroundColor: 'var(--bg-muted)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)',
              userSelect: 'none'
            }}
            className="checkbox-label"
            >
              <input
                type="checkbox"
                checked={formData.to_fly}
                onChange={(e) => setFormData({ ...formData, to_fly: e.target.checked })}
                style={{
                  height: '16px',
                  width: '16px',
                  accentColor: 'var(--primary)',
                  cursor: 'pointer'
                }}
              />
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>To Fly</span>
            </label>

            {/* Diagnosticado Checkbox */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '6px',
              padding: '12px 8px',
              backgroundColor: 'var(--bg-muted)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)',
              userSelect: 'none'
            }}
            className="checkbox-label"
            >
              <input
                type="checkbox"
                checked={formData.diagnosticado}
                onChange={(e) => setFormData({ ...formData, diagnosticado: e.target.checked })}
                style={{
                  height: '16px',
                  width: '16px',
                  accentColor: 'var(--primary)',
                  cursor: 'pointer'
                }}
              />
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Diagnosticado</span>
            </label>
          </div>

          {/* Comentario Field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Comentario</label>
            <textarea
              placeholder="Detalles adicionales o notas sobre el ingreso..."
              value={formData.comentario}
              onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
              rows={3}
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                color: 'var(--text-primary)',
                outline: 'none',
                resize: 'none',
                transition: 'border-color var(--transition-fast)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--border-focus)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>

          {/* Actions buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '12px'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '10px 16px',
                backgroundColor: 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '10px 16px',
                backgroundColor: 'var(--primary)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--primary-foreground)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {isEditing ? 'Guardar Cambios' : 'Crear Ingreso'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .checkbox-label:hover {
          background-color: var(--bg-hover) !important;
        }
      `}</style>
    </div>
  );
}
