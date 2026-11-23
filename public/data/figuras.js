// Figuras que rotan como fondo de cada tarjeta. m = invocación de la mañana, n = invocación de la noche.
// El dibujo de cada una está en art.js (arte vectorial original, sin imágenes con derechos de autor).
export const FIGURAS = [
  { id: "dios", nombre: "Dios Padre", m: "Dios Padre providente, creador de la luz, bendice mi amanecer.", n: "Dios Padre providente, fuente de todo bien, recibe mi acción de gracias." },
  { id: "jesus", nombre: "Jesús, Sagrado Corazón", m: "Jesús, Sagrado Corazón, manso y humilde, bendice mi jornada.", n: "Jesús, Sagrado Corazón, que tu amor sea mi descanso." },
  { id: "misericordia", nombre: "Jesús de la Divina Misericordia", m: "Jesús de la Divina Misericordia, en ti confío: guía mis pasos hoy.", n: "Jesús de la Divina Misericordia, gracias por tu perdón sin medida." },
  { id: "resucitado", nombre: "Cristo Resucitado", m: "Cristo resucitado, vencedor de toda noche, ilumina mi mañana.", n: "Cristo resucitado, quédate conmigo, que ya anochece." },
  { id: "espiritu", nombre: "Espíritu Santo", m: "Espíritu Santo, ven con tu luz y tu fuego sobre este nuevo día.", n: "Espíritu Santo, gracias por guiarme hoy; sigue velando mi descanso." },
  { id: "maria", nombre: "Madre María Inmaculada", m: "Madre María Inmaculada, llévame de tu mano hacia tu Hijo.", n: "Madre María Inmaculada, cúbreme con tu manto esta noche." },
  { id: "cisne", nombre: "Virgen del Cisne", m: "Virgen del Cisne, Madre y Reina de Loja, acompaña mis pasos y los de mi familia.", n: "Virgen del Cisne, gracias por tu amparo; vela el sueño de tus hijos." },
  { id: "guadalupe", nombre: "Virgen de Guadalupe", m: "Virgen de Guadalupe, Madre del verdadero Dios, ampárame bajo tu sombra.", n: "Virgen de Guadalupe, gracias por tu ternura de Madre; guárdame esta noche." },
  { id: "quinche", nombre: "Virgen del Quinche", m: "Virgen del Quinche, Madre amada del Ecuador, bendice mi camino.", n: "Virgen del Quinche, gracias por tu protección; cuida a mi patria y a mi familia." },
  { id: "merced", nombre: "Virgen de la Merced", m: "Virgen de la Merced, Madre de la libertad, rompe hoy mis cadenas.", n: "Virgen de la Merced, gracias por tu mediación; libérame de toda carga esta noche." },
  { id: "carmen", nombre: "Virgen del Carmen", m: "Virgen del Carmen, Madre y Hermana, cúbreme con tu protección.", n: "Virgen del Carmen, gracias por tu manto; guíame en el descanso." },
  { id: "fatima", nombre: "Virgen de Fátima", m: "Virgen de Fátima, Reina del Rosario, enséñame a rezar con sencillez.", n: "Virgen de Fátima, gracias por tu mensaje de paz; intercede por el mundo esta noche." },
  { id: "lourdes", nombre: "Virgen de Lourdes", m: "Virgen de Lourdes, salud de los enfermos, consuela hoy a quienes sufren.", n: "Virgen de Lourdes, gracias por tu ternura; sana los cuerpos y las almas esta noche." },
  { id: "dolorosa", nombre: "Virgen Dolorosa", m: "Virgen Dolorosa, que conoces el dolor, enséñame a mantener la fe en las pruebas.", n: "Virgen Dolorosa, gracias por acompañarnos en el sufrimiento; consuela a los que lloran." },
  { id: "narcisa", nombre: "Santa Narcisa de Jesús", m: "Santa Narcisa de Jesús, humilde costurera y orante, enséñame a ofrecer mi día con sencillez.", n: "Santa Narcisa de Jesús, gracias por tu ejemplo de humildad; ruega por nosotros esta noche." },
  { id: "marianita", nombre: "Santa Mariana de Jesús", m: "Santa Mariana de Jesús, Azucena de Quito, ruega por mi familia y por mi patria.", n: "Santa Mariana de Jesús, gracias por tu entrega; ofrezco mi descanso por el Ecuador." },
  { id: "jose", nombre: "San José", m: "San José, justo y silencioso protector de la Sagrada Familia, cuida mi hogar.", n: "San José, custodio fiel, vela mi descanso y el de mi familia." },
  { id: "nino", nombre: "Divino Niño Jesús", m: "Divino Niño Jesús, ternura de Dios, bendíceme con tu sonrisa.", n: "Divino Niño Jesús, acuna mi sueño con tu paz." },
  { id: "miguel", nombre: "San Miguel Arcángel", m: "San Miguel Arcángel, defiéndeme en la lucha de cada día contra el mal.", n: "San Miguel Arcángel, protégeme esta noche y guarda mi hogar." },
  { id: "francisco", nombre: "San Francisco de Asís", m: "San Francisco de Asís, hermano de todas las criaturas, enséñame a alabar a Dios con alegría.", n: "San Francisco de Asís, gracias por tu ejemplo de sencillez; ruega por mí al caer la noche." },
  { id: "teresita", nombre: "Santa Teresita del Niño Jesús", m: "Santa Teresita, maestra del camino pequeño, enséñame a amar en lo cotidiano.", n: "Santa Teresita, gracias por tu lluvia de rosas; ruega por mí al terminar el día." },
  { id: "senor", nombre: "Señor Jesús", m: "Señor Jesús, Camino, Verdad y Vida, guía mis pasos en este día.", n: "Señor Jesús, gracias por este día; quédate conmigo esta noche." },
  { id: "santisimo", nombre: "Santísimo Sacramento", m: "Jesús Sacramentado, presente en el altar, adoro tu presencia al comenzar el día.", n: "Jesús Sacramentado, gracias por quedarte con nosotros; adoro tu presencia esta noche." },
  { id: "rosario", nombre: "Santo Rosario", m: "Santa María, Madre del Rosario, que mis manos recen contigo y mi corazón descanse en Dios.", n: "Madre del Rosario, gracias por este día; que mi descanso sea una oración." },
];

// Figuras que solo se usan en fechas especiales (no rotan a diario).
export const FIGURA_CRUZ = { id: "cruz", nombre: "Cristo Crucificado" };

export const PORID = Object.fromEntries([...FIGURAS, FIGURA_CRUZ].map(f => [f.id, f]));
