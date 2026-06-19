import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, X, Filter } from 'lucide-react';

const initialFilterState = {
  nui: '',
  modelo: '',
  cliente: '',
  aprobado: null,
  reparado: null,
  to_fly: null,
  diagnosticado: null,
};

export default function Filters({ onApplyFilters, clientes = [], modelos = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilterState);

  const handleFieldChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setFilters(initialFilterState);
    onApplyFilters(initialFilterState);
  };

  const hasActiveFilters = filters.nui || filters.modelo || filters.cliente || filters.aprobado !== null || filters.reparado !== null || filters.to_fly !== null || filters.diagnosticado !== null;

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      transition: 'all var(--transition-normal)'
    }}>
      {/* Header clickable to expand/collapse */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'none',
          border: 'none',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          outline: 'none',
          transition: 'background-color var(--transition-fast)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        aria-expanded={isOpen}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SlidersHorizontal size={18} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontSize: '15px', fontWeight: '600', fontFamily: 'var(--font-heading)' }}>Filtros de Búsqueda</span>
          {hasActiveFilters && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '18px',
              minWidth: '18px',
              padding: '0 5px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              fontSize: '10px',
              fontWeight: '700'
            }}>•</span>
          )}
        </div>
        {isOpen ? <ChevronUp size={18} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />}
      </button>

      {/* Expanded Filter Panel */}
      {isOpen && (
        <div 
          className="animate-slide-down"
          style={{
            borderTop: '1px solid var(--border-color)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px'
          }}>
            {/* Input NUI */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>NUI</label>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Buscar NUI..."
                  value={filters.nui}
                  onChange={(e) => handleFieldChange('nui', e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
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
            </div>

            {/* Select Modelo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Modelo</label>
              <select
                value={filters.modelo}
                onChange={(e) => handleFieldChange('modelo', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="">Todos</option>
                {Object.entries(modelos).map(([category, list]) => (
                  list && list.length > 0 && (
                    <optgroup key={category} label={category}>
                      {list.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </optgroup>
                  )
                ))}
              </select>
            </div>

            {/* Select Cliente */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cliente</label>
              <select
                value={filters.cliente}
                onChange={(e) => handleFieldChange('cliente', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="">Todos</option>
                {clientes.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Select Diagnosticado */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Diagnosticado</label>
              <select
                value={filters.diagnosticado === null ? '' : filters.diagnosticado.toString()}
                onChange={(e) => handleFieldChange('diagnosticado', e.target.value === '' ? null : e.target.value === 'true')}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="">Todos</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Select Aprobado */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Aprobado</label>
              <select
                value={filters.aprobado === null ? '' : filters.aprobado.toString()}
                onChange={(e) => handleFieldChange('aprobado', e.target.value === '' ? null : e.target.value === 'true')}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="">Todos</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Select Reparado */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reparado</label>
              <select
                value={filters.reparado === null ? '' : filters.reparado.toString()}
                onChange={(e) => handleFieldChange('reparado', e.target.value === '' ? null : e.target.value === 'true')}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="">Todos</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Select To Fly */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>To Fly</label>
              <select
                value={filters.to_fly === null ? '' : filters.to_fly.toString()}
                onChange={(e) => handleFieldChange('to_fly', e.target.value === '' ? null : e.target.value === 'true')}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="">Todos</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          {/* Action Buttons inside Filters */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '8px'
          }}>
            {hasActiveFilters ? (
              <button
                onClick={clearFilters}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'var(--danger)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'background-color var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--danger-bg)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X size={14} />
                Limpiar filtros
              </button>
            ) : <div />}

            <button
              onClick={applyFilters}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--primary)',
                border: 'none',
                color: 'var(--primary-foreground)',
                fontSize: '14px',
                fontWeight: '600',
                padding: '8px 20px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'background-color var(--transition-fast)',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
            >
              <Filter size={14} />
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
