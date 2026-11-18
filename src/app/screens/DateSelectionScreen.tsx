import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function DateSelectionScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [checkIn, setCheckIn] = useState(new Date(2025, 4, 14));
  const [checkOut, setCheckOut] = useState(new Date(2025, 4, 16));
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const monthName = checkIn.toLocaleDateString('ru', { month: 'long', year: 'numeric' });

  const generateCalendarDays = () => {
    const firstDay = new Date(checkIn.getFullYear(), checkIn.getMonth(), 1);
    const lastDay = new Date(checkIn.getFullYear(), checkIn.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="px-4 pt-[60px] pb-4 sticky top-0 bg-white z-10 border-b border-[#F2F2F7]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#1A1A2E]" />
          </button>
          <h1 className="text-[24px] font-bold text-[#1A1A2E]">Выбор дат</h1>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="flex gap-2 mb-4">
          {[
            { id: 'weekend', label: 'Ближайшие выходные' },
            { id: 'flex', label: '± 2 дня' },
            { id: 'exact', label: 'Точные даты' },
          ].map((option) => (
            <button
              key={option.id}
              className="px-4 py-2 bg-[#F2F2F7] rounded-full text-sm text-[#1A1A2E] hover:bg-[#4A00E0] hover:text-white transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3 mb-6">
          <div className="flex-1 h-14 bg-[#F2F2F7] rounded-xl px-4 flex flex-col justify-center">
            <span className="text-xs text-[#8A8A9A]">Заезд</span>
            <span className="text-sm font-semibold text-[#1A1A2E]">14 мая</span>
          </div>
          <div className="flex-1 h-14 bg-[#F2F2F7] rounded-xl px-4 flex flex-col justify-center">
            <span className="text-xs text-[#8A8A9A]">Выезд</span>
            <span className="text-sm font-semibold text-[#1A1A2E]">16 мая</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button className="p-2">
              <ChevronLeft className="w-5 h-5 text-[#1A1A2E]" />
            </button>
            <h2 className="text-[17px] font-semibold text-[#1A1A2E] capitalize">{monthName}</h2>
            <button className="p-2">
              <ChevronRight className="w-5 h-5 text-[#1A1A2E]" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {days.map((day) => (
              <div key={day} className="text-center text-[13px] font-medium text-[#8A8A9A] py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, idx) => {
              const isCheckIn = day === 14;
              const isCheckOut = day === 16;
              const isInRange = day && day > 14 && day < 16;

              return (
                <div
                  key={idx}
                  className={`aspect-square flex items-center justify-center text-base rounded-lg ${
                    !day
                      ? 'invisible'
                      : isCheckIn || isCheckOut
                      ? 'bg-[#4A00E0] text-white font-semibold'
                      : isInRange
                      ? 'bg-[rgba(74,0,224,0.15)] text-[#4A00E0]'
                      : 'text-[#1A1A2E] hover:bg-[#F2F2F7]'
                  } cursor-pointer transition-colors`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-[15px] font-semibold text-[#1A1A2E] mb-3">👤 Количество участников</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[15px] text-[#1A1A2E]">Взрослые</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="w-12 h-12 bg-[#F2F2F7] rounded-xl flex items-center justify-center text-lg font-semibold"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold text-[#1A1A2E]">{adults}</span>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="w-12 h-12 bg-[#F2F2F7] rounded-xl flex items-center justify-center text-lg font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[15px] text-[#1A1A2E]">Дети</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  className="w-12 h-12 bg-[#F2F2F7] rounded-xl flex items-center justify-center text-lg font-semibold"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold text-[#1A1A2E]">{children}</span>
                <button
                  onClick={() => setChildren(children + 1)}
                  className="w-12 h-12 bg-[#F2F2F7] rounded-xl flex items-center justify-center text-lg font-semibold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#F2F2F7]">
        <Button
          onClick={() => navigate(`/booking/data/${eventId}`)}
          className="w-full h-14 bg-[#4A00E0] hover:bg-[#3a00b0] text-white rounded-2xl mb-2"
        >
          Продолжить
        </Button>
        <Button
          onClick={() => navigate('/collaborative')}
          variant="outline"
          className="w-full h-12 rounded-xl border-[#4A00E0] text-[#4A00E0]"
        >
          <Users className="w-5 h-5 mr-2" />
          Пригласить в поездку
        </Button>
      </div>
    </div>
  );
}
