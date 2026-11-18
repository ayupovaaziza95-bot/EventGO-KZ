import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Star, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import TabBar from '../components/TabBar';

const trips = [
  {
    id: 1,
    title: 'Мировое турне Димаша',
    date: '14–16 мая 2025',
    price: '33 500 ₸',
    status: 'active',
    statusLabel: 'Активно',
    eventId: 'dimash-world-tour',
  },
  {
    id: 2,
    title: 'Трекинг к леднику Богдановича',
    date: '28 апр 2025',
    price: '12 000 ₸',
    status: 'completed',
    statusLabel: 'Завершено',
    eventId: 'trekking-bogdanovich',
  },
  {
    id: 3,
    title: 'Фестиваль Солана 2024',
    date: '20 май 2024',
    price: '20 000 ₸',
    status: 'completed',
    statusLabel: 'Завершено',
    eventId: 'solana-festival-2026',
  },
];

export default function MyTripsScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');

  const filteredTrips = trips.filter(trip => {
    if (activeTab === 'upcoming') return trip.status === 'active';
    if (activeTab === 'past') return trip.status === 'completed';
    if (activeTab === 'cancelled') return trip.status === 'cancelled';
    return true;
  });

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 pt-[70px] pb-4 sticky top-0 bg-white z-10 border-b border-[#F2F2F7]">
        <h1 className="text-[28px] font-bold text-[#1A1A2E] mb-4">Мои поездки</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 pb-2 text-[15px] font-medium transition-colors relative ${
              activeTab === 'upcoming'
                ? 'text-[#4A00E0]'
                : 'text-[#8A8A9A]'
            }`}
          >
            Предстоящие
            {activeTab === 'upcoming' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A00E0]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 pb-2 text-[15px] font-medium transition-colors relative ${
              activeTab === 'past'
                ? 'text-[#4A00E0]'
                : 'text-[#8A8A9A]'
            }`}
          >
            Прошедшие
            {activeTab === 'past' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A00E0]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`flex-1 pb-2 text-[15px] font-medium transition-colors relative ${
              activeTab === 'cancelled'
                ? 'text-[#4A00E0]'
                : 'text-[#8A8A9A]'
            }`}
          >
            Отменённые
            {activeTab === 'cancelled' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A00E0]" />
            )}
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {filteredTrips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => navigate(`/event/${trip.eventId}`)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="flex gap-3 p-4">
              <div className="w-[88px] h-[88px] bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex-shrink-0" />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-[15px] font-semibold text-[#1A1A2E] line-clamp-2">
                    {trip.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                      trip.status === 'active'
                        ? 'bg-[#34C759]/10 text-[#34C759]'
                        : trip.status === 'completed'
                        ? 'bg-[#8A8A9A]/10 text-[#8A8A9A]'
                        : 'bg-[#FF3B30]/10 text-[#FF3B30]'
                    }`}
                  >
                    {trip.statusLabel}
                  </span>
                </div>

                <p className="text-[13px] text-[#8A8A9A] mb-2">📅 {trip.date}</p>
                <p className="text-[15px] font-semibold text-[#4A00E0]">{trip.price}</p>
              </div>
            </div>

            {trip.status === 'active' && (
              <div className="px-4 pb-4">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/event/${trip.eventId}`);
                  }}
                  variant="outline"
                  className="w-full h-10 rounded-xl text-[#4A00E0] border-[#4A00E0]"
                >
                  Подробнее →
                </Button>
              </div>
            )}

            {trip.status === 'completed' && (
              <div className="flex gap-2 px-4 pb-4">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/plan/${trip.eventId}`);
                  }}
                  variant="outline"
                  size="sm"
                  className="flex-1 h-10 rounded-xl"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Повторить
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  variant="outline"
                  size="sm"
                  className="flex-1 h-10 rounded-xl"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Отзыв
                </Button>
              </div>
            )}
          </div>
        ))}

        {filteredTrips.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[15px] text-[#8A8A9A] mb-2">Поездок пока нет</p>
            <Button
              onClick={() => navigate('/home')}
              className="mt-4 bg-[#4A00E0] hover:bg-[#3a00b0] text-white"
            >
              Найти события
            </Button>
          </div>
        )}
      </div>

      <TabBar />
    </div>
  );
}
