/* ==========================================================================
   CATÁLOGO NAVIDAD / FIN DE AÑO — Imagen Perfecta Sie7e
   --------------------------------------------------------------------------
   Este archivo es la ÚNICA fuente de datos del sitio. El HTML no se toca
   para agregar productos, kits ni categorías: todo sale de estos arreglos.

   >>> DATOS DE EJEMPLO <<<
   Los productos y kits de abajo son marcadores de posición para que se vea
   la estructura funcionando. Reemplázalos por el catálogo real de temporada.

   --------------------------------------------------------------------------
   CATEGORÍAS (para los filtros del catálogo de productos)
   Los botones de filtro se generan solos desde este arreglo. El orden aquí
   es el orden en que aparecen las secciones y las pastillas.

   PRODUCTOS
   { id, name, code, category, description, features[], minQty, images[] }
   - id: único, sin espacios.
   - minQty: cantidad mínima de ESE producto (si falta, se usa 5).
   - Sin precio: a pedido del usuario (todavía no se sabe en cuánto van a
     salir), ningún producto muestra precio — todos van a "Cotización
     especial". El motor de precios por tramos (`priceTiers`) sigue
     soportado por si en el futuro se quiere reactivar para alguno.
   - images: una o varias rutas. Con varias, la tarjeta arma un mini carrusel.
     Mientras no exista la foto, la tarjeta cae a assets/img/productos/_ref/
     {category}.svg (imagen de referencia por categoría).

   KITS / ANCHETAS (sección propia, con slider "antes / después")
   { id, name, code, description, contents[], minQty, reveal:{...} }
   - reveal.before : imagen de la presentación / caja cerrada (lo que se ve primero).
   - reveal.after  : imagen del kit completo por dentro (lo que se revela al deslizar).
   - reveal.beforeLabel / afterLabel : textos de las etiquetas sobre la imagen.
   Coloca las fotos reales en assets/img/kits/ y actualiza las rutas.
   ========================================================================== */

const CATEGORIES = [
  { slug: "sets",        label: "Sets" },
  { slug: "morrales",    label: "Morrales y Bolsos" },
  { slug: "hogar",       label: "Hogar y Descanso" },
  { slug: "accesorios",  label: "Accesorios" },
  { slug: "juegos",      label: "Juegos y Entretenimiento" },
];

