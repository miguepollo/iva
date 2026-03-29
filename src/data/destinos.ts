export interface Excursion {
  id: string
  title: string
  description: string
  image: string
  price: number
  currency: string
  rating: number
  reviews: number
  duration: string
  groupSize: string
  affiliateUrl: string
  provider: 'civitatis' | 'getyourguide' | 'viator'
  highlights: string[]
}

export interface Destination {
  id: string
  slug: string
  name: string
  country: string
  region: string
  tagline: string
  description: string
  heroImage: string
  gallery: string[]
  rating: number
  activitiesCount: number

  // SEO
  metaTitle: string
  metaDescription: string

  // Quick Facts
  quickFacts: {
    bestTime: string
    currency: string
    language: string
    timezone: string
  }

  // How to get there
  howToGet: {
    byPlane: string
    byBoat: string
    byCar: string
  }

  // Where to sleep
  whereToSleep: {
    intro: string
    areas: {
      name: string
      description: string
      bestFor: string
      bookingUrl: string
    }[]
  }

  // What to do
  whatToDo: {
    intro: string
    activities: {
      name: string
      description: string
      tip: string
    }[]
  }

  // Excursions
  excursions: Excursion[]

  // Affiliate Links
  affiliateLinks: {
    skyscanner: string
    booking: string
  }
}

