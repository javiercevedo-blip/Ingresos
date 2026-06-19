import React, { useState } from 'react';
import { Pencil, Trash2, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

// StatusBadge: Renders interactive button (if editable) or static tag (if not editable)
export function StatusBadge({ label, value, editable, onToggle }) {
  const activeClass = value 
    ? { bg: 'var(--success-bg)', text: 'var(--success-text)', hover: 'var(--success)' }
    : { bg: 'var(--danger-bg)', text: 'var(--danger-text)', hover: 'var(--danger)' };

  if (editable) {
    return (
      <button
        type="button"
        onClick={onToggle}
        style={{
          border: 'none',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          fontSize: '11px',
          fontWeight: '600',
          backgroundColor: activeClass.bg,
          color: activeClass.text,
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = 'brightness(0.95)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = 'none';
          e.currentTarget.style.boxShadow = 'none';
        }}
        title={`${label}: ${value ? 'Sí' : 'No'} — Clic para alternar`}
      >
        {label}
      </button>
    );
  }

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: 'var(--radius-full)',
        fontSize: '11px',
        fontWeight: '600',
        backgroundColor: activeClass.bg,
        color: activeClass.text,
        userSelect: 'none'
      }}
      title={`${label}: ${value ? 'Sí' : 'No'}`}
    >
      {label}
    </span>
  );
}

// RegistroRow: Representation inside the Table for Desktop
export function RegistroRow({ registro, onEdit, onDelete, onToggleField }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr 
        style={{
          borderBottom: '1px solid var(--border-color)',
          transition: 'background-color var(--transition-fast)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        {/* NUI (Clickable to Expand Details) */}
        <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap' }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '600',
              outline: 'none',
              textAlign: 'left'
            }}
          >
            <span>{registro.nui}</span>
            {registro.comentario && <MessageSquare size={13} style={{ color: 'var(--text-muted)', opacity: 0.8 }} />}
            {isExpanded ? <ChevronUp size={14} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />}
          </button>
        </td>

        {/* Modelo */}
        <td style={{ padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
          {registro.modelo}
        </td>

        {/* Cliente */}
        <td style={{ padding: '12px 16px', fontSize: '14px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', fontWeight: '500' }}>
          {registro.cliente}
        </td>

        {/* Statuses (Static in main row view) */}
        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
          <StatusBadge label="Diagnosticado" value={registro.diagnosticado} editable={false} />
        </td>
        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
          <StatusBadge label="Aprobado" value={registro.aprobado} editable={false} />
        </td>
        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
          <StatusBadge label="Reparado" value={registro.reparado} editable={false} />
        </td>
        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
          <StatusBadge label="To Fly" value={registro.to_fly} editable={false} />
        </td>

        {/* Comentario Truncated */}
        <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-muted)', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {registro.comentario ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare size={12} style={{ color: 'var(--text-muted)', opacity: 0.6 }} />
              {registro.comentario}
            </span>
          ) : (
            <span style={{ color: 'var(--text-muted)', opacity: 0.4 }}>—</span>
          )}
        </td>

        {/* Actions */}
        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <button
              onClick={() => onEdit(registro)}
              aria-label="Editar"
              style={{
                border: 'none',
                background: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-muted)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(registro.id)}
              aria-label="Eliminar"
              style={{
                border: 'none',
                background: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--danger-bg)';
                e.currentTarget.style.color = 'var(--danger)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded Row for editing flags inline and viewing commentary */}
      {isExpanded && (
        <tr style={{ backgroundColor: 'var(--bg-muted)', borderBottom: '1px solid var(--border-color)' }}>
          <td colSpan={9} style={{ padding: '12px 20px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              
              {/* Quick toggles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Alternar Estado:</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <StatusBadge 
                    label="Diagnosticado" 
                    value={registro.diagnosticado} 
                    editable={true} 
                    onToggle={() => onToggleField(registro.id, 'diagnosticado', registro.diagnosticado)} 
                  />
                  <StatusBadge 
                    label="Aprobado" 
                    value={registro.aprobado} 
                    editable={true} 
                    onToggle={() => onToggleField(registro.id, 'aprobado', registro.aprobado)} 
                  />
                  <StatusBadge 
                    label="Reparado" 
                    value={registro.reparado} 
                    editable={true} 
                    onToggle={() => onToggleField(registro.id, 'reparado', registro.reparado)} 
                  />
                  <StatusBadge 
                    label="To Fly" 
                    value={registro.to_fly} 
                    editable={true} 
                    onToggle={() => onToggleField(registro.id, 'to_fly', registro.to_fly)} 
                  />
                </div>
              </div>

              {/* Complete comment */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <MessageSquare size={14} style={{ color: 'var(--text-muted)' }} />
                <span>
                  <strong>Comentario: </strong> 
                  {registro.comentario ? registro.comentario : <span style={{ fontStyle: 'italic', opacity: 0.6 }}>Sin comentario asignado</span>}
                </span>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// RegistroCard: Representation for Mobile Cards feed
export function RegistroCard({ registro, onEdit, onDelete, onToggleField }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all var(--transition-fast)'
    }}>
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        {/* Card Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              padding: 0,
              cursor: 'pointer',
              flex: 1,
              outline: 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{registro.nui}</span>
              {registro.comentario && <MessageSquare size={13} style={{ color: 'var(--text-muted)', opacity: 0.7 }} />}
              {isExpanded ? <ChevronUp size={14} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', flexWrap: 'wrap' }}>
              <span>{registro.modelo}</span>
              <span style={{ height: '3px', width: '3px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', opacity: 0.6 }} />
              <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{registro.cliente}</span>
            </span>
          </button>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => onEdit(registro)}
              aria-label="Editar"
              style={{
                border: 'none',
                background: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(registro.id)}
              aria-label="Eliminar"
              style={{
                border: 'none',
                background: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: 'var(--radius-sm)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--danger)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {/* Status badges row (dynamic depending on expansion) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <StatusBadge 
            label="Diagnosticado" 
            value={registro.diagnosticado} 
            editable={isExpanded} 
            onToggle={() => onToggleField(registro.id, 'diagnosticado', registro.diagnosticado)} 
          />
          <StatusBadge 
            label="Aprobado" 
            value={registro.aprobado} 
            editable={isExpanded} 
            onToggle={() => onToggleField(registro.id, 'aprobado', registro.aprobado)} 
          />
          <StatusBadge 
            label="Reparado" 
            value={registro.reparado} 
            editable={isExpanded} 
            onToggle={() => onToggleField(registro.id, 'reparado', registro.reparado)} 
          />
          <StatusBadge 
            label="To Fly" 
            value={registro.to_fly} 
            editable={isExpanded} 
            onToggle={() => onToggleField(registro.id, 'to_fly', registro.to_fly)} 
          />
        </div>

      </div>

      {/* Expanded commentary panel */}
      {isExpanded && (
        <div style={{
          borderTop: '1px solid var(--border-color)',
          padding: '10px 16px',
          backgroundColor: 'rgba(var(--bg-muted), 0.3)'
        }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Comentario</span>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            {registro.comentario ? registro.comentario : <span style={{ fontStyle: 'italic', opacity: 0.6 }}>Sin comentario</span>}
          </p>
        </div>
      )}
    </div>
  );
}
