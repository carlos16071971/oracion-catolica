// Santo Rosario guiado y Vía Crucis. Reflexiones de redacción propia sobre las oraciones tradicionales. Revisar con el párroco.
import { PADRENUESTRO, AVEMARIA, GLORIA, CREDO } from "./ausencia.js";
import { VELADA } from "./guias.js";

export const JACULATORIA = "Oh Jesús mío, perdona nuestros pecados, líbranos del fuego del infierno, lleva al cielo a todas las almas, especialmente a las más necesitadas de tu misericordia.";
export const SALVE = VELADA.recursos.salve.join("\n\n");
export { PADRENUESTRO, AVEMARIA, GLORIA, CREDO };

// Día de la semana (0 = domingo) → misterios. Tradición: domingo de Adviento y Navidad, gozosos; domingo de Cuaresma, dolorosos.
export const DIA_MISTERIOS = ["gloriosos", "gozosos", "dolorosos", "gloriosos", "luminosos", "dolorosos", "gozosos"];
export const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

export const MISTERIOS = {
  gozosos: { nombre: "Misterios gozosos", dias: "lunes y sábado", lista: [
    ["La Anunciación del Ángel a María", "Lc 1,26-38", "La humildad", "María dice sí a Dios con total confianza. Pidamos un corazón dispuesto a hacer su voluntad."],
    ["La Visitación de María a su prima Isabel", "Lc 1,39-56", "El amor al prójimo", "María sale deprisa a servir. Pidamos ojos atentos a quien nos necesita."],
    ["El Nacimiento de Jesús en Belén", "Lc 2,1-20", "El desprendimiento y la pobreza de espíritu", "Dios se hace niño en un pesebre. Pidamos sencillez y alegría para recibirlo."],
    ["La Presentación del Niño Jesús en el templo", "Lc 2,22-38", "La obediencia y la pureza", "María y José ofrecen al Niño a Dios. Pidamos entregarle a Dios lo que más amamos."],
    ["El Niño Jesús perdido y hallado en el templo", "Lc 2,41-52", "La alegría de encontrar a Jesús", "Jesús crece en la casa del Padre. Pidamos no perderlo nunca de vista y buscarlo si nos alejamos."]
  ]},
  luminosos: { nombre: "Misterios luminosos", dias: "jueves", lista: [
    ["El Bautismo de Jesús en el Jordán", "Mt 3,13-17", "La gracia de ser hijos amados de Dios", "El Padre declara a Jesús su Hijo amado. Recordemos con gratitud nuestro propio bautismo."],
    ["Las Bodas de Caná", "Jn 2,1-12", "La confianza en María", "María intercede y Jesús obra. Pidamos que ella nos diga siempre: «Hagan lo que él les diga»."],
    ["El anuncio del Reino de Dios", "Mc 1,14-15", "La conversión", "Jesús invita a cambiar de vida y a creer. Pidamos valor para empezar de nuevo cada día."],
    ["La Transfiguración de Jesús", "Lc 9,28-36", "El deseo de santidad", "En el monte brilla la gloria de Jesús. Pidamos escuchar al Hijo amado y seguirlo."],
    ["La institución de la Eucaristía", "Lc 22,14-20", "La adoración y el amor a la Eucaristía", "Jesús se entrega como alimento. Pidamos amar la Misa y recibirlo con un corazón preparado."]
  ]},
  dolorosos: { nombre: "Misterios dolorosos", dias: "martes y viernes", lista: [
    ["La oración de Jesús en el huerto de Getsemaní", "Lc 22,39-46", "El dolor de nuestros pecados", "Jesús ora con angustia y confía en el Padre. Pidamos fortaleza en nuestras pruebas."],
    ["La flagelación de Jesús", "Jn 19,1", "La mortificación de los sentidos", "Jesús sufre por amor. Pidamos paciencia ante nuestro propio dolor y sensibilidad con el de los demás."],
    ["La coronación de espinas", "Mt 27,27-31", "El valor moral", "Jesús es humillado y calla. Pidamos no burlarnos de nadie y soportar con humildad las ofensas."],
    ["Jesús con la cruz a cuestas", "Jn 19,17", "La paciencia en las pruebas", "Jesús camina cargando la cruz. Pidamos llevar la nuestra y ayudar a cargar la de otros."],
    ["La crucifixión y muerte de Jesús", "Lc 23,33-46", "El perdón de las ofensas y la salvación de las almas", "Jesús perdona y se entrega. Pidamos la gracia de perdonar de corazón."]
  ]},
  gloriosos: { nombre: "Misterios gloriosos", dias: "miércoles y domingo", lista: [
    ["La Resurrección de Jesús", "Lc 24,1-12", "La fe", "Cristo vive y nos da esperanza. Pidamos una fe firme que no se rinda ante las dificultades."],
    ["La Ascensión de Jesús al cielo", "Hch 1,9-11", "La esperanza", "Jesús sube al Padre y nos prepara un lugar. Pidamos mirar al cielo sin olvidar la tierra."],
    ["La venida del Espíritu Santo", "Hch 2,1-4", "Los dones del Espíritu Santo", "El Espíritu llena a la Iglesia. Pidamos su luz y su fuego para vivir y dar testimonio."],
    ["La Asunción de María al cielo", "Lc 1,48-49", "La gracia de una buena muerte", "María, en cuerpo y alma, está con Dios. Pidamos vivir de manera que lleguemos a verla."],
    ["La coronación de María como Reina del cielo y de la tierra", "Ap 12,1", "La devoción a María", "María es Reina y Madre. Pidamos su intercesión por la Iglesia, la patria y nuestras familias."]
  ]}
};