export const destinos: Destination[] = [
  // ==================== MENORCA ====================
  {
    id: '1',
    slug: 'menorca-espana',
    name: 'Menorca',
    country: 'España',
    region: 'Islas Baleares',
    tagline: 'La isla virgen del Mediterráneo',
    description: 'Menorca es la joya más tranquila de las Baleares. Con más playas vírgenes que Mallorca e Ibiza juntas, esta Reserva de la Biosfera de la UNESCO te encantará con sus calas de agua cristalina, paisajes verdes y pueblos encantadores. Perfecta para desconectar, practicar deportes acuáticos y disfrutar de una gastronomía única.',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&h=600&fit=crop&q=80',
    ],
    rating: 4.9,
    activitiesCount: 24,

    metaTitle: 'Menorca Guía de Viaje 2024 | Playas, Qué Ver y Consejos',
    metaDescription: 'Descubre Menorca: la isla más virgen de Baleares. Guía completa con las mejores playas, calas escondidas, dónde dormir y excursiones imprescindibles.',

    quickFacts: {
      bestTime: 'Mayo - Septiembre',
      currency: 'Euro (€)',
      language: 'Español/Catalán',
      timezone: 'GMT+1',
    },

    howToGet: {
      byPlane: 'El aeropuerto de Menorca (MAH) recibe vuelos desde las principales ciudades españolas y europeas. Desde Madrid son 1h 15min de vuelo. En temporada alta hay conexiones directas con Londres, París y Ámsterdam.',
      byBoat: 'Puedes llegar en ferry desde Barcelona (4h) o Valencia (5h) con Balearia o Transmediterránea. También hay ferrys desde Palma de Mallorca (1h 30min). Ideal si viajas con coche.',
      byCar: 'No necesitas coche para llegar a la isla, pero sí para explorarla. Puedes alquilar uno en el aeropuerto. La isla es pequeña: solo 50km de extremo a extremo.',
    },

    whereToSleep: {
      intro: 'Menorca ofrece desde hoteles boutique en antiguas casas señoriales hasta resorts familiares frente al mar. La isla se divide en varias zonas con encanto único.',
      areas: [
        {
          name: 'Ciutadella (Oeste)',
          description: 'La antigua capital respira historia con sus calles empedradas y palacetes del siglo XVIII. Ideal para quienes buscan encanto y vida nocturna tranquila.',
          bestFor: 'Parejas, cultura, gastronomía',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=Ciutadella&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
        {
          name: 'Maó (Este)',
          description: 'La capital actual tiene uno de los puertos naturales más grandes del mundo. Más urbana pero con excelente conexión a playas del este.',
          bestFor: 'Familias, acceso en bus, compras',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=Mahon&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
        {
          name: 'Fornells (Norte)',
          description: 'Pueblo de pescadores famoso por su langosta. Ambiente marinero auténtico y cerca de las mejores playas del norte.',
          bestFor: 'Tranquilidad, gastronomía, windsurf',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=Fornells&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
      ],
    },

    whatToDo: {
      intro: 'Menorca es perfecta para perderse. Sus 216km de costa esconden más de 70 playas y calas, muchas accesibles solo a pie o en barco.',
      activities: [
        {
          name: 'Calas del Sur',
          description: 'Macarella, Macarelleta, Turqueta... las calas de agua turquesa más famosas. Llega temprano (antes de las 10am) para evitar multitudes.',
          tip: 'La Camí de Cavalls conecta todas las calas. Un sendero histórico de 185km que rodea toda la isla.',
        },
        {
          name: 'Binibeca Vell',
          description: 'Pueblo de pescadores de casas blancas laberínticas. El "pueblo más bonito de Menorca" es perfecto para fotos y perderse.',
          tip: 'Visita al atardecer cuando los tours ya se han ido y la luz es dorada.',
        },
        {
          name: 'Faro de Cavalleria',
          description: 'El faro más al norte con acantilados salvajes de 90m. El atardecer aquí es mágico y menos concurrido que en otros puntos.',
          tip: 'Combínalo con una visita a la playa virgen de Cavalleria, a 10min andando.',
        },
        {
          name: 'Reserva Marina del Norte',
          description: 'Es snorkel y buceo en aguas cristalinas protegidas. Frecuentes avistamientos de pulpos y bancos de peces coloridos.',
          tip: 'Playas como Cala Pregonda y Cala Pilar son ideales para snorkel autónomo.',
        },
      ],
    },

    excursions: [
      {
        id: 'menorca-boat',
        title: 'Excursión en Barco Costa Norte',
        description: 'Descubre calas inaccesibles por tierra en catamarán.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80',
        price: 59,
        currency: '€',
        rating: 4.8,
        reviews: 2341,
        duration: '5 horas',
        groupSize: 'Máx. 20 personas',
        affiliateUrl: 'https://www.civitatis.com/es/menorca/excursion-barco-norte/',
        provider: 'civitatis',
        highlights: ['Comida incluida', 'Snorkel', 'Calas vírgenes'],
      },
      {
        id: 'menorca-kayak',
        title: 'Kayak + Snorkel en Cuevas',
        description: 'Explora cuevas secretas en la costa salvaje.',
        image: 'https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=800&h=600&fit=crop&q=80',
        price: 45,
        currency: '€',
        rating: 4.9,
        reviews: 876,
        duration: '3 horas',
        groupSize: 'Máx. 12 personas',
        affiliateUrl: 'https://www.getyourguide.com/menorca-l1932/kayak-snorkel-cave-tc125/',
        provider: 'getyourguide',
        highlights: ['Guía experto', 'Equipo incluido', 'Principiante'],
      },
      {
        id: 'menorca-horse',
        title: 'Ruta a Caballo Camí de Cavalls',
        description: 'Cabalgata por el sendero costero histórico.',
        image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop&q=80',
        price: 55,
        currency: '€',
        rating: 4.7,
        reviews: 456,
        duration: '2 horas',
        groupSize: 'Máx. 8 personas',
        affiliateUrl: 'https://www.viator.com/searchResults/all?text=menorca+horse&destId=4594',
        provider: 'viator',
        highlights: ['Todos niveles', 'Vistas mar', 'Guía local'],
      },
      {
        id: 'menorca-sunset',
        title: 'Tour Sunset + Astronomía',
        description: 'Atardecer en faro + observación de estrellas.',
        image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&h=600&fit=crop&q=80',
        price: 35,
        currency: '€',
        rating: 4.9,
        reviews: 687,
        duration: '3 horas',
        groupSize: 'Máx. 15 personas',
        affiliateUrl: 'https://www.civitatis.com/es/menorca/tour-astronomia/',
        provider: 'civitatis',
        highlights: ['Cielo puro', 'Telescopio', 'Cava'],
      },
    ],

    affiliateLinks: {
      skyscanner: 'https://www.skyscanner.net/transport/flights/mad/mah/',
      booking: 'https://www.booking.com/region/es/menorca.html?aid=123456',
    },
  },

  // ==================== MALLORCA ====================
  {
    id: '2',
    slug: 'mallorca-espana',
    name: 'Mallorca',
    country: 'España',
    region: 'Islas Baleares',
    tagline: 'La isla de las mil caras',
    description: 'Mallorca es la reina de las Baleares. Desde la Sierra de Tramuntana (Patrimonio de la UNESCO) hasta calas de agua caribeña, pasando por Palma y su catedral gótica frente al mar. Perfecta para todos los gustos: turismo cultural, playas paradisíacas, pueblos con encanto y una gastronomía que te sorprenderá.',
    heroImage: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1920&h=1080&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&q=80',
    ],
    rating: 4.8,
    activitiesCount: 42,

    metaTitle: 'Mallorca Guía de Viaje 2024 | Playas, Pueblos y Qué Ver',
    metaDescription: 'Descubre Mallorca: la isla más completa de Baleares. Guía con las mejores calas, pueblos con encanto, Sierra de Tramuntana y consejos prácticos.',

    quickFacts: {
      bestTime: 'Mayo - Octubre',
      currency: 'Euro (€)',
      language: 'Español/Catalán',
      timezone: 'GMT+1',
    },

    howToGet: {
      byPlane: 'El aeropuerto de Palma (PMI) es uno de los más conectados de España. Vuelos directos desde Madrid (1h 15min), Barcelona (45min) y las principales ciudades europeas.',
      byBoat: 'Ferrys desde Barcelona (4h), Valencia (4h 30min) y Denia (2h). Balearia y Transmediterránea operan todo el año.',
      byCar: 'Alquila coche en el aeropuerto para explorar la isla. La Sierra de Tramuntana y las calas del este requieren vehículo.',
    },

    whereToSleep: {
      intro: 'Mallorca tiene alojamiento para todos los gustos: desde hoteles boutique en casas señoriales hasta resorts de lujo frente al mar.',
      areas: [
        {
          name: 'Palma Centro',
          description: 'La capital ofrece cultura, compras y gastronomía. La Catedral de Palma y el casco antiguo son imprescindibles.',
          bestFor: 'Ciudad, cultura, nightlife',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=Palma+de+Mallorca&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
        {
          name: 'Valldemossa / Deià',
          description: 'Pueblos de montaña con encanto bohemio en la Sierra de Tramuntana. Vistas increíbles y paz absoluta.',
          bestFor: 'Romántico, naturaleza, escritores',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=Valldemossa&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
        {
          name: 'Calas del Este',
          description: 'Porto Cristo, Cala Millor, Cala Ratjada. Las mejores playas de arena blanca y agua cristalina.',
          bestFor: 'Playas, familias, relax',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=Cala+Ratjada&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
      ],
    },

    whatToDo: {
      intro: 'Mallorca tiene de todo: playas caribeñas, montañas espectaculares, pueblos con encanto y una capital vibrante.',
      activities: [
        {
          name: 'Sierra de Tramuntana',
          description: 'Patrimonio de la UNESCO. Conduce por carreteras escénicas entre pueblos de piedra como Valldemossa, Deià y Sóller.',
          tip: 'Coge el tren + tranvía desde Palma a Sóller y Puerto de Sóller. Una experiencia clásica.',
        },
        {
          name: 'Caló des Moro',
          description: 'La playa más fotografiada de Mallorca. Agua turquesa y arena blanca entre acantilados.',
          tip: 'Aparca en Cala Llombards y camina 20min. Llega antes de las 9am en verano.',
        },
        {
          name: 'Catedral de Palma',
          description: 'La Seu es una joya gótica frente al mar. Los vitrales son espectaculares cuando entra la luz.',
          tip: 'Visítala por la mañana temprano para ver el rossetón iluminado.',
        },
        {
          name: 'Cap de Formentor',
          description: 'El punto más al norte con acantilados de 200m y faro emblemático. Atardeceres inolvidables.',
          tip: 'En verano solo se puede acceder en bus desde Port de Pollença. Reserva antes.',
        },
      ],
    },

    excursions: [
      {
        id: 'mallorca-boat',
        title: 'Barco Costa Tramuntana',
        description: 'Navega desde Palma hasta Puerto de Sóller con snorkel.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80',
        price: 75,
        currency: '€',
        rating: 4.7,
        reviews: 2134,
        duration: '6 horas',
        groupSize: 'Máx. 25 personas',
        affiliateUrl: 'https://www.civitatis.com/es/palma-mallorca/excursion-barco-soller/',
        provider: 'civitatis',
        highlights: ['Comida incluida', 'Snorkel', 'Vistas Tramuntana'],
      },
      {
        id: 'mallorca-drac',
        title: 'Cuevas del Drach + Porto Cristo',
        description: 'Explora las cuevas más famosas de Europa.',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop&q=80',
        price: 45,
        currency: '€',
        rating: 4.6,
        reviews: 3567,
        duration: '4 horas',
        groupSize: 'Grupos',
        affiliateUrl: 'https://www.getyourguide.com/mallorca-l1933/caves-of-drach-porto-cristo-tc163/',
        provider: 'getyourguide',
        highlights: ['Concierto cueva', 'Lago Martel', 'Transporte'],
      },
      {
        id: 'mallorca-soller',
        title: 'Tren de Sóller + Valldemossa',
        description: 'El icónico tren de madera + pueblo bonito.',
        image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&q=80',
        price: 59,
        currency: '€',
        rating: 4.8,
        reviews: 1876,
        duration: 'Todo el día',
        groupSize: 'Grupos',
        affiliateUrl: 'https://www.viator.com/searchResults/all?text=soller+train+mallorca&destId=4593',
        provider: 'viator',
        highlights: ['Tren histórico', 'Valldemossa', 'Chopin'],
      },
      {
        id: 'mallorca-bike',
        title: 'Ruta en Bici Calas del Este',
        description: 'Ciclismo con paradas en calas escondidas.',
        image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=600&fit=crop&q=80',
        price: 45,
        currency: '€',
        rating: 4.9,
        reviews: 567,
        duration: '4 horas',
        groupSize: 'Máx. 10 personas',
        affiliateUrl: 'https://www.civitatis.com/es/palma-mallorca/ruta-bicicleta/',
        provider: 'civitatis',
        highlights: ['Bici incluida', 'Nivel medio', 'Snorkel'],
      },
    ],

    affiliateLinks: {
      skyscanner: 'https://www.skyscanner.net/transport/flights/mad/pmi/',
      booking: 'https://www.booking.com/region/es/mallorca.html?aid=123456',
    },
  },

  // ==================== IBIZA ====================
  {
    id: '3',
    slug: 'ibiza-espana',
    name: 'Ibiza',
    country: 'España',
    region: 'Islas Baleares',
    tagline: 'Mucho más que fiesta',
    description: 'Ibiza es famosa por sus fiestas, pero esconde tesoros que pocos conocen: calas vírgenes de agua caribeña, pueblos bohemios, mercados hippies y la mejor puesta de sol del Mediterráneo. La isla blanca te sorprenderá con su cara más auténtica y tranquila.',
    heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&q=80',
    ],
    rating: 4.7,
    activitiesCount: 35,

    metaTitle: 'Ibiza Guía de Viaje 2024 | Playas, Qué Ver y Consejos',
    metaDescription: 'Descubre la Ibiza auténtica: calas vírgenes, puestas de sol épicas, pueblos bohemios y la mejor guía para viajar más allá de la fiesta.',

    quickFacts: {
      bestTime: 'Junio - Septiembre',
      currency: 'Euro (€)',
      language: 'Español/Catalán',
      timezone: 'GMT+1',
    },

    howToGet: {
      byPlane: 'El aeropuerto de Ibiza (IBZ) recibe vuelos de toda Europa en temporada alta. Desde Madrid (1h 10min) y Barcelona (45min) hay vuelos frecuentes.',
      byBoat: 'Ferrys desde Barcelona (4h), Valencia (3h) y Denia (2h). También desde Palma de Mallorca (2h).',
      byCar: 'Alquila coche para descubrir las calas escondidas. La isla es pequeña pero las mejores playas no tienen transporte.',
    },

    whereToSleep: {
      intro: 'Ibiza tiene desde hoteles de lujo con DJ hasta casas rurales en el campo. Elige según tu vibe.',
      areas: [
        {
          name: 'Ibiza Ciudad',
          description: 'La capital con Dalt Vila (Patrimonio UNESCO), puerto y nightlife. Todo a mano.',
          bestFor: 'Noche, cultura, shopping',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=Ibiza+Town&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
        {
          name: 'Santa Eulalia',
          description: 'Más tranquila y familiar. Playa urbana, paseo marítimo y excelentes restaurantes.',
          bestFor: 'Familias, tranquilidad, gastronomía',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=Santa+Eularia+des+Riu&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
        {
          name: 'San Antonio',
          description: 'Famoso por el Café del Mar y sus puestas de sol. La zona más festiva.',
          bestFor: 'Party, sunset, jóvenes',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=San+Antonio+Ibiza&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
      ],
    },

    whatToDo: {
      intro: 'Ibiza es mucho más que discotecas. Sus calas, atardeceres y pueblos bohemios te enamorarán.',
      activities: [
        {
          name: 'Cala Comte y Cala Bassa',
          description: 'Las playas más bonitas de Ibiza. Aguas turquesas cristalinas y arenas blancas.',
          tip: 'Ve al atardecer para evitar multitudes y ver la puesta de sol sobre las islas.',
        },
        {
          name: 'Dalt Vila',
          description: 'El casco antiguo amurallado de Ibiza ciudad. Patrimonio UNESCO con vistas al mar.',
          tip: 'Cena en la muralla y luego pasea bajo las estrellas.',
        },
        {
          name: 'Es Vedrà',
          description: 'El mítico peñón de 400m frente a la costa. Atardecer épico garantizado.',
          tip: 'Ve a las torres de Cala d\'Hort para la mejor vista. Llega 1h antes del sunset.',
        },
        {
          name: 'Mercados Hippies',
          description: 'Las Dalias (sábados) y Punta Arabí (miércoles). Artesanía y ambiente bohemio.',
          tip: 'Llega temprano para aparcar. Son los mercados más auténticos de la isla.',
        },
      ],
    },

    excursions: [
      {
        id: 'ibiza-boat',
        title: 'Excursión a Formentera en Velero',
        description: 'Descubre la isla vecina con las playas más cristalinas.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80',
        price: 85,
        currency: '€',
        rating: 4.9,
        reviews: 2876,
        duration: '8 horas',
        groupSize: 'Máx. 12 personas',
        affiliateUrl: 'https://www.civitatis.com/es/ibiza/excursion-formentera-velero/',
        provider: 'civitatis',
        highlights: ['Comida gourmet', 'Ses Illetes', 'Snorkel'],
      },
      {
        id: 'ibiza-sunset',
        title: 'Sunset Cruise + Champagne',
        description: 'Navega mientras el sol se pone frente a Es Vedrà.',
        image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&h=600&fit=crop&q=80',
        price: 59,
        currency: '€',
        rating: 4.8,
        reviews: 1456,
        duration: '3 horas',
        groupSize: 'Máx. 20 personas',
        affiliateUrl: 'https://www.getyourguide.com/ibiza-l1934/sunset-cruise-es-vedra-tc131/',
        provider: 'getyourguide',
        highlights: ['Champán incluido', 'Es Vedrà', 'Música chill'],
      },
      {
        id: 'ibiza-jeep',
        title: 'Jeep Safari Calas Secretas',
        description: 'Descubre calas escondidas solo accesibles en 4x4.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80',
        price: 65,
        currency: '€',
        rating: 4.7,
        reviews: 634,
        duration: '5 horas',
        groupSize: 'Máx. 8 personas',
        affiliateUrl: 'https://www.viator.com/searchResults/all?text=ibiza+jeep+safari&destId=4595',
        provider: 'viator',
        highlights: ['Calas vírgenes', 'Snorkel', 'Guía local'],
      },
      {
        id: 'ibiza-paddle',
        title: 'Paddle Surf al Atardecer',
        description: 'Paddle con puesta de sol en Es Vedrà.',
        image: 'https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=800&h=600&fit=crop&q=80',
        price: 45,
        currency: '€',
        rating: 4.9,
        reviews: 398,
        duration: '2 horas',
        groupSize: 'Máx. 10 personas',
        affiliateUrl: 'https://www.civitatis.com/es/ibiza/paddle-surf-sunset/',
        provider: 'civitatis',
        highlights: ['Equipo incluido', 'Principiante', 'Fotos'],
      },
    ],

    affiliateLinks: {
      skyscanner: 'https://www.skyscanner.net/transport/flights/mad/ibz/',
      booking: 'https://www.booking.com/region/es/ibiza.html?aid=123456',
    },
  },

  // ==================== TENERIFE ====================
  {
    id: '4',
    slug: 'tenerife-espana',
    name: 'Tenerife',
    country: 'España',
    region: 'Islas Canarias',
    tagline: 'La isla de la eterna primavera',
    description: 'Tenerife es un mundo en una isla: el Teide (pico más alto de España), playas volcánicas, bosques de laurisilva, pueblos coloniales y el mejor clima del mundo. Perfecta todo el año para aventuras, relax y gastronomía canaria auténtica.',
    heroImage: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=1920&h=1080&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop&q=80',
    ],
    rating: 4.8,
    activitiesCount: 38,

    metaTitle: 'Tenerife Guía de Viaje 2024 | Teide, Playas y Qué Ver',
    metaDescription: 'Descubre Tenerife: la isla de la eterna primavera. Guía completa con el Teide, mejores playas, pueblos con encanto y excursiones imprescindibles.',

    quickFacts: {
      bestTime: 'Todo el año',
      currency: 'Euro (€)',
      language: 'Español',
      timezone: 'GMT+0',
    },

    howToGet: {
      byPlane: 'Dos aeropuertos: Tenerife Sur (TFS) y Tenerife Norte (TFN). Más vuelos al Sur. Desde Madrid (2h 45min) y Barcelona (3h).',
      byBoat: 'Ferrys desde Gran Canaria (1h 30min), Lanzarote (6h) y Fuerteventura. Fred Olsen y Naviera Armas.',
      byCar: 'Imprescindible alquilar coche. La isla es grande y las mejores playas requieren vehículo.',
    },

    whereToSleep: {
      intro: 'Tenerife tiene zonas muy diferentes: el sur más cálido y turístico, el norte más verde y auténtico.',
      areas: [
        {
          name: 'Costa Adeje (Sur)',
          description: 'La zona más exclusiva con playas de oro y hoteles de lujo. Clima soleado.',
          bestFor: 'Sol, playas, familias',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=Costa+Adeje&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
        {
          name: 'Puerto de la Cruz (Norte)',
          description: 'El primer destino turístico de Canarias. Ambiente auténtico y jardines tropicales.',
          bestFor: 'Cultura, jardines, auténtico',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=Puerto+de+la+Cruz&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
        {
          name: 'La Laguna / Santa Cruz',
          description: 'La capital y su vecina histórica (Patrimonio UNESCO). Ciudades con vida real.',
          bestFor: 'Ciudad, cultura, shopping',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=San+Cristobal+de+La+Laguna&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
      ],
    },

    whatToDo: {
      intro: 'Tenerife tiene paisajes de otro planeta: desde el desierto volcánico del Teide hasta bosques tropicales.',
      activities: [
        {
          name: 'Parque Nacional del Teide',
          description: 'El volcán más alto de España (3.718m). Paisajes lunares y las mejores estrellas.',
          tip: 'Sube al teleférico y camina al cráter. Necesitas permiso gratuito. Reserva antes.',
        },
        {
          name: 'Masca y Los Acantilados',
          description: 'Pueblo perdido en las montañas con vistas a los acantilados de Los Gigantes.',
          tip: 'La carretera es estrecha. Ve temprano para evitar tráfico.',
        },
        {
          name: 'Loro Parque',
          description: 'El mejor zoológico de España. Pingüinos, orcas y el mayor acuario de Europa.',
          tip: 'Compra online para ahorrar. Dedica mínimo 4 horas.',
        },
        {
          name: 'Playa de Benijo',
          description: 'Playa volcánica salvaje en el norte. Arena negra y el atardecer más bonito.',
          tip: 'Lleva chubasquero - el norte es más fresco y puede llover.',
        },
      ],
    },

    excursions: [
      {
        id: 'tenerife-teide',
        title: 'Teide + Observación de Estrellas',
        description: 'Sube al volcán y observa estrellas en el mejor cielo del mundo.',
        image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&h=600&fit=crop&q=80',
        price: 75,
        currency: '€',
        rating: 4.9,
        reviews: 3267,
        duration: '8 horas',
        groupSize: 'Grupos',
        affiliateUrl: 'https://www.civitatis.com/es/tenerife/excursion-teide-estrellas/',
        provider: 'civitatis',
        highlights: ['Telescopio', 'Cena incluida', 'Astrónomo'],
      },
      {
        id: 'tenerife-whale',
        title: 'Avistamiento de Cetáceos + Kayak',
        description: 'Busca ballenas y delfines en libertad + kayak en cuevas.',
        image: 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=800&h=600&fit=crop&q=80',
        price: 55,
        currency: '€',
        rating: 4.7,
        reviews: 1923,
        duration: '4 horas',
        groupSize: 'Máx. 12 personas',
        affiliateUrl: 'https://www.getyourguide.com/tenerife-l1935/whale-watching-kayak-tc189/',
        provider: 'getyourguide',
        highlights: ['Avistamiento garantizado', 'Kayak', 'Snorkel'],
      },
      {
        id: 'tenerife-masca',
        title: 'Ruta de Masca + Los Gigantes',
        description: 'Descubre el pueblo más bonito y los acantilados.',
        image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800&h=600&fit=crop&q=80',
        price: 45,
        currency: '€',
        rating: 4.6,
        reviews: 2156,
        duration: 'Todo el día',
        groupSize: 'Grupos',
        affiliateUrl: 'https://www.viator.com/searchResults/all?text=masca+tenerife&destId=4596',
        provider: 'viator',
        highlights: ['Masca', 'Acantilados', 'Garachico'],
      },
      {
        id: 'tenerife-jet',
        title: 'Jet Ski Safari Costa Sur',
        description: 'Aventura en jet ski por calas escondidas de Adeje.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80',
        price: 99,
        currency: '€',
        rating: 4.8,
        reviews: 789,
        duration: '2 horas',
        groupSize: 'Máx. 8 personas',
        affiliateUrl: 'https://www.civitatis.com/es/tenerife/jet-ski-adeje/',
        provider: 'civitatis',
        highlights: ['Adrenalina', 'Calas vírgenes', 'Fotos'],
      },
    ],

    affiliateLinks: {
      skyscanner: 'https://www.skyscanner.net/transport/flights/mad/tfs/',
      booking: 'https://www.booking.com/region/es/tenerife.html?aid=123456',
    },
  },

  // ==================== GRANADA ====================
  {
    id: '5',
    slug: 'granada-espana',
    name: 'Granada',
    country: 'España',
    region: 'Andalucía',
    tagline: 'La joya mora de España',
    description: 'Granada es magia pura. La Alhambra, Patrimonio de la UNESCO, te dejará sin palabras. Pasear por el Albaicín mientras suenan las guitarras flamencas y se ve la nieve en Sierra Nevada es una experiencia única. Tapas gratis, historia a cada paso y el encanto del sur de España.',
    heroImage: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=1920&h=1080&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop&q=80',
    ],
    rating: 4.9,
    activitiesCount: 28,

    metaTitle: 'Granada Guía de Viaje 2024 | Alhambra, Tapas y Qué Ver',
    metaDescription: 'Descubre Granada: la ciudad de la Alhambra. Guía completa con cómo visitar la Alhambra, mejores tapeos, Albaicín y excursiones a Sierra Nevada.',

    quickFacts: {
      bestTime: 'Marzo - Mayo / Septiembre - Noviembre',
      currency: 'Euro (€)',
      language: 'Español',
      timezone: 'GMT+1',
    },

    howToGet: {
      byPlane: 'El aeropuerto Federico García Lorca (GRX) tiene vuelos desde Madrid y Barcelona. También puedes volar a Málaga (1h 30min en bus hasta Granada).',
      byBoat: 'No aplica - ciudad interior.',
      byCar: 'Desde Madrid (4h por A-4) o Málaga (1h 30min por A-92). Parking en el centro complicado, usa parkings públicos.',
    },

    whereToSleep: {
      intro: 'Granada tiene alojamientos con encanto en edificios históricos del Albaicín y hoteles con vistas a la Alhambra.',
      areas: [
        {
          name: 'Albaicín',
          description: 'El barrio morisco con calles estrechas, miradores y casas cueva. Vistas a la Alhambra.',
          bestFor: 'Romántico, vistas, auténtico',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=Albaicin+Granada&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
        {
          name: 'Centro / Realejo',
          description: 'Cerca de todo: tapas, compras, Catedral. Más animado y fácil.',
          bestFor: 'Todo a mano, tapeo, nightlife',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=Granada+Centro&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
        {
          name: 'Alhambra / Generalife',
          description: 'Junto a la Alhambra. Más tranquilo y verde. Perfecto para visitas largas.',
          bestFor: 'Tranquilidad, naturaleza, familias',
          bookingUrl: 'https://www.booking.com/searchresults.html?ss=Alhambra+Granada&checkin_year=2024&checkin_month=7&checkin_monthday=1&checkout_year=2024&checkout_month=7&checkout_monthday=8&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR',
        },
      ],
    },

    whatToDo: {
      intro: 'Granada es una ciudad para perderse. Cada rincón tiene historia y las tapas son legendarias.',
      activities: [
        {
          name: 'La Alhambra',
          description: 'El monumento más visitado de España. Palacios nazaries, Generalife y Alcazaba.',
          tip: 'Las entradas se agotan. Reserva 2-3 meses antes. Ve por la mañana para mejor luz.',
        },
        {
          name: 'Albaicín y Mirador San Nicolás',
          description: 'El barrio morisco más bonito de España. Mejor vista de la Alhambra al atardecer.',
          tip: 'Ve al atardecer y quédate para ver la Alhambra iluminada. Calzado cómodo.',
        },
        {
          name: 'Ruta de Tapas',
          description: 'En Granada las tapas son GRATIS con la bebida. Calle Navas y Elvira son los mejores.',
          tip: 'Pide una caña y te traen tapa gratis. 3-4 bares son suficientes.',
        },
        {
          name: 'Sierra Nevada',
          description: 'A solo 30min en coche. Esquí en invierno y senderismo en verano.',
          tip: 'En invierno reserva esquí antes. En verano sube a Mulhacén.',
        },
      ],
    },

    excursions: [
      {
        id: 'granada-alhambra',
        title: 'Visita Guiada a la Alhambra',
        description: 'Todo incluido: entradas, guía experto y transporte.',
        image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800&h=600&fit=crop&q=80',
        price: 49,
        currency: '€',
        rating: 4.9,
        reviews: 4567,
        duration: '3 horas',
        groupSize: 'Máx. 30 personas',
        affiliateUrl: 'https://www.civitatis.com/es/granada/entradas-alhambra/',
        provider: 'civitatis',
        highlights: ['Sin colas', 'Guía oficial', 'Nasaries'],
      },
      {
        id: 'granada-albaicin',
        title: 'Free Tour Albaicín + Sacromonte',
        description: 'Descubre los barrios más emblemáticos con guía local.',
        image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&q=80',
        price: 0,
        currency: '€',
        rating: 4.8,
        reviews: 3234,
        duration: '2h 30min',
        groupSize: 'Grupos',
        affiliateUrl: 'https://www.civitatis.com/es/granada/free-tour-albaicin/',
        provider: 'civitatis',
        highlights: ['Gratis', 'Miradores', 'Cuevas gitanas'],
      },
      {
        id: 'granada-flamenco',
        title: 'Flamenco en el Sacromonte',
        description: 'Espectáculo auténtico en cueva tradicional.',
        image: 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=800&h=600&fit=crop&q=80',
        price: 25,
        currency: '€',
        rating: 4.7,
        reviews: 1876,
        duration: '1h 30min',
        groupSize: 'Máx. 40 personas',
        affiliateUrl: 'https://www.getyourguide.com/granada-l1936/flamenco-sacromonte-tc156/',
        provider: 'getyourguide',
        highlights: ['Cueva auténtica', 'Bebida incluida', 'Vistas'],
      },
      {
        id: 'granada-sierra',
        title: 'Excursión a Sierra Nevada',
        description: 'Día completo en la montaña más alta de la península.',
        image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&h=600&fit=crop&q=80',
        price: 55,
        currency: '€',
        rating: 4.6,
        reviews: 912,
        duration: 'Todo el día',
        groupSize: 'Máx. 20 personas',
        affiliateUrl: 'https://www.viator.com/searchResults/all?text=sierra+nevada+granada&destId=4597',
        provider: 'viator',
        highlights: ['Transporte incluido', 'Senderismo', 'Vistas'],
      },
    ],

    affiliateLinks: {
      skyscanner: 'https://www.skyscanner.net/transport/flights/mad/grx/',
      booking: 'https://www.booking.com/city/es/granada.html?aid=123456',
    },
  },
]

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinos.find((d) => d.slug === slug)
}

export function getAllDestinationSlugs(): string[] {
  return destinos.map((d) => d.slug)
}