const PRODUCTS = [
  // ---------------- SETS ----------------
  {
    id: "caja-bambu-una-botella",
    name: "Caja de Bambú para una Botella",
    code: "HO0107",
    category: "sets",
    description: "Contiene 4 accesorios de bar con aplique en madera: sacacorchos descapsulador de 1 tiempo, cortagotas, tapón metálico y aro antigoteo. No incluye la botella de vino.",
    features: ["4 accesorios de bar", "Aplique en madera", "No incluye botella"],
    minQty: 10,
    images: ["assets/img/productos/caja-bambu-una-botella.jpg"],
  },
  {
    id: "caja-vino-una-botella",
    name: "Caja de Vino Para Una Botella",
    code: "HO0075",
    category: "sets",
    description: "Contiene 4 accesorios de bar: sacacorchos descapsulador de 1 tiempo, cortagotas, tapón metálico y aro antigoteo. No incluye la botella de vino.",
    features: ["4 accesorios de bar", "Sacacorchos incluido", "No incluye botella"],
    minQty: 10,
    images: ["assets/img/productos/caja-vino-una-botella.jpg"],
  },
  {
    id: "caja-circular-bambu",
    name: "Caja Circular en Bambú",
    code: "HO0115",
    category: "sets",
    description: "Contiene 4 accesorios de bar con aplique en madera: tapón para botella, cortagotas, aro antigoteo, sacacorchos de 1 tiempo. Caja interior beige.",
    features: ["4 accesorios de bar", "Aplique en madera", "Caja interior beige"],
    minQty: 10,
    images: ["assets/img/productos/caja-circular-bambu.jpg"],
  },
  {
    id: "caja-circular-madera",
    name: "Caja Circular de Madera",
    code: "HO0110",
    category: "sets",
    description: "Contiene 4 accesorios con apliques en madera: tapón para botella, cortagotas, aro antigoteo, sacacorchos de un tiempo. Caja circular de madera con interior beige.",
    features: ["4 accesorios de bar", "Caja circular de madera", "Interior beige"],
    minQty: 10,
    images: ["assets/img/productos/caja-circular-madera.jpg"],
  },
  {
    id: "set-ejecutivo-goliath",
    name: "Set Ejecutivo Goliath",
    code: "BE0460",
    category: "sets",
    description: "Set de hidratación en acero inoxidable presentado en caja de cartón kraft, que incluye botella de 550 ml / 19 Oz (22 x Ø7) con cierre giratorio y asa, y dos vasos de 300 ml / 10 Oz (8,5 x Ø8,5) cada uno con tapa de cierre a presión. Elegante, funcional y perfecto para compartir.",
    features: ["Botella 550 ml", "2 vasos 300 ml", "Acero inoxidable"],
    minQty: 10,
    images: ["assets/img/productos/set-ejecutivo-goliath.jpg"],
  },
  {
    id: "set-ejecutivo-premier",
    name: "Set Ejecutivo Premier",
    code: "BE0459",
    category: "sets",
    description: "Set ejecutivo presentado en elegante caja de papel negro, que incluye cuaderno A5 (14,6 x 21 x 1,5) de hojas rayadas con cinta marcadora, portabolígrafo y cierre de caucho externo, bolígrafo twist y botella de 550 ml / 19 Oz con tapa de cierre a presión y mecanismo giratorio para apertura de boquilla.",
    features: ["Cuaderno A5", "Bolígrafo twist", "Botella 550 ml"],
    minQty: 10,
    images: ["assets/img/productos/set-ejecutivo-premier.jpg"],
  },
  {
    id: "kit-cocteleria-haddock",
    name: "Set de Coctelería Haddock",
    code: "HO0419",
    category: "sets",
    description: "Set esencial para amantes de la mixología, elaborado en acero inoxidable con acabado brillante. Incluye 1 coctelera de 550 ml, 1 medidor doble (jigger) de 15 ml y 30 ml y 1 colador tipo espiral. Diseñado para preparar cócteles con precisión y estilo, ideal para uso profesional o en casa.",
    features: ["Coctelera 550 ml", "Jigger doble", "Colador espiral"],
    minQty: 10,
    images: ["assets/img/productos/kit-cocteleria-haddock.jpg"],
  },
  {
    id: "set-vino-bottle-bambu",
    name: "Set de Vino Bottle Bambú",
    code: "HO0380",
    category: "sets",
    description: "Set de vino con forma de botella, elaborado en bambú, con 4 accesorios de acero inoxidable. Incluye sacacorchos descapsulador de un tiempo, cortagotas, tapón metálico y aro antigoteo.",
    features: ["Forma de botella", "Bambú", "4 accesorios en acero"],
    minQty: 10,
    images: ["assets/img/productos/set-vino-bottle-bambu.jpg"],
  },
  {
    id: "set-paraguas-dali",
    name: "Set Paraguas Dalí",
    code: "PA0154",
    category: "sets",
    description: "Paraguas/sombrilla x 8 cascos (cobertura 111, largo 66,1, diámetro de vara 0,8) con funda (9 x 22) y botella de acero inoxidable de doble pared (con tapa 26,1 x Ø4,9 / sin tapa 25,4 x 4,9), presentados en una elegante caja de regalo. La tapa de la botella incluye un gancho con función de agarre. Capacidad de la botella: 550 ml / 19 Oz.",
    features: ["Paraguas 8 cascos", "Botella 550 ml", "Caja de regalo"],
    minQty: 10,
    images: ["assets/img/productos/set-paraguas-dali.jpg"],
  },
  {
    id: "set-paraguas-monet",
    name: "Set Paraguas Monet",
    code: "PA0152",
    category: "sets",
    description: "Set ejecutivo con estuche de lujo. Incluye bolígrafo en aluminio con sistema twist, libreta con 80 hojas rayadas, banda elástica de cierre lateral, cinta separadora y portabolígrafo, además de botella de doble pared de 600 ml / 20 Oz en acero inoxidable con tapa de rosca y banda de silicona para transportar con facilidad. Incluye también un paraguas mini.",
    features: ["Estuche de lujo", "Botella 600 ml", "Incluye mini paraguas"],
    minQty: 10,
    images: ["assets/img/productos/set-paraguas-monet.jpg"],
  },
  {
    id: "set-bbq-taroudant",
    name: "Set de BBQ Taroudant",
    code: "BBQ 011 N",
    category: "sets",
    description: "Set de BBQ en delantal. Incluye espátula, pinzas, tenedor y correas ajustables en cuello y cintura.",
    features: ["Delantal + utensilios", "Espátula, pinzas y tenedor", "Correas ajustables"],
    minQty: 10,
    images: ["assets/img/productos/set-bbq-taroudant.jpg"],
  },
  {
    id: "tabla-aperitivos-share",
    name: "Tabla para Aperitivos Share",
    code: "HO0433",
    category: "sets",
    description: "Tabla para servir elaborada en bambú con diseño de árbol. Cuenta con compartimentos que permiten presentar y organizar diferentes alimentos de forma práctica y atractiva. Ideal para servir quesos, embutidos, frutas, frutos secos o aperitivos en reuniones y ocasiones especiales.",
    features: ["Bambú", "Diseño de árbol", "Con compartimentos"],
    minQty: 10,
    images: ["assets/img/productos/tabla-aperitivos-share.jpg"],
  },
  {
    id: "set-quesos-mozzarella",
    name: "Set de Quesos Mozzarella",
    code: "HO0304",
    category: "sets",
    description: "Tabla de quesos rectangular con 4 cuchillos: cuchillo para parmesano, tenedor, quesos blandos y quesos duros. Lavar con agua y jabón y secar al aire libre.",
    features: ["Tabla rectangular", "4 cuchillos", "Lavado a mano"],
    minQty: 10,
    images: ["assets/img/productos/set-quesos-mozzarella.jpg"],
  },
  {
    id: "set-quesos-cheddar",
    name: "Set de Quesos Cheddar",
    code: "HO0303",
    category: "sets",
    description: "Tabla de quesos redonda con 3 cuchillos: cuchillo para parmesano, quesos duros y tenedor. Lavar con agua y jabón y secar al aire libre.",
    features: ["Tabla redonda", "3 cuchillos", "Lavado a mano"],
    minQty: 10,
    images: ["assets/img/productos/set-quesos-cheddar.jpg"],
  },
  {
    id: "set-vino-bottle",
    name: "Set Vino Bottle",
    code: "HO0310",
    category: "sets",
    description: "Contiene 3 accesorios de bar: tapón para botella, aro antigoteo, sacacorchos de 1 tiempo. Caja con diseño de botella y acabado en goma.",
    features: ["3 accesorios de bar", "Caja diseño botella", "Acabado en goma"],
    minQty: 10,
    images: ["assets/img/productos/set-vino-bottle.jpg"],
  },
  {
    id: "set-bbq-team",
    name: "Set BBQ Team",
    code: "HO0346",
    category: "sets",
    description: "Set BBQ x 16 piezas. Incluye pala barbacoa, cuchillo, tenedor de parrilla, set x 4 brochetas, set x 8 tenedores para maíz y pinzas de parrilla, con estuche textil, cierre en cremallera y manijas.",
    features: ["16 piezas", "Estuche textil", "Cierre en cremallera"],
    minQty: 10,
    images: ["assets/img/productos/set-bbq-team.jpg"],
  },
  {
    id: "set-vino-brindis",
    name: "Set de Vino Brindis",
    code: "T673",
    category: "sets",
    description: "Set de 2 copas para vino y sacacorchos. Abridor de botellas en acero inoxidable 430 + acero cromado con acabado negro mate. Incluye espuma protectora donde encajan las piezas para su guardado y traslado.",
    features: ["2 copas de vino", "Sacacorchos negro mate", "Espuma protectora"],
    minQty: 10,
    images: ["assets/img/productos/set-vino-brindis.jpg"],
  },

  // ---------------- MORRALES Y BOLSOS ----------------
  {
    id: "morral-bremen",
    name: "Morral Bremen",
    code: "C601",
    category: "morrales",
    description: "Morral con solapa portanotebook de hasta 14 pulgadas. Compartimento principal con cierre bidireccional. Interior con bolsillo acolchado portanotebook y bolsillo con cierre. Bolsillo frontal horizontal con cierre. Dos bolsillos laterales porta botellas y accesorios. Correas y espalda acolchadas con red respirable. Solapa con correas ajustables.",
    features: ["Notebook hasta 14\"", "Espalda acolchada con red respirable", "Solapa con correas ajustables"],
    minQty: 10,
    images: ["assets/img/productos/morral-bremen.jpg"],
  },
  {
    id: "morral-elemental",
    name: "Morral Elemental",
    code: "C583",
    category: "morrales",
    description: "Morral portanotebook de hasta 16 pulgadas. Compartimento principal con cierre bidireccional. Interior con bolsillo acolchado porta notebook y cierre con velcro. Amplio bolsillo frontal horizontal con cierre.",
    features: ["Notebook hasta 16\"", "Cierre bidireccional", "Amplio bolsillo frontal"],
    minQty: 10,
    images: ["assets/img/productos/morral-elemental.jpg"],
  },
  {
    id: "bolso-morral-force-12",
    name: "Bolso Morral Force 12",
    code: "K24",
    category: "morrales",
    description: "Bolso morral deportivo 2 en 1 con 4 compartimentos. Compartimento principal con interior forrado, bolsillo impermeable y bolsillo superior de red, ambos con cierre. Compartimento posterior acolchado. Compartimento lateral ventilado porta calzado y ropa sucia.",
    features: ["2 en 1", "4 compartimentos", "Porta calzado ventilado"],
    minQty: 10,
    images: ["assets/img/productos/bolso-morral-force-12.jpg"],
  },
  {
    id: "carry-on-nomada",
    name: "Carry On Nómada",
    code: "K27",
    category: "morrales",
    description: "Valija / maleta de cabina pequeña expandible. 8 ruedas con giro 360°. Manija de transporte reforzada y engomada. Mango extensible hasta 54 cm en 2 posiciones. Interior con 2 compartimentos principales, uno con elásticos ajustables y otro con funda de poliéster, cierre perimetral y gran bolsillo de red con cierre.",
    features: ["Expandible", "8 ruedas con giro 360°", "Mango extensible hasta 54 cm"],
    minQty: 10,
    images: ["assets/img/productos/carry-on-nomada.jpg"],
  },
  {
    id: "necessaire-malvon",
    name: "Necessaire Malvón",
    code: "T760",
    category: "morrales",
    description: "Necessaire de algodón reciclado. Cierre a tono con tirador de algodón de 4,5 x 2 cm.",
    features: ["Algodón reciclado", "Cierre a tono", "Tirador de algodón"],
    minQty: 25,
    images: ["assets/img/productos/necessaire-malvon.jpg"],
  },
  {
    id: "lonchera-picnic-sky",
    name: "Lonchera Picnic Sky",
    code: "VI0322",
    category: "morrales",
    description: "Diseñada en poliéster tejido, esta lonchera combina estilo y funcionalidad. Cuenta con asas de aluminio resistentes y bolsillo adicional con cremallera lateral.",
    features: ["Poliéster tejido", "Asas de aluminio", "Bolsillo con cremallera"],
    minQty: 10,
    images: ["assets/img/productos/lonchera-picnic-sky.jpg"],
  },
  {
    id: "maletin-nara",
    name: "Maletín Nara 31 Lts.",
    code: "VI0227",
    category: "morrales",
    description: "Maletín deportivo con cargadera ajustable y removible, bolsillo principal y frontal en cremallera y cargaderas reforzadas. Volumen aproximado: 31 litros.",
    features: ["31 litros", "Cargadera ajustable", "Cargaderas reforzadas"],
    minQty: 10,
    images: ["assets/img/productos/maletin-nara.jpg"],
  },

  // ---------------- HOGAR Y DESCANSO ----------------
  {
    id: "manta-convertible-rest",
    name: "Manta Convertible Rest",
    code: "VI0324",
    category: "hogar",
    description: "Manta de forro polar con cremallera, puede doblarse y convertirse en almohada.",
    features: ["Forro polar", "Se convierte en almohada", "Con cremallera"],
    minQty: 10,
    images: ["assets/img/productos/manta-convertible-rest.jpg"],
  },

  // ---------------- ACCESORIOS ----------------
  {
    id: "llavero-navidad-rudolph",
    name: "Llavero Navidad Rudolph",
    code: "HE0388",
    category: "accesorios",
    description: "Llavero en forma de reno navideño fabricado en aluminio con argolla metálica plateada. Ligero, resistente y con un diseño festivo que lo convierte en el accesorio perfecto para la temporada decembrina. Funcional y decorativo a la vez.",
    features: ["Aluminio", "Argolla plateada", "Diseño festivo"],
    minQty: 25,
    images: ["assets/img/productos/llavero-navidad-rudolph.jpg"],
  },

  // ---------------- JUEGOS Y ENTRETENIMIENTO ----------------
  {
    id: "set-juegos-enjoy",
    name: "Set de Juegos Enjoy",
    code: "VI0314",
    category: "juegos",
    description: "Disfruta horas de diversión con este elegante Set de Juegos en Madera 4 en 1, que incluye tablero de ajedrez/damas de 10 x 10 casillas, dominó de 28 piezas, damas chinas y mikado, todo elaborado en madera.",
    features: ["4 en 1", "Madera", "Ajedrez, dominó, damas chinas y mikado"],
    minQty: 10,
    images: ["assets/img/productos/set-juegos-enjoy.jpg"],
  },
  {
    id: "bolsa-navidad-snow",
    name: "Bolsa Navidad Snow",
    code: "BO0513",
    category: "juegos",
    description: "Bolsa para colorear elaborada en material no tejido, ideal para estimular la creatividad de los niños. Incluye un set de crayolas para personalizar el diseño impreso, convirtiéndola en una opción práctica, divertida y reutilizable.",
    features: ["Material no tejido", "Incluye crayolas", "Reutilizable"],
    minQty: 25,
    images: ["assets/img/productos/bolsa-navidad-snow.jpg"],
  },
];

