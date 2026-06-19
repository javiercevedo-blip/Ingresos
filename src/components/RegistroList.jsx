import React from 'react';
import { RegistroRow, RegistroCard } from './RegistroRow';

export default function RegistroList({ registros, onEdit, onDelete, onToggleField }) {
  if (registros.length === 0) {
    return (
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '48px',
        textAlign: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No se encontraron ingresos registrados.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Mobile Feed View: hidden on desktop, flex column on mobile */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }} className="mobile-only-list">
        {registros.map(reg => (
          <RegistroCard
            key={reg.id}
            registro={reg}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleField={onToggleField}
          />
        ))}
      </div>

      {/* Desktop Table View: hidden on mobile, table layout on desktop */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        width: '100%'
      }} className="desktop-only-table">
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: 'rgba(var(--bg-muted), 0.5)'
              }}>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>NUI</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Modelo</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cliente</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Diagnosticado</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Aprobado</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Reparado</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>To Fly</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Comentario</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map(reg => (
                <RegistroRow
                  key={reg.id}
                  registro={reg}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleField={onToggleField}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Embedded CSS rules for responsive hidden/block toggles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-only-table {
            display: none !important;
          }
          .mobile-only-list {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .desktop-only-table {
            display: block !important;
          }
          .mobile-only-list {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
