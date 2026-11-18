import { useState } from 'react';
import { useNavigate } from 'react-router';
import { X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';

const cities = ['Алматы', 'Астана', 'Шымкент', 'Актау', 'Уральск'];
const dates = ['Ближайшие выходные', 'Этот месяц', 'Следующий месяц'];
const eventTypes = [
  { id: 'festival', emoji: '🎪', label: 'Фестиваль' },
  { id: 'concert', emoji: '🎤', label: 'Концерт' },
  { id: 'sport', emoji: '⚽', label: 'Спорт' },
  { id: 'cinema', emoji: '🎬', label: 'Кино' },
  { id: 'gastro', emoji: '🍽️', label: 'Гастрономия' },
  { id: 'nature', emoji: '🏔️', label: 'Природа' },
];
const companions = [
  { id: 'alone', emoji: '👤', label: 'Один' },
  { id: 'friends', emoji: '👥', label: 'С друзьями' },
  { id: 'family', emoji: '👨\u200D👩\u200D👧', label: 'С семьёй' },
];

export default function FiltersScreen() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('Алматы');
  const [selectedDate, setSelectedDate] = useState('Этот месяц');
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedCompanion, setSelectedCompanion] = useState('alone');
  const [priceRange, setPriceRange] = useState([0]);

  const toggleType = (id: string) => {
    setSelectedTypes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const resetFilters = () => {
    setSelectedCity('Алматы');
    setSelectedDate('Этот месяц');
    setSelectedTypes(new Set());
    setSelectedCompanion('alone');
    setPriceRange([0]);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 pt-12 pb-4">
        <div className="w-9 h-1 bg-[#D1D1D6] rounded-full mx-auto mb-6" />

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[22px] font-bold text-[#1A1A2E]">Фильтры</h1>
          <button onClick={() => navigate(-1)} className="p-2">
            <X className="w-6 h-6 text-[#1A1A2E]" />
          </button>
        </div>

        <div className="space-y-6 mb-32">
          <div>
            <h2 className="text-[15px] font-semibold text-[#1A1A2E] mb-3">Город</h2>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    city === selectedCity
                      ? 'bg-[#4A00E0] text-white'
                      : 'bg-[#F2F2F7] text-[#1A1A2E]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-[#1A1A2E] mb-3">Дата</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {dates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    date === selectedDate
                      ? 'bg-[#4A00E0] text-white'
                      : 'bg-[#F2F2F7] text-[#1A1A2E]'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
            <button className="px-4 py-2 border border-[#E5E5EA] rounded-full text-sm font-medium text-[#1A1A2E]">
              Выбрать диапазон
            </button>
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-[#1A1A2E] mb-3">Цена</h2>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100000}
                step={1000}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-[#8A8A9A]">
                <span>0 ₸</span>
                <span>100 000+ ₸</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-[#1A1A2E] mb-3">Тип события</h2>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTypes.has(type.id)
                      ? 'bg-[#4A00E0] text-white'
                      : 'bg-[#F2F2F7] text-[#1A1A2E]'
                  }`}
                >
                  {type.emoji} {type.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-[#1A1A2E] mb-3">С кем</h2>
            <div className="flex flex-wrap gap-2">
              {companions.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => setSelectedCompanion(comp.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    comp.id === selectedCompanion
                      ? 'bg-[#4A00E0] text-white'
                      : 'bg-[#F2F2F7] text-[#1A1A2E]'
                  }`}
                >
                  {comp.emoji} {comp.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#F2F2F7]">
          <div className="flex gap-3">
            <Button
              onClick={resetFilters}
              variant="outline"
              className="flex-1 h-12 rounded-xl"
            >
              Сбросить
            </Button>
            <Button
              onClick={() => navigate('/events/popular')}
              className="flex-[1.2] h-12 bg-[#4A00E0] hover:bg-[#3a00b0] text-white rounded-xl"
            >
              Показать 42 события
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
