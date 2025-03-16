---
# WIP
---

# Portfolio Personal - Jaime García-Page

Un portfolio profesional moderno y responsive construido con React, Vite y Tailwind CSS. Incluye secciones para mostrar información personal, habilidades, proyectos y un formulario de contacto funcional.

![Portfolio Preview](public/images/portfolio-preview.png)

## 🚀 Características

- ✅ Diseño moderno y responsive
- ✅ Modo oscuro/claro
- ✅ Animaciones suaves
- ✅ Sección de habilidades con animación de desplazamiento infinito
- ✅ Formulario de contacto funcional con EmailJS
- ✅ Optimizado para SEO
- ✅ Fácil de personalizar

## 🛠️ Tecnologías

- **React**: Biblioteca de JavaScript para construir interfaces de usuario
- **Vite**: Herramienta de compilación rápida para desarrollo moderno
- **Tailwind CSS**: Framework CSS utilitario para diseño rápido
- **EmailJS**: Servicio para enviar correos electrónicos desde el frontend
- **React Hooks**: Para gestión de estado y efectos
- **CSS Moderno**: Animaciones, Grid, Flexbox

## 📋 Requisitos previos

- Node.js (versión 14.x o superior)
- npm o yarn

## 🔧 Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/jaimegpm/Portfolio.git
   cd Portfolio
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura EmailJS para el formulario de contacto:
   - Regístrate en [EmailJS](https://www.emailjs.com/)
   - Crea un servicio de correo electrónico y una plantilla
   - Crea un archivo `src/config/emailjs.js` con tus credenciales
   - Este archivo está incluido en `.gitignore` para proteger tus credenciales

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

## 🚀 Despliegue en GitHub Pages

1. La configuración de Vite ya está lista para GitHub Pages con la base URL correcta:
   ```javascript
   // vite.config.js
   export default defineConfig({
     base: '/Portfolio/', // Nombre exacto del repositorio
     // resto de la configuración...
   });
   ```

2. El script de despliegue ya está configurado en `package.json`:
   ```json
   "scripts": {
     "deploy": "vite build && gh-pages -d dist"
   }
   ```

3. **Importante**: Todas las rutas a archivos estáticos (imágenes, documentos, etc.) deben ser relativas (sin barra inicial `/`):
   ```javascript
   // Correcto (ruta relativa)
   avatar1: "images/avatars/AvatarHero.webp",
   
   // Incorrecto (ruta absoluta)
   avatar1: "/images/avatars/AvatarHero.webp",
   ```

4. Para desplegar en GitHub Pages, simplemente ejecuta:
   ```bash
   npm run deploy
   # o
   yarn deploy
   ```

5. Después del despliegue, ve a la configuración de tu repositorio en GitHub:
   - Navega a Settings > Pages
   - Asegúrate de que la fuente está configurada en "gh-pages branch"

## 🔄 Personalización

- **Datos personales**: Actualiza la información en los componentes de las secciones
- **Colores y tema**: Modifica las variables en `src/styles/theme.js` y `tailwind.config.js`
- **Imágenes**: Reemplaza las imágenes en la carpeta `public/images`
- **Proyectos**: Añade o modifica tus proyectos en `src/components/sections/Projects.jsx`

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

Jaime García-Page - [garciapagemajaime@gmail.com](mailto:garciapagemajaime@gmail.com)

Enlace del proyecto: [https://github.com/jaimegpm/Portfolio](https://github.com/jaimegpm/Portfolio)

---

⭐️ ¡Si te gusta este proyecto, no dudes en darle una estrella! ⭐️