export const LETANIA = {
  inicio: [
    ["Señor, ten piedad.", "Señor, ten piedad."],
    ["Cristo, ten piedad.", "Cristo, ten piedad."],
    ["Señor, ten piedad.", "Señor, ten piedad."],
    ["Cristo, óyenos.", "Cristo, óyenos."],
    ["Cristo, escúchanos.", "Cristo, escúchanos."]
  ],
  trinidad: ["Dios Padre celestial", "Dios Hijo, Redentor del mundo", "Dios Espíritu Santo", "Santísima Trinidad, un solo Dios"],
  maria: [
    "Santa María", "Santa Madre de Dios", "Santa Virgen de las vírgenes", "Madre de Cristo", "Madre de la Iglesia", "Madre de la divina gracia",
    "Madre purísima", "Madre castísima", "Madre siempre virgen", "Madre inmaculada", "Madre amable", "Madre admirable", "Madre del buen consejo",
    "Madre del Creador", "Madre del Salvador", "Virgen prudentísima", "Virgen digna de veneración", "Virgen digna de alabanza", "Virgen poderosa",
    "Virgen clemente", "Virgen fiel", "Espejo de justicia", "Trono de la sabiduría", "Causa de nuestra alegría", "Vaso espiritual", "Vaso digno de honor",
    "Vaso insigne de devoción", "Rosa mística", "Torre de David", "Torre de marfil", "Casa de oro", "Arca de la alianza", "Puerta del cielo",
    "Estrella de la mañana", "Salud de los enfermos", "Refugio de los pecadores", "Consuelo de los afligidos", "Auxilio de los cristianos",
    "Reina de los ángeles", "Reina de los patriarcas", "Reina de los profetas", "Reina de los apóstoles", "Reina de los mártires",
    "Reina de los confesores", "Reina de las vírgenes", "Reina de todos los santos", "Reina concebida sin pecado original", "Reina asunta al cielo",
    "Reina del Santísimo Rosario", "Reina de la familia", "Reina de la paz"
  ],
  cordero: ["Cordero de Dios, que quitas el pecado del mundo: perdónanos, Señor.", "Cordero de Dios, que quitas el pecado del mundo: escúchanos, Señor.", "Cordero de Dios, que quitas el pecado del mundo: ten piedad de nosotros."],
  versiculo: ["Ruega por nosotros, Santa Madre de Dios.", "Para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo."],
  oracion: "Oremos. Señor Dios nuestro, concédenos a tus siervos gozar de salud de alma y cuerpo y, por la intercesión de la Virgen María, líbranos de las tristezas de este mundo y danos la alegría eterna. Por Jesucristo, nuestro Señor. Amén."
};

