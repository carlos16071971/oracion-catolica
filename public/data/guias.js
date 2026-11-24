// Guías de celebración para la comunidad: Velada al Niño Dios / Virgen patrona y Novenario por un difunto.
// Textos de redacción propia, con oraciones tradicionales de uso común. Deben ser revisados por el párroco.
// Convenciones:
//   - {imagen} y {pueblo} (velada) se reemplazan con lo que escriba la persona.
//   - {nombre}, {o}, {lo}, {el}, {hermano} (novenario) se adaptan al nombre y al género del difunto.
//   - Un texto puede ser un string o { n: "...", v: "..." } (n = Niño Dios, v = Virgen patrona).
//   - Roles de cada línea: guia, todos, lector, canto, nota.

// =====================================================================
//  VELADA AL NIÑO DIOS O A LA VIRGEN PATRONA
// =====================================================================
export const VELADA = {
  intro: {
    n: "Guía completa para dirigir una velada de oración en honor del Niño Dios, cuando el párroco o el sacerdote no puede estar presente. Está pensada para una ayudante del párroco, catequista o ministro de la comunidad. Dura entre 75 y 90 minutos y se puede acortar.",
    v: "Guía completa para dirigir una velada de oración en honor de la Virgen patrona del pueblo, cuando el párroco o el sacerdote no puede estar presente. Está pensada para una ayudante del párroco, catequista o ministro de la comunidad. Dura entre 75 y 90 minutos y se puede acortar."
  },
  limites: {
    titulo: "Antes de empezar: lo que sí y lo que no",
    puede: [
      "Guiar la oración, proclamar la Palabra de Dios y compartir una reflexión sencilla.",
      "Dirigir el Santo Rosario, las letanías, la veneración de la imagen y las ofrendas.",
      "Despedir con la fórmula de bendición para laicos (está en el último paso)."
    ],
    nopuede: [
      "Celebrar la Misa, confesar o dar la absolución.",
      "Bendecir con las fórmulas reservadas al sacerdote o al diácono, o hacer la señal de la cruz sobre la gente.",
      "Dar la comunión, salvo que sea ministro extraordinario autorizado y la diócesis lo permita para ese día."
    ],
    consejos: [
      "Pide al párroco su encargo y su bendición antes de la velada. Eso une la celebración con la parroquia.",
      "Habla en plural («nosotros»): diriges desde dentro de la comunidad, no por encima de ella.",
      "Si llega el sacerdote o un diácono, le cedes la presidencia con alegría."
    ]
  },
  preparacion: [
    {
      titulo: "El lugar",
      items: [
        "Mesa o altar con mantel limpio, sin cubrir el Sagrario.",
        "La imagen a la vista de todos, con flores y velas.",
        "La Biblia (o el leccionario) en un lugar de honor, con la lectura marcada.",
        "Un cirio o vela grande encendida.",
        "Sonido probado: micrófono, parlante, pilas de repuesto.",
        "Sillas ordenadas y un pasillo libre para la veneración de la imagen.",
        "Luz suficiente para leer, y velas o linterna por si se corta la luz."
      ]
    },
    {
      titulo: "Las personas",
      items: [
        "Hablar con los priostes o el comité de fiestas para coordinar horario y orden.",
        "Un lector para la Palabra y otro para las peticiones.",
        "Cantores o músicos, con los cantos ensayados.",
        "Niños o jóvenes que lleven las ofrendas.",
        "Dos o tres personas de apoyo para el orden y para ayudar a los mayores.",
        "Alguien que reciba las flores y velas durante la veneración."
      ]
    },
    {
      titulo: "El material",
      items: [
        "Hojas o proyección con cantos, respuestas y oraciones comunes.",
        "Canasta para las ofrendas y flores o velas pequeñas para repartir.",
        "Texto del Rosario o de las letanías impreso, para el que lo dirige.",
        "Reloj o celular a mano para cuidar el tiempo.",
        "Esta guía abierta en tu teléfono o impresa."
      ]
    },
    {
      titulo: "Tu preparación",
      items: [
        "Leer toda la celebración antes, en voz alta, para no tropezar.",
        "Meditar la lectura y preparar tu reflexión (hay un modelo en el paso 7).",
        "Rezar por la comunidad y por quienes vendrán.",
        "Ensayar con el lector y los cantores el día anterior.",
        "Llegar con tiempo y empezar puntual."
      ]
    }
  ],
  roles: [
    ["Guía", "Dirige toda la celebración, hace las introducciones y las oraciones en voz alta."],
    ["Lector", "Proclama la lectura bíblica y el salmo con voz clara y sin prisa."],
    ["Lector de peticiones", "Lee las súplicas de la comunidad."],
    ["Cantores y músicos", "Animan los cantos de entrada, de veneración y de despedida."],
    ["Portadores de ofrendas", "Niños, jóvenes o familias que acompañan flores y velas hasta la imagen."],
    ["Priostes y apoyo", "Cuidan el orden, la imagen, la luz, el sonido y la acogida."]
  ],
  programa: [
    ["Canto de entrada y bienvenida", 5],
    ["Señal de la cruz y saludo", 2],
    ["Introducción", 3],
    ["Petición de perdón", 3],
    ["Oración inicial", 2],
    ["Palabra de Dios", 8],
    ["Reflexión y silencio", 8],
    ["Peticiones", 6],
    ["Padrenuestro", 2],
    ["Rezo ante la imagen (Rosario o letanías)", 20],
    ["Veneración de la imagen y ofrendas", 10],
    ["Oración de gracias y entrega", 4],
    ["Avisos y agradecimientos", 2],
    ["Bendición, despedida y canto final", 5]
  ],
  // Una ficha por cada punto del programa (mismo orden que `programa` y `pasos`).
  // hacer = qué hacer exactamente · ejemplo = lo que se puede decir/hacer, tal cual · alegria = toque para que sea una noche feliz y agradecida · evitar = errores frecuentes
  claves: [
    "Llega temprano y empieza puntual: la gente lo agradece y se siente respetada.",
    "Sonríe y habla despacio. Si tú estás alegre y tranquila, la velada sale alegre y tranquila.",
    "Que participen todos: niños llevando velas y flores, jóvenes leyendo, mayores sentados adelante.",
    "Da las gracias muchas veces y por su nombre: a los priostes, cantores, lectores y a quienes vinieron.",
    "Termina con alegría: un canto vivo, un aplauso de gratitud y una despedida cariñosa en la puerta."
  ],
  detalle: [
    { // 1
      hacer: [
        "Llega 40 minutos antes: revisa la imagen, las velas, el sonido y las sillas.",
        "Recibe a la gente en la puerta con una sonrisa y saluda por su nombre a los mayores.",
        "Cuando la mayoría esté sentada, haz una señal a los cantores y empiecen.",
        "Al terminar el canto, da la bienvenida en una o dos frases."
      ],
      ejemplo: { n: "«¡Qué alegría verlos! Gracias por venir esta noche a {pueblo}. Hoy venimos a dar gracias, a cantar y a estar juntos delante de nuestro {imagen}.»", v: "«¡Qué alegría verlos! Gracias por venir esta noche a {pueblo}. Hoy venimos a dar gracias, a cantar y a estar juntos delante de nuestra Virgen {imagen}.»" },
      alegria: "Pide a los niños que entreguen una flor o una velita a cada persona que llega. Que nadie se sienta ignorado.",
      evitar: ["Esperar más de 10 minutos a que llegue todo el mundo.", "Alargar la bienvenida.", "Empezar sin probar el micrófono."]
    },
    { // 2
      hacer: [
        "Invita a ponerse de pie con un gesto de la mano.",
        "Haz la señal de la cruz despacio, junto con la gente.",
        "Di el saludo y espera la respuesta antes de seguir."
      ],
      ejemplo: "«Pónganse de pie, por favor. En el nombre del Padre, y del Hijo, y del Espíritu Santo.» (esperas el Amén) «Bendito sea Dios, que nos ha reunido en su amor.»",
      alegria: "Mira a la gente al saludar y sonríe: la primera impresión marca el ambiente de toda la noche.",
      evitar: ["Decir «El Señor esté con ustedes»: es del sacerdote o del diácono.", "Ir tan rápido que nadie alcance a responder."]
    },
    { // 3
      hacer: [
        "Lee la introducción del guion o dila con tus palabras, en 3 minutos como máximo.",
        "Añade algo propio de tu comunidad: desde cuándo se celebra la fiesta o quién cuidó la imagen todos estos años.",
        "Anuncia que esta noche es de gratitud."
      ],
      ejemplo: { n: "«Hace muchos años que las familias de {pueblo} se reúnen cada diciembre ante el Niño Dios. Gracias a quienes cuidaron esta imagen, a los priostes y a quienes vinieron hoy aunque estén cansados. Esta noche es una noche de gratitud.»", v: "«Hace muchos años que las familias de {pueblo} se reúnen cada año ante nuestra Madre. Gracias a quienes cuidaron esta imagen, a los priostes y a quienes vinieron hoy aunque estén cansados. Esta noche es una noche de gratitud.»" },
      alegria: "Nombra con cariño a los priostes, a los músicos y a los más pequeños: que todos se sientan parte de la fiesta.",
      evitar: ["Hablar de problemas o polémicas del pueblo.", "Convertirla en un sermón."]
    },
    { // 4
      hacer: [
        "Invita al silencio y cuenta mentalmente hasta 10.",
        "Lee las tres invocaciones despacio y deja que todos respondan.",
        "Termina con la súplica de misericordia."
      ],
      ejemplo: "«Por un momento pensemos a quién necesitamos pedir perdón esta noche, y a quién queremos perdonar.» (silencio) «Tú, que viniste a buscar a los que estaban perdidos: Señor, ten piedad.»",
      alegria: "Habla con ternura: el perdón nos libera para estar contentos y en paz con los demás.",
      evitar: ["Regañar o mencionar pecados concretos.", "Decir «yo los absuelvo»: eso solo lo hace el sacerdote.", "Alargar el silencio más de 15 segundos."]
    },
    { // 5
      hacer: [
        "Di «Oremos» y deja un instante de silencio.",
        "Lee la oración con calma, las manos juntas y la mirada en alto.",
        "Espera el Amén de la gente."
      ],
      ejemplo: "«Oremos.» (silencio) [Lee la oración inicial del guion.] «Por Jesucristo, nuestro Señor.»",
      alegria: "Esta oración marca el tono espiritual de la noche: léela como quien habla con alguien a quien quiere.",
      evitar: ["Leer con la cabeza pegada al papel.", "Cambiar palabras de la oración.", "Apurarte."]
    },
    { // 6
      hacer: [
        "Ten la lectura marcada en la Biblia y ensayada con el lector desde antes.",
        "Pide que se sienten para escuchar.",
        "Después de la lectura, guarda un minuto de silencio.",
        "Si no hay cantor para el salmo, recen la respuesta entre dos grupos."
      ],
      ejemplo: { n: "«Escuchemos con atención lo que Dios nos dice esta noche.» (Lectura: Lucas 2,1-14) … «Palabra del Señor.» (Gloria a ti, Señor Jesús.) (un minuto de silencio)", v: "«Escuchemos con atención lo que Dios nos dice esta noche.» (Lectura: Lucas 1,26-38) … «Palabra del Señor.» (Gloria a ti, Señor Jesús.) (un minuto de silencio)" },
      alegria: "Pide a un niño o a una niña que lleve la Biblia hasta el lector, como en procesión: la Palabra es el centro de la fiesta.",
      evitar: ["Cambiar la lectura por otro texto que no sea de la Biblia.", "Leer sin pausas.", "Empezar a hablar enseguida, sin silencio."]
    },
    { // 7
      hacer: [
        "Usa el modelo del guion o adáptalo con un recuerdo real de la comunidad.",
        "Habla cinco minutos como máximo.",
        "Cierra con la pregunta y un minuto de silencio."
      ],
      ejemplo: { n: "(Cambia el recuerdo por uno tuyo.) «Cuando era pequeña, mi familia me llevaba a ver al Niño Dios y me decían que le contara mis cosas. Él no se asusta de lo pequeño. Por eso hoy le preguntamos: ¿qué pesebre puedo preparar esta semana para que Jesús nazca en mi casa?»", v: "(Cambia el recuerdo por uno tuyo.) «Cuando era pequeña, mi mamá me enseñó a saludar a la Virgen al pasar frente a su imagen. Ella nunca nos dejó solos. Por eso hoy le preguntamos: ¿qué me pide Dios y cómo puedo decirle sí como María?»" },
      alegria: "Una anécdota sencilla y una sonrisa valen más que una explicación larga. Puedes preguntar: «¿Quién recuerda su primera fiesta aquí?» y dejar que dos o tres personas cuenten.",
      evitar: ["Hacer una homilía larga.", "Corregir o criticar a la gente.", "Mencionar temas políticos o asuntos privados de alguien presente."]
    },
    { // 8
      hacer: [
        "Prepara antes a un lector joven.",
        "Explica a todos la respuesta antes de empezar.",
        "Deja un momento para intenciones libres; si nadie habla, di tú una."
      ],
      ejemplo: "«Vamos a responder todos juntos: «Escúchanos, Señor».» … «Ahora, quien quiera, puede decir en voz alta por quién o por qué quiere rezar.» (silencio) «Y damos gracias por todo lo bueno que recibimos este año.»",
      alegria: "Incluye una petición de acción de gracias por lo bueno del año y por las familias presentes: la velada será de gratitud y no solo de pedir.",
      evitar: ["Hacer peticiones largas o con regaños.", "Nombrar enfermos sin permiso de la familia.", "Olvidar la respuesta de la gente."]
    },
    { // 9
      hacer: [
        "Invita a rezarlo juntos y empieza tú.",
        "Dilo despacio, al ritmo de los más pequeños y de los mayores.",
        "Termina en «líbranos del mal»."
      ],
      ejemplo: "«Como hijos de un mismo Padre, rezamos juntos las palabras que Jesús nos enseñó.» (Padre nuestro…)",
      alegria: "Si en tu comunidad se acostumbra, invita a darse la mano con los de al lado: es un gesto de familia.",
      evitar: ["Añadir frases propias o el embolismo de la Misa.", "Decirlo muy rápido."]
    },
    { // 10
      hacer: [
        "Reparte las decenas entre cinco personas, avisadas con anticipación.",
        "Anuncia cada misterio con una frase corta y deja un instante de silencio.",
        "Si el tiempo apremia, usa las letanías en lugar del Rosario."
      ],
      ejemplo: { n: "«Primer misterio gozoso: la Anunciación. Pensemos cómo Dios entra con sencillez en nuestra vida. Rezamos un Padrenuestro, diez Avemarías y un Gloria.»", v: "«Primer misterio gozoso: la Anunciación. Pensemos en el sí de María y en nuestros propios síes. Rezamos un Padrenuestro, diez Avemarías y un Gloria.»" },
      alegria: "Intercala un canto breve entre las decenas: la oración se siente viva y nadie se cansa.",
      evitar: ["Que cada uno rece a un ritmo distinto.", "Perder la cuenta: pide a una ayudante que lleve el rosario.", "Olvidar el Gloria al final de la decena."]
    },
    { // 11
      hacer: [
        "Explica el orden antes de empezar.",
        "Primero pasan los niños y los mayores; luego las familias.",
        "Una persona de apoyo recibe las flores y las velas.",
        "Los cantores mantienen un canto suave; si hay mucha gente, hagan dos filas."
      ],
      ejemplo: { n: "«Vamos a acercarnos en orden y sin apuro. Cada uno deja su flor o su vela ante nuestro {imagen} y le dice en su corazón: gracias.»", v: "«Vamos a acercarnos en orden y sin apuro. Cada uno deja su flor o su vela ante nuestra Virgen {imagen} y le dice en su corazón: gracias.»" },
      alegria: "Invita a cada familia a decir «gracias» en voz baja al dejar su ofrenda, y a una abuela o a un niño a abrir la fila. Es el momento más tierno de la velada.",
      evitar: ["Empujones: ayuda a los mayores y a las personas con dificultad para caminar.", "Llenar la imagen de velas encendidas sin cuidar el fuego.", "Bendecir las ofrendas con fórmulas del ritual."]
    },
    { // 12
      hacer: [
        "Lee la oración con calma; los priostes pueden estar de pie junto a la imagen.",
        "Invita a todos a repetir «Gracias, Señor».",
        "Cierra con el Amén de todos."
      ],
      ejemplo: "«Hagamos juntos un momento de gratitud: gracias por la familia, por la salud, por el trabajo, por esta fiesta. Y todos repetimos: Gracias, Señor.» (Gracias, Señor.)",
      alegria: "Pide que quien quiera diga en voz alta una sola frase de gracias: «Gracias por mi hijo», «Gracias por la cosecha». Es muy emotivo y no toma más de dos minutos.",
      evitar: ["Alargarla con pedidos nuevos.", "Improvisar una oración que nadie pueda seguir."]
    },
    { // 13
      hacer: [
        "Lleva escrita la lista de personas a agradecer, para no olvidar a nadie.",
        "Anuncia la hora de la Santa Misa y las próximas actividades de la fiesta.",
        "Hazlo en menos de dos minutos."
      ],
      ejemplo: "«Gracias a los priostes, a los cantores, a los lectores, a quienes cocinaron y adornaron este lugar. Mañana la Santa Misa será a las… en la iglesia. Los esperamos.»",
      alegria: "Pide un aplauso para quienes trabajaron: los aplausos de gratitud son parte de la alegría de la fiesta.",
      evitar: ["Olvidar a alguien importante: revisa tu lista antes.", "Dar avisos largos o que no tengan que ver con la fiesta.", "Pedir dinero con insistencia."]
    },
    { // 14
      hacer: [
        "Pide ponerse de pie.",
        "Di la bendición para laicos haciéndote tú la señal de la cruz.",
        "Despide con «Bendigamos al Señor» y empieza el canto final.",
        "Quédate en la puerta para despedir a la gente."
      ],
      ejemplo: "«El Señor nos bendiga, nos guarde de todo mal y nos lleve a la vida eterna.» (Amén.) «Bendigamos al Señor.» (Demos gracias a Dios.) «¡Que Dios les pague por venir! ¡Felices noches!»",
      alegria: "Termina con un canto alegre, quizá con palmas, y despide a cada persona en la puerta. Si los priostes lo organizan, entreguen un detalle sencillo: una estampa, un caramelo para los niños, un agüita.",
      evitar: ["Decir «los bendigo» o hacer la cruz sobre la gente.", "Cortar el canto final.", "Irte primero: el último en salir es quien dirigió."]
    }
  ],
  pasos: [
    {
      n: "Canto de entrada y bienvenida", min: 5,
      partes: [
        { r: "nota", t: "Cuando todos estén en su lugar, la imagen a la vista y las velas encendidas, empieza con un canto. Que los cantores se coloquen cerca de la imagen." },
        { r: "canto", t: { n: "Sugeridos: «Noche de paz», «Venid, fieles todos», «Campana sobre campana» o el arrullo que se acostumbre en tu comunidad.", v: "Sugeridos: «Dios te salve, María», «Salve, Regina» o el canto propio de la devoción de tu pueblo." } },
        { r: "guia", t: { n: "Hermanos y hermanas, sean todos bienvenidos. Esta noche nos reúne el amor a nuestro {imagen}, en {pueblo}. Pongámonos en su presencia con alegría.", v: "Hermanos y hermanas, sean todos bienvenidos. Esta noche nos reúne el amor a nuestra madre, la Virgen {imagen}, en {pueblo}. Pongámonos en su presencia con alegría." } }
      ]
    },
    {
      n: "Señal de la cruz y saludo", min: 2,
      partes: [
        { r: "guia", t: "En el nombre del Padre, y del Hijo, y del Espíritu Santo." },
        { r: "todos", t: "Amén." },
        { r: "guia", t: "Bendito sea Dios, que nos ha reunido en su amor." },
        { r: "todos", t: "Bendito seas por siempre, Señor." },
        { r: "nota", t: "Saluda con una fórmula sencilla como esta. Evita «El Señor esté con ustedes» y «Pueden ir en paz»: esas son del sacerdote o del diácono." }
      ]
    },
    {
      n: "Introducción", min: 3,
      partes: [
        { r: "guia", t: { n: "Hermanos: Dios, siendo grande, se hizo pequeño. Nació en Belén, pobre y sencillo, para que nadie le tuviera miedo y todos pudiéramos acercarnos. Esta noche venimos a su cuna como los pastores: sin prisa y con las manos abiertas. Venimos a darle gracias por el don de su vida y a confiarle nuestras familias, nuestros niños y a {pueblo}. Que su ternura nos haga mejores.", v: "Hermanos: María es la madre que Jesús nos dejó al pie de la cruz. Desde hace muchos años {pueblo} la ha sentido cerca: en las alegrías y en las penas, en las fiestas y en las lágrimas. Esta noche nos reunimos a sus pies como hijos que vuelven a casa: para darle gracias, para pedirle que interceda por nosotros y para aprender de ella a decir sí a Dios." } },
        { r: "nota", t: "Puedes añadir una o dos frases propias: desde cuándo se celebra esta fiesta en tu comunidad, o quién cuidó la imagen todos estos años." }
      ]
    },
    {
      n: "Petición de perdón", min: 3,
      partes: [
        { r: "guia", t: "Antes de acercarnos a Dios, reconozcamos que somos pecadores y pidamos su perdón." },
        { r: "nota", t: "Guarda un momento de silencio, unos diez segundos." },
        { r: "guia", t: "Tú, que viniste a buscar a los que estaban perdidos: Señor, ten piedad." },
        { r: "todos", t: "Señor, ten piedad." },
        { r: "guia", t: { n: "Tú, que naciste pobre para enriquecernos con tu amor: Cristo, ten piedad.", v: "Tú, que nos diste a María por madre: Cristo, ten piedad." } },
        { r: "todos", t: "Cristo, ten piedad." },
        { r: "guia", t: "Tú, que intercedes por nosotros ante el Padre: Señor, ten piedad." },
        { r: "todos", t: "Señor, ten piedad." },
        { r: "guia", t: "Dios todopoderoso tenga misericordia de nosotros, perdone nuestros pecados y nos lleve a la vida eterna." },
        { r: "todos", t: "Amén." },
        { r: "nota", t: "Esta es una súplica, no una absolución: no digas «yo los absuelvo». Invita a todos a acercarse a la confesión con el párroco." }
      ]
    },
    {
      n: "Oración inicial", min: 2,
      partes: [
        { r: "guia", t: "Oremos." },
        { r: "nota", t: "Silencio breve." },
        { r: "guia", t: { n: "Dios, Padre bueno, que en el Niño de Belén nos mostraste tu rostro cercano y tierno, concédenos recibirlo hoy con corazón sencillo, para que, adorándolo en esta imagen, aprendamos a ser pequeños, humildes y generosos como Él. Por Jesucristo, nuestro Señor.", v: "Dios y Padre nuestro, que quisiste que la Virgen María fuera madre de tu Hijo y también madre nuestra, concédenos que, venerando su imagen, imitemos su fe y su servicio, y que su intercesión nos lleve siempre a Cristo. Por Jesucristo, nuestro Señor." } },
        { r: "todos", t: "Amén." }
      ]
    },
    {
      n: "Palabra de Dios", min: 8,
      partes: [
        { r: "nota", t: { n: "Elige una lectura: Lucas 2,1-14 (el nacimiento), Lucas 2,15-20 (los pastores), Mateo 2,1-12 (los Magos) o Isaías 9,1-6. Léela de la Biblia o del leccionario aprobado, sin cambiarla.", v: "Elige una lectura: Lucas 1,26-38 (la Anunciación), Lucas 1,39-56 (la Visitación y el Magníficat), Juan 2,1-11 (las bodas de Caná) o Juan 19,25-27 (María al pie de la cruz). Léela de la Biblia o del leccionario aprobado, sin cambiarla." } },
        { r: "guia", t: "Escuchemos con atención la Palabra de Dios." },
        { r: "lector", t: "Lectura del santo Evangelio según san… (nombre del evangelista). [Lee el texto elegido]." },
        { r: "lector", t: "Palabra del Señor." },
        { r: "todos", t: "Gloria a ti, Señor Jesús." },
        { r: "nota", t: "Sin sacerdote ni diácono, el lector no dice «El Señor esté con ustedes» ni hace la señal de la cruz sobre el libro." },
        { r: "guia", t: { n: "Cantamos o rezamos el salmo. Respuesta: «Hoy nos ha nacido un Salvador: Cristo, el Señor.»", v: "Cantamos o rezamos el cántico de María (Lucas 1,46-55). Respuesta: «Proclama mi alma la grandeza del Señor.»" } },
        { r: "nota", t: "Después de la lectura guarda un minuto de silencio para que la Palabra llegue al corazón." }
      ]
    },
    {
      n: "Reflexión y silencio", min: 8,
      partes: [
        { r: "nota", t: "Tu reflexión no es una homilía: es un compartir sencillo, de cinco minutos o menos, entre hermanos. Parte de la lectura, da dos o tres ideas y termina con una pregunta para la vida. Abajo tienes un modelo que puedes usar o adaptar." },
        { r: "guia", t: { n: "En Belén, Dios no eligió un palacio: eligió un pesebre. Los primeros en enterarse no fueron los poderosos, sino unos pastores que cuidaban su ganado de noche. Nuestro {imagen}, que hemos cuidado y visto crecer desde niños, nos recuerda tres cosas.\n\nPrimera: Dios se acerca. Se hizo niño para que pudiéramos abrazarlo. No hay problema tan grande que no podamos llevárselo.\n\nSegunda: Dios elige lo pequeño. Nos invita a la sencillez y a no medir a las personas por lo que tienen. Cada niño es un tesoro de Dios.\n\nTercera: Dios nace hoy donde lo recibimos: en una familia reconciliada, en el que comparte su pan, en el niño bien cuidado, en el anciano acompañado.\n\nPregunto a cada uno, en silencio: ¿qué «pesebre» puedo preparar esta semana para que Jesús nazca en mi casa?", v: "María dijo sí sin entenderlo todo. Fue con prisa a servir a su prima Isabel. En Caná se dio cuenta de la necesidad ajena antes que nadie. Y al pie de la cruz no se fue. Nuestra Virgen {imagen}, que ha acompañado a {pueblo} por tantos años, nos enseña tres cosas.\n\nPrimera: escuchar. María guardaba todo en su corazón y lo meditaba. ¿Escucho a Dios y a los míos, o solo hablo?\n\nSegunda: servir. No se quedó con la gracia recibida: la compartió. ¿A quién le puedo hacer un favor esta semana?\n\nTercera: permanecer. Estuvo en las bodas y también en la cruz. ¿Acompaño a los que sufren aunque no sepa qué decir?\n\nLa imagen no es un adorno: nos señala a Jesús. Ella nos repite lo de Caná: «Hagan lo que Él les diga».\n\nPregunto a cada uno, en silencio: ¿qué me está pidiendo Dios hoy, y cómo puedo decirle sí como María?" } },
        { r: "nota", t: "Para compartir (opcional, en grupos pequeños): ¿Qué recuerdo tengo de esta fiesta en mi familia? ¿Por qué quiero dar gracias esta noche? ¿Qué gesto concreto haré esta semana?" },
        { r: "nota", t: "Termina con un minuto de silencio." }
      ]
    },
    {
      n: "Oración de los fieles (peticiones)", min: 6,
      partes: [
        { r: "guia", t: "Con la confianza de los hijos, presentemos nuestras súplicas. A cada petición respondemos: «Escúchanos, Señor»." },
        { r: "lector", t: "Por la Iglesia, por el Papa, por nuestro obispo, por nuestro párroco y por todos los que sirven a la comunidad, para que sean pastores según el corazón de Cristo. Roguemos al Señor." },
        { r: "todos", t: "Escúchanos, Señor." },
        { r: "lector", t: "Por {pueblo}, por sus autoridades y por todos los que trabajan por el bien común, para que reinen la justicia y la paz. Roguemos al Señor." },
        { r: "todos", t: "Escúchanos, Señor." },
        { r: "lector", t: { n: "Por los niños, especialmente los enfermos, los abandonados y los que sufren violencia, para que encuentren cariño y protección. Roguemos al Señor.", v: "Por las madres, por las que esperan un hijo, por las que sufren por sus hijos y por las que ya no están con nosotros. Roguemos al Señor." } },
        { r: "todos", t: "Escúchanos, Señor." },
        { r: "lector", t: "Por nuestras familias, para que sean hogares donde Dios habite, se perdone y se comparta el pan. Roguemos al Señor." },
        { r: "todos", t: "Escúchanos, Señor." },
        { r: "lector", t: "Por los enfermos, los ancianos y los que viven solos, para que sientan la cercanía de Dios y de su comunidad. Roguemos al Señor." },
        { r: "todos", t: "Escúchanos, Señor." },
        { r: "lector", t: "Por los agricultores, comerciantes y trabajadores, y por nuestros hermanos que están lejos por necesidad, para que Dios bendiga su esfuerzo y los traiga de vuelta sanos y salvos. Roguemos al Señor." },
        { r: "todos", t: "Escúchanos, Señor." },
        { r: "lector", t: "Por nuestros difuntos, y por los que sembraron esta devoción en nuestro pueblo, para que gocen de la paz eterna. Roguemos al Señor." },
        { r: "todos", t: "Escúchanos, Señor." },
        { r: "guia", t: "Ahora, en silencio o en voz alta, presentemos nuestras intenciones personales." },
        { r: "nota", t: "Deja un minuto largo. Quien quiera, dice su intención. Si hay muchas, puedes recogerlas por escrito antes de la velada." },
        { r: "guia", t: "Dios nuestro, escucha estas súplicas que te presentamos con confianza. Por Jesucristo, nuestro Señor." },
        { r: "todos", t: "Amén." }
      ]
    },
    {
      n: "Padrenuestro", min: 2,
      partes: [
        { r: "guia", t: "Como hijos del mismo Padre, digamos juntos las palabras que Jesús nos enseñó:" },
        { r: "todos", t: "Padre nuestro, que estás en el cielo, santificado sea tu nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal." },
        { r: "nota", t: "Termina aquí. No añadas el embolismo «Líbranos de todos los males…» ni «Tuyo es el reino…»: eso corresponde a la Misa." }
      ]
    },
    {
      n: "Rezo ante la imagen: Rosario o letanías", min: 20,
      partes: [
        { r: "nota", t: { n: "Elige una opción. A) Santo Rosario con los misterios gozosos (unos 20 minutos). B) Letanías al Niño Dios (unos 8 minutos), si quieres una velada más corta.", v: "Elige una opción. A) Santo Rosario con los misterios del día (unos 20 minutos). B) Letanías lauretanas (unos 8 minutos), si quieres una velada más corta." } },
        { r: "nota", t: "Opción A, Rosario: anuncia cada misterio, deja un instante de silencio y reza un Padrenuestro, diez Avemarías y un Gloria. Reparte las decenas entre varias personas. Las oraciones están en la sección «Oraciones católicas» del menú." },
        { r: "guia", t: { n: "Opción B, Letanías al Niño Dios (redacción propia). Respondemos: «Ten piedad de nosotros» y, al final, «Bendícenos».", v: "Opción B, Letanías lauretanas (selección). Respondemos: «Ruega por nosotros»." } },
        { r: "guia", t: { n: "Niño Dios, hijo de María, ten piedad de nosotros.\nNiño Dios, nacido en un pesebre.\nNiño Dios, adorado por los pastores.\nNiño Dios, buscado por los Magos.\nNiño Dios, luz que brilla en la noche.\nNiño Dios, paz de los corazones.\nNiño Dios, amigo de los pequeños.\nNiño Dios, esperanza de los pobres.\nNiño Dios, consuelo de los enfermos.\nNiño Dios, alegría de las familias.\nNiño Dios, protector de nuestros hogares.\nNiño Dios, defensor de los niños.\nNiño Dios, ternura del Padre.\nNiño Dios, Salvador del mundo.\nNiño Dios, bendícenos.", v: "Santa María, ruega por nosotros.\nSanta Madre de Dios.\nSanta Virgen de las vírgenes.\nMadre de Cristo.\nMadre de la Iglesia.\nMadre de la divina gracia.\nMadre purísima.\nMadre amable.\nMadre admirable.\nMadre del buen consejo.\nMadre del Salvador.\nVirgen fiel.\nEspejo de justicia.\nCausa de nuestra alegría.\nArca de la alianza.\nPuerta del cielo.\nEstrella de la mañana.\nSalud de los enfermos.\nRefugio de los pecadores.\nConsuelo de los afligidos.\nAuxilio de los cristianos.\nReina de los ángeles.\nReina de la paz." } },
        { r: "guia", t: { n: "Oremos: Señor Jesús, Niño de Belén, que te hiciste pequeño para estar cerca de nosotros, guarda a nuestras familias, protege a nuestros niños y llénanos de tu paz. Tú que vives y reinas por los siglos de los siglos.", v: "Oremos: Concede, Señor Dios nuestro, a tus siervos gozar de perpetua salud de alma y cuerpo, y por la gloriosa intercesión de la bienaventurada siempre Virgen María, líbranos de las tristezas de este mundo y concédenos gozar de las alegrías eternas. Por Cristo, nuestro Señor." } },
        { r: "todos", t: "Amén." }
      ]
    },
    {
      n: "Veneración de la imagen y ofrendas", min: 10,
      partes: [
        { r: "guia", t: { n: "Ahora, en señal de cariño, nos acercamos a nuestro {imagen}. Cada uno le presenta una flor o una vela, y le dice en su corazón lo que lleva dentro.", v: "Ahora, en señal de cariño, nos acercamos a nuestra Virgen {imagen}. Cada uno le presenta una flor o una vela, y le dice en su corazón lo que lleva dentro." } },
        { r: "nota", t: "Organiza una fila: primero los niños y los mayores, después las familias. Los cantores mantienen un canto suave mientras todos pasan. Una persona de apoyo recibe las ofrendas y las coloca ordenadamente." },
        { r: "canto", t: { n: "Sugeridos: arrullos y villancicos tradicionales del Niño; «Noche de paz» en voz baja.", v: "Sugeridos: «Salve, Regina», «Dios te salve, María» y cantos marianos propios de tu pueblo." } },
        { r: "guia", t: "Señor, te presentamos estas flores y estas velas: las flores, signo de nuestro cariño; las velas, signo de nuestra fe. Que nuestra vida sea una ofrenda agradable a ti." },
        { r: "todos", t: "Bendito seas por siempre, Señor." },
        { r: "nota", t: "No bendigas la imagen, las flores ni las velas con las fórmulas del ritual: esa bendición la hace el párroco. Tú puedes ofrecerlas con esta oración, que es una súplica." }
      ]
    },
    {
      n: "Oración de gracias y entrega", min: 4,
      partes: [
        { r: "guia", t: { n: "Divino Niño Dios, te damos gracias por tu llegada al mundo, por tu pobreza que nos enriquece y por tu ternura que nos conquista. Te damos gracias por esta imagen que ha acompañado a nuestras familias en los momentos de alegría y de dolor. Cuida a nuestros niños, bendice a nuestros hogares, sana a nuestros enfermos y llena de paz a {pueblo}. Haznos sencillos de corazón, para que podamos recibirte hoy y siempre. Tú que vives y reinas por los siglos de los siglos.", v: "Santísima Virgen {imagen}, madre y patrona de {pueblo}, te damos gracias por tu cercanía, por tu intercesión y por tu ejemplo de fe. Gracias por los favores que hemos recibido y por los que no supimos pedir. Cuida a nuestras familias, protege a nuestros hijos, consuela a los que lloran y acompaña a los que parten. Enséñanos a decir sí a Dios como tú, y a servir con alegría. Condúcenos siempre a tu Hijo Jesús, que vive y reina por los siglos de los siglos." } },
        { r: "todos", t: "Amén." },
        { r: "nota", t: "Si lo desean, pueden rezar juntos una Avemaría y, para la Virgen, la Salve (está en la pestaña «Recursos»)." }
      ]
    },
    {
      n: "Avisos y agradecimientos", min: 2,
      partes: [
        { r: "guia", t: "Agradecemos a los priostes, a los cantores, a los lectores y a todos los que hicieron posible esta velada. Les recordamos las próximas celebraciones de la fiesta y la hora de la Santa Misa." },
        { r: "nota", t: "Sé breve. Anota antes las fechas y las horas para no equivocarte." }
      ]
    },
    {
      n: "Bendición, despedida y canto final", min: 5,
      partes: [
        { r: "guia", t: "El Señor nos bendiga, nos guarde de todo mal y nos lleve a la vida eterna." },
        { r: "todos", t: "Amén." },
        { r: "nota", t: "Haz la señal de la cruz sobre ti mismo, con las manos juntas. No la hagas sobre la gente y no digas «los bendigo»." },
        { r: "guia", t: "Bendigamos al Señor." },
        { r: "todos", t: "Demos gracias a Dios." },
        { r: "canto", t: { n: "Canto final: un villancico o arrullo al Niño Dios.", v: "Canto final: la Salve o el himno de la Virgen de tu pueblo." } },
        { r: "nota", t: "Al terminar, agradece a todos en la puerta. Después, informa al párroco cómo salió la velada." }
      ]
    }
  ],
  lecturas: {
    n: [
      ["Isaías 9,1-6", "El pueblo que caminaba en tinieblas vio una gran luz."],
      ["Lucas 2,1-14", "El nacimiento de Jesús en Belén."],
      ["Lucas 2,15-20", "Los pastores van a ver al Niño."],
      ["Mateo 2,1-12", "La visita de los Magos."],
      ["Lucas 2,41-52", "El Niño Jesús en el templo."]
    ],
    v: [
      ["Lucas 1,26-38", "La Anunciación: el sí de María."],
      ["Lucas 1,39-56", "La Visitación y el Magníficat."],
      ["Juan 2,1-11", "Las bodas de Caná: «Hagan lo que Él les diga»."],
      ["Juan 19,25-27", "María al pie de la cruz: «Ahí tienes a tu madre»."],
      ["Hechos 1,12-14", "María con los apóstoles en oración."]
    ]
  },
  recursos: {
    salve: [
      "Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve.",
      "A ti llamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando en este valle de lágrimas.",
      "Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro muéstranos a Jesús, fruto bendito de tu vientre.",
      "¡Oh clemente, oh piadosa, oh dulce Virgen María!",
      "Ruega por nosotros, Santa Madre de Dios, para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo. Amén."
    ],
    cantos: {
      n: ["Noche de paz", "Venid, fieles todos", "Campana sobre campana", "Los peces en el río", "Arrullos y villancicos propios de tu comunidad"],
      v: ["Dios te salve, María", "Salve, Regina", "Santa María del Camino", "Cantos propios de la devoción de tu pueblo"]
    },
    notaCantos: "Aquí solo se dan los títulos. Usa el cancionero de tu parroquia o los cantos que tu comunidad ya conoce y canta con gusto.",
    plan45: [
      "Canto de entrada y saludo (5 min).",
      "Petición de perdón y oración inicial (4 min).",
      "Lectura bíblica y reflexión breve (10 min).",
      "Peticiones y Padrenuestro (6 min).",
      "Letanías en lugar del Rosario (8 min).",
      "Veneración y ofrendas (8 min).",
      "Bendición y canto final (4 min)."
    ]
  },
  consejos: [
    ["Cómo dirigir", [
      "Habla despacio y con voz clara. Si vas muy rápido, nadie podrá responder.",
      "Espera a que termine el canto o el silencio antes de seguir.",
      "Mira a la gente, no solo el papel. Sonríe: es una fiesta.",
      "No improvises oraciones largas; si vas a añadir algo, que sea breve.",
      "Anuncia con una frase lo que viene («Ahora rezamos…») para que todos se ubiquen."
    ]],
    ["Si algo sale mal", [
      "Se corta la luz o falla el sonido: enciendan velas y sigue sin micrófono, más cerca de la gente, con calma. Un canto sencillo ayuda.",
      "Llueve o hace mucho calor: acorta (usa las letanías en vez del Rosario) y ofrece agua a los mayores.",
      "Hay niños inquietos: invítalos a llevar las ofrendas; lo importante es que se sientan parte.",
      "Llega gente tarde: no pares, sigue la celebración con naturalidad.",
      "Te equivocas en un texto: sigue sin disculparte demasiado. A Dios no le importa la perfección sino el amor."
    ]],
    ["Si te hacen preguntas", [
      "Si te preguntan algo de doctrina que no sabes, responde con humildad: «Lo consulto con el padre y les cuento».",
      "No entres en discusiones durante la celebración.",
      "Si alguien quiere confesarse o necesita acompañamiento, invítalo a hablar con el párroco."
    ]],
    ["Al terminar", [
      "Recoge con cuidado las flores y las velas; trata la imagen con respeto.",
      "Agradece a los que ayudaron.",
      "Informa al párroco cómo salió la velada, cuánta gente asistió y qué se necesita.",
      "Reza por la comunidad esa noche, antes de dormir."
    ]]
  ]
};

