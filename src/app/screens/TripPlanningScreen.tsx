import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, ChevronDown, ChevronUp, Train, Hotel, Map as MapIcon, Wallet, Edit, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { getEventById } from '../data/events';

type Section = 'transport' | 'accommodation' | 'route' | 'budget' | null;

export default function TripPlanningScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const event = getEventById(eventId || '');
  const [expandedSection, setExpandedSection] = useState<Section>('transport');

  if (!event) return null;

  const toggleSection = (section: Section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const transportOptions = [
    { id: 'train', icon: '🚆', label: 'Поезд', price: '2 500 ₸', time: '4 часа' },
    { id: 'bus', icon: '🚌', label: 'Автобус', price: '1 500 ₸', time: '5 часов' },
    { id: 'taxi', icon: '🚖', label: 'Такси', price: '12 000 ₸', time: '3 часа' },
    { id: 'plane', icon: '✈️', label: 'Самолёт', price: '18 000 ₸', time: '1 час' },
    { id: 'car', icon: '🚗', label: 'Авто', price: '5 000 ₸', time: '4 часа' },
  ];

  const [selectedTransport, setSelectedTransport] = useState('train');

  return (
    <div className="min-h-screen bg-white pb-8">
      <div className="px-4 pt-[60px] pb-4 sticky top-0 bg-white z-10 border-b border-[#F2F2F7]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#1A1A2E]" />
          </button>
          <h1 className="text-[28px] font-bold text-[#1A1A2E]">Планирование</h1>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        <div className="border border-[#F2F2F7] rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('transport')}
            className="w-full flex items-center justify-between p-4 bg-white"
          >
            <div className="flex items-center gap-3">
              <Train className="w-6 h-6 text-[#4A00E0]" />
              <span className="text-[17px] font-semibold text-[#1A1A2E]">🚆 Транспорт</span>
            </div>
            {expandedSection === 'transport' ? (
              <ChevronUp className="w-5 h-5 text-[#8A8A9A]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#8A8A9A]" />
            )}
          </button>

          {expandedSection === 'transport' && (
            <div className="p-4 pt-0 bg-white">
              <div className="flex gap-2 mb-4">
                <div className="flex-1 h-12 bg-[#F2F2F7] rounded-xl flex items-center justify-center text-sm font-medium text-[#1A1A2E]">
                  📍 Алматы
                </div>
                <div className="w-8 h-12 flex items-center justify-center">
                  <span className="text-[#8A8A9A]">→</span>
                </div>
                <div className="flex-1 h-12 bg-[#F2F2F7] rounded-xl flex items-center justify-center text-sm font-medium text-[#1A1A2E]">
                  📍 {event.city}
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {transportOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedTransport(option.id)}
                    className={`flex-shrink-0 w-[120px] rounded-2xl p-3 border-2 transition-all ${
                      selectedTransport === option.id
                        ? 'border-[#4A00E0] bg-[rgba(74,0,224,0.05)]'
                        : 'border-[#F2F2F7] bg-white'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="text-xs text-[#8A8A9A] mb-1">{option.label}</div>
                    <div className="text-sm font-semibold text-[#4A00E0] mb-1">{option.price}</div>
                    <div className="text-xs text-[#8A8A9A]">{option.time}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border border-[#F2F2F7] rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('accommodation')}
            className="w-full flex items-center justify-between p-4 bg-white"
          >
            <div className="flex items-center gap-3">
              <Hotel className="w-6 h-6 text-[#4A00E0]" />
              <span className="font-semibold text-[#1A1A2E] text-[20px]">🏨 Проживание</span>
            </div>
            {expandedSection === 'accommodation' ? (
              <ChevronUp className="w-5 h-5 text-[#8A8A9A]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#8A8A9A]" />
            )}
          </button>

          {expandedSection === 'accommodation' && (
            <div className="p-4 pt-0 bg-white space-y-3">
              <Button
                onClick={() => navigate(`/accommodation/${eventId}`)}
                className="w-full h-12 bg-[#4A00E0] hover:bg-[#3a00b0] text-white rounded-xl"
              >
                Выбрать жильё
              </Button>

              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-[#F8F7FC] rounded-xl">
                  <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-[#1A1A2E] mb-1">Rixos Almaty</h3>
                    <p className="text-xs text-[#8A8A9A] mb-2">⭐ 4.9 (2.1k)</p>
                    <p className="font-semibold text-[#4A00E0] text-[14px]">275 000 ₸ / ночь</p>
                  </div>
                  <Button
                    onClick={() => window.open('https://booking.kz', '_blank')}
                    size="sm"
                    className="self-end bg-[#003580] hover:bg-[#002660] text-white text-xs"
                  >
                    Booking.kz
                  </Button>
                </div>

                <div className="flex gap-3 p-3 bg-[#F8F7FC] rounded-xl">
                  <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-[#1A1A2E] mb-1">Апартаменты в Алматы</h3>
                    <p className="text-xs text-[#8A8A9A] mb-2">⭐ 4.5 (456)</p>
                    <p className="text-sm font-semibold text-[#4A00E0]">20 000 ₸ / ночь</p>
                  </div>
                  <Button
                    onClick={() => window.open('https://krisha.kz', '_blank')}
                    size="sm"
                    className="self-end bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs"
                  >
                    Krisha.kz
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border border-[#F2F2F7] rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('route')}
            className="w-full flex items-center justify-between p-4 bg-white"
          >
            <div className="flex items-center gap-3">
              <MapIcon className="w-6 h-6 text-[#4A00E0]" />
              <span className="text-[17px] font-semibold text-[#1A1A2E]">🗺️ Маршрут</span>
            </div>
            {expandedSection === 'route' ? (
              <ChevronUp className="w-5 h-5 text-[#8A8A9A]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#8A8A9A]" />
            )}
          </button>

          {expandedSection === 'route' && (
            <div className="p-4 pt-0 bg-white">
              <div className="space-y-2 mb-3">
                {['Площадь Республики', event.venue, 'Парк Первого Президента', 'Ресторан "Гакку"'].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                      <div className={`w-full h-full ${
                        idx === 0 ? 'bg-green-500' :
                        idx === 1 ? 'bg-blue-500' :
                        idx === 2 ? 'bg-purple-500' : 'bg-orange-500'
                      }`} />
                    </div>
                    <span className="text-sm text-[#1A1A2E]">{point}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => navigate(`/map/${eventId}`)}
                variant="outline"
                className="w-full h-12 rounded-xl"
              >
                Открыть карту
              </Button>
            </div>
          )}
        </div>

        <div className="border border-[#F2F2F7] rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('budget')}
            className="w-full flex items-center justify-between p-4 bg-white"
          >
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6 text-[#4A00E0]" />
              <span className="text-[17px] font-semibold text-[#1A1A2E]">💰 Бюджет</span>
            </div>
            {expandedSection === 'budget' ? (
              <ChevronUp className="w-5 h-5 text-[#8A8A9A]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#8A8A9A]" />
            )}
          </button>

          {expandedSection === 'budget' && (
            <div className="p-4 pt-0 bg-white">
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8A8A9A]">Транспорт</span>
                  <span className="text-[#1A1A2E] font-medium">15 500 ₸</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8A8A9A]">Проживание</span>
                  <span className="text-[#1A1A2E] font-medium">18 000 ₸</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  
                  
                </div>
                <div className="h-px bg-[#F2F2F7] my-2" />
                <div className="flex justify-between">
                  <span className="text-base font-bold text-[#1A1A2E]">Итого</span>
                  <span className="text-base font-bold text-[#1A1A2E]">33 500 ₸</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => navigate(`/booking/date/${eventId}`)}
                  className="w-full flex items-center justify-center gap-2 text-sm text-[#4A00E0] font-medium py-2"
                >
                  <Edit className="w-4 h-4" />
                  Изменить дату
                </button>
                <button
                  onClick={() => navigate('/collaborative')}
                  className="w-full flex items-center justify-center gap-2 text-sm text-[#4A00E0] font-medium py-2"
                >
                  <Users className="w-4 h-4" />
                  Добавить участников
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#F2F2F7]">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 h-12 rounded-xl">
            Сохранить
          </Button>
          <Button
            onClick={() => navigate(`/booking/date/${eventId}`)}
            className="flex-[1.2] h-12 bg-[#4A00E0] hover:bg-[#3a00b0] text-white rounded-xl"
          >
            Забронировать всё
          </Button>
        </div>
      </div>
    </div>
  );
}
