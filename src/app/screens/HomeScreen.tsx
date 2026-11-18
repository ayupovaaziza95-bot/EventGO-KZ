import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Menu, Bell, Search, Mic, Heart, Flame, Music, Theater, Mountain, Film } from 'lucide-react';
import TabBar from '../components/TabBar';
import { events } from '../data/events';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const categories = [
  { id: 'popular', icon: Flame, label: 'Популярные', color: '#4A00E0' },
  { id: 'concerts', icon: Music, label: 'Концерты', color: '#1A1A2E' },
  { id: 'festivals', icon: Theater, label: 'Фестивали', color: '#1A1A2E' },
  { id: 'nature', icon: Mountain, label: 'Природа', color: '#1A1A2E' },
  { id: 'cinema', icon: Film, label: 'Кино-туры', color: '#1A1A2E' },
];

export default function HomeScreen() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const featuredEvents = events.filter(e => e.featured);
  const upcomingEvents = events.slice(0, 3);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 pt-[54px] pb-4">
        <div className="flex items-center justify-between mb-4">
          <button className="p-2">
            <Menu className="w-6 h-6 text-[#1A1A2E]" />
          </button>
          <h1 className="text-xl font-semibold text-[#1A1A2E]">EventGO KZ</h1>
          <div className="flex items-center gap-2">
            <button className="p-2">
              <Bell className="w-6 h-6 text-[#1A1A2E]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A00E0] to-[#8E2DE2] border-2 border-[#4A00E0]" onClick={() => navigate('/profile')} />
          </div>
        </div>

        <button
          onClick={() => navigate('/search')}
          className="w-full h-12 bg-[#F2F2F7] rounded-xl flex items-center px-4 gap-3"
        >
          <Search className="w-[18px] h-[18px] text-[#8A8A9A]" />
          <span className="text-[15px] text-[#8A8A9A]">Куда хотите поехать?</span>
          <Mic className="w-[18px] h-[18px] text-[#8A8A9A] ml-auto" />
        </button>
      </div>

      <div className="px-4 pb-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === 'popular';
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/events/${cat.id}`)}
                className={`flex items-center gap-2 px-3 h-9 rounded-[18px] whitespace-nowrap ${
                  isActive ? 'bg-[#4A00E0] text-white' : 'bg-[#F2F2F7] text-[#1A1A2E]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{cat.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => navigate('/trips')}
            className="flex items-center gap-2 px-3 h-9 rounded-[18px] whitespace-nowrap bg-[#F2F2F7] text-[#1A1A2E]"
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Избранное</span>
          </button>
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[#1A1A2E]">✨ Рекомендации для вас</h2>
          <button onClick={() => navigate('/events/popular')} className="text-sm text-[#4A00E0]">
            Все →
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/event/${event.id}`)}
              className="flex-shrink-0 w-[175px] bg-white rounded-[20px] shadow-sm border border-gray-100"
            >
              <div className="relative">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&q=80`}
                  alt={event.title}
                  className="w-full h-[120px] object-cover rounded-t-[20px]"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(event.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(event.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-[#1A1A2E] mb-1 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-[13px] text-[#8A8A9A] mb-2">{event.date}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#4A00E0]">{event.price}</span>
                  <span className="px-2 py-1 bg-[rgba(74,0,224,0.1)] text-[#4A00E0] text-xs rounded-lg">
                    🔥 Интересно
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-[#1A1A2E] mb-3">⏰ Скоро</h2>
        <div className="space-y-0">
          {upcomingEvents.map((event, idx) => (
            <div
              key={event.id}
              onClick={() => navigate(`/event/${event.id}`)}
              className={`flex items-center gap-3 py-4 ${
                idx !== upcomingEvents.length - 1 ? 'border-b border-[#F2F2F7]' : ''
              }`}
            >
              <div className="w-12 h-12 bg-[#4A00E0] rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-base font-bold text-white">
                  {new Date(event.date).getDate()}
                </span>
                <span className="text-[11px] text-white">
                  {new Date(event.date).toLocaleDateString('ru', { month: 'short' })}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-[#1A1A2E] mb-1">{event.title}</h3>
                <p className="text-[13px] text-[#8A8A9A]">
                  {event.city} • {event.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mb-6">
        <button
          onClick={() => navigate('/ai-recommendations')}
          className="w-full h-16 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] rounded-2xl flex items-center justify-between px-5 text-white"
        >
          <span className="text-[15px] font-semibold">🤖 AI-подборка для вас</span>
          <span className="text-xl">→</span>
        </button>
      </div>

      <TabBar />
    </div>
  );
}
