import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, X, Star } from 'lucide-react';
import { searchEvents } from '../data/events';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function SearchResultsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.state?.query || '';
  const results = searchEvents(query);

  return (
    <div className="min-h-screen bg-white pb-8">
      <div className="px-4 pt-[60px] pb-4 sticky top-0 bg-white z-10 border-b border-[#F2F2F7]">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#1A1A2E]" />
          </button>
          <div className="flex-1 flex items-center gap-2 h-12 px-4 bg-[#F2F2F7] rounded-xl">
            <span className="flex-1 text-[15px] text-[#1A1A2E]">{query}</span>
            <button onClick={() => navigate('/search')}>
              <X className="w-5 h-5 text-[#8A8A9A]" />
            </button>
          </div>
          <button
            onClick={() => navigate('/search')}
            className="text-[15px] text-[#4A00E0] font-medium"
          >
            Отмена
          </button>
        </div>

        <h2 className="text-base font-semibold text-[#1A1A2E]">
          Найдено {results.length} событий
        </h2>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {results.map((event) => (
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
                📅 {event.date} • 📍 {event.city}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold text-[#4A00E0]">{event.price}</span>
                <div className="flex items-center gap-1 text-[#FF9500]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">
                    {event.rating} ({event.reviews})
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[15px] text-[#8A8A9A] mb-2">Ничего не найдено</p>
            <p className="text-[13px] text-[#8A8A9A]">Попробуйте изменить запрос</p>
          </div>
        )}
      </div>
    </div>
  );
}
