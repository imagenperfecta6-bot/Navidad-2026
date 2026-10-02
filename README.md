# Catálogo Navidad / Fin de Año — Imagen Perfecta 7

Micrositio estático (HTML/CSS/JS, sin build) para el catálogo de temporada:
productos promocionales + **kits y anchetas** con slider "antes / después".

## Estructura

```
web/
  index.html            Estructura de la página (no se toca para agregar productos)
  assets/
    css/styles.css       Tema festivo (rojo navideño + pino + dorado), nieve, slider
    js/products.js        >>> FUENTE DE DATOS <<<  categorías, productos y kits
    js/main.js            Lógica: catálogo, filtros, selección, cotización, nieve, slider
    img/
      brand/              logo y favicon
      kits/               fotos de kits: <id>-cerrado.jpg / <id>-abierto.jpg
      productos/          fotos de producto: <id>.jpg
      productos/_ref/     imágenes de referencia por categoría (fallback)
```

## Cómo editar el catálogo

Todo está en **`assets/js/products.js`**:

- **Categorías**: arreglo `CATEGORIES`. El orden define el orden de las
  secciones y de las pastillas de filtro (los botones se generan solos).
- **Productos**: arreglo `PRODUCTS`. Cada objeto lleva `id`, `name`, `code`,
  `category`, `description`, `features[]`, `minQty`, `priceTiers[]` e `images[]`.
- **Kits / Anchetas**: arreglo `KITS`. Además de precio y `contents[]`, cada
  kit lleva un objeto `reveal` con `before` (presentación / caja cerrada) y
  `after` (kit completo por dentro). Esas son las dos imágenes del slider.

### Fotos

- Producto: `assets/img/productos/<id>.jpg`. Mientras no exista, la tarjeta
  muestra la imagen de referencia de su categoría.
- Kit: `assets/img/kits/<id>-cerrado.jpg` y `<id>-abierto.jpg`. Actualiza las
  rutas `reveal.before` / `reveal.after` del kit. Recomendado 4:3, mismo encuadre
  en las dos fotos para que el slider "calce".

## Datos de ejemplo

Los productos `EJ-###` y los kits `KIT-0#` son **marcadores de posición** para
mostrar la estructura. Reemplázalos por el catálogo real.

## Vista local

Servidor de prueba registrado en `.claude/launch.json` como `navidad-catalogo`
(puerto 8093).

## Config

- Correo de cotización: `CONFIG.quoteEmail` en `assets/js/main.js`
  (hoy `mercadeo@ip7.com.co`). El formulario arma un `mailto:` — sin backend.
- La nieve se puede apagar desde la navbar; respeta `prefers-reduced-motion`.