export const OFRECER = [
  "Por la Iglesia, el Papa, el obispo y los sacerdotes.",
  "Por nuestras familias y por los jóvenes.",
  "Por los enfermos y por quienes los cuidan.",
  "Por la paz y por nuestra patria.",
  "Por nuestros difuntos.",
  "Por las intenciones que cada uno lleva en el corazón."
];

export const VIACRUCIS = {
  inicio: [
    { r: "guia", t: "En el nombre del Padre, y del Hijo, y del Espíritu Santo." },
    { r: "todos", t: "Amén." },
    { r: "guia", t: "Hermanos, acompañemos a Jesús en su camino hacia la cruz. No lo hagamos solo con la mente: pongamos en cada estación nuestras propias cruces y las de quienes sufren." },
    { r: "todos", t: "Dios mío, me arrepiento de todo corazón de haberte ofendido, porque eres bueno y te amo sobre todas las cosas. Propongo, con tu gracia, no volver a pecar. Amén." }
  ],
  responsorio: [
    { r: "guia", t: "Te adoramos, Cristo, y te bendecimos." },
    { r: "todos", t: "Que por tu santa cruz redimiste al mundo." }
  ],
  estaciones: [
    ["Jesús es condenado a muerte", "Jesús es juzgado injustamente y no se defiende. Hoy también muchos son condenados sin motivo. Señor, danos valor para defender la verdad y a los inocentes."],
    ["Jesús carga con la cruz", "Jesús abraza la cruz que le imponen. Señor, ayúdanos a aceptar con fe las cruces de cada día y a no culpar a nadie."],
    ["Jesús cae por primera vez", "Jesús cae por el peso. Señor, cuando caigamos, levántanos con tu mano y no nos dejes desanimar."],
    ["Jesús encuentra a su Madre", "María mira a su Hijo y sufre en silencio. Madre, acompaña a todas las madres que sufren por sus hijos."],
    ["Simón de Cirene ayuda a Jesús", "Un desconocido ayuda a cargar la cruz. Señor, enséñanos a ayudar al que está cansado sin que nos lo pidan."],
    ["La Verónica enjuga el rostro de Jesús", "Una mujer se atreve a consolar a Jesús. Señor, que sepamos ver tu rostro en los pobres y enfermos."],
    ["Jesús cae por segunda vez", "Jesús vuelve a caer y vuelve a levantarse. Señor, enséñanos a perseverar y a perdonar siempre."],
    ["Jesús consuela a las mujeres de Jerusalén", "Jesús ve el dolor de otros aun en su propio sufrimiento. Señor, que no pensemos solo en nosotros mismos."],
    ["Jesús cae por tercera vez", "Jesús cae agotado y sigue. Señor, danos fuerza cuando creamos no poder más."],
    ["Jesús es despojado de sus vestiduras", "Jesús es humillado y despojado de todo. Señor, líbranos del orgullo y de la vanidad, y danos un corazón sencillo."],
    ["Jesús es clavado en la cruz", "Jesús es clavado y perdona. Señor, que no guardemos rencor y sepamos decir «Padre, perdónalos»."],
    ["Jesús muere en la cruz", "Jesús entrega su vida por amor. Señor, gracias por salvarnos. Acuérdate de nosotros en tu Reino."],
    ["Jesús es bajado de la cruz y entregado a su Madre", "María recibe en sus brazos a su Hijo. Madre, consuela a quienes lloran a sus seres queridos."],
    ["Jesús es sepultado", "Jesús es puesto en el sepulcro. Señor, nuestra esperanza está en la resurrección. Que cada tumba sea una espera de vida."]
  ],
  final: [
    { r: "guia", t: "Señor Jesús, gracias por tu pasión y tu amor sin medida. Que al caminar contigo aprendamos a amar, a perdonar y a servir. Por tu cruz y resurrección, ten piedad de nosotros y del mundo entero." },
    { r: "todos", t: "Amén." },
    { r: "guia", t: "Bendigamos al Señor." },
    { r: "todos", t: "Demos gracias a Dios." }
  ]
};
