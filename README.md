# 🌩️ SVGStorm Client

<div align="center">
  <img src="https://img.shields.io/npm/v/svgstorm-client?style=for-the-badge&color=8b5cf6" alt="NPM Version" />
  <img src="https://img.shields.io/npm/dt/svgstorm-client?style=for-the-badge&color=06b6d4" alt="NPM Downloads" />
  <img src="https://img.shields.io/github/license/imamultidev/svgstorm-client?style=for-the-badge&color=10b981" alt="License" />
  <img src="https://img.shields.io/github/stars/imamultidev/svgstorm-client?style=for-the-badge&color=f59e0b" alt="GitHub Stars" />
</div>

<div align="center">
  <h3>🚀 Biblioteca React para Iconos SVG Dinámicos</h3>
  <p>Consume iconos SVG profesionales desde la API de SVGStorm con cache inteligente y TypeScript completo</p>
</div>

---

## ✨ Características

- 🎯 **Carga Dinámica**: Obtén iconos SVG directamente desde la API de SVGStorm
- ⚡ **Cache Inteligente**: Sistema de cache en memoria para máximo rendimiento
- 🔧 **TypeScript**: Tipado completo para mejor DX
- 🎨 **Personalización**: Controla tamaño, color y estilos fácilmente
- 📦 **Liviano**: Paquete optimizado sin dependencias pesadas
- 🔄 **Estados de Carga**: Manejo elegante de loading y errores
- 🌐 **API Flexible**: Configura tu propia URL base de API

## 📦 Instalación

```bash
# npm
npm install svgstorm-client

# yarn
yarn add svgstorm-client

# pnpm
pnpm add svgstorm-client

# bun
bun add svgstorm-client
```

## 🚀 Inicio Rápido

### Uso Básico

```tsx
import { Icon } from "svgstorm-client";

function App() {
  return (
    <div>
      <h1>
        <Icon name="star" size={24} color="#fbbf24" />
        Mi Aplicación
      </h1>
    </div>
  );
}
```

### Con Hook Personalizado

```tsx
import { useIcon } from "svgstorm-client";

function CustomIcon() {
  const { data, loading, error } = useIcon("heart", {
    apiBaseUrl: "https://api.svgstorm.com",
    cacheTime: 10 * 60 * 1000, // 10 minutos
  });

  if (loading) return <div>Cargando icono...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Icono no encontrado</div>;

  return (
    <div>
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <div dangerouslySetInnerHTML={{ __html: data.svg_code }} />
    </div>
  );
}
```

## 📚 API Reference

### Componente `Icon`

El componente principal para renderizar iconos SVG.

```tsx
<Icon
  name="icon-name"
  size={24}
  color="#000000"
  className="my-icon"
  apiBaseUrl="https://api.svgstorm.com"
/>
```

#### Props

| Prop         | Tipo     | Requerido | Default                   | Descripción                      |
| ------------ | -------- | --------- | ------------------------- | -------------------------------- |
| `name`       | `string` | ✅        | -                         | Nombre del icono a cargar        |
| `size`       | `number` | ❌        | `24`                      | Tamaño en píxeles                |
| `color`      | `string` | ❌        | -                         | Color del icono (hex, rgb, etc.) |
| `className`  | `string` | ❌        | -                         | Clase CSS personalizada          |
| `apiBaseUrl` | `string` | ❌        | `"http://localhost:3000"` | URL base de la API               |

### Hook `useIcon`

Hook para obtener datos de iconos con control granular.

```tsx
const { data, loading, error } = useIcon(name, options);
```

#### Parámetros

| Parámetro | Tipo             | Requerido | Descripción               |
| --------- | ---------------- | --------- | ------------------------- |
| `name`    | `string`         | ✅        | Nombre del icono          |
| `options` | `UseIconOptions` | ❌        | Opciones de configuración |

#### Opciones (`UseIconOptions`)

| Opción       | Tipo     | Default                   | Descripción                     |
| ------------ | -------- | ------------------------- | ------------------------------- |
| `apiBaseUrl` | `string` | `"http://localhost:3000"` | URL base de la API              |
| `cacheTime`  | `number` | `300000` (5 min)          | Tiempo de cache en milisegundos |

#### Valor de Retorno (`UseIconResult`)

| Propiedad | Tipo               | Descripción      |
| --------- | ------------------ | ---------------- |
| `data`    | `IconData \| null` | Datos del icono  |
| `loading` | `boolean`          | Estado de carga  |
| `error`   | `string \| null`   | Mensaje de error |

## 🔧 Configuración Avanzada

### Configuración Global

