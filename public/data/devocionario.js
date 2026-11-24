// Contenido del menú: Mandamientos, Sacramentos, Salmos y Novena al Niño Jesús.
// Los textos explicativos y las oraciones son redacciones sencillas para uso devocional.

// ---------- Mandamientos de la Ley de Dios (formulación catequética tradicional; Éx 20,1-17 · Dt 5,6-21) ----------
export const MANDAMIENTOS = {
  resumen: "Amarás al Señor, tu Dios, con todo tu corazón, con toda tu alma y con toda tu mente; y a tu prójimo como a ti mismo.",
  resumenCita: "Mt 22,37-39",
  grupos: [
    {
      titulo: "Amor a Dios",
      items: [
        ["Amarás a Dios sobre todas las cosas.", "Pon a Dios primero: empieza y termina el día con Él."],
        ["No tomarás el nombre de Dios en vano.", "Pronuncia su nombre con respeto y gratitud, nunca para jurar ni ofender."],
        ["Santificarás las fiestas.", "Participa en la Misa del domingo y dedica ese día a Dios, a la familia y al descanso."]
      ]
    },
    {
      titulo: "Amor al prójimo",
      items: [
        ["Honrarás a tu padre y a tu madre.", "Agradece, escucha y cuida a tus padres y a quienes te educan."],
        ["No matarás.", "Respeta toda vida, desde su concepción hasta su fin natural; aleja el odio y la violencia."],
        ["No cometerás actos impuros.", "Vive la castidad según tu estado de vida, con respeto por tu cuerpo y el de los demás."],
        ["No robarás.", "Sé justo: paga lo debido, cuida lo ajeno y comparte con quien necesita."],
        ["No dirás falso testimonio ni mentirás.", "Habla con verdad; no calumnies ni difundas rumores."],
        ["No consentirás pensamientos ni deseos impuros.", "Cuida la mirada y el corazón; pide a Dios un corazón limpio."],
        ["No codiciarás los bienes ajenos.", "Alégrate con lo que tienes y con el bien de los demás."]
      ]
    }
  ]
};

// ---------- Los siete sacramentos ----------
export const SACRAMENTOS = {
  intro: "Los sacramentos son signos sensibles y eficaces de la gracia, instituidos por Cristo y confiados a su Iglesia. Por ellos, Dios nos da su vida.",
  grupos: [
    {
      titulo: "Sacramentos de la iniciación cristiana",
      items: [
        { n: "Bautismo", que: "Nos libera del pecado original, nos hace hijos de Dios y nos incorpora a la Iglesia. Es la puerta de todos los demás sacramentos.", signo: "Agua derramada sobre la cabeza (o inmersión) y las palabras «Yo te bautizo en el nombre del Padre, y del Hijo, y del Espíritu Santo»." },
        { n: "Confirmación", que: "Perfecciona la gracia del Bautismo: sella al cristiano con el don del Espíritu Santo y lo fortalece para vivir y testimoniar la fe.", signo: "Unción con el santo crisma en la frente, imposición de manos y las palabras «Recibe por esta señal el don del Espíritu Santo»." },
        { n: "Eucaristía", que: "El Cuerpo y la Sangre de Cristo, que se entrega por nosotros. Es la fuente y la cumbre de toda la vida cristiana.", signo: "Pan de trigo y vino de vid, que en la consagración se convierten en el Cuerpo y la Sangre de Cristo." }
      ]
    },
    {
      titulo: "Sacramentos de curación",
      items: [
        { n: "Penitencia o Reconciliación", que: "Nos devuelve la amistad con Dios y con la Iglesia cuando hemos pecado. También se le llama Confesión.", signo: "Contrición, confesión de los pecados y satisfacción por parte del penitente; el sacerdote da la absolución." },
        { n: "Unción de los enfermos", que: "Da fortaleza, paz y consuelo a quien sufre una enfermedad grave o la fragilidad de la vejez, y lo une a la pasión de Cristo.", signo: "Imposición de manos por el sacerdote y unción con el óleo de los enfermos, acompañada de la oración de la Iglesia." }
      ]
    },
    {
      titulo: "Sacramentos al servicio de la comunión y la misión",
      items: [
        { n: "Orden sacerdotal", que: "Por él Cristo sigue guiando, enseñando y santificando a su pueblo mediante obispos, presbíteros y diáconos.", signo: "Imposición de las manos del obispo y oración de consagración propia de cada grado." },
        { n: "Matrimonio", que: "Alianza de amor fiel y para siempre entre un hombre y una mujer bautizados, ordenada al bien de los esposos y a la generación y educación de los hijos.", signo: "El consentimiento de los esposos, expresado ante la Iglesia; ellos mismos son los ministros del sacramento." }
      ]
    }
  ]
};

