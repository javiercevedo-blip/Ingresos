import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PlaneTakeoff, RefreshCw, Plus, Moon, Sun, Download, Upload } from 'lucide-react';
import Filters from './components/Filters';
import RegistroList from './components/RegistroList';
import RegistroModal from './components/RegistroModal';

// Seed demo data
const demoData = [
  {
    id: 'reg-1',
    nui: 'NUI-84729-A',
    modelo: 'Boeing 737 Max 8',
    aprobado: true,
    reparado: true,
    to_fly: true,
    comentario: 'Inspección de turbinas completada y aprobada por torre de control.',
    created_at: new Date(Date.now() - 3600000 * 24 * 3).toISOString() // 3 days ago
  },
  {
    id: 'reg-2',
    nui: 'NUI-10928-B',
    modelo: 'Airbus A320neo',
    aprobado: true,
    reparado: false,
    to_fly: false,
    comentario: 'Pendiente de cambio de filtros hidráulicos en ala izquierda.',
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString() // 2 days ago
  },
  {
    id: 'reg-3',
    nui: 'NUI-56473-C',
    modelo: 'Embraer 190',
    aprobado: false,
    reparado: false,
    to_fly: false,
    comentario: 'Daño en radar meteorológico detectado durante aterrizaje.',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString() // 5 hours ago
  },
  {
    id: 'reg-4',
    nui: 'NUI-99823-D',
    modelo: 'Cessna Citation Latitude',
    aprobado: true,
    reparado: true,
    to_fly: true,
    comentario: 'Vuelo de prueba exitoso. Listo para entrega al hangar principal.',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString() // 1 day ago
  }
];

