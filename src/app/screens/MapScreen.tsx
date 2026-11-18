import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Navigation } from 'lucide-react';
import { Button } from '../components/ui/button';
import { getEventById } from '../data/events';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function MapScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const event = eventId !== 'all' ? getEventById(eventId || '') : null;

  const points = [
    { id: 1, name: 'Площадь Республики', color: 'green', top: '35%', left: '45%' },
    { id: 2, name: event?.venue || 'Конгресс-холл', color: 'blue', top: '50%', left: '55%' },
    { id: 3, name: 'Метро Байконур', color: 'red', top: '65%', left: '40%' },
  ];

  return (
    <div className="h-screen bg-white relative">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80"
        alt="Map"
        className="w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-sm h-[60px] flex items-center px-4 border-b border-[#F2F2F7]">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-[#1A1A2E]" />
        </button>
        <h1 className="text-[17px] font-semibold text-[#1A1A2E] ml-2">Маршрут</h1>
        <button
          onClick={() => window.open('https://2gis.kz/almaty/directions', '_blank')}
          className="ml-auto text-[14px] font-medium text-[#4A00E0]"
        >
          2GIS →
        </button>
      </div>

      {points.map((point) => (
        <div
          key={point.id}
          className="absolute w-6 h-6 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
          style={{
            top: point.top,
            left: point.left,
            backgroundColor: point.color === 'green' ? '#34C759' : point.color === 'blue' ? '#4A00E0' : '#FF3B30'
          }}
        />
      ))}

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          d={`M ${window.innerWidth * 0.45} ${window.innerHeight * 0.35}
              Q ${window.innerWidth * 0.5} ${window.innerHeight * 0.42}
              ${window.innerWidth * 0.55} ${window.innerHeight * 0.5}
              Q ${window.innerWidth * 0.47} ${window.innerHeight * 0.57}
              ${window.innerWidth * 0.4} ${window.innerHeight * 0.65}`}
          stroke="#4A00E0"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="8 4"
        />
      </svg>

      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[20px] shadow-2xl">
        <div className="w-9 h-1 bg-[#D1D1D6] rounded-full mx-auto mt-3 mb-4" />

        <div className="px-4 pb-4">
          <h2 className="text-base font-semibold text-[#1A1A2E] mb-3">
            {event ? event.title : 'Маршрут события'}
          </h2>

          <div className="space-y-2 mb-4">
            {points.map((point) => (
              <div key={point.id} className="flex items-center gap-3 text-sm text-[#1A1A2E]">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: point.color === 'green' ? '#34C759' : point.color === 'blue' ? '#4A00E0' : '#FF3B30'
                  }}
                />
                <span>{point.name}</span>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-[#8A8A9A] mb-4">3.2 км • 42 мин пешком</p>

          <Button
            onClick={() => window.open('https://2gis.kz/almaty/directions', '_blank')}
            className="w-full h-12 bg-[#4A00E0] hover:bg-[#3a00b0] text-white rounded-xl"
          >
            <Navigation className="w-5 h-5 mr-2" />
            Открыть в 2GIS
          </Button>
        </div>
      </div>
    </div>
  );
}
