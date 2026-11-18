import { useNavigate } from 'react-router';
import { CheckCircle, Download, Calendar, Home, List, Copy } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function ConfirmationScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="w-[88px] h-[88px] rounded-full bg-[rgba(52,199,89,0.15)] flex items-center justify-center mb-6">
            <CheckCircle className="w-11 h-11 text-[#34C759]" strokeWidth={2.5} />
          </div>

          <h1 className="text-[32px] font-bold text-[#1A1A2E] mb-2 text-center">
            Всё готово!
          </h1>
          <p className="text-base text-[#8A8A9A] text-center">
            Ваша поездка успешно оформлена
          </p>
        </div>

        <div className="bg-[#F8F7FC] rounded-2xl p-4 mb-6">
          <div className="flex gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-[15px] font-semibold text-[#1A1A2E] mb-1">
                Мировое турне Димаша Кудайбергена
              </h3>
              <p className="text-[13px] text-[#8A8A9A]">📅 14–16 мая 2025</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#8A8A9A]">📍 Город</span>
              <span className="text-[#1A1A2E] font-medium">Астана</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#8A8A9A]">🎫 Билеты</span>
              <span className="text-[#1A1A2E] font-medium">2 × Стандарт</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#8A8A9A]">💰 Сумма</span>
              <span className="text-[#1A1A2E] font-medium">33 500 ₸</span>
            </div>
          </div>

          <div className="h-px bg-[#E5E5EA] my-3" />

          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#8A8A9A]">#EV-2025-00847</span>
            <button className="flex items-center gap-1 text-[13px] text-[#4A00E0] font-medium">
              <Copy className="w-4 h-4" />
              Копировать
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Скачать PDF
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 rounded-xl flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Добавить в календарь
          </Button>

          <Button
            onClick={() => navigate('/home')}
            className="w-full h-12 bg-[#4A00E0] hover:bg-[#3a00b0] text-white rounded-xl flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            На главную
          </Button>
        </div>

        <button
          onClick={() => navigate('/trips')}
          className="w-full text-[15px] text-[#4A00E0] font-medium flex items-center justify-center gap-2"
        >
          <List className="w-5 h-5" />
          Мои поездки
        </button>
      </div>
    </div>
  );
}