/* ==========================================================================
   KITS ARMADOS — kits reales ya empacados (foto real, sin componer).
   --------------------------------------------------------------------------
   Se muestran como tarjetas en la sección "Kits" (junto al slider de
   demostración de arriba). Mismo patrón que ANCHETAS/KITS: `photo` = una
   sola foto (no hay versión "cerrada" de estos kits, así que no usan
   `reveal`). Sin precio, igual que el resto del catálogo.
   ========================================================================== */
const KITS_ARMADOS = [
  {
    id: "kit-ritual-cafe",
    name: "Kit Ritual del Café",
    code: "KIT-101",
    description: "Kit para los amantes del café: incluye molino eléctrico, café tostado y molido de origen Quindío con notas a panela y vainilla, y dos vasos de vidrio para disfrutar cada taza. Presentado en elegante caja de regalo.",
    contents: ["Molino de café eléctrico", "Café Quindío 250 g — Cosecha Especial", "2 vasos de vidrio para café"],
    minQty: 10,
    photo: "assets/img/kits/kit-101-ritual-cafe.jpg",
  },
  {
    id: "kit-barista",
    name: "Kit Barista",
    code: "KIT-102",
    description: "Todo para preparar café en casa u oficina: prensa francesa, café Quindío de origen con notas a chocolate y panela y un termo de acero inoxidable con grabado láser de tu marca. Presentado en caja de regalo.",
    contents: ["Prensa francesa", "Café Quindío 250 g — Cosecha Especial", "Termo de acero inoxidable con grabado láser"],
    minQty: 10,
    photo: "assets/img/kits/kit-102-barista.jpg",
    video: "assets/img/kits/kit-102-barista.mp4?v=2",
  },
  {
    id: "kit-sobremesa",
    name: "Kit Sobremesa",
    code: "KIT-103",
    description: "Para cerrar la cena en grande: café de origen Nariño, crema irlandesa Baileys, galletas danesas y dos vasos de doble pared para disfrutar la sobremesa. Presentado en caja de regalo.",
    contents: ["Café Juan Valdez de origen Nariño", "Baileys Original Irish Cream", "Galletas Royal Dansk 7 oz", "2 vasos de vidrio doble pared"],
    minQty: 10,
    photo: "assets/img/kits/kit-103-sobremesa.jpg",
  },
  {
    id: "kit-picoteo",
    name: "Kit Picoteo Navideño",
    code: "KIT-104",
    description: "Una caja para compartir en las reuniones de diciembre: queso holandés, papas Pringles, chocolates Ferrero Rocher, galletas danesas y crema irlandesa Baileys. Presentado en caja de regalo.",
    contents: ["Queso Holandés Alpina 250 g", "Papas Pringles BBQ 71 g", "Baileys Original Irish Cream", "Chocolates Ferrero Rocher 50 g", "Galletas Royal Dansk 7 oz"],
    minQty: 10,
    photo: "assets/img/kits/kit-104-picoteo.jpg",
  },
  {
    id: "kit-cervecero",
    name: "Kit Cervecero",
    code: "KIT-105",
    description: "El kit para brindar: dos cervezas Corona Extra, mix de maní, cacao y pretzels, papas Pringles y una copa de vidrio. Presentado en caja de regalo.",
    contents: ["2 cervezas Corona Extra", "Mix Cacao y Pretzels Manitoba 130 g", "Papas Pringles BBQ 71 g", "Copa de vidrio"],
    minQty: 10,
    photo: "assets/img/kits/kit-105-cervecero.jpg",
  },
  {
    id: "kit-cafe-express",
    name: "Kit Café Express",
    code: "KIT-106",
    description: "Para los que no se pierden su café: cafetera italiana, dos tazas de vidrio y café 100% colombiano de origen Quindío, molido. Presentado en caja de cartón kraft con detalles en rojo.",
    contents: ["Cafetera italiana (moka)", "2 tazas de vidrio", "Café Quindío Génova 340 g"],
    minQty: 10,
    photo: "assets/img/kits/kit-106.jpg",
  },
  {
    id: "kit-vino-queso",
    name: "Kit Vino y Queso",
    code: "KIT-107",
    description: "El clásico para brindar: vino tinto Carmenere, queso holandés, chocolates Ferrero Rocher y una copa de cristal. Presentado en caja de regalo.",
    contents: ["Vino tinto Viña Maipo Carmenere", "Queso Holandés Alpina 250 g", "Chocolates Ferrero Rocher", "Copa de vino"],
    minQty: 10,
    photo: "assets/img/kits/kit-107.jpg",
  },
  {
    id: "kit-picnic-gourmet",
    name: "Kit Picnic Gourmet",
    code: "KIT-108",
    description: "Nuestro kit más completo: canasta de picnic en mimbre con dos copas, vino tinto, queso holandés, galletas danesas, mix de frutos secos, papas Pringles y platos.",
    contents: ["Canasta de picnic con 2 copas y platos", "Vino tinto Viña Maipo Carmenere", "Queso Holandés Alpina", "Galletas Royal Dansk 200 g", "Mix Cacao y Pretzels Manitoba", "Papas Pringles BBQ 71 g"],
    minQty: 10,
    photo: "assets/img/kits/kit-108.jpg",
  },
  {
    id: "kit-vino-para-dos",
    name: "Kit Vino para Dos",
    code: "KIT-109",
    description: "Un plan de a dos: vino tinto Carmenere, queso holandés, dos copas y una tabla de bambú para servir. Presentado en caja de regalo.",
    contents: ["Vino tinto Viña Maipo Carmenere", "Queso Holandés Alpina 250 g", "2 copas de vino", "Tabla de bambú"],
    minQty: 10,
    photo: "assets/img/kits/kit-109.jpg",
  },
  {
    id: "kit-nevera-navidena",
    name: "Kit Nevera Navideña",
    code: "KIT-110",
    description: "Para compartir con el equipo: nevera portátil roja con cervezas Corona, papas Pringles, mix de frutos secos con cacao y queso holandés.",
    contents: ["Nevera portátil", "6 cervezas Corona en lata", "Papas Pringles Original 124 g", "Mix Cacao Manitoba", "Queso Holandés Alpina"],
    minQty: 10,
    photo: "assets/img/kits/kit-110.jpg",
  },
];

