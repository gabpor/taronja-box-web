// src/lib/faqs.ts
// Fuente única de las preguntas frecuentes — usada tanto por FaqSection.astro
// (render visual) como por el schema FAQPage inyectado en cada landing,
// para que el JSON-LD nunca se desincronice del contenido visible.

export interface Faq {
    id: string;
    question: string;
    answer: string;
}

export const faqs: Faq[] = [
    {
        id: "01",
        question: "Nunca he hecho Cross Training o levantado pesas, ¿puedo empezar desde cero?",
        answer: "Totalmente. De hecho, es el mejor momento para empezar. No necesitas \"estar en forma\" para venir a Taronja Box; vienes exactamente para ponerte en forma. Nuestras clases tienen plazas limitadas, lo que significa que siempre tendrás a un coach de nuestro equipo de entrenadores adaptando los pesos y los movimientos a tu nivel actual. Empiezas a tu ritmo, nosotros te guiamos."
    },
    {
        id: "02",
        question: "Vivo en Valencia pero trabajo fuera, ¿tengo opciones si mis horarios son complicados?",
        answer: "Sí, la flexibilidad es nuestro punto más fuerte. Contamos con tres sedes estratégicas (Valencia capital, Massanassa y Moncada) y horarios súper amplios. Desde el Open Box continuo de 07:00 a 22:00 en Massanassa, hasta la apertura en fines de semana de nuestra sede en Moncada. Siempre tendrás un espacio libre y totalmente equipado cerca de ti para no perder el ritmo."
    },
    {
        id: "03",
        question: "¿Qué diferencia hay entre Taronja Box y un gimnasio convencional?",
        answer: "En un gimnasio tradicional alquilas máquinas; aquí formas parte de un equipo. Taronja Box es un espacio libre de espejos y rutinas aburridas. Nos basamos en el entrenamiento funcional de alta intensidad, pero nuestro mayor activo es la comunidad. Sudamos juntos, compartimos el esfuerzo y te garantizamos que el ambiente te motivará a volver al día siguiente."
    },
    {
        id: "04",
        question: "¿Ofrecéis algo más aparte de las clases generales de alta intensidad?",
        answer: "¡Por supuesto! Creemos en el desarrollo integral del atleta. Más allá del WOD diario, ofrecemos clases especializadas de Halterofilia (Weightlifting) y Gimnásticos para pulir tu técnica. Además, contamos con servicios de recuperación (Masoterapia) y programas específicos como CrossKids y Teens en sedes como Moncada, para que los más jóvenes aprendan a moverse de forma sana."
    },
    {
        id: "05",
        question: "Me llama la atención, pero ¿qué pasa si pruebo y descubro que no es lo mío?",
        answer: "Que te llevas una gran experiencia y un buen entrenamiento sin ningún compromiso. Entendemos que probar algo nuevo impone, por eso siempre te invitamos a una primera clase de prueba gratis. Ven, conoce nuestras instalaciones, habla con los coaches y decide después. Estamos tan seguros de nuestra metodología que trabajamos sin matrículas abusivas ni permanencias forzadas."
    }
];
