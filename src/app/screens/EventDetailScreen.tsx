import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Heart, MoreVertical, Star, MapPin, Calendar, Ticket } from 'lucide-react';
import { Button } from '../components/ui/button';
import { getEventById, events } from '../data/events';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function EventDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const event = getEventById(id || '');
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState('standard');
  const [ticketCount, setTicketCount] = useState(2);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!event) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-[#8A8A9A]">Событие не найдено</p>
      </div>
    );
  }

  const tickets = [
    { id: 'vip', label: 'VIP', price: event.priceValue * 3 },
    { id: 'standard', label: 'Стандарт', price: event.priceValue },
    { id: 'economy', label: 'Эконом', price: Math.floor(event.priceValue * 0.6) },
  ];

  const similarEvents = events.filter(e => e.category === event.category && e.id !== event.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white pb-8">
      <div className="relative">
        <ImageWithFallback
          src={`https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80`}
          alt={event.title}
          className="w-full h-[280px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-20" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-[60px] left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-[#1A1A2E]" />
        </button>

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-[60px] right-[60px] w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[#1A1A2E]'}`}
          />
        </button>

        <button className="absolute top-[60px] right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
          <MoreVertical className="w-5 h-5 text-[#1A1A2E]" />
        </button>

        <div className="absolute bottom-3 left-4 flex gap-2">
          {[1, 2, 3, 4].map((_, idx) => (
            <div
              key={idx}
              className="w-20 h-[60px] bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
            />
          ))}
        </div>
      </div>

      <div className="px-4 py-5 bg-white rounded-t-[24px] -mt-6 relative">
        <h1 className="text-[24px] font-bold text-[#1A1A2E] mb-3">{event.title}</h1>

        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-2 text-[#8A8A9A]">
            <Calendar className="w-4 h-4" />
            <span className="text-[15px]">{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-[#8A8A9A]">
            <MapPin className="w-4 h-4" />
            <span className="text-[15px]">{event.city}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= Math.floor(event.rating)
                  ? 'fill-[#FF9500] text-[#FF9500]'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-[15px] font-medium text-[#FF9500]">
            {event.rating} ({event.reviews}k)
          </span>
        </div>

        <div className="h-px bg-[#F2F2F7] my-4" />

        <div className="mb-4">
          <h2 className="text-[17px] font-semibold text-[#1A1A2E] mb-2">О событии</h2>
          <p
            className={`text-[14px] text-[#8A8A9A] leading-relaxed ${
              !showFullDescription ? 'line-clamp-3' : ''
            }`}
          >
            {event.description}
          </p>
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-[14px] text-[#4A00E0] font-medium mt-1"
          >
            {showFullDescription ? 'Свернуть' : 'Читать далее'}
          </button>
        </div>

        <div className="mb-4">
          <h2 className="text-[17px] font-semibold text-[#1A1A2E] mb-2">Где проходит</h2>
          <p className="text-[14px] text-[#8A8A9A] mb-3">{event.venue}</p>

          <div
            onClick={() => navigate(`/map/${event.id}`)}
            className="w-full h-[140px] bg-gray-100 rounded-2xl overflow-hidden relative cursor-pointer"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80"
              alt="Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#4A00E0] rounded-full border-4 border-white shadow-lg" />
            <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-white rounded-lg shadow text-xs font-medium text-[#4A00E0]">
              Открыть в картах
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-[17px] font-semibold text-[#1A1A2E] mb-3">Билеты</h2>
          <div className="flex gap-2 mb-3">
            {tickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket.id)}
                className={`flex-1 py-3 px-3 rounded-xl border-2 transition-all ${
                  selectedTicket === ticket.id
                    ? 'border-[#4A00E0] bg-[rgba(74,0,224,0.05)]'
                    : 'border-[#F2F2F7] bg-white'
                }`}
              >
                <div className="text-xs text-[#8A8A9A] mb-1">{ticket.label}</div>
                <div className="text-sm font-semibold text-[#4A00E0]">
                  {ticket.price.toLocaleString()} ₸
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between bg-[#F2F2F7] rounded-xl p-3">
            <span className="text-[15px] text-[#1A1A2E]">Количество</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-lg font-semibold text-[#1A1A2E]"
              >
                −
              </button>
              <span className="text-[17px] font-semibold text-[#1A1A2E] w-6 text-center">
                {ticketCount}
              </span>
              <button
                onClick={() => setTicketCount(ticketCount + 1)}
                className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-lg font-semibold text-[#1A1A2E]"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {similarEvents.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[17px] font-semibold text-[#1A1A2E] mb-3">Похожие события</h2>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {similarEvents.map((e) => (
                <div
                  key={e.id}
                  onClick={() => navigate(`/event/${e.id}`)}
                  className="flex-shrink-0 w-40 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&q=80`}
                    alt={e.title}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-[#1A1A2E] mb-1 line-clamp-2">
                      {e.title}
                    </h3>
                    <p className="text-xs text-[#4A00E0] font-semibold">{e.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={() => navigate(`/plan/${event.id}`)}
            variant="outline"
            className="flex-1 h-14 rounded-2xl border-[#4A00E0] text-[#4A00E0] font-semibold"
          >
            Спланировать
          </Button>
          <Button
            onClick={() => {
              if (event.ticketonUrl) {
                window.open(event.ticketonUrl, '_blank');
              } else {
                navigate(`/booking/date/${event.id}`);
              }
            }}
            className="flex-[1.4] h-14 bg-[#4A00E0] hover:bg-[#3a00b0] text-white rounded-2xl font-semibold"
          >
            <Ticket className="w-5 h-5 mr-2" />
            Купить билет
          </Button>
        </div>

        {event.ticketonUrl && (
          <Button
            onClick={() => window.open(event.ticketonUrl, '_blank')}
            className="w-full h-12 mt-3 bg-[#003580] hover:bg-[#002660] text-white rounded-2xl font-semibold"
          >
            Купить на Ticketon.kz
          </Button>
        )}
      </div>
    </div>
  );
}
