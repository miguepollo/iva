
1. Inicialización del Proyecto (Ejecuta esto primero)
Si aún no tienes el proyecto, dile a Claude:
Claude, inicializa un proyecto de Next.js 14+ usando App Router, Tailwind CSS y TypeScript. Quiero una estructura limpia para una web de afiliados de viajes.

2. El Mega-Prompt de Construcción
Contexto del Proyecto:
Crea una plataforma de guías de viaje de alto rendimiento optimizada para SEO y conversión de afiliados (Civitatis, Booking, Skyscanner).

Stack Tecnológico:

Framework: Next.js (App Router) para máxima velocidad y SEO.

Estilos: Tailwind CSS.

Iconos: Lucide-react.

Animaciones: Framer Motion (para transiciones suaves).

Diseño UI/UX (Estética Pastel Moderna):

Paleta: Fondo #FAFAF9 (crema muy claro), acentos en #7DD3FC (azul cielo pastel) y botones de acción en #FDA4AF (rosa coral suave).

Componentes: Crea un sistema de "Cards" con backdrop-blur, bordes redondeados de 2xl y sombras shadow-sm que pasen a shadow-md en hover.

Tipografía: Sans-serif moderna (tipo Inter o Geist) con mucho interletrado para legibilidad.

Estructura de Archivos Requerida:

components/ui/: Botones, tarjetas de destino, tarjetas de excursión (estilo Civitatis).

components/layout/: Navbar transparente que se vuelve sólida al hacer scroll, Footer con enlaces de interés.

app/destinos/[slug]/page.tsx: Plantilla dinámica que incluya:

Hero con imagen y efecto parallax suave.

Grid de "Quick Facts".

Secciones: "Cómo llegar" (con CTA a Skyscanner), "Dónde dormir" (con CTA a Booking) y "Qué hacer".

Sección de Excursiones: Un componente tipo Grid que muestre actividades con precio, estrellas y botón de reserva.

Instrucciones de Programación:

Genera código limpio y modular.

Configura los metadatos dinámicos para SEO (títulos y descripciones por cada destino).

Asegúrate de que el diseño sea Mobile-First.

Implementa un componente de "Acordeón" o "Tabs" para organizar la información de "Cómo llegar" y "Qué ver" para no saturar al usuario.

Tarea Inicial:
Empieza construyendo la Landing Page (Home) y la Página de Detalle de Destino usando como ejemplo "Menorca, España". Usa imágenes de placeholder de alta calidad y asegúrate de que el diseño transmita "Wanderlust".

3. Por qué este camino es mejor:
Velocidad: Next.js es absurdamente rápido, y a Google le encanta la velocidad para el SEO de viajes.

Escalabilidad: Al usar Claude Code, puedes decirle más tarde: "Conéctame esto con una base de datos (Supabase o Contentful)" para gestionar cientos de destinos sin escribir código manualmente.

Cero "Lock-in": Este código es tuyo. Si mañana quieres cambiar a Claude por GPT-5 o Gemini 2.0, el código sigue ahí en tu VS Code.

Un último consejo: Cuando Claude termine la estructura, pídele que cree un archivo data/destinos.ts. Así, cuando quieras añadir un país nuevo, solo tendrás que añadir un objeto de texto ahí y la web creará la página automáticamente.