// ---------- Salmos (selección) ----------
// Versión adaptada en palabras sencillas para la oración personal; no es la traducción litúrgica.
// t = temas: man (mañana) · noc (noche) · con (confianza) · per (perdón) · ala (alabanza)
export const SALMOS_NOTA = "Selección de salmos muy queridos, adaptados en palabras sencillas para rezar. Para el texto bíblico completo de los 150 salmos, consulta tu Biblia.";
export const SALMOS_TEMAS = [
  ["todos", "Todos"], ["man", "Mañana"], ["noc", "Noche"], ["con", "Confianza"], ["per", "Perdón"], ["ala", "Alabanza"]
];
export const SALMOS = [
  { n: 1, titulo: "El camino del justo", t: ["man", "con"], txt: "Feliz quien no sigue el consejo de los malvados ni se junta con los burlones, sino que ama la ley del Señor y la medita día y noche. Es como un árbol plantado junto al agua: da fruto a su tiempo y sus hojas nunca se secan. El Señor cuida el camino de los justos; el de los malvados se pierde." },
  { n: 4, titulo: "En paz me acuesto", t: ["noc", "con"], txt: "Cuando te llamo, respóndeme, Dios mío; en la angustia tú me diste espacio. Muchos preguntan: «¿Quién nos hará ver la dicha?». Tú has puesto en mi corazón más alegría que la de quienes tienen abundancia. En paz me acuesto y me duermo enseguida, porque solo tú, Señor, me haces vivir tranquilo." },
  { n: 8, titulo: "Qué admirable es tu nombre", t: ["ala", "man"], txt: "Señor, Dios nuestro, qué admirable es tu nombre en toda la tierra. Cuando miro el cielo, la luna y las estrellas que hiciste, me pregunto: ¿qué es el hombre para que te acuerdes de él? Y sin embargo lo hiciste casi como un ángel, lo coronaste de honor y le confiaste las obras de tus manos." },
  { n: 23, titulo: "El Señor es mi pastor", t: ["con", "man"], txt: "El Señor me cuida como un pastor: nada me falta. Me lleva a descansar en pastos verdes y junto a aguas tranquilas; renueva mis fuerzas y me guía por el buen camino. Aunque atraviese un valle oscuro, no temo, porque tú vas conmigo. Me preparas una mesa, me perfumas la cabeza y mi copa rebosa. Tu bondad y tu amor me acompañarán toda la vida, y viviré en tu casa por siempre." },
  { n: 27, titulo: "El Señor es mi luz", t: ["con", "man"], txt: "El Señor es mi luz y mi salvación: ¿a quién temeré? Es la fortaleza de mi vida: ¿quién me hará temblar? Una sola cosa pido y la busco: vivir en la casa del Señor todos los días de mi vida y contemplar su bondad. Espera en el Señor, sé valiente, que tu corazón se mantenga firme: espera en el Señor." },
  { n: 34, titulo: "Bendeciré al Señor en todo momento", t: ["ala", "con"], txt: "Bendeciré al Señor en todo momento; su alabanza estará siempre en mis labios. Busqué al Señor y me respondió, me libró de todos mis miedos. Miren hacia él y se llenarán de luz. Prueben y vean qué bueno es el Señor: feliz quien se refugia en él. El Señor está cerca de los que tienen el corazón herido." },
  { n: 42, titulo: "Mi alma tiene sed de Dios", t: ["con", "man"], txt: "Como la cierva busca las corrientes de agua, así te busca mi alma, Dios mío. Tengo sed de Dios, del Dios vivo. ¿Por qué te abates, alma mía, por qué te inquietas? Espera en Dios, que aún le daré gracias: él es mi salvación y mi Dios." },
  { n: 46, titulo: "Dios es nuestro refugio", t: ["con"], txt: "Dios es nuestro refugio y nuestra fuerza, una ayuda siempre cercana en la angustia. Por eso no tememos aunque la tierra tiemble y los montes se hundan en el mar. «Quédense en calma y sepan que yo soy Dios.» El Señor del universo está con nosotros." },
  { n: 51, titulo: "Ten piedad de mí, Señor", t: ["per", "noc"], txt: "Ten piedad de mí, Dios, por tu bondad; por tu gran compasión borra mi culpa. Lávame de mi maldad y límpiame de mi pecado. Reconozco mi falta, mi pecado está siempre ante mí. Crea en mí un corazón puro, renueva mi espíritu. No me apartes de tu presencia ni me quites tu Espíritu santo. Devuélveme la alegría de sentirme salvado." },
  { n: 63, titulo: "Desde el amanecer te busco", t: ["man", "ala"], txt: "Dios, tú eres mi Dios: te busco desde el amanecer. Mi alma tiene sed de ti, como tierra seca y sin agua. Tu amor vale más que la vida, por eso mis labios te alaban. Te bendeciré mientras viva. Cuando me acuesto pienso en ti, porque has sido mi ayuda, y a la sombra de tus alas canto de alegría." },
  { n: 91, titulo: "A la sombra del Altísimo", t: ["noc", "con"], txt: "Quien vive al amparo del Altísimo descansa a la sombra del Todopoderoso. Digo al Señor: «Tú eres mi refugio y mi fortaleza, mi Dios, en ti confío». Él te cubrirá con sus alas y su fidelidad será tu escudo. No temerás los terrores de la noche. A sus ángeles ha mandado que te cuiden en todos tus caminos." },
  { n: 95, titulo: "Vengan, cantemos al Señor", t: ["man", "ala"], txt: "Vengan, cantemos con alegría al Señor, aclamemos a la roca que nos salva. Entremos en su presencia dándole gracias. Porque el Señor es un gran Dios, y nosotros somos su pueblo, el rebaño que él guía. Si hoy escuchan su voz, no endurezcan el corazón." },
  { n: 100, titulo: "Aclamen al Señor", t: ["ala", "man"], txt: "Aclama al Señor, tierra entera; sirvan al Señor con alegría y lleguen a él cantando. Sepan que el Señor es Dios: él nos hizo y le pertenecemos; somos su pueblo, el rebaño que él cuida. Den gracias, bendigan su nombre, porque el Señor es bueno, su amor es eterno y su fidelidad no se acaba." },
  { n: 103, titulo: "Bendice, alma mía, al Señor", t: ["ala", "noc"], txt: "Bendice, alma mía, al Señor, y no olvides ninguno de sus beneficios. Él perdona tus culpas y sana tus dolencias; rescata tu vida del abismo y te rodea de amor y ternura. El Señor es compasivo y misericordioso, lento para enojarse y grande en bondad. Como un padre cariñoso con sus hijos, así es el Señor con quienes lo respetan." },
  { n: 121, titulo: "Mi auxilio viene del Señor", t: ["con", "man"], txt: "Levanto los ojos a los montes: ¿de dónde me vendrá el auxilio? Mi auxilio viene del Señor, que hizo el cielo y la tierra. No dejará que tropiece tu pie: tu guardián no duerme. El Señor es tu sombra a tu derecha; de día el sol no te dañará, ni la luna de noche. El Señor te protege de todo mal y cuida tu vida, ahora y siempre." },
  { n: 130, titulo: "Desde lo más profundo", t: ["per", "noc"], txt: "Desde lo más profundo te invoco, Señor: escucha mi voz. Si tuvieras en cuenta las culpas, ¿quién podría sostenerse? Pero en ti hay perdón. Mi alma espera al Señor más que el centinela la aurora. Porque en el Señor hay misericordia y una redención abundante." },
  { n: 134, titulo: "Bendigan al Señor de noche", t: ["noc", "ala"], txt: "Bendigan al Señor todos sus siervos, los que de noche velan en su casa. Levanten las manos hacia el santuario y bendigan al Señor. Que el Señor, que hizo el cielo y la tierra, te bendiga." },
  { n: 139, titulo: "Tú me conoces, Señor", t: ["con", "noc"], txt: "Señor, tú me examinas y me conoces; sabes cuándo me siento y cuándo me levanto, y desde lejos conoces mis pensamientos. ¿A dónde iré lejos de tu espíritu? Si subo al cielo, allí estás; si me acuesto en lo profundo, también allí. Para ti la noche es clara como el día. Gracias porque me hiciste maravillosamente. Examíname, Dios, y guíame por el camino eterno." },
  { n: 150, titulo: "Todo ser que respira", t: ["ala", "man"], txt: "Alaben a Dios en su santuario, alábenlo en el cielo de su poder. Alábenlo por sus proezas, por su inmensa grandeza. Alábenlo con trompetas, arpas y cítaras, con tambores y danzas, con cuerdas y flautas. ¡Todo ser que respira alabe al Señor!" }
];

