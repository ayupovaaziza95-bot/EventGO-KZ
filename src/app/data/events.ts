export interface Event {
  id: string;
  title: string;
  titleEn: string;
  category: 'concerts' | 'festivals' | 'nature' | 'cinema' | 'gastronomy' | 'sports';
  date: string;
  city: string;
  price: string;
  priceValue: number;
  rating: number;
  reviews: number;
  imageQuery: string;
  description: string;
  venue: string;
  tags?: string[];
  ticketonUrl?: string;
  featured?: boolean;
}

export const events: Event[] = [
  {
    id: 'dimash-world-tour',
    title: 'Мировое турне Димаша Кудайбергена',
    titleEn: 'Dimash World Tour',
    category: 'concerts',
    date: '2025-06-20',
    city: 'Астана',
    price: 'от 25 000 ₸',
    priceValue: 25000,
    rating: 4.9,
    reviews: 1247,
    imageQuery: 'concert arena lights stage Kazakhstan crowd',
    description: 'Грандиозный концерт мирового уровня от казахстанской звезды Димаша Кудайбергена. Насладитесь невероятным вокалом и зрелищным шоу.',
    venue: 'Астана Арена',
    tags: ['Концерт', 'Мировое турне', 'Димаш'],
    ticketonUrl: 'https://ticketon.kz',
    featured: true,
  },
  {
    id: 'kairat-nurtas-legend',
    title: 'Кайрат Нуртас — Легендарный концерт',
    titleEn: 'Kairat Nurtas Legend Concert',
    category: 'concerts',
    date: '2026-10-31',
    city: 'Астана',
    price: 'от 15 000 ₸',
    priceValue: 15000,
    rating: 4.8,
    reviews: 856,
    imageQuery: 'stadium concert arena Kazakhstan',
    description: 'Легендарный концерт одного из самых популярных исполнителей Казахстана.',
    venue: 'Астана Арена',
    tags: ['Концерт', 'Кайрат Нуртас'],
    ticketonUrl: 'https://ticketon.kz',
    featured: false,
  },
  {
    id: 'solana-festival-2026',
    title: 'Фестиваль Солана 2026',
    titleEn: 'Solana Festival 2026',
    category: 'festivals',
    date: '2026-05-16',
    city: 'Алматы',
    price: 'от 20 000 ₸',
    priceValue: 20000,
    rating: 4.9,
    reviews: 2134,
    imageQuery: 'outdoor music festival crowd night lights',
    description: 'Фло Рида, Тайга, Тимбалэнд, Николь Шерзингер, Баста Раймс и другие звезды мировой величины.',
    venue: 'Центральный стадион Алматы',
    tags: ['Фестиваль', 'Международные звезды'],
    ticketonUrl: 'https://ticketon.kz',
    featured: true,
  },
  {
    id: 'alem-fest-2025',
    title: 'Älem Fest 2025',
    titleEn: 'Alem Fest 2025',
    category: 'festivals',
    date: '2025-07-13',
    city: 'Астана',
    price: 'от 12 000 ₸',
    priceValue: 12000,
    rating: 4.7,
    reviews: 945,
    imageQuery: 'summer music festival Kazakhstan outdoor stage',
    description: 'Крейг Дэвид, Садраддин, Ёлка, Айова и другие артисты.',
    venue: 'Астана Арена',
    tags: ['Фестиваль', 'Лето'],
    ticketonUrl: 'https://ticketon.kz',
    featured: false,
  },
  {
    id: 'trekking-bogdanovich',
    title: 'Трекинг к леднику Богдановича',
    titleEn: 'Bogdanovich Glacier Trekking',
    category: 'nature',
    date: 'каждые выходные',
    city: 'Алматы',
    price: '12 000 ₸',
    priceValue: 12000,
    rating: 4.9,
    reviews: 634,
    imageQuery: 'glacier trekking mountain Almaty Kazakhstan',
    description: 'Захватывающий однодневный поход к леднику Богдановича. Включает трансфер, гида и питание.',
    venue: 'Горы Заилийского Алатау',
    tags: ['Трекинг', 'Горы', 'Природа'],
    featured: true,
  },
  {
    id: 'kaindy-lake-tour',
    title: 'Тур к озеру Каинды',
    titleEn: 'Kaindy Lake Tour',
    category: 'nature',
    date: 'ежедневно',
    city: 'Алматы',
    price: '8 000 ₸',
    priceValue: 8000,
    rating: 4.9,
    reviews: 856,
    imageQuery: 'Kaindy lake Kazakhstan underwater trees',
    description: 'Посетите знаменитое озеро с подводным лесом. Трансфер, гид и обед включены.',
    venue: 'Озеро Каинды',
    tags: ['Озеро', 'Природа', 'Фототур'],
    featured: true,
  },
  {
    id: 'almaty-food-festival',
    title: 'Алматинский кулинарный фестиваль',
    titleEn: 'Almaty Food Festival',
    category: 'gastronomy',
    date: '2025-05-15',
    city: 'Алматы',
    price: '2 000 ₸',
    priceValue: 2000,
    rating: 4.6,
    reviews: 523,
    imageQuery: 'food festival street market colorful',
    description: 'Фестиваль уличной еды с участием лучших ресторанов города.',
    venue: 'Парк имени Первого Президента',
    tags: ['Еда', 'Фестиваль'],
    featured: true,
  },
  {
    id: 'nauryz-festival',
    title: 'Наурыз — Фестиваль весны',
    titleEn: 'Nauryz Spring Festival',
    category: 'festivals',
    date: '2025-03-22',
    city: 'Алматы',
    price: 'бесплатно',
    priceValue: 0,
    rating: 4.8,
    reviews: 1456,
    imageQuery: 'Nauryz celebration Kazakhstan traditional',
    description: 'Празднование Наурыза с традиционными играми, концертами и угощениями.',
    venue: 'Центральная площадь',
    tags: ['Наурыз', 'Традиции', 'Культура'],
    featured: false,
  },
  {
    id: 'jazz-almaty',
    title: 'Джаз Алматы',
    titleEn: 'Jazz Almaty',
    category: 'concerts',
    date: '2025-05-03',
    city: 'Алматы',
    price: '5 000 ₸',
    priceValue: 5000,
    rating: 4.7,
    reviews: 412,
    imageQuery: 'jazz festival outdoor stage park',
    description: 'Вечер джазовой музыки под открытым небом в парке Коктобе.',
    venue: 'Парк Коктобе',
    tags: ['Джаз', 'Концерт'],
    featured: false,
  },
  {
    id: 'charyn-rafting',
    title: 'Рафтинг на реке Чарын',
    titleEn: 'Charyn River Rafting',
    category: 'nature',
    date: 'май–сентябрь',
    city: 'Алматы',
    price: '15 000 ₸',
    priceValue: 15000,
    rating: 4.8,
    reviews: 345,
    imageQuery: 'river rafting adventure canyon',
    description: 'Экстремальный сплав по реке Чарын с инструктором.',
    venue: 'Каньон Чарын',
    tags: ['Рафтинг', 'Приключения'],
    featured: false,
  },
  {
    id: 'alma-fest-2025',
    title: 'Alma Fest 2025',
    titleEn: 'Alma Fest 2025',
    category: 'festivals',
    date: '2025-09-21',
    city: 'Алматы',
    price: 'бесплатно',
    priceValue: 0,
    rating: 4.5,
    reviews: 678,
    imageQuery: 'apple fair outdoor Kazakhstan',
    description: 'Ярмарка яблок, этно-зона и концерты местных артистов.',
    venue: 'Парк Первого Президента',
    tags: ['Фестиваль', 'Яблоки'],
    featured: false,
  },
  {
    id: 'turkestan-fest',
    title: 'Туркестан Фест',
    titleEn: 'Turkestan Fest',
    category: 'festivals',
    date: '2025-05-17',
    city: 'Туркестан',
    price: 'от 5 000 ₸',
    priceValue: 5000,
    rating: 4.6,
    reviews: 234,
    imageQuery: 'cultural festival Kazakhstan traditional',
    description: 'Культурный фестиваль с этно-музыкой и традиционными играми.',
    venue: 'Туркестан Арена',
    tags: ['Культура', 'Традиции'],
    featured: false,
  },
];

export const getCategoryEvents = (category: string) => {
  if (category === 'popular') {
    return events.filter(e => e.featured).slice(0, 8);
  }
  return events.filter(e => e.category === category);
};

export const getEventById = (id: string) => {
  return events.find(e => e.id === id);
};

export const getCityEvents = (city: string) => {
  return events.filter(e => e.city === city);
};

export const searchEvents = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return events.filter(e =>
    e.title.toLowerCase().includes(lowerQuery) ||
    e.titleEn.toLowerCase().includes(lowerQuery) ||
    e.city.toLowerCase().includes(lowerQuery) ||
    e.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
