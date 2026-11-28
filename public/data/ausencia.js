// Guía para laicos en ausencia del sacerdote: celebración de la Palabra dominical, emergencias pastorales,
// oración en el velorio y la sepultura, y visita a enfermos.
// Textos de redacción propia sobre oraciones tradicionales de uso común. Deben ser revisados y aprobados por el párroco o la diócesis.
// Convenciones: {nombre} {el} {o} {lo} (persona), {domingo} {lec1} {salmo} {lec2} {evangelio} {reflexion} (celebración de la Palabra).
// Roles de cada línea: guia, todos, lector, canto, nota.

export const PADRENUESTRO = "Padre nuestro, que estás en el cielo, santificado sea tu nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén.";
export const AVEMARIA = "Dios te salve, María, llena eres de gracia, el Señor es contigo; bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.";
export const GLORIA = "Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.";
export const CREDO = "Creo en Dios, Padre todopoderoso, creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos. Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.";
const BENDICION = "El Señor nos bendiga, nos guarde de todo mal y nos lleve a la vida eterna. Amén.";
const DESCANSO = "Dale, Señor, el descanso eterno. Y brille para {el} la luz perpetua. Que descanse en paz. Amén.";

export const AUSENCIA = {
  intro:
    "Herramientas para catequistas, ministros y personas invitadas a dirigir la oración de la comunidad cuando el párroco o el sacerdote no puede estar. Aquí encuentras lo que sí puedes hacer, cómo hacerlo bien y cuándo llamar al sacerdote. Todo está pensado para servir, nunca para sustituir a quien preside la Misa y los sacramentos.",

  // ---------------------------------------------------------------
  limites: {
    titulo: "Tu servicio como laico",
    puede: [
      "Dirigir la oración de la comunidad: Rosario, Vía Crucis, novenas, veladas y oración de la mañana o de la noche.",
      "Presidir la Celebración de la Palabra de los domingos cuando no hay sacerdote, con el encargo del párroco o del obispo.",
      "Presidir la oración en el velorio y, si el párroco lo encarga, la despedida en el cementerio.",
      "Visitar a los enfermos, escucharlos y orar con ellos; llevar la comunión solo si eres ministro extraordinario autorizado.",
      "Bautizar en peligro de muerte cuando no hay sacerdote ni diácono cerca. Cualquier persona puede hacerlo.",
      "Terminar con la bendición para laicos: pedir a Dios que nos bendiga, sin gestos ni fórmulas del sacerdote."
    ],
    nopuede: [
      "Celebrar la Misa ni consagrar el pan y el vino.",
      "Confesar ni dar la absolución. Puedes ayudar a hacer un acto de contrición y acompañar a la persona hasta el sacerdote.",
      "Dar la Unción de los enfermos: solo la administra el sacerdote.",
      "Dar bendiciones reservadas al sacerdote o al diácono, ni hacer la señal de la cruz sobre las personas.",
      "Predicar la homilía propiamente. Puedes leer la que el párroco te deje o dirigir una reflexión sencilla.",
      "Exponer el Santísimo o asistir a un matrimonio sin la autorización expresa del obispo.",
      "Usar alba, estola u otras vestiduras del sacerdote."
    ],
    llamar: [
      "Una persona en peligro de muerte o muy grave: confesión, Unción de los enfermos y Viático.",
      "Alguien que pide confesarse o que quiere volver a la Iglesia.",
      "Un bautismo, matrimonio o funeral con Misa que haya que coordinar.",
      "Cualquier duda de doctrina o de lo que corresponde hacer. Preguntar siempre es lo correcto."
    ],
    antes: [
      "Pide el encargo al párroco, de preferencia por escrito o por mensaje, y acuerda qué parte puedes dirigir.",
      "Avísale después cómo salió todo y qué personas necesitan una visita del sacerdote.",
      "Sirve con humildad: no te adelantes a lo que le corresponde al ministro ordenado ni busques protagonismo.",
      "Prepara con tiempo, viste sobria y ora antes de dirigir."
    ]
  },

  // ---------------------------------------------------------------
  palabra: {
    intro:
      "Cuando una comunidad no puede tener Misa un domingo, se reúne para escuchar la Palabra de Dios, rezar y dar gracias. Esta celebración no es la Misa y no la reemplaza, pero mantiene viva la fe del pueblo. Debe hacerse con el encargo del párroco o del obispo y, si la comunidad puede ir a Misa en otra parroquia, es mejor animarla a hacerlo.",
    preparacion: [
      {
        titulo: "Antes del domingo",
        items: [
          "Tengo el encargo del párroco para dirigir la celebración.",
          "Sé qué domingo es y qué lecturas corresponden (están en la pestaña «Lecturas»).",
          "Elegí y ensayé con los lectores: primera lectura, salmo, segunda lectura.",
          "Pregunté al párroco si deja una homilía escrita y si hay autorización para la Comunión.",
          "Preparé los cantos y quién los guía.",
          "Preparé las peticiones de la oración de los fieles."
        ]
      },
      {
        titulo: "En el lugar",
        items: [
          "Biblia o leccionario en un lugar digno, con las lecturas marcadas.",
          "Cruz o imagen, una vela y flores sencillas.",
          "Textos impresos o en el teléfono (letra grande) para quien los necesite.",
          "Un lugar visible desde donde dirigir, distinto del presbiterio si lo hay."
        ]
      }
    ],
    pasos: [
      { n: "Canto de entrada y saludo", min: 4, partes: [
        { r: "nota", t: "Todos de pie. Mientras la comunidad canta, quien dirige se coloca en su lugar, no en la sede del sacerdote." },
        { r: "canto", t: "Canto de entrada." },
        { r: "guia", t: "En el nombre del Padre, y del Hijo, y del Espíritu Santo." },
        { r: "todos", t: "Amén." },
        { r: "guia", t: "Hermanos, bendigamos al Señor que nos ha reunido en su nombre." },
        { r: "todos", t: "Bendito seas, Señor, por siempre." },
        { r: "nota", t: "El laico no dice «El Señor esté con ustedes»: ese saludo es del sacerdote o del diácono." }
      ]},
      { n: "Monición de entrada", min: 2, partes: [
        { r: "guia", t: "Hermanos y hermanas: hoy celebramos {domingo}. En esta ocasión no podemos tener la Santa Misa porque el sacerdote no puede estar entre nosotros, pero el Señor sí está: nos reunimos en su nombre y él nos habla en su Palabra." },
        { r: "guia", t: "Pedimos por nuestro párroco y por todos los sacerdotes, y para que el Señor envíe a su Iglesia pastores según su corazón. Y queremos recibir esta Palabra con corazón abierto." }
      ]},
      { n: "Petición de perdón", min: 2, partes: [
        { r: "guia", t: "Para celebrar dignamente, reconozcamos que necesitamos la misericordia de Dios." },
        { r: "nota", t: "Silencio breve. Esta petición no es absolución sacramental; la absolución solo la da el sacerdote." },
        { r: "guia", t: "Tú, que viniste a sanar los corazones heridos: Señor, ten piedad." },
        { r: "todos", t: "Señor, ten piedad." },
        { r: "guia", t: "Tú, que nos llamas a seguirte y a perdonarnos: Cristo, ten piedad." },
        { r: "todos", t: "Cristo, ten piedad." },
        { r: "guia", t: "Tú, que intercedes por nosotros ante el Padre: Señor, ten piedad." },
        { r: "todos", t: "Señor, ten piedad." },
        { r: "guia", t: "Pidamos a Dios que perdone nuestros pecados y nos conduzca a la vida eterna." },
        { r: "todos", t: "Amén." }
      ]},
      { n: "Oración inicial", min: 1, partes: [
        { r: "guia", t: "Oremos." },
        { r: "nota", t: "Silencio de unos segundos." },
        { r: "guia", t: "Dios de bondad, que nos reúnes en tu nombre, abre nuestros corazones a tu Palabra y haz que, al escucharla, vivamos como hijos tuyos y hermanos entre nosotros. Por Jesucristo, nuestro Señor." },
        { r: "todos", t: "Amén." }
      ]},
      { n: "Primera lectura", min: 4, partes: [
        { r: "nota", t: "Todos sentados. El lector va al ambón o al lugar de la Palabra con el libro o la hoja." },
        { r: "lector", t: "{lec1}" },
        { r: "lector", t: "Palabra de Dios." },
        { r: "todos", t: "Te alabamos, Señor." },
        { r: "nota", t: "Silencio breve, de unos segundos, para que la Palabra llegue al corazón." }
      ]},
      { n: "Salmo responsorial", min: 3, partes: [
        { r: "lector", t: "{salmo}" },
        { r: "nota", t: "Si se canta, mejor. Si se reza, el lector dice cada estrofa y todos repiten el estribillo." }
      ]},
      { n: "Segunda lectura", min: 4, partes: [
        { r: "nota", t: "Si ese domingo no hay segunda lectura, pasa al paso siguiente." },
        { r: "lector", t: "{lec2}" },
        { r: "lector", t: "Palabra de Dios." },
        { r: "todos", t: "Te alabamos, Señor." }
      ]},
      { n: "Aleluya y Evangelio", min: 5, partes: [
        { r: "nota", t: "Todos de pie. En Cuaresma no se canta «Aleluya»: se canta otra aclamación a Cristo." },
        { r: "canto", t: "Aleluya o aclamación al Evangelio." },
        { r: "guia", t: "Lectura del santo Evangelio según san ___." },
        { r: "todos", t: "Gloria a ti, Señor." },
        { r: "guia", t: "{evangelio}" },
        { r: "guia", t: "Palabra del Señor." },
        { r: "todos", t: "Gloria a ti, Señor Jesús." },
        { r: "nota", t: "Si hay un diácono, él proclama el Evangelio. Quien no es ordenado no dice «El Señor esté con ustedes» antes del Evangelio. Todos pueden marcarse la frente, los labios y el corazón con la cruz." }
      ]},
      { n: "Reflexión", min: 7, partes: [
        { r: "nota", t: "Todos sentados. Si el párroco dejó una homilía escrita o una reflexión, léela tal cual. Quien no es ordenado no predica la homilía propia de la Misa, pero sí puede guiar una reflexión sencilla." },
        { r: "guia", t: "{reflexion}" },
        { r: "nota", t: "Después de la reflexión, silencio de un minuto." }
      ]},
      { n: "Profesión de fe", min: 2, partes: [
        { r: "guia", t: "Pongámonos de pie y renovemos nuestra fe." },
        { r: "todos", t: CREDO }
      ]},
      { n: "Oración de los fieles", min: 5, partes: [
        { r: "guia", t: "Hermanos, con confianza de hijos, presentemos nuestras necesidades al Padre. A cada petición responderemos: «Te rogamos, Señor»." },
        { r: "lector", t: "Por la Iglesia, por el Papa, por nuestro obispo, por los sacerdotes y los diáconos, para que sean fieles servidores del Evangelio. Roguemos al Señor." },
        { r: "todos", t: "Te rogamos, Señor." },
        { r: "lector", t: "Por nuestro párroco y por las vocaciones sacerdotales y religiosas, para que no falten pastores a nuestras comunidades. Roguemos al Señor." },
        { r: "todos", t: "Te rogamos, Señor." },
        { r: "lector", t: "Por los gobernantes y por quienes sirven al bien común, para que trabajen por la justicia y la paz. Roguemos al Señor." },
        { r: "todos", t: "Te rogamos, Señor." },
        { r: "lector", t: "Por los enfermos, los ancianos, los que sufren y los que están solos. Roguemos al Señor." },
        { r: "todos", t: "Te rogamos, Señor." },
        { r: "lector", t: "Por nuestros familiares y amigos difuntos, para que gocen de la vida eterna. Roguemos al Señor." },
        { r: "todos", t: "Te rogamos, Señor." },
        { r: "lector", t: "Por nuestra comunidad, por nuestras familias y por cada necesidad que llevamos en el corazón. (Silencio y peticiones espontáneas.) Roguemos al Señor." },
        { r: "todos", t: "Te rogamos, Señor." },
        { r: "guia", t: "Padre bueno, escucha las oraciones de tus hijos y concédenos lo que necesitamos para nuestra salvación. Por Jesucristo, nuestro Señor." },
        { r: "todos", t: "Amén." }
      ]},
      { n: "Acción de gracias y Padrenuestro", min: 3, partes: [
        { r: "guia", t: "Bendigamos a Dios, que nos ha hablado hoy. Con las palabras que Jesús nos enseñó, oremos juntos:" },
        { r: "todos", t: PADRENUESTRO },
        { r: "todos", t: "Tuyo es el reino, tuyo el poder y la gloria, por siempre, Señor." },
        { r: "guia", t: "Como hijos de Dios, démonos fraternalmente la paz." },
        { r: "nota", t: "Todos se saludan con un gesto sencillo, según la costumbre local." }
      ]},
      { n: "Comunión", min: 8, comunion: true, partes: [] },
      { n: "Despedida", min: 3, partes: [
        { r: "guia", t: "Hermanos, que la Palabra que hemos escuchado dé fruto en nuestra semana, en nuestras familias y en el servicio a los demás." },
        { r: "guia", t: BENDICION },
        { r: "nota", t: "Quien dirige y no es ordenado se signa a sí mismo; no hace la señal de la cruz sobre los demás ni usa las fórmulas del sacerdote." },
        { r: "guia", t: "Vayamos en paz, a amar y servir al Señor." },
        { r: "todos", t: "Demos gracias a Dios." },
        { r: "canto", t: "Canto final a la Virgen." }
      ]}
    ],
    // Comunión: solo con autorización del obispo y un ministro designado
    comunionSi: {
      aviso: "Solo si el obispo o el párroco lo han autorizado y hay un ministro extraordinario designado, que trae las sagradas formas consagradas en la Misa. Si no es el caso, usa la comunión espiritual.",
      partes: [
        { r: "nota", t: "El ministro prepara las sagradas formas sobre el altar o una mesa digna, con una vela encendida. Quien no sea ministro autorizado no las toca." },
        { r: "guia", t: "Este es el Cordero de Dios, que quita el pecado del mundo. Dichosos los invitados a la cena del Señor." },
        { r: "todos", t: "Señor, no soy digno de que entres en mi casa, pero una palabra tuya bastará para sanarme." },
        { r: "guia", t: "El Cuerpo de Cristo." },
        { r: "todos", t: "Amén." },
        { r: "nota", t: "Cada persona responde «Amén» al recibirlo. Después, silencio y canto de acción de gracias; el ministro reserva con respeto las formas sobrantes." },
        { r: "guia", t: "Oremos. Señor, que este alimento nos fortalezca en la fe y en el amor, y haga de nosotros testigos de tu Evangelio. Por Jesucristo, nuestro Señor." },
        { r: "todos", t: "Amén." }
      ]
    },
    comunionNo: {
      aviso: "Cuando no hay Comunión, termina este momento con una comunión espiritual: un acto de fe y deseo de unirse a Jesús.",
      partes: [
        { r: "guia", t: "Hermanos, hoy no podemos recibir a Jesús en la Eucaristía, pero podemos unirnos a él con el corazón. Hagamos juntos una comunión espiritual." },
        { r: "todos", t: "Creo, Jesús mío, que estás real y verdaderamente en el Santísimo Sacramento del altar. Te amo sobre todas las cosas y deseo recibirte en mi alma. Ya que ahora no puedo recibirte sacramentalmente, ven al menos espiritualmente a mi corazón. Como si ya hubieras venido, te abrazo y me uno todo a ti. No permitas que jamás me separe de ti. Amén." },
        { r: "nota", t: "Silencio de un minuto." }
      ]
    },
    reflexion: {
      titulo: "Guía para la reflexión (si no hay homilía escrita)",
      nota: "No es una homilía: son preguntas para compartir la Palabra con sencillez.",
      preguntas: [
        "¿Qué dice la lectura? Cuenta con tus palabras qué pasó o qué enseña.",
        "¿Qué palabra o imagen me tocó? ¿Por qué?",
        "¿Qué me pide Dios hoy con este texto, en mi casa y en mi trabajo?",
        "¿Qué voy a hacer esta semana para vivirlo?"
      ],
      modelo: "Hermanos, la Palabra de hoy nos habla de ___. Lo primero que Dios nos dice es ___. Eso nos invita a ___ en nuestra familia y en nuestra comunidad. Esta semana, pidamos la gracia de ___ y de ayudarnos unos a otros a cumplirlo."
    }
  },

  // ---------------------------------------------------------------
  emergencias: {
    intro:
      "En una emergencia, tranquilidad y rapidez. Lo primero es llamar al sacerdote. Mientras llega, esto es lo que puedes y debes hacer.",
    orden: [
      "Llama de inmediato al sacerdote: para confesión, Unción y Viático si hay peligro de muerte.",
      "Acompaña a la persona con calma. Si tiene conciencia, anímala a la fe y al arrepentimiento.",
      "Si no hay tiempo de esperar y hay peligro de muerte, bautiza (solo si no está bautizado).",
      "Avisa después a la parroquia de todo lo que se hizo."
    ],
    bautismo: {
      titulo: "Bautismo en peligro de muerte",
      quien: [
        "Cualquier persona puede bautizar cuando hay peligro de muerte y no hay sacerdote o diácono a tiempo: un familiar, una enfermera, un vecino o un catequista.",
        "Para que sea válido, quien bautiza debe tener la intención de hacer lo que hace la Iglesia. Se puede bautizar a una persona que pide el bautismo o a un niño de familia católica.",
        "Un bautismo de emergencia solo se hace una vez. Si la persona ya está bautizada, no se repite."
      ],
      pasos: [
        "Consigue agua natural: del grifo, de lluvia o de una botella. No importa si no es bendita.",
        "Si la persona está consciente, pregúntale si cree en Jesús y desea ser bautizada. Si es un niño, bastan los padres o familiares que lo piden.",
        "Derrama el agua sobre la cabeza o la frente, de modo que escurra, y mientras lo haces di con claridad: «N., yo te bautizo en el nombre del Padre, y del Hijo, y del Espíritu Santo». Usa su nombre; si no lo sabes, di «Yo te bautizo…».",
        "Es suficiente derramar el agua una sola vez mientras se dicen las palabras. Lo importante es que el agua toque y que digas la fórmula completa.",
        "Si hay duda de que esté vivo o de que no estuviera bautizado, di: «Si estás vivo y no estás bautizado, yo te bautizo en el nombre del Padre, y del Hijo, y del Espíritu Santo».",
        "Reza con quienes están presentes un Padrenuestro y un Avemaría y da gracias a Dios.",
        "Anota: nombre, fecha, lugar, quién bautizó y los testigos. Lleva el dato a la parroquia lo antes posible para que lo registren."
      ],
      despues: "Si la persona sobrevive, la parroquia completará los ritos y la catequesis. No se vuelve a bautizar."
    },
    moribundo: {
      titulo: "Acompañar a una persona que está muriendo",
      consejos: [
        "Mantén la calma. Habla con voz baja y serena; el oído es lo último que se pierde.",
        "Pon un crucifijo, una imagen de la Virgen o agua bendita a la vista.",
        "Llama al sacerdote. Si no llega a tiempo, no te angusties: Dios conoce el corazón.",
        "Invita a la familia a perdonarse, agradecer y despedirse.",
        "Reza en voz baja y con ternura, sin prisas."
      ],
      oraciones: [
        { r: "guia", t: "Señor Jesús, aquí está {nombre}, tu {hijo}. Te lo entregamos con confianza. Tú que conoces su vida y su corazón, recíbe{lo} en tu misericordia." },
        { r: "todos", t: "Jesús, María y José, les entrego el corazón y la vida." },
        { r: "guia", t: "{nombre}, no tengas miedo. Jesús está contigo. Nuestra Madre María te sostiene. Puedes confiar." },
        { r: "todos", t: PADRENUESTRO },
        { r: "todos", t: AVEMARIA },
        { r: "guia", t: "Sal en paz, {nombre}, de este mundo, en el nombre de Dios Padre, que te creó; de Jesucristo, que murió por ti; y del Espíritu Santo, que se derramó sobre ti. Que hoy tu morada sea la paz, junto a Dios." },
        { r: "todos", t: "Ruega por {el}, Santa María. Ángeles y santos, salgan a su encuentro." }
      ],
      alMorir: [
        { r: "guia", t: DESCANSO },
        { r: "todos", t: "Descanse en paz. Amén." },
        { r: "nota", t: "Cierra con suavidad los ojos, acompaña a la familia y avisa a la parroquia para coordinar el velorio y la Misa de exequias." }
      ]
    },
    confesion: {
      titulo: "Cuando alguien pide confesarse y no hay sacerdote",
      puntos: [
        "No puedes absolver. Pide con calma al sacerdote que vaya o que atienda a la persona.",
        "Mientras tanto, ayúdale a hacer un acto de contrición sincero, con el deseo de confesarse en cuanto sea posible.",
        "Escucha con respeto, pero no le exijas que cuente sus pecados: eso es solo para el sacerdote. Y guarda total discreción."
      ],
      acto: "Dios mío, me arrepiento de todo corazón de haberte ofendido, porque eres bueno y te amo sobre todas las cosas. Propongo, con tu gracia, no volver a pecar y confesarme en cuanto pueda. Perdóname, Señor. Amén."
    }
  },

  // ---------------------------------------------------------------
  velorio: {
    intro:
      "Acompañar a una familia que ha perdido a un ser querido es una obra de misericordia. Esta oración puede presidirla un laico preparado, con el encargo del párroco. La Misa de exequias la preside el sacerdote; coordínala con la parroquia.",
    consejos: [
      "Saluda a la familia con cariño antes de empezar y pregunta cómo desea la oración.",
      "Duración sugerida: de 15 a 20 minutos. Que nadie salga cansado.",
      "Usa el nombre del difunto con respeto y recuerda cosas buenas de su vida.",
      "No uses el velorio para sermonear ni para juzgar al difunto.",
      "Si hay varias noches, combina esta oración con el Novenario por un difunto (en el menú)."
    ],
    oracion: [
      { n: "Acogida", min: 2, partes: [
        { r: "guia", t: "En el nombre del Padre, y del Hijo, y del Espíritu Santo." },
        { r: "todos", t: "Amén." },
        { r: "guia", t: "Bendito sea Dios, Padre misericordioso y Dios de todo consuelo, que nos consuela en todas nuestras penas." },
        { r: "todos", t: "Bendito seas por siempre, Señor." },
        { r: "guia", t: "Querida familia de {nombre}: estamos aquí para acompañarlos con nuestra presencia y con nuestra oración. Dios los abraza en este momento difícil." }
      ]},
      { n: "Oración inicial", min: 1, partes: [
        { r: "guia", t: "Oremos. Dios de bondad, tú eres la vida y la esperanza de los que creen en ti. Escucha nuestra oración por {nombre}: recíbe{lo} en tu casa, perdona sus faltas y dale la paz que no se acaba. Consuela a su familia en esta pena. Por Jesucristo, nuestro Señor." },
        { r: "todos", t: "Amén." }
      ]},
      { n: "Palabra de Dios", min: 4, partes: [
        { r: "nota", t: "Elige una lectura corta: Juan 14,1-6 («No se turbe su corazón»), Juan 11,21-27 («Yo soy la resurrección y la vida»), Mateo 11,28-30 («Vengan a mí los que están cansados») o Romanos 8,35-39. Lee de la Biblia de la comunidad." },
        { r: "lector", t: "{lectura}" },
        { r: "lector", t: "Palabra de Dios." },
        { r: "todos", t: "Te alabamos, Señor." }
      ]},
      { n: "Palabras de consuelo", min: 3, partes: [
        { r: "nota", t: "No es una homilía. Dilo con tus palabras y con ternura, en pocas frases." },
        { r: "guia", t: "Hermanos: hoy estamos tristes porque {nombre} ya no está entre nosotros. Y al mismo tiempo creemos que Jesús venció la muerte y que, quien cree en él, vive para siempre. La muerte no es el final: es el paso a la casa del Padre." },
        { r: "guia", t: "Agradezcamos a Dios el don de la vida de {nombre}, su amor, su trabajo, sus alegrías. Y confiemos a la misericordia de Dios todo lo que no pudo ser." }
      ]},
      { n: "Salmo de confianza", min: 2, partes: [
        { r: "guia", t: "El Señor es mi pastor, nada me falta; me hace descansar en verdes praderas y me conduce a aguas tranquilas." },
        { r: "todos", t: "El Señor es mi pastor, nada me falta." },
        { r: "guia", t: "Aunque camine por valles de oscuridad, no temo ningún mal, porque tú estás conmigo; tu vara y tu bastón me dan seguridad." },
        { r: "todos", t: "El Señor es mi pastor, nada me falta." },
        { r: "guia", t: "Habitaré en la casa del Señor por años sin fin." },
        { r: "todos", t: "El Señor es mi pastor, nada me falta." }
      ]},
      { n: "Oración de los fieles", min: 3, partes: [
        { r: "guia", t: "Con confianza, oremos a Dios, que escucha a sus hijos. A cada petición respondemos: «Señor, escúchanos»." },
        { r: "lector", t: "Por {nombre}: para que Dios le conceda la vida eterna y lo reciba en su casa. Roguemos al Señor." },
        { r: "todos", t: "Señor, escúchanos." },
        { r: "lector", t: "Por la familia y los amigos: para que encuentren fortaleza, consuelo y esperanza. Roguemos al Señor." },
        { r: "todos", t: "Señor, escúchanos." },
        { r: "lector", t: "Por todos nuestros difuntos, especialmente los que nadie recuerda. Roguemos al Señor." },
        { r: "todos", t: "Señor, escúchanos." },
        { r: "lector", t: "Por nosotros, para que vivamos cada día como quien espera el encuentro con Dios. Roguemos al Señor." },
        { r: "todos", t: "Señor, escúchanos." }
      ]},
      { n: "Padrenuestro y despedida", min: 3, partes: [
        { r: "guia", t: "Con las palabras de Jesús, oremos por {nombre} y por todos los que sufren:" },
        { r: "todos", t: PADRENUESTRO },
        { r: "guia", t: DESCANSO },
        { r: "todos", t: "Descanse en paz. Amén." },
        { r: "guia", t: "Que el Señor nos consuele en esta pena, nos dé su paz y nos reúna un día con {nombre} en la vida eterna. Amén." },
        { r: "nota", t: "Termina con un Avemaría y el canto que la familia pida. Después, abraza o saluda a la familia." }
      ]}
    ],
    sepultura: [
      { n: "Acogida en el cementerio", min: 2, partes: [
        { r: "nota", t: "Si el párroco o un diácono no pueden estar, la familia puede pedirte presidir esta despedida. Si está presente un sacerdote o diácono, él preside." },
        { r: "guia", t: "En el nombre del Padre, y del Hijo, y del Espíritu Santo." },
        { r: "todos", t: "Amén." },
        { r: "guia", t: "Hermanos, hemos llegado al lugar donde descansará {nombre}. Con fe, lo entregamos a Dios, que es Padre de vida." }
      ]},
      { n: "Palabra de esperanza", min: 2, partes: [
        { r: "guia", t: "Escuchemos lo que dijo Jesús: «Yo soy la resurrección y la vida; el que cree en mí, aunque muera, vivirá». (Jn 11,25)" },
        { r: "guia", t: "Hermanos, esta tumba no es el final. Dios cuida lo que ha sembrado y lo hará florecer para siempre." }
      ]},
      { n: "Oración de encomendación", min: 2, partes: [
        { r: "guia", t: "Oremos. Dios de misericordia, nosotros entregamos a {nombre} a tu amor. Recíbe{lo} en tu casa, perdona sus faltas y haz que resucite en el último día. Consuela a su familia con la esperanza de volver a verse. Por Jesucristo, nuestro Señor." },
        { r: "todos", t: "Amén." },
        { r: "nota", t: "Si hay agua bendita, puedes rociar el ataúd o la tumba en silencio." },
        { r: "guia", t: "Dale, Señor, el descanso eterno." },
        { r: "todos", t: "Y brille para {el} la luz perpetua." }
      ]},
      { n: "Padrenuestro, Avemaría y despedida", min: 3, partes: [
        { r: "todos", t: PADRENUESTRO },
        { r: "todos", t: AVEMARIA },
        { r: "guia", t: "Que descanse en paz." },
        { r: "todos", t: "Amén." },
        { r: "guia", t: "Que el Señor nos consuele, nos dé su paz y nos lleve un día a la vida eterna junto a {nombre}. Amén." },
        { r: "nota", t: "Cada quien puede dejar una flor o una oración personal. Ofrece un abrazo a la familia." }
      ]}
    ]
  },

  // ---------------------------------------------------------------
  enfermos: {
    intro:
      "Visitar a un enfermo es visitar a Cristo. Tu presencia, tu escucha y tu oración son un regalo. Recuerda que los sacramentos de la confesión, la Unción y la Comunión los trae el sacerdote o un ministro autorizado: tú preparas el camino.",
    llevar: [
      "Crucifijo, Biblia o Evangelio, rosario.",
      "Una estampa o imagen pequeña para dejarle.",
      "Agua bendita, si la tienes.",
      "Tiempo sin prisa, y paciencia para escuchar.",
      "Avisar al párroco para que lo visite: confesión, Unción y Comunión."
    ],
    consejos: [
      "Saluda con alegría y pregunta cómo se siente. Escucha más de lo que hablas.",
      "Pregunta si desea orar contigo y qué intención quiere ofrecer. Respeta si no quiere.",
      "No des consejos médicos ni prometas curaciones. Promete oración y compañía.",
      "Si hay otra religión en casa, respeta con cariño: ofrece oración simple, sin imponer.",
      "Guarda total reserva de lo que te cuente.",
      "Si es posible, visita acompañado de otra persona de la comunidad."
    ],
    visita: [
      { n: "Saludo y señal de la cruz", min: 1, partes: [
        { r: "guia", t: "La paz del Señor esté en esta casa. En el nombre del Padre, y del Hijo, y del Espíritu Santo." },
        { r: "todos", t: "Amén." },
        { r: "guia", t: "{nombre}, vengo de parte de la comunidad, que te quiere y reza por ti." }
      ]},
      { n: "Palabra de consuelo", min: 3, partes: [
        { r: "nota", t: "Sugerencias breves: Mateo 11,28-30, Salmo 23 o Salmo 121. Lee despacio y con ternura." },
        { r: "lector", t: "{lectura}" },
        { r: "guia", t: "Jesús sufrió y conoce nuestro dolor. Por eso podemos decirle todo con confianza. Él nunca nos deja solos." }
      ]},
      { n: "Oración por el enfermo", min: 2, partes: [
        { r: "guia", t: "Oremos. Señor Jesús, médico de los cuerpos y de las almas, mira a {nombre}, tu {hijo}, que sufre. Dale paciencia en el dolor, esperanza en la prueba y la paz que solo tú das. Sostén a quienes lo cuidan. Si es tu voluntad, devuélvele la salud; y si no, concédele fortaleza y una santa compañía hasta el final. Por Jesucristo, nuestro Señor." },
        { r: "todos", t: "Amén." }
      ]},
      { n: "Padrenuestro y Avemaría", min: 2, partes: [
        { r: "todos", t: PADRENUESTRO },
        { r: "todos", t: AVEMARIA }
      ]},
      { n: "Despedida", min: 1, partes: [
        { r: "guia", t: "Que el Señor te bendiga, te guarde de todo mal y te lleve a la vida eterna. Amén." },
        { r: "nota", t: "Se signa quien dirige a sí mismo. No hagas la cruz sobre el enfermo con aceite ni uses fórmulas del sacerdote. Despídete con cariño y avisa a la parroquia de su estado." }
      ]}
    ],
    comunion: {
      titulo: "Llevar la comunión a los enfermos",
      puntos: [
        "Solo puede hacerlo un ministro extraordinario de la comunión autorizado por el párroco o el obispo, con las sagradas formas recibidas de la Misa.",
        "Se lleva en una pequeña caja o pixis digna, con reverencia, sin demorar en el camino.",
        "Si no eres ministro, no lleves la Eucaristía: ofrece compañía, oración y la comunión espiritual."
      ]
    }
  }
};
