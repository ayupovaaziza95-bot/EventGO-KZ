import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Settings, X, Clock, ChevronRight, MapPin } from 'lucide-react';
import TabBar from '../components/TabBar';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const searchTags = [
  { id: 'concert', label: 'концерт', route: '/events/concerts' },
  { id: 'festival', label: 'фестиваль', route: '/events/festivals' },
  { id: 'nature', label: 'природа', route: '/events/nature' },
  { id: 'cinema', label: 'кино-тур', route: '/events/cinema' },
  { id: 'almaty', label: 'Алматы', route: '/search/city/almaty' },
  { id: 'astana', label: 'Астана', route: '/search/city/astana' },
];

const recentSearches = [
  { id: 1, text: 'Фестиваль Алматы — мой город', route: '/events/festivals' },
  { id: 2, text: 'Астана Опера', route: '/events/concerts' },
  { id: 3, text: 'Озеро Каинды', route: '/event/kaindy-lake-tour' },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate('/search/results', { state: { query: searchText } });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 pt-[70px] pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[28px] font-bold text-[#1A1A2E]">Поиск</h1>
          <button
            onClick={() => navigate('/filters')}
            className="text-[15px] font-medium text-[#4A00E0] flex items-center gap-1"
          >
            <Settings className="w-5 h-5" />
            Фильтры
          </button>
        </div>

        <div className={`relative mb-4 ${isFocused ? 'ring-2 ring-[#4A00E0] rounded-xl' : ''}`}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A9A]" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Поиск событий..."
            className="w-full h-12 pl-12 pr-12 bg-[#F2F2F7] rounded-xl border-0 text-[15px] focus:outline-none"
          />
          {searchText && (
            <button
              onClick={() => setSearchText('')}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="w-5 h-5 text-[#8A8A9A]" />
            </button>
          )}
        </div>

        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {searchTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => navigate(tag.route)}
                className="px-4 py-2 bg-[#F2F2F7] rounded-full text-sm text-[#1A1A2E] whitespace-nowrap hover:bg-[#4A00E0] hover:text-white transition-colors"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-semibold text-[#1A1A2E]">Недавние</h2>
            <button className="text-sm text-[#4A00E0]">Очистить</button>
          </div>

          <div className="space-y-0">
            {recentSearches.map((search, idx) => (
              <button
                key={search.id}
                onClick={() => navigate(search.route)}
                className={`w-full flex items-center gap-3 py-3 ${
                  idx !== recentSearches.length - 1 ? 'border-b border-[#F2F2F7]' : ''
                }`}
              >
                <Clock className="w-[18px] h-[18px] text-[#8A8A9A] flex-shrink-0" />
                <span className="flex-1 text-left text-[15px] text-[#1A1A2E]">{search.text}</span>
                <ChevronRight className="w-4 h-4 text-[#D1D1D6] flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-[15px] font-semibold text-[#1A1A2E] mb-3">Популярные направления</h2>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/search/city/almaty')}
              className="flex-1 h-[100px] rounded-2xl overflow-hidden relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&q=80"
                alt="Алматы"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">Алматы</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/search/city/astana')}
              className="flex-1 h-[100px] rounded-2xl overflow-hidden relative"
            >
              <ImageWithFallback
                src="https://blog-cdn.aviata.kz/posts/thumbnails/0_a60c53028dd10c1ae198a118cfb7be9a49f29735b3ebce29ddf72cdc5103d1e7.webp"
                alt="Астана"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">Астана</span>
              </div>
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-[15px] font-semibold text-[#1A1A2E] mb-3">Поиск на карте</h2>
          <button
            onClick={() => navigate('/map/all')}
            className="w-full h-[200px] rounded-2xl overflow-hidden relative"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80"
              alt="Карта Казахстана"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#4A00E0] rounded-full border-2 border-white shadow-lg" />
            <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-[#4A00E0] rounded-full border-2 border-white shadow-lg" />
            <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-[#4A00E0] rounded-full border-2 border-white shadow-lg" />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4A00E0]" />
                <span className="text-sm font-semibold text-[#1A1A2E]">Открыть карту</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      <TabBar />
    </div>
  );
}
