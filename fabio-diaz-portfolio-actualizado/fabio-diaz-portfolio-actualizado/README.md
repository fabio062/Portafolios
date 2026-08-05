# Fabio Diaz — Portfolio

Proyecto React + Vite + Tailwind CSS.

## Ejecutar en local (opcional, solo si quieres editarlo antes de subirlo)

```bash
npm install
npm run dev
```

Abre la URL que te muestre la terminal (normalmente http://localhost:5173).

## Generar la versión final para publicar

```bash
npm install
npm run build
```

Esto crea una carpeta `dist/` con el sitio ya compilado y optimizado. Esa es la carpeta que subes al hosting.

## Publicar gratis en Netlify (la forma más rápida — sin código)

1. Corre `npm install` y luego `npm run build` (arriba).
2. Entra a https://app.netlify.com/drop
3. Arrastra la carpeta `dist/` a la página.
4. Netlify te da una URL pública al instante (algo como `tunombre.netlify.app`).
5. Desde el panel de Netlify puedes conectar un dominio propio si tienes uno, gratis.

## Publicar gratis en Vercel (recomendado si usas GitHub)

1. Sube este proyecto a un repositorio de GitHub.
2. Entra a https://vercel.com, conecta tu cuenta de GitHub.
3. Importa el repositorio — Vercel detecta automáticamente que es un proyecto Vite.
4. Cada vez que subas cambios a GitHub, el sitio se actualiza solo.

## Editar contenido

Todo el contenido (fotos, textos, número de WhatsApp, Instagram, email) está en la parte superior de `src/App.jsx`, en las constantes `portfolioProjects`, `transformationPairs`, `services`, `process`, `WHATSAPP_NUMBER`, `INSTAGRAM_HANDLE` y `EMAIL`. No hace falta tocar el resto del código para actualizar fotos o textos.