// =====================================================================
//  NOVENARIO POR UN FAMILIAR DIFUNTO
// =====================================================================
export const NOVENARIO = {
  intro: "Guía para acompañar con oración los nueve días de un familiar fallecido. Cada noche dura unos 25 a 35 minutos. La puede dirigir un familiar, un vecino o una ayudante de la parroquia.",
  sentido: "No es una obligación ni algo mágico: es una costumbre piadosa muy querida, que acompaña a la familia en el duelo y expresa la fe en la resurrección. Lo más valioso que podemos ofrecer por un difunto es la Santa Misa, junto con la oración, la limosna y las obras de caridad. No sabemos cómo está nuestro difunto ante Dios: lo confiamos a su misericordia, con esperanza.",
  preparacion: [
    {
      titulo: "El lugar",
      items: [
        "Una mesa con mantel, una cruz, la foto del difunto y una vela.",
        "Flores sencillas y una imagen de la Virgen o del Sagrado Corazón.",
        "La Biblia abierta o marcada en la lectura del día.",
        "Agua bendita, si la tienen.",
        "Sillas suficientes y un ambiente tranquilo, sin ruido ni pantallas."
      ]
    },
    {
      titulo: "Las personas",
      items: [
        "Escoger a quien guiará y a quien leerá. Pueden turnarse cada noche.",
        "Invitar a familiares, vecinos y amigos, sin excluir a nadie.",
        "Dejar que los niños participen: encender la vela, llevar flores o leer una petición.",
        "Pedir al párroco una Misa por el difunto (ofrecimiento voluntario)."
      ]
    },
    {
      titulo: "El tiempo",
      items: [
        "Fijar la misma hora cada noche, por ejemplo a las 7 p.m.",
        "Empezar puntual: con la oración, no con la espera.",
        "Un compartir sencillo al final (café, agüita, pan) si la familia lo desea, con respeto y sin excesos."
      ]
    }
  ],
  orden: [
    "Señal de la cruz y acogida",
    "Oración inicial",
    "Lectura de la Palabra de Dios",
    "Reflexión",
    "Un recuerdo agradecido",
    "Oración del día",
    "Peticiones",
    "Padrenuestro, Avemaría y Eterno descanso",
    "Oración final y bendición"
  ],
  comun: {
    acogida: [
      { r: "guia", t: "En el nombre del Padre, y del Hijo, y del Espíritu Santo." },
      { r: "todos", t: "Amén." },
      { r: "guia", t: "Hermanos: nos reúne la fe en Jesús resucitado y el cariño por {nombre}. Dios, que es Padre bueno, nos consuele y reciba a {nombre} en su paz." },
      { r: "todos", t: "Amén." }
    ],
    inicial: "Dios de misericordia y Padre de todo consuelo, aquí estamos con el corazón dolido, pero confiando en ti. Tú conoces a {nombre} desde antes de nacer; conoces su historia, sus alegrías y sus fallas. Te {lo} entregamos con gratitud por el bien que hizo y con humildad por lo que pudo faltarle. Perdona sus pecados, purifica su corazón y recíbe{lo} en tu casa. Y a nosotros, que {lo} lloramos, danos paz, fortaleza y esperanza. Por Jesucristo, nuestro Señor. Amén.",
    recuerdo: "Un momento para recordar. Quien quiera, comparte en voz alta algo bueno de {nombre}: un consejo, una anécdota, un gesto de cariño. Después damos gracias a Dios por su vida.",
    peticiones: [
      "Por {nombre}, para que Dios {lo} reciba en su paz y le conceda la luz perpetua. Roguemos al Señor.",
      "Por nuestra familia, para que Dios nos dé consuelo, unión y fortaleza en esta pena. Roguemos al Señor.",
      "Por los enfermos y por los que están a punto de morir, para que no estén solos. Roguemos al Señor.",
      "Por todos los difuntos, y en especial por los que nadie recuerda. Roguemos al Señor."
    ],
    respuesta: "Escúchanos, Señor.",
    padrenuestro: "Padre nuestro, que estás en el cielo, santificado sea tu nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal.",
    avemaria: "Dios te salve, María, llena eres de gracia; el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.",
    eterno: "Dale, Señor, el descanso eterno, y brille sobre {el} la luz perpetua. Descanse en paz. Amén.\n\nQue las almas de todos los fieles difuntos, por la misericordia de Dios, descansen en paz. Amén.",
    final: "Señor Dios, tú eres la resurrección y la vida. Escucha nuestra oración por {nombre}: concédele el descanso eterno, perdona sus faltas y recíbe{lo} en la alegría de tu casa. Consuela a su familia, sostén nuestra fe y haznos vivir de manera que un día nos reencontremos contigo, sin dolor ni lágrimas. Por Jesucristo, nuestro Señor. Amén.",
    bendicion: [
      { r: "guia", t: "El Señor nos bendiga, nos guarde de todo mal y nos lleve a la vida eterna." },
      { r: "todos", t: "Amén." },
      { r: "nota", t: "Haz la señal de la cruz sobre ti mismo. No la hagas sobre los presentes." },
      { r: "guia", t: "Descanse en paz {nombre}." },
      { r: "todos", t: "Amén." }
    ],
    opcional: "Si lo desean, pueden rezar el Santo Rosario (misterios gloriosos o dolorosos) o la Coronilla de la Divina Misericordia después de las peticiones. Las oraciones del Rosario están en «Oraciones católicas»."
  },
  noches: [
    {
      t: "Dios nos creó para la vida",
      cita: "Sabiduría 3,1-9",
      resumen: "Las almas de los justos están en manos de Dios, y ningún tormento las alcanzará. A los ojos de los que no tienen fe parece un final, pero los que confían saben que es un paso a la paz.",
      reflexion: "Dios no nos creó para la nada, sino para la vida. Cada persona es un don suyo, y nadie nace por casualidad. La muerte duele y no tenemos que fingir que no. Pero para el que cree, no es un abismo: es la entrada en las manos de Dios. Esta noche damos gracias por el regalo que fue {nombre} y por todo lo que recibimos de {el}.",
      oracion: "Padre, tú nos creaste por amor y nos llamaste a la vida. Gracias por haber puesto a {nombre} en nuestro camino. Recíbe{lo} en tus manos y no permitas que ninguna pena lo alcance. Danos la fe para creer que su vida no se ha acabado, sino que ha cambiado. Amén.",
      peticion: "Para que los que hoy lloran descubran que Dios los sostiene y que el amor no muere.",
      obra: "Llamar o visitar a un familiar que esté solo o triste."
    },
    {
      t: "Jesús es la resurrección y la vida",
      cita: "Juan 11,17-27",
      resumen: "Jesús llega a Betania cuando Lázaro ya había muerto. Marta le dice su dolor y Jesús le responde: «Yo soy la resurrección y la vida; el que cree en mí, aunque haya muerto, vivirá».",
      reflexion: "Jesús no se queda lejos de nuestro dolor. Lloró en la tumba de su amigo. Y allí mismo se atrevió a decir lo más grande: que Él es la resurrección y la vida. Marta le contesta con fe, aun llorando. Podemos hacer lo mismo: decirle a Jesús nuestra pena y, al mismo tiempo, repetirle «creo». Nuestra esperanza no es una idea: es una persona, Jesucristo, que venció a la muerte.",
      oracion: "Señor Jesús, tú lloraste por tu amigo y por eso sabes cuánto nos duele. Tú eres la resurrección y la vida. Creemos que {nombre} vivirá contigo para siempre. Aumenta nuestra fe cuando el dolor nos haga dudar. Amén.",
      peticion: "Para que nuestra fe en la resurrección nos consuele y nos dé fuerzas para seguir.",
      obra: "Rezar un Padrenuestro por alguien que esté de luto en tu barrio."
    },
    {
      t: "Dios es Padre misericordioso",
      cita: "Lucas 15,11-24",
      resumen: "Un padre ve venir de lejos a su hijo que se había ido, corre a abrazarlo y hace una fiesta. No le pregunta primero cuánto falló: lo recibe como hijo.",
      reflexion: "Nadie es perfecto, ni nosotros ni nuestros difuntos. Pero Dios no es un juez frío: es un Padre que sale a esperar. Cuando pensamos en los errores de {nombre}, no tenemos que desesperarnos ni juzgar: {lo} ponemos en el abrazo del Padre. Y pensamos también en nuestras propias faltas, y en las personas a las que debemos pedir o dar perdón. Esta noche es buen momento para reconciliarnos.",
      oracion: "Padre misericordioso, tú ves de lejos a tus hijos y corres a abrazarlos. Te encomendamos a {nombre}: perdona todo lo que dejó sin hacer o hizo mal, y recíbe{lo} con alegría en tu casa. Enséñanos también a perdonar a los que nos hirieron. Amén.",
      peticion: "Para que el perdón de Dios cure las heridas de nuestra familia y nos reconcilie.",
      obra: "Dar o pedir perdón a alguien con quien estemos distanciados."
    },
    {
      t: "Fuimos bautizados en Cristo",
      cita: "Romanos 6,3-9",
      resumen: "San Pablo recuerda que por el bautismo estamos unidos a Cristo en su muerte y, por eso, también en su resurrección. Si hemos muerto con Cristo, creemos que también viviremos con Él.",
      reflexion: "En el bautismo, {nombre} fue hecho hijo de Dios. Esa dignidad no se pierde con la muerte. El agua bendita que nos persignamos nos recuerda que nuestra vida es de Dios desde el principio y para siempre. Hoy podemos acordarnos de nuestro propio bautismo y preguntarnos si vivimos como hijos de Dios.",
      oracion: "Señor, por el bautismo hiciste a {nombre} hij{o} tuy{o} y {lo} marcaste con tu amor. Que viva ahora en plenitud lo que empezó en la fuente. Y a nosotros, haznos fieles a nuestro bautismo, para que un día participemos de tu resurrección. Amén.",
      peticion: "Para que todos los bautizados vivamos como hijos de Dios y hermanos entre nosotros.",
      obra: "Persignarse con agua bendita al salir de casa y recordar la fecha de nuestro bautismo."
    },
    {
      t: "El Pan de vida",
      cita: "Juan 6,51-58",
      resumen: "Jesús dice: «Yo soy el pan vivo bajado del cielo; el que coma de este pan vivirá para siempre». Habla de la Eucaristía, que nos une a Él y nos da vida eterna.",
      reflexion: "En la Misa, Jesús se nos da como alimento. La Eucaristía nos une a Cristo y también a todos los que viven en Él, aunque ya no los veamos. Por eso la mejor oración por {nombre} es la Santa Misa. Esta noche nos comprometemos a participar en ella, y a hacer que la próxima Eucaristía sea ofrecida por su eterno descanso.",
      oracion: "Jesús, Pan de vida, tú te das a nosotros para que tengamos vida eterna. Por tu Cuerpo entregado y tu Sangre derramada, lleva a {nombre} a la plenitud de la vida. Y a los que quedamos aquí, aliméntanos con tu presencia para caminar con esperanza. Amén.",
      peticion: "Para que valoremos la Santa Misa y la ofrezcamos con amor por nuestros difuntos.",
      obra: "Asistir a Misa esta semana y ofrecer la comunión por {nombre}."
    },
    {
      t: "En la casa del Padre hay muchas moradas",
      cita: "Juan 14,1-6",
      resumen: "Jesús dice a sus discípulos: «No se turbe su corazón. En la casa de mi Padre hay muchas moradas. Voy a prepararles un lugar». Él es el camino, la verdad y la vida.",
      reflexion: "Los discípulos estaban tristes porque Jesús se iba. Y Jesús los consuela: se va a preparar un lugar, y volverá por ellos. Así consideramos hoy a {nombre}: no se ha perdido, se nos adelantó. Alguien nos espera. Eso no quita el dolor, pero nos da dirección. El camino es Jesús, y quien lo sigue no se pierde.",
      oracion: "Jesús, tú nos dijiste que no se turbe nuestro corazón. Prepara un lugar para {nombre} en la casa de tu Padre. Y a nosotros, que seguimos en camino, ayúdanos a seguirte a ti, que eres el camino, la verdad y la vida. Amén.",
      peticion: "Para que en nuestra tristeza no perdamos la paz y la confianza en Dios.",
      obra: "Hacer una visita al cementerio o a la iglesia para orar en silencio por {nombre}."
    },
    {
      t: "No estamos solos: comunión de los santos",
      cita: "Juan 19,25-27",
      resumen: "Al pie de la cruz estaba María, la madre de Jesús. Jesús le dice: «Mujer, ahí tienes a tu hijo», y al discípulo: «Ahí tienes a tu madre». Desde entonces, María es madre de todos los que creen.",
      reflexion: "La Iglesia es una gran familia que une a los que vivimos con los que ya partieron: es la comunión de los santos. Rezamos por {nombre} y también confiamos en que {el} reza por nosotros. María, la madre que estuvo junto a la cruz, nos acompaña especialmente en el duelo. Hoy pedimos su compañía.",
      oracion: "Santísima Virgen María, tú estuviste de pie junto a la cruz y sabes lo que es perder a quien se ama. Acompaña a nuestra familia en su dolor. Lleva a {nombre} a los brazos de tu Hijo. Y cuando llegue nuestra hora, ruega por nosotros. Amén.",
      peticion: "Para que la Virgen María consuele a los que sufren por la muerte de un ser querido.",
      obra: "Rezar un Rosario o una decena por {nombre} y por todas las almas del purgatorio."
    },
    {
      t: "Lo que hicimos por los más pequeños",
      cita: "Mateo 25,31-40",
      resumen: "Jesús dice que al final de la vida seremos juzgados por el amor: tuve hambre y me dieron de comer, tuve sed y me dieron de beber, fui forastero y me recibieron, estuve enfermo y me visitaron.",
      reflexion: "Al final de la vida, lo que queda es el amor que dimos. Por eso, una de las mejores formas de honrar a {nombre} es hacer el bien en su nombre: compartir comida, visitar a un enfermo, ayudar a una persona necesitada. La caridad es una oración con las manos. Esta noche pensamos en un gesto concreto que haremos en memoria de {nombre}.",
      oracion: "Señor, tú te escondes en los hambrientos, en los enfermos, en los solos. Te damos gracias por todo el bien que hizo {nombre}, y te pedimos que le muestres tu rostro con alegría. Danos un corazón generoso para vivir las obras de misericordia, hoy y todos los días. Amén.",
      peticion: "Para que hagamos el bien en memoria de nuestros difuntos y no se apague su ejemplo.",
      obra: "Hacer una obra de caridad en nombre de {nombre}: una limosna, una comida compartida, una visita a un enfermo."
    },
    {
      t: "Dios enjugará toda lágrima",
      cita: "Apocalipsis 21,1-7",
      resumen: "Dios habitará con su pueblo: «Enjugará toda lágrima de sus ojos; ya no habrá muerte ni luto ni llanto». Dice: «Yo hago nuevas todas las cosas».",
      reflexion: "Hemos acompañado a {nombre} durante nueve noches. Hoy damos gracias y miramos hacia adelante. Dios promete un futuro sin lágrimas, y esa promesa no es un consuelo barato: es la certeza de que el amor es más fuerte que la muerte. Con esta esperanza entregamos a {nombre} a Dios y seguimos nuestro camino, con el corazón más tranquilo y más unidos.",
      oracion: "Señor Dios, tú prometes secar toda lágrima y hacer nuevas todas las cosas. Te entregamos a {nombre} con gratitud y confianza. Recíbe{lo} en tu paz, y a nosotros danos la fuerza de seguir adelante, sirviéndote con amor. Que un día todos nos encontremos en tu casa, para siempre. Amén.",
      peticion: "Para que este novenario deje en nuestra familia más unión, más fe y más esperanza.",
      obra: "Anotar un propósito concreto para vivir mejor en memoria de {nombre}."
    }
  ],
  cierre: {
    titulo: "Cierre del novenario (noche 9)",
    partes: [
      { r: "nota", t: "Después de la oración final de la noche 9, puedes añadir este momento de agradecimiento." },
      { r: "guia", t: "Hermanos: durante nueve días hemos acompañado a {nombre} con nuestra oración, y nos hemos acompañado entre nosotros. Damos gracias a Dios por su vida, por su amor y por la fe que nos reunió." },
      { r: "guia", t: "Agradecemos a quienes vinieron, a quienes nos acompañaron con palabras y con silencio, y a quienes nos ayudaron con el cuidado y la comida." },
      { r: "nota", t: "Si en la familia se acostumbra levantar la cruz, este es el momento. No hay un rito oficial: se recoge la cruz con respeto y oración, y se coloca en un lugar digno (en el hogar o en el cementerio)." },
      { r: "guia", t: "Señor, hemos terminado estos nueve días de oración. Te encomendamos a {nombre}. Que descanse en paz, y que su recuerdo sea una bendición para todos nosotros." },
      { r: "todos", t: "Amén." },
      { r: "nota", t: "Aclara con cariño, si hace falta: el alma de {nombre} no «anda penando» ni hay ritos que obliguen a Dios. Descansa por la misericordia de Dios, a la que acompañamos con nuestras oraciones y obras." }
    ]
  },
  despues: [
    ["La Misa por el difunto", "Pide al párroco la Misa por {nombre}. Si es posible, que la familia participe y comulgue. Puedes volver a pedirla al mes, y en el aniversario de su muerte (el «cabo de año»)."],
    ["El 2 de noviembre", "El Día de los Fieles Difuntos es un momento especial para rezar por todos los muertos. Es costumbre visitar el cementerio, arreglar la tumba y asistir a Misa."],
    ["La caridad en su nombre", "Una limosna, una ayuda a un enfermo o a una familia necesitada. Que su recuerdo siga haciendo el bien."],
    ["El recuerdo cada día", "Una breve oración por {nombre} al levantarse o al acostarse: «Dale, Señor, el descanso eterno, y brille sobre {el} la luz perpetua»."]
  ],
  acompanar: {
    si: [
      "Estar presente, aunque no sepas qué decir. Un abrazo y tu compañía valen más que un discurso.",
      "Escuchar sin interrumpir. Dejar que cuenten lo que sienten y lo que recuerdan.",
      "Nombrar al difunto. Muchas familias necesitan hablar de él sin tabúes.",
      "Ofrecer ayuda concreta: llevar comida, acompañar a un trámite, cuidar a los niños.",
      "Seguir llamando o visitando después de los nueve días."
    ],
    no: [
      "«Ya no llores» o «tienes que ser fuerte».",
      "«Dios se lo llevó porque lo necesitaba»: puede herir. Mejor: «Dios te acompaña en esto».",
      "Comparar penas o apurar el duelo.",
      "Juzgar cómo murió o cómo vivió."
    ],
    ayuda: "Si el dolor se vuelve muy pesado, dura mucho tiempo o aparecen ideas de hacerse daño, es importante pedir ayuda: hablar con el párroco, con un familiar de confianza o con un profesional de la salud."
  }
};
