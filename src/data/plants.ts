export interface Plant {
  slug: string;
  name: string;
  scientificName: string;
  category: "Interior" | "Exterior" | "Suculentas" | "Árboles";
  description: string;
  characteristics: string[];
  care: string;
  diseases: string;
  watering: {
    summer: string;
    winter: string;
    general: string;
  };
  light: string;
  difficulty: "Bajo" | "Medio" | "Alto";
  imageUrl: string;
  temperature: string;
  humidity: string;
  wateringLevel: number;
  sunLevel: number;
  tempLevel: number;
  funFact: string;
}

export const plants: Plant[] = [
  {
    slug: "monstera-deliciosa",
    name: "Monstera (Costilla de Adán)",
    scientificName: "Monstera deliciosa",
    category: "Interior",
    description: "Una de las plantas de interior más populares y reconocibles por sus grandes hojas verdes perforadas. Aporta un aire exótico y tropical instantáneo a cualquier espacio.",
    characteristics: [
      "Hojas grandes con característicos agujeros y cortes (fenestraciones).",
      "Hábito de crecimiento trepador, se beneficia de un tutor de musgo.",
      "Purifica el aire eliminando toxinas comunes del hogar.",
      "Puede alcanzar de 2 a 3 metros de altura en interiores."
    ],
    care: "Colócala en un lugar luminoso pero sin sol directo. Limpia el polvo de sus hojas regularmente con un paño húmedo para facilitar la fotosíntesis y pulveriza agua tibia para mantener el ambiente húmedo.",
    diseases: "Sensible a la cochinilla algodonosa y a la araña roja si el ambiente está muy seco. El exceso de agua provoca pudrición de raíces (hojas amarillas y tallo blando).",
    watering: {
      summer: "1-2 veces por semana, dejando que se seque la mitad superior del sustrato.",
      winter: "Cada 10-14 días, reduciendo el riego al mínimo mientras el sustrato se mantenga húmedo.",
      general: "Riega moderadamente. Comprueba siempre que el sustrato esté seco antes de volver a regar."
    },
    light: "Luz indirecta brillante o semisombra. Evitar el sol directo porque quema las hojas.",
    difficulty: "Bajo",
    imageUrl: "/plants/monstera-deliciosa.png",
    temperature: "18°C - 27°C (no tolera el frío inferior a 10°C)",
    humidity: "Media - Alta (50% - 70%)",
    wateringLevel: 2,
    sunLevel: 2,
    tempLevel: 70,
    funFact: "En su hábitat natural, produce una fruta deliciosa con sabor a piña y plátano, pero tarda más de un año en madurar."
  },
  {
    slug: "palmera-canaria",
    name: "Palmera Canaria",
    scientificName: "Phoenix canariensis",
    category: "Árboles",
    description: "Una palmera majestuosa y de gran porte, símbolo de las Islas Canarias. Es sumamente popular en la jardinería mediterránea de la Costa del Sol por su resistencia y elegante corona.",
    characteristics: [
      "Tronco robusto y columnar decorado con los restos de las hojas podadas.",
      "Corona densa compuesta por numerosas hojas pinnadas (palmas) verde oscuro.",
      "Crecimiento lento a moderado pero de gran longevidad.",
      "Muy resistente al viento costero y a la salinidad."
    ],
    care: "Requiere espacios amplios para su correcto desarrollo. Es idónea para plantarse a pleno sol. Aunque tolera la sequía una vez establecida, prospera con riegos regulares en climas cálidos.",
    diseases: "Su principal amenaza es el Picudo Rojo (Rhynchophorus ferrugineus), un escarabajo que ataca el cogollo de la palmera. Requiere tratamientos preventivos periódicos.",
    watering: {
      summer: "Riegos semanales profundos.",
      winter: "Riego muy espaciado, solo cada 15 o 20 días en ausencia de lluvia.",
      general: "Riego profundo pero bien drenado. No soporta los encharcamientos continuados."
    },
    light: "Pleno sol. Requiere máxima luminosidad.",
    difficulty: "Medio",
    imageUrl: "/plants/palmera-canaria.png",
    temperature: "-5°C a 45°C",
    humidity: "Tolera humedad baja y viento salino",
    wateringLevel: 2,
    sunLevel: 3,
    tempLevel: 80,
    funFact: "Es un fósil viviente que ha sobrevivido desde la época de los dinosaurios casi sin cambios evolutivos."
  },
  {
    slug: "ficus-lira",
    name: "Ficus Lira (Higuera de hoja de violín)",
    scientificName: "Ficus lyrata",
    category: "Interior",
    description: "Con sus impresionantes hojas grandes y lustrosas en forma de violín, este ficus es el favorito de los diseñadores de interiores para crear un impacto visual escultural.",
    characteristics: [
      "Hojas enormes de textura coriácea con marcadas nervaduras.",
      "Forma de crecimiento erecto que imita a un pequeño árbol de interior.",
      "Gran capacidad para absorber sustancias nocivas del aire.",
      "Crecimiento lento pero muy llamativo."
    ],
    care: "Ubicación con abundante luz indirecta. Gira la planta 90 grados cada pocas semanas para que crezca de manera uniforme. Evita corrientes de aire frío y cambios bruscos de temperatura.",
    diseases: "Caída repentina de hojas debido a corrientes de aire o falta de luz. Manchas marrones en las hojas suelen indicar exceso de humedad o infecciones fúngicas.",
    watering: {
      summer: "Cada 7-9 días cuando el primer par de centímetros de tierra esté seco.",
      winter: "Cada 15-20 días, espaciando mucho más los riegos.",
      general: "Riega con agua a temperatura ambiente. Drena bien el plato inferior tras regar."
    },
    light: "Luz brillante indirecta. El sol directo puede quemar sus hojas.",
    difficulty: "Medio",
    imageUrl: "/plants/ficus-lira.png",
    temperature: "16°C - 24°C (sensible a bajadas de menos de 12°C)",
    humidity: "Media - Alta (necesita pulverización ocasional)",
    wateringLevel: 2,
    sunLevel: 2,
    tempLevel: 65,
    funFact: "Sus hojas son tan grandes y rígidas que en algunas culturas de África Occidental se usaban tradicionalmente para hacer techos temporales."
  },
  {
    slug: "olivo",
    name: "Olivo",
    scientificName: "Olea europaea",
    category: "Árboles",
    description: "El árbol emblemático del Mediterráneo. Su tronco retorcido y sus hojas de color verde grisáceo plateado aportan un toque rústico, elegante e histórico a cualquier patio o jardín.",
    characteristics: [
      "Hojas perennes, lanceoladas, de color verde oliva en el haz y plateadas en el envés.",
      "Tronco nudoso y retorcido que gana belleza con los años.",
      "Produce aceitunas comestibles si recibe suficientes horas de sol y maduración.",
      "Muy resistente al calor, la sequía y los vientos secos."
    ],
    care: "Requiere un suelo con excelente drenaje (arenoso o pedregoso) y pleno sol. Puede cultivarse en grandes macetas durante muchos años antes de ser trasplantado al suelo directo.",
    diseases: "Sensible al hongo del Ojo de Gallo en ambientes excesivamente húmedos y al repilo. Plagas comunes como la mosca del olivo y la cochinilla.",
    watering: {
      summer: "Moderado, cada 5-7 días si está en maceta; quincenal si está en tierra.",
      winter: "Casi nulo si está plantado en suelo; mensual si está en maceta.",
      general: "Dejar secar por completo el sustrato entre riegos. Es extremadamente tolerante a la sequía."
    },
    light: "Pleno sol directo (mínimo 6 horas diarias).",
    difficulty: "Bajo",
    imageUrl: "/plants/olivo.png",
    temperature: "Resiste heladas de hasta -10°C y temperaturas altas de más de 40°C",
    humidity: "Baja (prefiere climas secos)",
    wateringLevel: 1,
    sunLevel: 3,
    tempLevel: 85,
    funFact: "Existen olivos en el Mediterráneo que tienen más de 2000 años y siguen produciendo aceitunas perfectamente."
  },
  {
    slug: "buganvilla",
    name: "Buganvilla",
    scientificName: "Bougainvillea glabra",
    category: "Exterior",
    description: "Una enredadera espectacular conocida por su espectacular floración en tonos fucsia, naranja, rojo o blanco, que cubre de color fachadas, pérgolas y muros de la Costa del Sol.",
    characteristics: [
      "Crecimiento trepador vigoroso provisto de espinas.",
      "Flores verdaderas pequeñas rodeadas por llamativas brácteas de colores intensos.",
      "Floración abundante desde primavera hasta otoño bajo climas templados.",
      "Desarrolla ramas leñosas y tupidas."
    ],
    care: "Ubícala en la zona más soleada disponible para maximizar la floración. Necesita soportes o guías para trepar. Es aconsejable podarla al final del invierno para estimular brotes nuevos.",
    diseases: "Pulgón y cochinilla en los brotes jóvenes. Un exceso de agua puede provocar clorosis (hojas amarillas) y la caída total de las brácteas de flor.",
    watering: {
      summer: "1-2 veces por semana (más frecuente en maceta).",
      winter: "Riego escaso, cada 2-3 semanas (suspender si llueve).",
      general: "Evitar encharcamientos. Prefiere pasar sed que exceso de agua para florecer con más fuerza."
    },
    light: "Pleno sol directo indispensable para la floración.",
    difficulty: "Bajo",
    imageUrl: "/plants/buganvilla.png",
    temperature: "Sensible a heladas fuertes (soporta hasta 0°C de forma breve)",
    humidity: "Baja - Media",
    wateringLevel: 1,
    sunLevel: 3,
    tempLevel: 90,
    funFact: "Las partes coloridas que parecen pétalos no son flores, sino 'brácteas' (hojas modificadas) que protegen a las diminutas flores blancas internas."
  },
  {
    slug: "sansevieria",
    name: "Sansevieria (Lengua de suegra)",
    scientificName: "Sansevieria trifasciata",
    category: "Interior",
    description: "Considerada una de las plantas de interior más resistentes del mundo. Es ideal para principiantes y destaca por sus hojas verticales en forma de espada con bordes amarillos.",
    characteristics: [
      "Hojas rígidas, carnosas y erectas con bandas transversales de tonos verdes y amarillos.",
      "Excelente purificadora de aire reconocida por la NASA.",
      "Sobrevive en condiciones de luz muy baja y escasez de agua.",
      "Crecimiento lento y raíces poco profundas."
    ],
    care: "El único error grave con la Sansevieria es el exceso de riego. Utiliza un sustrato poroso especial para cactus y asegúrate de que la maceta drene perfectamente el exceso de agua.",
    diseases: "Pudrición del tallo o las raíces por exceso de humedad. Las hojas se vuelven blandas y arrugadas.",
    watering: {
      summer: "Cada 15-20 días, asegurándose de que la tierra esté completamente seca.",
      winter: "Una vez al mes o incluso menos.",
      general: "Regar con mucha moderación, dejando secar la tierra del todo entre aplicaciones."
    },
    light: "Tolera desde semisombra o zonas oscuras hasta sol directo tamizado.",
    difficulty: "Bajo",
    imageUrl: "/plants/sansevieria.png",
    temperature: "15°C - 30°C (no tolera heladas)",
    humidity: "Baja (se adapta bien a la sequedad de la calefacción)",
    wateringLevel: 1,
    sunLevel: 1,
    tempLevel: 75,
    funFact: "Es capaz de realizar la fotosíntesis durante la noche (vía CAM), liberando oxígeno mientras duermes, ideal para el dormitorio."
  },
  {
    slug: "aloe-vera",
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis",
    category: "Suculentas",
    description: "Famoso por las propiedades medicinales e hidratantes del gel contenido en sus hojas carnosas. Es un elemento imprescindible en jardines de rocalla y terrazas soleadas.",
    characteristics: [
      "Hojas suculentas agrupadas en rosetas densas, de color verde grisáceo y bordes espinosos.",
      "Produce flores amarillas colgantes en espigas verticales durante la primavera.",
      "El gel interior alivia quemaduras, cortes e irritaciones cutáneas.",
      "Fácil multiplicación mediante hijuelos que brotan en la base."
    ],
    care: "Cultívalo en macetas anchas y poco profundas con un sustrato mezclado con arena o perlita. Ubícalo en zonas con luz solar directa y evita que el agua se acumule en el centro de la roseta.",
    diseases: "Manchas negras causadas por hongos debido a la humedad excesiva y cochinillas de raíz.",
    watering: {
      summer: "Cada 10-12 días, cuando el sustrato se note seco.",
      winter: "Cada 30-40 días. No regar si la temperatura baja de los 10°C.",
      general: "Evitar encharcamientos; las hojas actúan como reserva de agua de larga duración."
    },
    light: "Pleno sol o luz muy brillante.",
    difficulty: "Bajo",
    imageUrl: "/plants/aloe-vera.png",
    temperature: "10°C a 35°C (no tolera heladas severas)",
    humidity: "Baja (muy resistente a la sequedad)",
    wateringLevel: 1,
    sunLevel: 3,
    tempLevel: 80,
    funFact: "Los antiguos egipcios la llamaban 'la planta de la inmortalidad' y la reina Cleopatra la usaba en sus rituales de belleza diarios."
  },
  {
    slug: "cinta",
    name: "Cinta (Malamadre o Lazo de amor)",
    scientificName: "Chlorophytum comosum",
    category: "Interior",
    description: "Una clásica planta colgante muy fácil de cultivar, con hojas arqueadas con franjas blancas que produce pequeños brotes (hijuelos) que cuelgan grácilmente de tallos alargados.",
    characteristics: [
      "Hojas acintadas, finas y alargadas de color verde con una banda central blanca.",
      "Produce tallos largos (estolones) con flores pequeñas y plántulas colgantes.",
      "Raíces tuberosas carnosas que almacenan gran cantidad de agua.",
      "Muy eficaz eliminando el monóxido de carbono en interiores."
    ],
    care: "Ideal para cestas colgantes o estantes altos. Prefiere luz indirecta moderada. Si las puntas de las hojas se vuelven secas u oscuras, suele deberse a falta de humedad ambiental.",
    diseases: "Puntas marrones por aire seco o exceso de sales del agua. Ocasionalmente pulgón o cochinilla.",
    watering: {
      summer: "2 veces por semana para mantener el sustrato ligeramente húmedo.",
      winter: "Cada 7-10 días, dejando secar la superficie de la tierra.",
      general: "Riego regular sin encharcar. Sus raíces almacenan agua, tolerando descuidos."
    },
    light: "Luz indirecta de media a brillante. Tolera semisombra.",
    difficulty: "Bajo",
    imageUrl: "/plants/cinta.png",
    temperature: "12°C - 24°C",
    humidity: "Media (agradece pulverización en verano)",
    wateringLevel: 2,
    sunLevel: 2,
    tempLevel: 60,
    funFact: "Es una de las mejores purificadoras del aire: una sola planta puede limpiar el monóxido de carbono de una habitación mediana en 24 horas."
  },
  {
    slug: "lavanda",
    name: "Lavanda",
    scientificName: "Lavandula angustifolia",
    category: "Exterior",
    description: "Planta aromática por excelencia del clima mediterráneo. Sus espigas moradas perfuman el jardín y atraen a gran cantidad de polinizadores beneficiosos como abejas y mariposas.",
    characteristics: [
      "Arbusto compacto con follaje grisáceo y olor dulce muy característico.",
      "Flores de color violeta agrupadas en densas espigas terminales.",
      "Hojas estrechas y aromáticas ideales para secar y aromatizar armarios.",
      "Gran tolerancia al sol intenso y suelos pobres."
    ],
    care: "Plántala en un suelo calcáreo con un drenaje excelente; el exceso de humedad en el suelo es mortal para la lavanda. Podar ligeramente después de la floración para mantener su forma compacta.",
    diseases: "Pudrición radicular por hongos si el suelo se encharca o si se planta en zonas muy sombrías.",
    watering: {
      summer: "Cada 5-7 días en maceta; quincenal en suelo directo.",
      winter: "Solo en caso de sequía prolongada (cada 20-30 días).",
      general: "Riego escaso y directo al suelo, evitando mojar las hojas para prevenir hongos."
    },
    light: "Pleno sol directo (mínimo de 6 horas al día).",
    difficulty: "Bajo",
    imageUrl: "/plants/lavanda.png",
    temperature: "-10°C a 40°C",
    humidity: "Baja (ambientes secos y aireados)",
    wateringLevel: 1,
    sunLevel: 3,
    tempLevel: 70,
    funFact: "Su aroma reduce el ritmo cardíaco y la presión arterial, ayudando a combatir el insomnio y la ansiedad de forma natural."
  },
  {
    slug: "poto",
    name: "Poto",
    scientificName: "Epipremnum aureum",
    category: "Interior",
    description: "Una planta colgante clásica e indestructible de interior. Con sus hojas acorazonadas de tonos verdes y amarillos jaspeados, se adapta a casi cualquier rincón de la casa.",
    characteristics: [
      "Hojas en forma de corazón con variegación verde y amarilla dorada.",
      "Crecimiento rastrero o trepador sumamente rápido.",
      "Capaz de sobrevivir con luz artificial de oficina.",
      "Fácil de propagar en un vaso de agua en pocos días."
    ],
    care: "Riega solo cuando la tierra se haya secado. Si los tallos crecen demasiado largos y pierden hojas en la base, puedes podarlos para conseguir una planta más frondosa e iniciar nuevos esquejes.",
    diseases: "Pudrición de raíces si el sustrato permanece empapado. Cochinilla algodonosa en los nudos de los tallos.",
    watering: {
      summer: "Cada 5-7 días, comprobando que la capa superior del sustrato esté seca.",
      winter: "Cada 10-12 días, dejando secar la tierra casi por completo.",
      general: "Es mejor pecar de regar poco que de regar en exceso. Sus hojas lánguidas avisan de que tiene sed."
    },
    light: "Luz indirecta brillante (mantiene mejor el color amarillo) a sombra media.",
    difficulty: "Bajo",
    imageUrl: "/plants/poto.png",
    temperature: "15°C - 26°C",
    humidity: "Media (soporta humedad baja)",
    wateringLevel: 1,
    sunLevel: 2,
    tempLevel: 65,
    funFact: "Se le conoce como 'la planta del dinero' en varios países asiáticos porque se asocia con la atracción de la buena fortuna y la riqueza."
  },
  {
    slug: "rosal",
    name: "Rosal (Arbusto de Rosas)",
    scientificName: "Rosa L.",
    category: "Exterior",
    description: "La reina de las flores del jardín. Sus fragantes capullos llenan de belleza y color los parterres durante gran parte del año, existiendo infinitas variedades arbustivas, trepadoras y mini.",
    characteristics: [
      "Ramas provistas de espinas agudas que portan flores de múltiples pétalos.",
      "Gran gama de colores y aromas deliciosos según la variedad.",
      "Requiere podas anuales drásticas a finales de invierno para florecer con vigor.",
      "Hojas caducas o semicaducas de color verde brillante dentadas."
    ],
    care: "Necesita una posición muy soleada y abonos orgánicos ricos en nutrientes en primavera y verano. La poda correcta del rosal a finales de invierno es vital para asegurar una floración espectacular.",
    diseases: "Muy susceptible a plagas como el pulgón verde y a enfermedades por hongos como el Oídio (polvillo blanco) y el Mildiu. Requiere tratamientos con fungicidas orgánicos.",
    watering: {
      summer: "2-3 veces por semana, con riego profundo al pie de la planta sin mojar las hojas.",
      winter: "Semanal o quincenal según las lluvias.",
      general: "Mantener el sustrato húmedo pero sin encharcar, evitando siempre mojar el follaje."
    },
    light: "Pleno sol directo (mínimo 6 horas diarias).",
    difficulty: "Medio",
    imageUrl: "/plants/rosal.png",
    temperature: "-15°C a 38°C (tolera heladas invernales)",
    humidity: "Media (prefiere buena circulación de aire)",
    wateringLevel: 2,
    sunLevel: 3,
    tempLevel: 70,
    funFact: "Fósiles de rosas silvestres demuestran que esta flor existe en la Tierra desde hace más de 35 millones de años."
  },
  {
    slug: "echeveria",
    name: "Echeveria",
    scientificName: "Echeveria elegans",
    category: "Suculentas",
    description: "Pequeña planta suculenta mexicana con forma de roseta perfecta de color azul grisáceo. Ideal para componer pequeños arreglos geométricos en macetas de barro en tu balcón o terraza.",
    characteristics: [
      "Crecimiento en rosetas apretadas muy simétricas con hojas carnosas cubiertas de pruina plateada.",
      "Produce tallos florales rosados con pequeñas flores acampanadas rojas y amarillas.",
      "Excelente almacenamiento de agua en hojas para sobrevivir a largos periodos de sequía.",
      "Genera pequeños rosetones hijos a su alrededor."
    ],
    care: "Colócala a pleno sol para mantener la forma compacta de la roseta; la falta de luz hará que la planta se estire (etiolación) perdiendo su belleza. Riega siempre por debajo sin mojar las hojas.",
    diseases: "Pudrición por exceso de riego y cochinilla algodonosa en los recovecos de las rosetas.",
    watering: {
      summer: "Cada 7-10 días, asegurándose de que el suelo esté completamente seco.",
      winter: "Casi nulo, una vez al mes o suspender por completo con frío.",
      general: "Regar por inmersión o con boquilla fina, evitando acumular agua en el centro de la roseta."
    },
    light: "Pleno sol directo o luz brillante filtrada.",
    difficulty: "Bajo",
    imageUrl: "/plants/echeveria.png",
    temperature: "5°C a 35°C (proteger de heladas fuertes)",
    humidity: "Baja (muy sensible a la humedad ambiental persistente)",
    wateringLevel: 1,
    sunLevel: 3,
    tempLevel: 75,
    funFact: "Su fina capa de polvillo blanquecino en las hojas (pruina) actúa como un protector solar natural contra quemaduras y repele el agua."
  },
  {
    slug: "helecho-espada",
    name: "Helecho Espada (Helecho rizado)",
    scientificName: "Nephrolepis exaltata",
    category: "Interior",
    description: "Con sus frondas arqueadas y frondosas de color verde brillante, este helecho colgante es perfecto para aportar frescura y un toque natural a baños iluminados y salones sombreados.",
    characteristics: [
      "Frondas largas y estrechas divididas en pequeños foliolos ligeramente rizados.",
      "Crecimiento denso de aspecto plumoso y colgante.",
      "Excelente capacidad de purificación de formaldehídos del aire.",
      "No produce flores; se reproduce mediante esporas o división."
    ],
    care: "Necesita una humedad ambiental elevada constante. Rocía sus hojas a diario con agua destilada o colócalo sobre una bandeja con guijarros y agua. Evita colocarlo cerca de calefactores.",
    diseases: "Follaje seco y caída de hojas si el aire está demasiado seco. Cochinillas y ácaros si las condiciones no son óptimas.",
    watering: {
      summer: "2-3 veces por semana para mantener el sustrato uniformemente húmedo pero sin encharcar.",
      winter: "Cada 7-9 días, reduciendo la frecuencia pero sin dejar secar la tierra del todo.",
      general: "Mantener el sustrato ligeramente húmedo de forma continua. Evitar que se seque por completo."
    },
    light: "Luz indirecta tamizada o semisombra. Nunca sol directo.",
    difficulty: "Medio",
    imageUrl: "/plants/helecho-espada.png",
    temperature: "15°C - 24°C (sensible al frío extremo)",
    humidity: "Alta (mínimo 60%)",
    wateringLevel: 3,
    sunLevel: 1,
    tempLevel: 60,
    funFact: "Es una planta prehistórica que no tiene flores ni semillas; se reproduce de forma mágica a través de esporas en el envés de sus hojas."
  },
  {
    slug: "hibisco",
    name: "Hibisco (Rosa de China)",
    scientificName: "Hibiscus rosa-sinensis",
    category: "Exterior",
    description: "Arbusto tropical de flores espectaculares y efímeras con forma de embudo y estambres sobresalientes. Decora multitud de jardines costeros mediterráneos gracias a su floración continua.",
    characteristics: [
      "Hojas verde oscuro brillante, ovaladas y ligeramente dentadas.",
      "Grandes flores de llamativos colores (rojo, amarillo, rosa) con un largo tubo estaminal.",
      "Cada flor individual dura solo un día, pero produce capullos constantemente.",
      "Hábito arbustivo que puede alcanzar de 2 a 4 metros de altura en el exterior."
    ],
    care: "Plántalo en zonas resguardadas del viento frío y a pleno sol. Fertilízalo regularmente en su periodo de crecimiento con un abono rico en potasio para promover la floración continua.",
    diseases: "Pulgones e infecciones de mosca blanca en los brotes tiernos. Caída de capullos florales por falta de nutrientes o riegos irregulares.",
    watering: {
      summer: "Riego frecuente, cada 2 días en días calurosos para mantener la tierra fresca.",
      winter: "Cada 7-10 días, dejando que se seque ligeramente la superficie.",
      general: "Riego generoso pero con excelente drenaje. Evitar que la tierra se seque del todo en verano."
    },
    light: "Pleno sol directo (mínimo 5-6 horas al día para florecer bien).",
    difficulty: "Medio",
    imageUrl: "/plants/hibisco.png",
    temperature: "10°C a 35°C (no tolera heladas prolongadas)",
    humidity: "Media - Alta",
    wateringLevel: 2,
    sunLevel: 3,
    tempLevel: 85,
    funFact: "En Hawái, si una mujer lleva una flor de hibisco detrás de la oreja izquierda, significa que está buscando pareja."
  },
  {
    slug: "kentia",
    name: "Kentia",
    scientificName: "Howea forsteriana",
    category: "Interior",
    description: "La palmera de interior más elegante y cotizada. Su porte estilizado y sus palmas arqueadas añaden sofisticación y un toque exótico a salones amplios y despachos señoriales.",
    characteristics: [
      "Palmas elegantes de color verde oscuro mate sostenidas por tallos delgados.",
      "Crecimiento vertical muy esbelto, ideal para esquinas de estancias.",
      "Muy tolerante a la escasez de luz en interiores en comparación con otras palmeras.",
      "Crecimiento muy lento, lo que la convierte en una planta muy valorada."
    ],
    care: "Colócala en un lugar con luz indirecta media. Tolera la semisombra. Evita el sol directo que amarillea sus hojas. No soporta los excesos de agua en la base de la maceta.",
    diseases: "Puntas marrones por aire seco o acumulación de sales. Araña roja en el envés de las hojas si el ambiente es muy caluroso y seco.",
    watering: {
      summer: "Cada 7-9 días, dejando secar la mitad superior del sustrato.",
      winter: "Cada 15-20 días. Regar solo cuando la tierra esté casi seca por completo.",
      general: "Evitar el encharcamiento a toda costa. Utilizar macetas con excelente drenaje."
    },
    light: "Luz indirecta brillante a semisombra moderada.",
    difficulty: "Bajo",
    imageUrl: "/plants/kentia.png",
    temperature: "14°C - 25°C (soporta caídas puntuales de hasta 10°C)",
    humidity: "Media",
    wateringLevel: 2,
    sunLevel: 2,
    tempLevel: 70,
    funFact: "Es originaria únicamente de la remota isla Lord Howe en Australia y fue la planta favorita de los salones de la reina Victoria de Inglaterra."
  },
  {
    slug: "arbol-de-jade",
    name: "Árbol de Jade",
    scientificName: "Crassula ovata",
    category: "Suculentas",
    description: "Una suculenta de apariencia arbórea muy longeva que se asocia tradicionalmente con la prosperidad y la buena fortuna. Posee hojas carnosas y brillantes que recuerdan a las piedras de jade.",
    characteristics: [
      "Tronco leñoso grueso y ramas carnosas que asemejan un bonsái natural.",
      "Hojas ovaladas y gruesas de color verde brillante, a veces con bordes rojizos al sol.",
      "Produce pequeños ramilletes de flores blancas o rosadas en forma de estrella.",
      "Capacidad extrema para tolerar la sequía prolongada."
    ],
    care: "Cultívalo en sustrato con base mineral muy porosa y en macetas que pesen lo suficiente para evitar que vuelque. Riégalo solo cuando notes que las hojas pierden turgencia o la tierra esté seca.",
    diseases: "Pudrición del tallo por hongos si se riega en exceso. Cochinilla algodonosa en las axilas de las hojas.",
    watering: {
      summer: "Cada 10-14 días, asegurando un secado completo entre riegos.",
      winter: "Una vez al mes, reduciendo a cero en meses de frío intenso.",
      general: "Aplicar la regla de 'menos es más'. Si el tronco o las hojas se ablandan, denota exceso de agua."
    },
    light: "Pleno sol o luz muy brillante directa.",
    difficulty: "Bajo",
    imageUrl: "/plants/arbol-jade.png",
    temperature: "10°C a 35°C (no tolera heladas por debajo de 5°C)",
    humidity: "Baja (ambientes secos)",
    wateringLevel: 1,
    sunLevel: 3,
    tempLevel: 80,
    funFact: "Puede vivir más de 100 años si se cuida bien, pasando de generación en generación como una preciada herencia familiar."
  },
  {
    slug: "espatifilo",
    name: "Espatifilo (Cuna de Moisés)",
    scientificName: "Spathiphyllum wallisii",
    category: "Interior",
    description: "Planta de interior muy agradecida conocida por sus elegantes flores blancas en forma de vela. Es excelente para purificar el aire y avisa visiblemente cuando necesita agua bajando sus hojas.",
    characteristics: [
      "Hojas lanceoladas verde brillante que crecen directamente de la base.",
      "Flores compuestas por una espata blanca y un espádice central color crema.",
      "Una de las mejores plantas purificadoras según la NASA.",
      "Florece con facilidad en interiores si recibe la luz suficiente."
    ],
    care: "Manténla alejada del sol directo que marchita sus hojas. Es una planta que avisa bajando todas sus hojas cuando tiene sed; al regarla, vuelve a levantarlas en un par de horas como por arte de magia.",
    diseases: "Puntas secas por falta de humedad. Pudrición de raíces si se encharca el fondo de la maceta.",
    watering: {
      summer: "2 veces por semana, manteniendo el suelo ligeramente húmedo.",
      winter: "Cada 7-10 días, dejando secar la superficie de la tierra.",
      general: "Riego regular. Agradece pulverizaciones constantes en sus hojas verdes (evitando las flores)."
    },
    light: "Luz indirecta media a brillante. Soporta luz baja.",
    difficulty: "Bajo",
    imageUrl: "/plants/espatifilo.png",
    temperature: "16°C - 24°C (sensible al frío de menos de 12°C)",
    humidity: "Alta (agradece pulverización frecuente)",
    wateringLevel: 2,
    sunLevel: 1,
    tempLevel: 65,
    funFact: "Es conocida como la planta dramática porque cuando tiene sed se desmaya por completo cayendo sus hojas, y resucita al regarla."
  },
  {
    slug: "calatea",
    name: "Calatea",
    scientificName: "Calathea makoyana",
    category: "Interior",
    description: "Llamada planta cebra por el espectacular patrón geométrico pintado en sus hojas, de envés color púrpura. Tiene la curiosidad de plegar sus hojas hacia arriba durante la noche.",
    characteristics: [
      "Hojas ovaladas con un patrón de manchas verdes oscuras sobre fondo verde claro.",
      "Envés de las hojas de un llamativo color morado púrpura.",
      "Movimiento nictinástico: dobla sus hojas hacia arriba por la noche (parece rezar).",
      "Planta no tóxica y segura para mascotas."
    ],
    care: "Requiere sombra parcial o luz indirecta tamizada (el sol borra sus hermosos dibujos) y una humedad alta constante. Riega preferentemente con agua de lluvia o mineral sin cal.",
    diseases: "Puntas secas y enrollamiento de hojas si la humedad del aire baja. Muy sensible al cloro del agua del grifo.",
    watering: {
      summer: "2 veces por semana, procurando mantener el sustrato constantemente húmedo pero no empapado.",
      winter: "Cada 7-9 días, reduciendo la cantidad de agua pero sin dejar secar el sustrato del todo.",
      general: "Usar agua sin cal a temperatura ambiente. Mantener el sustrato fresco constantemente."
    },
    light: "Sombra parcial o luz indirecta filtrada muy suave.",
    difficulty: "Alto",
    imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop",
    temperature: "18°C - 24°C (nunca por debajo de 15°C)",
    humidity: "Alta (mínimo 60% - 70%)",
    wateringLevel: 3,
    sunLevel: 1,
    tempLevel: 68,
    funFact: "Al anochecer, sus hojas se cierran verticalmente hacia arriba simulando unas manos en oración, y se vuelven a abrir al amanecer."
  },
  {
    slug: "geranio",
    name: "Geranio",
    scientificName: "Pelargonium hortorum",
    category: "Exterior",
    description: "La planta clásica de los balcones y patios andaluces. Sus ramilletes de flores de colores vibrantes son sinónimo de alegría y resisten de forma excelente el intenso sol andaluz.",
    characteristics: [
      "Hojas redondeadas y aterciopeladas con un olor característico.",
      "Flores agrupadas en vistosas umbelas de colores rojos, rosas, blancos o bicolores.",
      "Floración ininterrumpida desde la primavera hasta finales de otoño.",
      "Porte arbustivo compacto muy rústico."
    ],
    care: "Requiere pleno sol directo para florecer de forma abundante. Es muy aconsejable retirar las flores secas y las hojas dañadas periódicamente para incentivar nuevos brotes florales.",
    diseases: "Su principal plaga es la Mariposa del Geranio (Cacyreus marshalli), cuya oruga taladra los tallos desde dentro. Requiere tratamientos con insecticidas específicos periódicos.",
    watering: {
      summer: "2-3 veces por semana en maceta, mojando solo la tierra.",
      winter: "Cada 10-15 días. Dejar secar el sustrato entre riegos.",
      general: "Riego directo al sustrato sin mojar las hojas ni las flores para evitar pudriciones y hongos."
    },
    light: "Pleno sol directo (mínimo 5-6 horas diarias).",
    difficulty: "Bajo",
    imageUrl: "https://images.unsplash.com/photo-1507269811115-4c9d9ffec8c2?q=80&w=600&auto=format&fit=crop",
    temperature: "5°C a 40°C (proteger de heladas fuertes)",
    humidity: "Baja - Media",
    wateringLevel: 2,
    sunLevel: 3,
    tempLevel: 75,
    funFact: "Sus hojas contienen aceites esenciales que actúan como un repelente natural eficaz contra los mosquitos y otros insectos molestos."
  },
  {
    slug: "romero",
    name: "Romero",
    scientificName: "Salvia rosmarinus",
    category: "Exterior",
    description: "Planta aromática leñosa indispensable en la cocina mediterránea. Su follaje acicular exhala un aroma reconfortante al rozarlo y posee una rusticidad insuperable en zonas costeras.",
    characteristics: [
      "Arbusto leñoso perenne de hojas lineales y coriáceas de fuerte aroma.",
      "Pequeñas flores de color azul claro o violáceo agrupadas en las axilas de las hojas.",
      "Propiedades culinarias, medicinales y ornamentales.",
      "Soporta perfectamente la sequía extrema, suelos salinos y vientos costeros."
    ],
    care: "Cultívalo a pleno sol y en un suelo con excelente drenaje (pedregoso o arenoso). Es una planta muy rústica que apenas requiere cuidados una vez establecida en el suelo.",
    diseases: "Pudrición de raíces si se planta en arcillas pesadas que retienen agua o si se riega en exceso.",
    watering: {
      summer: "Cada 7-10 días si está en maceta; quincenal o nulo si está plantado en tierra.",
      winter: "Solo en caso de sequía invernal extrema (cada 30 días).",
      general: "Riego mínimo. Comprobar que la tierra esté completamente seca antes de regar de nuevo."
    },
    light: "Pleno sol directo indispensable.",
    difficulty: "Bajo",
    imageUrl: "https://images.unsplash.com/photo-1515543904379-3d757afe72e2?q=80&w=600&auto=format&fit=crop",
    temperature: "-10°C a 45°C",
    humidity: "Baja (ambientes secos y soleados)",
    wateringLevel: 1,
    sunLevel: 3,
    tempLevel: 85,
    funFact: "En la antigua Grecia, los estudiantes se ponían coronas de romero antes de los exámenes para mejorar su memoria y concentración."
  }
];