```tsx
// components/IconProvider.tsx
import { createContext, useContext } from "react";

const IconContext = createContext({
  apiBaseUrl: "https://api.svgstorm.com",
  cacheTime: 10 * 60 * 1000,
});

export function IconProvider({ children, config }) {
  return <IconContext.Provider value={config}>{children}</IconContext.Provider>;
}

export function useIconConfig() {
  return useContext(IconContext);
}
```

### Cache Personalizado

```tsx
import { useIcon } from "svgstorm-client";

// Cache por 1 hora
const { data, loading, error } = useIcon("arrow-right", {
  cacheTime: 60 * 60 * 1000,
});

// Sin cache
const { data, loading, error } = useIcon("refresh", {
  cacheTime: 0,
});
```

### Estilos Personalizados

```tsx
import { Icon } from "svgstorm-client";
import styles from "./MyIcon.module.css";

function StyledIcon() {
  return (
    <Icon
      name="heart"
      className={styles.heartIcon}
      size={32}
      color="currentColor"
    />
  );
}
```

```css
/* MyIcon.module.css */
.heartIcon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: transform 0.2s ease;
}

.heartIcon:hover {
  transform: scale(1.1);
}
```

## 🎨 Ejemplos Avanzados

### Grid de Iconos

```tsx
import { Icon } from "svgstorm-client";

const iconNames = ["star", "heart", "home", "user", "settings"];

function IconGrid() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {iconNames.map((name) => (
        <div key={name} className="flex flex-col items-center">
          <Icon name={name} size={48} color="#8b5cf6" className="mb-2" />
          <span className="text-sm">{name}</span>
        </div>
      ))}
    </div>
  );
}
```

### Icono con Tooltip

```tsx
import { Icon, useIcon } from "svgstorm-client";

function IconWithTooltip({ name }) {
  const { data, loading, error } = useIcon(name);

  if (loading) return <Icon name="loading" />;
  if (error) return <Icon name="error" />;

  return (
    <div className="relative group" title={data?.description || data?.name}>
      <Icon name={name} size={24} />
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        {data?.description || data?.name}
      </div>
    </div>
  );
}
```

### Botón con Icono

```tsx
import { Icon } from "svgstorm-client";

function IconButton({ icon, children, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      {...props}
    >
      <Icon name={icon} size={20} color="currentColor" />
      {children}
    </button>
  );
}

// Uso
<IconButton icon="download" onClick={handleDownload}>
  Descargar
</IconButton>;
```

## 🔍 Troubleshooting

### Error: "Failed to fetch icon"

```tsx
// Verifica la URL de la API
const { data, loading, error } = useIcon("star", {
  apiBaseUrl: "https://tu-api.com", // Asegúrate de que esté correcto
});

// Maneja errores específicos
if (error) {
  if (error.includes("404")) {
    return <div>Icono no encontrado</div>;
  }
  if (error.includes("Network")) {
    return <div>Error de conexión</div>;
  }
  return <div>Error: {error}</div>;
}
```

### Optimización de Performance

```tsx
// Pre-carga iconos importantes
import { useIcon } from "svgstorm-client";

function App() {
  // Pre-carga iconos críticos
  useIcon("logo");
  useIcon("menu");
  useIcon("close");

  return <MyApp />;
}
```

### CORS Issues

Si tienes problemas de CORS, configura tu API:

```javascript
// Express.js example
app.use(
  cors({
    origin: ["http://localhost:3000", "https://tu-dominio.com"],
  })
);
```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor:

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. **Commit** tus cambios (`git commit -m 'Add amazing feature'`)
4. **Push** a la rama (`git push origin feature/amazing-feature`)
5. **Abre** un Pull Request

### Desarrollo Local

```bash
# Clona el repositorio
git clone https://github.com/imamultidev/svgstorm-client.git

# Instala dependencias
pnpm install

# Desarrollo en modo watch
pnpm dev

# Build para producción
pnpm build
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🌟 Agradecimientos

- Construido con ❤️ por [Imanol](https://github.com/imamultidev)
- Parte del ecosistema [SVGStorm](https://github.com/imamultidev/svgstorm)
- Inspirado por las mejores prácticas de la comunidad React

---

<div align="center">
  <p>¿Te gusta el proyecto? ¡Dale una ⭐ en GitHub!</p>
  <p>
    <a href="https://github.com/imamultidev/svgstorm-client">🌩️ SVGStorm Client</a> · 
    <a href="https://github.com/imamultidev/svgstorm">🌩️ SVGStorm API</a> · 
    <a href="https://svgstorm.com">🌐 Website</a>
  </p>
</div>