/* ==========================================================================
   KITS / ANCHETAS
   --------------------------------------------------------------------------
   Sin precio de lista: las anchetas van siempre a "Cotización especial".
   Sí tienen cantidad mínima de pedido (minQty = 10 en las 3 por ahora).

   Cada kit se muestra con UNA de estas dos cosas en .kit-media:
   - `photo`: una foto normal (usar esto para anchetas/canastas — no tienen
     concepto de "cerrada/abierta").
   - `reveal`: el slider antes/después ({before, after, beforeLabel,
     afterLabel}) — para kits tipo caja de regalo donde sí aplica mostrar
     "cerrado → abierto" (ver README).

   >>> PENDIENTE <<<
   Las listas de contenido de estas 3 anchetas vienen de capturas de
   pantalla que el usuario compartió en el chat — en cada una solo se
   alcanzan a leer 2-3 productos con su SKU; el resto (hasta completar el
   total real de productos) queda marcado como "por confirmar". Las fotos
   (`photo`) son las tarjetas de referencia que compartió (con precio y
   conteo de productos "quemados" en la imagen) — como ya no mostramos
   precio en la tarjeta, esos valores solo se ven dentro de la foto misma;
   avisar si se quiere una foto sin ese texto.
   ========================================================================== */
const KITS = [
  {
    id: "ancheta-mesa-festiva",
    name: "Ancheta Mesa Festiva",
    code: "ANCHETA-01",
    description: "Ancheta navideña con productos para la mesa festiva de diciembre.",
    contents: [
      "Mezcla para Buñuelos Maizena 300 g (SKU 3522)",
      "Mezcla de Natilla Tradicional Maizena 300 g (SKU 3523)",
      "Arequipe Alpina 220 g (SKU 1013)",
      "+ 4 productos por confirmar (la lista trae 7 en total)",
    ],
    minQty: 10,
    photo: "assets/img/kits/ancheta-mesa-festiva.webp",
  },
  {
    id: "ancheta-esenciales",
    name: "Ancheta Esenciales",
    code: "ANCHETA-02",
    description: "Ancheta con productos que no pueden faltar en la despensa de la semana.",
    contents: [
      "Spaghetti Clásico Doria 250 g (SKU 2449)",
      "Arroz Diana x 500 g (SKU 3825)",
      "Frijoles Zenú (enlatado — referencia visible, código por confirmar)",
      "Atún Zenú en agua (enlatado — referencia visible, código por confirmar)",
      "+ 6 productos por confirmar (la lista trae 10 en total)",
    ],
    minQty: 10,
    photo: "assets/img/kits/ancheta-esenciales.webp",
  },
  {
    id: "ancheta-antojos",
    name: "Ancheta Antojos",
    code: "ANCHETA-03",
    description: "Ancheta pensada para calmar todos los antojos de diciembre.",
    contents: [
      "Queso Holandés Navideño Alpina 250 g (SKU 3468)",
      "Arequipe Alpina 220 g (SKU 1013)",
      "+ 8 productos por confirmar (la lista trae 10 en total)",
    ],
    minQty: 10,
    photo: "assets/img/kits/ancheta-antojos.webp",
  },
];