// ---------- Novena al Niño Jesús ----------
export const NOVENA = {
  intro: "Nueve días seguidos de oración con el Niño Jesús. Si la rezas del 16 al 24 de diciembre, acompaña la Novena de Navidad. Cada día: señal de la cruz, oración inicial, el tema del día, tu petición, un Padrenuestro, un Avemaría y un Gloria, y la oración final.",
  senal: "Por la señal de la santa cruz, de nuestros enemigos líbranos, Señor, Dios nuestro. En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.",
  inicial: "Divino Niño Jesús, que por amor te hiciste pequeño y naciste en Belén, aquí estoy ante ti con el corazón abierto. Dame un corazón sencillo como el tuyo, para recibirte cada día y compartir tu paz con los demás. Amén.",
  final: "Divino Niño Jesús, bendice nuestro hogar, protege a nuestros niños y a nuestros mayores, y danos tu paz. Que, como los pastores, volvamos a nuestra vida de cada día alabando a Dios por todo lo que hemos visto y oído. Amén.",
  jaculatoria: "Divino Niño Jesús, bendícenos.",
  dias: [
    { t: "Dios se hace niño por amor", c: "Dios no quiso salvarnos desde lejos: se hizo uno de nosotros y llegó como un bebé frágil. Quien es el Todopoderoso se deja cargar en brazos. Hoy contemplo ese amor que se hace pequeño para estar cerca de mí.", p: "Niño Jesús, ayúdame a creer que me amas tal como soy y a acercarme a ti con confianza." },
    { t: "La humildad del pesebre", c: "Naciste en un establo, sin lujos ni aplausos. Los poderosos no se enteraron, pero los pastores sí. La humildad es la puerta por la que entras en nuestras vidas.", p: "Líbrame del orgullo y de la necesidad de aparentar. Enséñame a ser humilde de corazón." },
    { t: "María y José, una familia en torno a ti", c: "Creciste en una familia sencilla: María te abrigó y José te protegió. En el hogar se aprende a amar, a perdonar y a rezar.", p: "Bendice a mi familia, une a los que están distanciados y cuida a quienes viven solos." },
    { t: "La alegría y la paz", c: "Los ángeles cantaron la paz para la tierra. Tu llegada trae una alegría que no depende de lo que tenemos, sino de saber que Dios está con nosotros.", p: "Pon tu paz en mi corazón y en las casas donde hay discusiones, miedo o tristeza." },
    { t: "La sencillez de los pastores", c: "Los primeros en acudir fueron los pastores, gente sencilla que se dejó sorprender. Dios se muestra a los corazones abiertos.", p: "Dame un corazón sencillo, capaz de asombrarse y de escuchar tu voz en lo cotidiano." },
    { t: "Los regalos de los Magos y los nuestros", c: "Los Magos te ofrecieron oro, incienso y mirra. ¿Qué puedo ofrecerte yo? Mi tiempo, mi trabajo, mi atención a quien me necesita. Lo pequeño, hecho con amor, es un tesoro para ti.", p: "Acepta lo que soy y lo que tengo; que mi vida sea una ofrenda que te agrade." },
    { t: "Los niños, tus preferidos", c: "Dijiste que dejemos a los niños venir a ti, porque de los que son como ellos es el Reino de los cielos. Ellos nos enseñan confianza y alegría.", p: "Protege a todos los niños, especialmente a los abandonados, enfermos o maltratados, y ayúdanos a cuidarlos." },
    { t: "Luz para quienes sufren", c: "Viniste a un mundo con dolor: huiste a Egipto y conociste el miedo. Por eso entiendes a quien sufre. Contigo, ninguna noche es del todo oscura.", p: "Consuela a los enfermos, a los que lloran y a los que no tienen techo ni pan; haznos instrumentos de tu consuelo." },
    { t: "Gracias y entrega", c: "Al terminar este camino te doy gracias por todo lo recibido. Quiero llevar tu luz a mi casa y a mi trabajo, y vivir cada día como quien te lleva en brazos.", p: "Niño Jesús, quédate conmigo. Haz de mi vida un pesebre donde nazcas cada día." }
  ]
};
