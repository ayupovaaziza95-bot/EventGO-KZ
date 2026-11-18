import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '../components/ui/button';

const accommodations = [
  { id: 1, name: 'Rixos Almaty', type: 'hotel', price: 45000, rating: 4.9, reviews: 2100, image: 'blue' },
  { id: 2, name: 'Казахстан Отель', type: 'hotel', price: 18000, rating: 4.2, reviews: 856, image: 'indigo' },
  { id: 3, name: 'Хостел Smart', type: 'hostel', price: 5500, rating: 4.0, reviews: 234, image: 'green' },
  { id: 4, name: 'Апартаменты на Арбате', type: 'apartment', price: 12000, rating: 4.5, reviews: 456, image: 'orange' },
];

export default function AccommodationScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [activeTab, setActiveTab] = useState<'hotels' | 'apartments'>('hotels');
  const [priceFilter, setPriceFilter] = useState<string>('all');

  const filteredAccommodations = accommodations.filter(acc => {
    if (activeTab === 'hotels' && acc.type !== 'hotel' && acc.type !== 'hostel') return false;
    if (activeTab === 'apartments' && acc.type !== 'apartment') return false;
    if (priceFilter === 'low' && acc.price > 10000) return false;
    if (priceFilter === 'mid' && (acc.price < 10000 || acc.price > 30000)) return false;
    if (priceFilter === 'high' && acc.price < 30000) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white pb-8">
      <div className="px-4 pt-[60px] pb-4 sticky top-0 bg-white z-10 border-b border-[#F2F2F7]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#1A1A2E]" />
          </button>
          <h1 className="text-[28px] font-bold text-[#1A1A2E]">🏨 Жильё</h1>
        </div>

        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setActiveTab('hotels')}
            className={`flex-1 h-10 rounded-xl font-medium transition-all ${
              activeTab === 'hotels'
                ? 'bg-[#4A00E0] text-white'
                : 'bg-[#F2F2F7] text-[#1A1A2E]'
            }`}
          >
            Отели
          </button>
          <button
            onClick={() => setActiveTab('apartments')}
            className={`flex-1 h-10 rounded-xl font-medium transition-all ${
              activeTab === 'apartments'
                ? 'bg-[#4A00E0] text-white'
                : 'bg-[#F2F2F7] text-[#1A1A2E]'
            }`}
          >
            Апартаменты
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {[
            { id: 'all', label: 'Все' },
            { id: 'low', label: 'До 10 000 ₸' },
            { id: 'mid', label: '10–30 000 ₸' },
            { id: 'high', label: '30 000+ ₸' },
            { id: 'rating', label: '⭐ 4.0+' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setPriceFilter(filter.id)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                priceFilter === filter.id
                  ? 'bg-[#4A00E0] text-white'
                  : 'bg-[#F2F2F7] text-[#1A1A2E]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {filteredAccommodations.map((acc) => (
          <div key={acc.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex gap-3 p-3">
              <div className={`w-24 h-24 bg-gradient-to-br from-${acc.image}-400 to-${acc.image}-600 rounded-xl flex-shrink-0`} />
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-[#1A1A2E] mb-1">{acc.name}</h3>
                <p className="text-[13px] text-[#8A8A9A] mb-2">ул. Сейфуллина, 506</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-[#FF9500] text-[#FF9500]" />
                  <span className="text-sm font-medium text-[#FF9500]">
                    {acc.rating} ({(acc.reviews / 1000).toFixed(1)}k)
                  </span>
                </div>
                <p className="text-[15px] font-semibold text-[#4A00E0]">
                  {acc.price.toLocaleString()} ₸ / ночь
                </p>
              </div>
            </div>
            <div className="flex gap-2 p-3 pt-0">
              <Button variant="outline" size="sm" className="flex-1">
                Подробнее
              </Button>
              <Button
                onClick={() => window.open(acc.type === 'apartment' ? 'https://krisha.kz' : 'https://booking.kz', '_blank')}
                size="sm"
                className={`flex-1 ${
                  acc.type === 'apartment'
                    ? 'bg-[#FF5722] hover:bg-[#E64A19]'
                    : 'bg-[#003580] hover:bg-[#002660]'
                } text-white`}
              >
                {acc.type === 'apartment' ? 'Krisha.kz' : 'Booking.kz'}
              </Button>
            </div>
          </div>
        ))}

        <button
          onClick={() => navigate(`/booking/date/${eventId}`)}
          className="w-full py-3 text-[15px] text-[#8A8A9A] font-medium"
        >
          Продолжить без жилья
        </button>
      </div>
    </div>
  );
}
