import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Star, Heart } from 'lucide-react';
import { useState } from 'react';
import { getCategoryEvents } from '../data/events';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const categoryNames: Record<string, { emoji: string; title: string }> = {
  popular: { emoji: '🔥', title: 'Популярные события' },
  concerts: { emoji: '🎤', title: 'Концерты' },
  festivals: { emoji: '🎭', title: 'Фестивали' },
  nature: { emoji: '🏔️', title: 'Природа' },
  cinema: { emoji: '🎬', title: 'Кино-туры' },
  gastronomy: { emoji: '🍽️', title: 'Гастрономия' },
  sports: { emoji: '⚽', title: 'Спорт' },
};

export default function EventListScreen() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categoryInfo = categoryNames[category || 'popular'];
  const events = getCategoryEvents(category || 'popular');

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
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
    <div className="min-h-screen bg-white pb-8">
      <div className="px-4 pt-[60px] pb-4 sticky top-0 bg-white z-10 border-b border-[#F2F2F7]">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#1A1A2E]" />
          </button>
          <h1 className="text-[24px] font-bold text-[#1A1A2E]">
            {categoryInfo.emoji} {categoryInfo.title}
          </h1>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(`/event/${event.id}`)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="relative">
              <ImageWithFallback
                src={`https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80`}
                alt={event.title}
                className="w-full h-[170px] object-cover"
              />

              <div className="absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
                {event.category === 'concerts' && '🎤 Концерт'}
                {event.category === 'festivals' && '🎭 Фестиваль'}
                {event.category === 'nature' && '🏔️ Природа'}
                {event.category === 'cinema' && '🎬 Кино-тур'}
              </div>

              <button
                onClick={(e) => toggleFavorite(event.id, e)}
                className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.has(event.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-[17px] font-semibold text-[#1A1A2E] mb-2">{event.title}</h3>
              <p className="text-[13px] text-[#8A8A9A] mb-3">
                📅 {event.date} • 📍 {event.city}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold text-[#4A00E0]">{event.price}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#FF9500] text-[#FF9500]" />
                  <span className="text-sm font-medium text-[#FF9500]">
                    {event.rating} ({event.reviews})
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[15px] text-[#8A8A9A]">Событий пока нет</p>
          </div>
        )}
      </div>
    </div>
  );
}
