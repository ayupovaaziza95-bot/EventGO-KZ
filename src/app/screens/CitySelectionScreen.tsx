import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Star } from 'lucide-react';
import { getCityEvents } from '../data/events';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const cities = [
  { id: 'almaty', name: 'Алматы', nameEn: 'Almaty' },
  { id: 'astana', name: 'Астана', nameEn: 'Astana' },
  { id: 'shymkent', name: 'Шымкент', nameEn: 'Shymkent' },
  { id: 'turkestan', name: 'Туркестан', nameEn: 'Turkestan' },
];

export default function CitySelectionScreen() {
  const navigate = useNavigate();
  const { city } = useParams();
  const [activeCity, setActiveCity] = useState(city || 'almaty');

  const currentCity = cities.find(c => c.id === activeCity);
  const cityEvents = getCityEvents(currentCity?.name || 'Алматы');

  return (
    <div className="min-h-screen bg-white pb-8">
      <div className="px-4 pt-[60px] pb-4 sticky top-0 bg-white z-10 border-b border-[#F2F2F7]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/search')} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#1A1A2E]" />
          </button>
          <h1 className="text-[24px] font-bold text-[#1A1A2E]">
            🏙️ {currentCity?.name}
          </h1>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {cities.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCity(c.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                c.id === activeCity
                  ? 'bg-[#4A00E0] text-white'
                  : 'bg-[#F2F2F7] text-[#1A1A2E]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {cityEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(`/event/${event.id}`)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <ImageWithFallback
              src={`https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80`}
              alt={event.title}
              className="w-full h-[170px] object-cover"
            />

            <div className="p-4">
              <h3 className="text-[17px] font-semibold text-[#1A1A2E] mb-2">{event.title}</h3>
              <p className="text-[13px] text-[#8A8A9A] mb-2">
                📅 {event.date} • {event.venue}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold text-[#4A00E0]">{event.price}</span>
                <div className="flex items-center gap-1 text-[#FF9500]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">
                    {event.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {cityEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[15px] text-[#8A8A9A]">
              Событий в этом городе пока нет
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
