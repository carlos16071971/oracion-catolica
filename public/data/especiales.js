// Celebraciones con oraciones propias (reemplazan a la oración diaria ese día).
// Cada una tiene versión de mañana (hasta 12:00) y de noche (desde 20:00).
// fig = figura del fondo, motivo = decoración (0 rayos, 1 estrellas, 2 rosas, 3 nubes, 4 lirios, 5 aves, 6 anillos, 7 destellos)

export const ESPECIALES = {
  madre: {
    nombre: "Día de la Madre", fig: "maria", motivo: 2, saludo: "Feliz Día de la Madre",
    manana: {
      titulo: "Día de la Madre",
      oracion: ["Señor Dios, hoy te doy gracias por el don de mi madre y de todas las madres.", "Bendice a las que están a nuestro lado, consuela a las que sufren, sostén a las que crían solas y concede el descanso eterno a las que ya están contigo. Madre María, tú que supiste ser madre, pide para ellas ternura, salud y paz.", "Amén."],
      reflexion: "Una madre es el rostro más cercano del amor de Dios. Hoy es un buen día para decirle gracias con palabras y con hechos; y si ya no está, para rezar por ella y honrar su memoria viviendo lo que nos enseñó.",
      proposito: "Dile hoy a tu madre —o recuerda en oración— una razón concreta por la que le das gracias."
    },
    noche: {
      titulo: "Gracias por las madres",
      oracion: ["Dios Padre, al terminar este día te doy gracias por las madres: por su paciencia, su entrega y sus desvelos.", "Perdona nuestras faltas de gratitud, protege a cada madre en su descanso y que su sacrificio dé frutos de paz en sus hijos. Que María, Madre de la Iglesia, las cubra con su manto.", "Amén."],
      reflexion: "El amor materno no siempre se nota, pero sostiene hogares enteros. Antes de dormir, agradece a Dios por el testimonio de tantas madres que, en silencio, enseñan a creer, a perdonar y a esperar.",
      proposito: "Reza un Ave María por todas las madres, vivas y difuntas."
    }
  },
  padre: {
    nombre: "Día del Padre", fig: "jose", motivo: 4, saludo: "Feliz Día del Padre",
    manana: {
      titulo: "Día del Padre",
      oracion: ["Padre del cielo, hoy te agradezco el regalo de mi padre y de todos los padres.", "Bendice a los que trabajan por su familia, a los que buscan empleo, a los que luchan por ser mejores y a los que ya descansan en ti. San José, modelo de padres, ayúdalos a ser fuertes y tiernos, justos y presentes.", "Amén."],
      reflexion: "Ser padre es una vocación de presencia, trabajo y ejemplo. Dios mismo se revela como Padre. Hoy puedes agradecer a tu padre o a quien hizo sus veces, y si hay heridas, pedir la gracia de la reconciliación.",
      proposito: "Dale las gracias a un padre —o reza por él— y bendice su esfuerzo."
    },
    noche: {
      titulo: "Gracias por los padres",
      oracion: ["Señor, al caer la noche te doy gracias por los padres que cuidan, enseñan y protegen.", "Perdona lo que no supimos valorar, sana las relaciones heridas y concede descanso a quienes hoy se esforzaron por el sustento de su casa. San José, custodio fiel, vela por ellos y por nuestros hogares.", "Amén."],
      reflexion: "Un padre presente deja huella: cada consejo, cada esfuerzo y cada silencio de cansancio se convierten en herencia. Da gracias y bendice a los padres de tu vida, vivos o difuntos.",
      proposito: "Reza un Padrenuestro por todos los padres."
    }
  },
  nacimiento: {
    nombre: "Nacimiento del Niño Jesús", fig: "nino", motivo: 1, saludo: "Feliz Nochebuena",
    manana: {
      titulo: "Vísperas del Nacimiento",
      oracion: ["Señor Jesús, hoy esperamos con el corazón en vela tu llegada.", "Prepara en nosotros un pesebre limpio y sencillo donde puedas nacer. Que la alegría de esta víspera nos haga más generosos, más reconciliados y más atentos a los que están solos. María y José, enséñennos a esperar y a acoger.", "Amén."],
      reflexion: "Dios eligió nacer en la pobreza de un pesebre para estar cerca de todos. Prepararse para la Navidad es hacer espacio: perdonar, reconciliar, visitar y compartir; ahí es donde él quiere nacer hoy.",
      proposito: "Haz hoy un gesto de reconciliación o de ayuda a alguien que esté solo."
    },
    noche: {
      titulo: "Noche del Nacimiento",
      oracion: ["Niño Dios, esta noche santa te contemplamos recostado en el pesebre y te damos gracias por haber venido a salvarnos.", "Bendice a nuestras familias reunidas, a los que están lejos, a los enfermos y a los que pasan esta noche en soledad. Que tu paz llene nuestros hogares y nuestros corazones. Gloria a Dios en el cielo y paz en la tierra a los hombres que ama el Señor.", "Amén."],
      reflexion: "En la noche de Belén el cielo tocó la tierra. El Niño nos enseña que la grandeza de Dios es ternura y cercanía. Que nuestra Nochebuena sea de reconciliación, de mesa compartida y de adoración al Dios hecho niño.",
      proposito: "Antes de la cena, haz un momento de oración en familia ante el pesebre."
    }
  },
  navidad: {
    nombre: "Navidad", fig: "nino", motivo: 0, saludo: "¡Feliz Navidad!",
    manana: {
      titulo: "Hoy nació el Salvador",
      oracion: ["Dios con nosotros, Emmanuel, hoy celebramos tu nacimiento y te damos gracias por habernos dado a tu Hijo.", "Haz que nuestra alegría sea verdadera, que compartamos lo que tenemos y que sepamos ver a Cristo en cada persona. Santa María, Madre del Niño, presenta nuestras familias ante él. ¡Feliz Navidad!", "Amén."],
      reflexion: "La Navidad no es solo una fiesta, es una persona: Jesús, que se hizo uno de nosotros. Hoy el mejor regalo es la presencia, el abrazo y el perdón.",
      proposito: "Abraza a alguien y dile «Feliz Navidad» con el corazón."
    },
    noche: {
      titulo: "Gratitud en Navidad",
      oracion: ["Señor Jesús, al terminar este día de Navidad te damos gracias por la familia, por la mesa compartida, por los regalos y, sobre todo, por el regalo de tu venida.", "Acompaña a los que hoy sintieron tristeza o ausencia, y haz que la luz de Belén no se apague en nuestros corazones durante todo el año.", "Amén."],
      reflexion: "La Navidad sigue después de la cena: se prolonga en la bondad cotidiana. Que lo vivido hoy se convierta en propósito de ser más humildes, más cercanos y más agradecidos.",
      proposito: "Nombra en voz alta tres regalos que no se compran."
    }
  },
  findeano: {
    nombre: "Fin de año", fig: "dios", motivo: 1, saludo: "Último día del año",
    manana: {
      titulo: "Último día del año",
      oracion: ["Señor, dueño del tiempo y de la eternidad, hoy comienza el último día de este año.", "Te doy gracias por cada mes, cada alegría y cada enseñanza. Perdóname por lo que no hice bien, sana lo que quedó herido y dame un corazón dispuesto a recibir lo nuevo que preparas.", "Amén."],
      reflexion: "Fin de año es hora de balance sereno: ¿qué agradezco?, ¿qué lamento?, ¿qué quiero cambiar? Dios no mira solo nuestras fallas, sino la historia de amor que hemos escrito con él.",
      proposito: "Haz una lista de diez bendiciones que recibiste este año."
    },
    noche: {
      titulo: "Acción de gracias de fin de año",
      oracion: ["Dios eterno, al cerrar este año te damos gracias por la vida, por la salud, por el pan de cada día y por todas las bendiciones que nos regalaste, conocidas y ocultas.", "Perdónanos por lo que dejamos de hacer, recuerda a nuestros difuntos y bendice el año que viene con paz, trabajo y esperanza. A ti, Señor, todo el honor y la gloria por siempre.", "Amén."],
      reflexion: "Terminar el año con gratitud es la mejor manera de empezar el siguiente. Antes de la medianoche, haz una pausa: nombra tres gracias, perdona una herida y entrega tus propósitos al Señor.",
      proposito: "Antes de las 12, reza en familia un Padrenuestro y un Gloria."
    }
  },
  anonuevo: {
    nombre: "Año Nuevo", fig: "maria", motivo: 0, saludo: "¡Feliz Año Nuevo!",
    manana: {
      titulo: "Comienza un año nuevo",
      oracion: ["Señor, comienzo este año bajo tu mirada y bajo el manto de Santa María, Madre de Dios.", "Bendice mis días, mis planes, mi familia y mi trabajo. Dame fe para empezar, esperanza para continuar y amor para servir. Que este año sea tiempo de gracia para todos.", "Amén."],
      reflexion: "El primer día del año la Iglesia celebra a María, Madre de Dios, y la Jornada Mundial de la Paz. Empezar el año con ella es empezar con ternura y con la mirada puesta en Jesús.",
      proposito: "Elige una virtud para cultivar durante todo el año y ponla en manos de Dios."
    },
    noche: {
      titulo: "Gracias por el primer día",
      oracion: ["Gracias, Dios mío, por el primer día de este año.", "Acompáñame en cada uno de los que vienen y haz que cada noche pueda decirte gracias. Bendice a quienes comparten mi camino y a quienes aún no conozco. Santa María, Madre de Dios, ruega por nosotros.", "Amén."],
      reflexion: "Un año se construye día a día. Si hoy lograste dar un buen paso, agradece; si no, vuelve a empezar mañana: la gracia de Dios nunca se agota.",
      proposito: "Escribe una intención para el año y guárdala en un lugar visible."
    }
  },
  viernessanto: {
    nombre: "Viernes Santo", fig: "cruz", motivo: 6, saludo: "Viernes Santo",
    manana: {
      titulo: "Contemplando la Cruz",
      oracion: ["Señor Jesús, hoy contemplo tu cruz, signo de tu amor hasta el extremo.", "Gracias por entregarte por nosotros. Dame la gracia de acompañarte con silencio, arrepentimiento y gratitud. Madre Dolorosa, enséñame a permanecer junto a la cruz.", "Amén."],
      reflexion: "El Viernes Santo es día de ayuno, silencio y contemplación. Ante la cruz comprendemos que Dios no se queda lejos del sufrimiento: lo asume y lo transforma.",
      proposito: "Dedica un rato al silencio y, si puedes, reza el Vía Crucis."
    },
    noche: {
      titulo: "Silencio de la cruz",
      oracion: ["Jesús, al caer la tarde recordamos tu muerte. Te damos gracias por tu entrega y por la esperanza que de ella nace.", "Perdona nuestros pecados, consuela a los que sufren y guárdanos en la espera de tu resurrección. En tus manos encomendamos nuestro espíritu.", "Amén."],
      reflexion: "Esta noche el mundo guarda silencio. La fe nos dice que la última palabra no la tiene la muerte: espera con confianza y reza en calma.",
      proposito: "Haz la señal de la cruz despacio y guarda silencio unos minutos."
    }
  },
  pascua: {
    nombre: "Domingo de Pascua", fig: "resucitado", motivo: 0, saludo: "¡Cristo ha resucitado!",
    manana: {
      titulo: "¡Cristo ha resucitado!",
      oracion: ["¡Aleluya! Cristo ha resucitado, y la muerte ya no tiene poder sobre él.", "Gracias, Señor, por abrir las puertas de la vida eterna. Haz que vivamos como hijos de la luz, sembrando alegría, perdón y esperanza. María, Reina del cielo, alégrate con nosotros.", "Amén."],
      reflexion: "La Pascua es el corazón de nuestra fe. Si Cristo vive, ninguna cruz es definitiva. Hoy puedes saludar con alegría: «Cristo resucitó, verdaderamente resucitó».",
      proposito: "Saluda hoy a todos con un «¡Feliz Pascua de Resurrección!»."
    },
    noche: {
      titulo: "Alegría de la Pascua",
      oracion: ["Señor resucitado, gracias por el día de Pascua que hemos vivido.", "Quédate con nosotros porque ya anochece, y que nuestro corazón arda como el de los discípulos de Emaús. Haznos testigos de tu victoria. Aleluya.", "Amén."],
      reflexion: "Los discípulos de Emaús reconocieron a Jesús al partir el pan. Que nuestras mesas y nuestros encuentros sean lugar de reconocimiento y de alegría compartida.",
      proposito: "Comparte hoy una comida o una llamada con alguien que esté solo."
    }
  },
  inmaculada: {
    nombre: "Inmaculada Concepción", fig: "maria", motivo: 4, saludo: "Feliz día de la Inmaculada",
    manana: {
      titulo: "La Inmaculada",
      oracion: ["Santa María, Inmaculada Concepción, llena de gracia, hoy celebramos tu pureza y tu sí.", "Ayúdanos a vivir con corazón limpio y disponible. Enséñanos a decir «hágase» a lo que Dios nos pide.", "Amén."],
      reflexion: "La Inmaculada muestra lo que Dios hace con quien se abre a su gracia. Es modelo y aliento para vivir sin dobleces y con total confianza.",
      proposito: "Reza tres Ave Marías por tu familia."
    },
    noche: {
      titulo: "Gracias, María",
      oracion: ["Madre Inmaculada, gracias por tu intercesión durante este día.", "Cuida nuestro descanso y presenta a tu Hijo nuestras súplicas. Que seamos fieles a nuestra vocación cristiana.", "Amén."],
      reflexion: "Cierra tu día con un Ave María y deja que ella te lleve. Quien confía en María aprende la sencillez de la fe.",
      proposito: "Enciende una vela o una luz ante una imagen de María."
    }
  },
  guadalupe: {
    nombre: "Nuestra Señora de Guadalupe", fig: "guadalupe", motivo: 2, saludo: "Feliz día de la Virgen de Guadalupe",
    manana: {
      titulo: "Virgen de Guadalupe",
      oracion: ["Santa María de Guadalupe, Madre del verdadero Dios por quien se vive, hoy celebramos tu fiesta con alegría.", "Te encomendamos a nuestras familias, a los pueblos de América y a los más humildes. Acércanos siempre a tu Hijo Jesús.", "Amén."],
      reflexion: "En 1531, según la tradición, la Virgen se mostró a san Juan Diego en el Tepeyac. Su mensaje fue de ternura y de cercanía con los pobres, y hoy sigue siendo guía para América.",
      proposito: "Ofrece una flor o una oración a la Virgen y pide por los más humildes."
    },
    noche: {
      titulo: "Gracias, Madre",
      oracion: ["Virgen de Guadalupe, gracias por tu cariño de Madre.", "Cúbrenos con tu manto esta noche, protege a los migrantes, a los enfermos y a los que buscan consuelo. Que cada hogar sea un pequeño Tepeyac.", "Amén."],
      reflexion: "Quien se sabe en el regazo de la Madre descansa. Al terminar su fiesta, deja en sus manos tus preocupaciones y confía en su cuidado.",
      proposito: "Entrega a la Virgen, por nombre, a una persona que necesite su protección."
    }
  },
  difuntos: {
    nombre: "Fieles Difuntos", fig: "misericordia", motivo: 7, saludo: "Día de los Fieles Difuntos",
    manana: {
      titulo: "Fieles Difuntos",
      oracion: ["Señor de la vida y de la muerte, hoy rezo por mis seres queridos que ya partieron.", "Concédeles el descanso eterno y que brille para ellos la luz perpetua. Consuela a los que los lloramos y fortalece nuestra esperanza en la resurrección.", "Amén."],
      reflexion: "El 2 de noviembre la Iglesia reza por los fieles difuntos. La muerte no rompe el amor: lo transforma. Orar por ellos es mantenernos unidos en la comunión de los santos.",
      proposito: "Visita o recuerda con una oración la tumba o el nombre de un ser querido."
    },
    noche: {
      titulo: "Memoria agradecida",
      oracion: ["Dios de misericordia, gracias por la vida de quienes nos precedieron en la fe.", "Acógelos en tu paz y haznos dignos de reunirnos con ellos en tu reino. Descansen en paz.", "Amén."],
      reflexion: "Recordar con gratitud a los difuntos es un acto de amor y de esperanza. Esta noche enciende una vela o reza un Padrenuestro por ellos.",
      proposito: "Enciende una vela y nombra a tus difuntos uno por uno."
    }
  }
};