export default function App() {
  const [registros, setRegistros] = useState([]);
  const [filteredRegistros, setFilteredRegistros] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ nui: '', modelo: '', aprobado: null, reparado: null, to_fly: null });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRegistro, setEditingRegistro] = useState(null);
  
  const [theme, setTheme] = useState('dark'); // Dark theme by default for premium feel
  const fileInputRef = useRef(null);

  // Initialize data and theme
  useEffect(() => {
    // 1. Theme initialization
    const savedTheme = localStorage.getItem('ingresos-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // 2. Data initialization
    const stored = localStorage.getItem('ingresos-data');
    if (stored) {
      try {
        setRegistros(JSON.parse(stored));
      } catch (e) {
        setRegistros(demoData);
        localStorage.setItem('ingresos-data', JSON.stringify(demoData));
      }
    } else {
      setRegistros(demoData);
      localStorage.setItem('ingresos-data', JSON.stringify(demoData));
    }
    setIsLoading(false);
  }, []);

  // Filter application logic
  useEffect(() => {
    let result = [...registros];
    
    if (activeFilters.nui) {
      result = result.filter(r => r.nui.toLowerCase().includes(activeFilters.nui.toLowerCase()));
    }
    if (activeFilters.modelo) {
      result = result.filter(r => r.modelo.toLowerCase().includes(activeFilters.modelo.toLowerCase()));
    }
    if (activeFilters.aprobado !== null) {
      result = result.filter(r => r.aprobado === activeFilters.aprobado);
    }
    if (activeFilters.reparado !== null) {
      result = result.filter(r => r.reparado === activeFilters.reparado);
    }
    if (activeFilters.to_fly !== null) {
      result = result.filter(r => r.to_fly === activeFilters.to_fly);
    }

    // Sort by creation date descending
    result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setFilteredRegistros(result);
  }, [registros, activeFilters]);

  // Save changes to localStorage
  const saveToStorage = (newRegistros) => {
    setRegistros(newRegistros);
    localStorage.setItem('ingresos-data', JSON.stringify(newRegistros));
  };

  // Toggle theme dark/light
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('ingresos-theme', nextTheme);
  };

  // CRUD Actions
  const handleSave = (formData) => {
    setIsLoading(true);
    setTimeout(() => { // Subtle delay for simulated save feel
      if (editingRegistro) {
        // Edit Mode
        const updated = registros.map(r => 
          r.id === editingRegistro.id 
            ? { ...r, ...formData, updated_at: new Date().toISOString() }
            : r
        );
        saveToStorage(updated);
      } else {
        // Create Mode
        const newRecord = {
          id: 'reg-' + Date.now(),
          ...formData,
          created_at: new Date().toISOString()
        };
        saveToStorage([newRecord, ...registros]);
      }
      setIsLoading(false);
      setIsModalOpen(false);
      setEditingRegistro(null);
    }, 400);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este registro de ingreso?')) {
      const updated = registros.filter(r => r.id !== id);
      saveToStorage(updated);
    }
  };

  const handleToggleField = (id, field, currentValue) => {
    const updated = registros.map(r => 
      r.id === id 
        ? { ...r, [field]: !currentValue, updated_at: new Date().toISOString() }
        : r
    );
    saveToStorage(updated);
  };

  // Refresh trigger (forces a spin animation and re-sync)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const stored = localStorage.getItem('ingresos-data');
      if (stored) {
        setRegistros(JSON.parse(stored));
      }
      setIsRefreshing(false);
    }, 600);
  };

  // JSON Export
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(registros, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ingresos_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // JSON Import
  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    if (!file) return;

    fileReader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          // Basic schema verification
          const isValid = importedData.every(item => item.nui && item.modelo && 'aprobado' in item);
          if (isValid) {
            saveToStorage(importedData);
            alert('¡Registros importados con éxito!');
          } else {
            alert('El archivo no cumple con el formato correcto de registros de ingresos.');
          }
        } else {
          alert('El archivo JSON debe contener un arreglo de registros.');
        }
      } catch (err) {
        alert('Error al leer el archivo JSON.');
      }
    };
    fileReader.readAsText(file);
    e.target.value = ''; // Reset file input
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Panel */}
      <header style={{
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-card)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: 'var(--shadow-sm)',
        transition: 'all var(--transition-normal)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              padding: '8px',
              backgroundColor: 'var(--primary-hover)',
              color: 'var(--primary-foreground)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <PlaneTakeoff size={20} />
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
              INGRESOS
            </h1>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            
            {/* Import JSON hidden input */}
            <input 
              type="file" 
              accept=".json" 
              ref={fileInputRef} 
              onChange={handleImportJSON} 
              style={{ display: 'none' }} 
            />

            {/* Import Button */}
            <button
              onClick={() => fileInputRef.current.click()}
              title="Importar registros desde JSON"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Upload size={14} />
              <span className="hide-on-mobile">Importar</span>
            </button>

            {/* Export Button */}
            <button
              onClick={handleExportJSON}
              title="Exportar registros a JSON"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Download size={14} />
              <span className="hide-on-mobile">Exportar</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Refresh */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              title="Refrescar lista"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <RefreshCw size={15} className={isRefreshing ? 'animate-spin' : ''} />
            </button>

            {/* Create Button */}
            <button
              onClick={() => {
                setEditingRegistro(null);
                setIsModalOpen(true);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'background-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
            >
              <Plus size={15} />
              <span>Nuevo Ingreso</span>
            </button>

          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        
        {/* Filters */}
        <Filters onApplyFilters={setActiveFilters} />

        {/* Counter indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '13px',
          color: 'var(--text-muted)'
        }}>
          <span>
            Mostrando <strong>{filteredRegistros.length}</strong> de {registros.length} ingresos registrados.
          </span>
        </div>

        {/* Loading Spinner or List representation */}
        {isLoading ? (
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '48px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <RefreshCw size={24} className="animate-spin" style={{ color: 'var(--text-muted)', margin: '0 auto' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '12px' }}>Cargando registros de ingresos...</p>
          </div>
        ) : (
          <RegistroList
            registros={filteredRegistros}
            onEdit={(reg) => {
              setEditingRegistro(reg);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
            onToggleField={handleToggleField}
          />
        )}

      </main>

      {/* Modals Form rendering */}
      {isModalOpen && (
        <RegistroModal
          registro={editingRegistro}
          onSave={handleSave}
          onClose={() => {
            setIsModalOpen(false);
            setEditingRegistro(null);
          }}
          isLoading={isLoading}
        />
      )}

      {/* Style for responsive text hiding */}
      <style>{`
        @media (max-width: 580px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
