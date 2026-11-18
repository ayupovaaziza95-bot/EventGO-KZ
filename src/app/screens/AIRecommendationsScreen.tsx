import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, RefreshCw, X, Star } from 'lucide-react';
import { events } from '../data/events';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const interests = [
  { id: 'concerts', label: '🎤 Концерты', active: true },
  { id: 'nature', label: '🏔️ Природа', active: true },
  { id: 'gastronomy', label: '🍽️ Гастрономия', active: false },
  { id: 'festivals', label: '🎭 Фестивали', active: false },
  { id: 'sports', label: '⚽ Спорт', active: false },
];

export default function AIRecommendationsScreen() {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState(
    new Set(interests.filter(i => i.active).map(i => i.id))
  );

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const recommendedEvents = events
    .filter(e => selectedInterests.has(e.category))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-white pb-8">
      <div className="px-4 pt-[60px] pb-4 sticky top-0 bg-white z-10 border-b border-[#F2F2F7]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#1A1A2E]" />
          </button>
          <h1 className="text-[28px] font-bold text-[#1A1A2E]">🤖 Для вас</h1>
        </div>

        <p className="text-[15px] text-[#8A8A9A] mb-4">На основе ваших просмотров</p>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {interests.map((interest) => (
            <button
              key={interest.id}
              onClick={() => toggleInterest(interest.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                selectedInterests.has(interest.id)
                  ? 'bg-[#4A00E0] text-white'
                  : 'bg-[#F2F2F7] text-[#1A1A2E]'
              }`}
            >
              {interest.label}
              {selectedInterests.has(interest.id) && (
                <X className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {recommendedEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(`/event/${event.id}`)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <ImageWithFallback
              src={`https://vecher.kz/uploads/thumbnail/20251006155314669_big.webp`}
              alt={event.title}
              className="w-full h-[170px] object-cover"
            />

            <div className="p-4">
              <h3 className="text-[17px] font-semibold text-[#1A1A2E] mb-2">{event.title}</h3>
              <p className="text-[13px] text-[#8A8A9A] mb-3">
                📅 {event.date} • 📍 {event.city}
              </p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-[15px] font-semibold text-[#4A00E0]">{event.price}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#FF9500] text-[#FF9500]" />
                  <span className="text-sm font-medium text-[#FF9500]">{event.rating}</span>
                </div>
              </div>

              <p className="text-xs italic text-[#8A8A9A]">
                Потому что вы смотрели Jazz Almaty
              </p>
            </div>
          </div>
        ))}

        {recommendedEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[15px] text-[#8A8A9A] mb-4">
              Выберите хотя бы одну категорию
            </p>
          </div>
        )}
      </div>

      <div className="px-4 pt-6">
        <button className="w-full h-12 flex items-center justify-center gap-2 border border-[#4A00E0] text-[#4A00E0] rounded-xl font-medium">
          <RefreshCw className="w-5 h-5" />
          Обновить рекомендации
        </button>
      </div>
    </div>
  );
}
