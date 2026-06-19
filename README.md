# INGRESOS - Plataforma de Gestión de Registros

Esta aplicación es una plataforma responsive desarrollada en React y Vite para la administración de ingresos de componentes o aeronaves. Se diseñó de forma autónoma e independiente de Supabase utilizando `LocalStorage` para persistir los datos en el navegador del usuario.

## Características
- **Avanzada e Interactiva**: Permite buscar, filtrar, crear, editar, eliminar y alternar estados con un solo clic.
- **Responsive**: Interfaz adaptativa que cambia de una tabla detallada (en escritorio) a tarjetas tipo feed interactivas (en móviles).
- **Diseño Premium**: Paleta de colores HSL personalizada, Modo Claro y Modo Oscuro nativos, animaciones y micro-interacciones suaves, y efectos de glassmorphism.
- **Portabilidad de Datos**: Exporta e importa los datos en formato JSON en cualquier momento desde la interfaz.

---

## Cómo Iniciar en Local

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Corre el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abre el enlace local indicado en la terminal (usualmente `http://localhost:5173`).

---

## Conexión con GitHub

Este proyecto ya está inicializado con Git. Para conectarlo a tu cuenta de GitHub, sigue estos pasos:

1. Crea un repositorio vacío en tu cuenta de GitHub llamado `ingresos-app`.
2. Ejecuta los siguientes comandos en tu terminal local dentro de esta carpeta:
   ```bash
   # Agregar el origen remoto de GitHub
   git remote add origin https://github.com/TU_USUARIO/ingresos-app.git
   
   # Renombrar rama a main si es necesario
   git branch -M main
   
   # Confirmar los archivos locales
   git add .
   git commit -m "Initial commit: Plataforma de ingresos sin dependencias externas"
   
   # Subir a GitHub
   git push -u origin main
   ```

### Despliegue automático en GitHub Pages
Hemos configurado `gh-pages` para que puedas publicar la aplicación directamente y de forma gratuita:

1. Ejecuta el comando:
   ```bash
   npm run deploy
   ```
2. ¡Listo! Tu aplicación estará disponible en la URL pública: `https://TU_USUARIO.github.io/ingresos-app/`.
