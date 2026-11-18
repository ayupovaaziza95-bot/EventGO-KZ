import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Lock, CreditCard, Calendar, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { getEventById } from '../data/events';

const paymentMethods = [
  { id: 'kaspi-gold', label: 'Kaspi Gold', color: '#F8B700', logo: '💳' },
  { id: 'kaspi-red', label: 'Kaspi Red', color: '#E20A17', logo: '💳' },
  { id: 'apple-pay', label: 'Apple Pay', color: '#000000', logo: '🍎' },
  { id: 'google-pay', label: 'Google Pay', color: '#FFFFFF', logo: 'G', border: true },
];

export default function PaymentScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const event = getEventById(eventId || '');
  const [selectedMethod, setSelectedMethod] = useState('kaspi-gold');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });

  if (!event) return null;

  const totalAmount = 33500;

  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="px-4 pt-[60px] pb-4 sticky top-0 bg-white z-10 border-b border-[#F2F2F7]">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#1A1A2E]" />
          </button>
          <h1 className="text-[24px] font-bold text-[#1A1A2E]">Оплата</h1>
          <span className="ml-auto text-sm text-[#8A8A9A]">3 из 3</span>
        </div>

        <div className="flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="flex-1 h-1 rounded-full bg-[#4A00E0]"
            />
          ))}
        </div>
      </div>

      <div className="px-4 pt-6">
        <div className="bg-[#F8F7FC] rounded-2xl p-4 mb-6">
          <div className="flex gap-3 mb-3">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-[#1A1A2E] mb-1">{event.title}</h3>
              <p className="text-xs text-[#8A8A9A]">📅 14–16 мая 2025</p>
            </div>
          </div>

          <div className="space-y-2 mb-3">
            
            <div className="flex justify-between text-sm">
              <span className="text-[#8A8A9A]">Транспорт</span>
              <span className="text-[#1A1A2E]">15 500 ₸</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#8A8A9A]">Проживание</span>
              <span className="text-[#1A1A2E]">18 000 ₸</span>
            </div>
          </div>

          <div className="h-px bg-[#E5E5EA] my-3" />

          <div className="flex justify-between">
            <span className="text-[17px] font-bold text-[#1A1A2E]">Итого</span>
            <span className="text-[17px] font-bold text-[#1A1A2E]">33 500 ₸</span>
          </div>
        </div>

        <h2 className="text-[15px] font-semibold text-[#1A1A2E] mb-3">Способ оплаты</h2>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`h-14 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all ${
                selectedMethod === method.id
                  ? 'ring-2 ring-[#1A1A2E]'
                  : method.border
                  ? 'border border-[#E5E5EA]'
                  : ''
              }`}
              style={{
                backgroundColor: method.color,
                color: method.color === '#FFFFFF' ? '#1A1A2E' : '#FFFFFF',
              }}
            >
              <span className="text-lg">{method.logo}</span>
              {method.label}
            </button>
          ))}
        </div>

        <div className="text-center text-sm text-[#8A8A9A] mb-4">или банковская карта</div>

        {selectedMethod.includes('kaspi') ? (
          <div className="text-center py-8">
            <p className="text-sm text-[#8A8A9A] mb-2">
              Вы будете перенаправлены в приложение Kaspi для оплаты
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A9A]" />
              <Input
                type="text"
                value={cardData.number}
                onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                placeholder="Номер карты"
                className="h-[52px] pl-12 bg-[#F2F2F7] border-0 rounded-xl"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A9A]" />
                <Input
                  type="text"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                  placeholder="ММ/ГГ"
                  className="h-[52px] pl-12 bg-[#F2F2F7] border-0 rounded-xl"
                />
              </div>

              <div className="flex-1 relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A9A]" />
                <Input
                  type="text"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                  placeholder="CVV"
                  maxLength={3}
                  className="h-[52px] pl-12 bg-[#F2F2F7] border-0 rounded-xl"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-sm text-[#8A8A9A] mb-6">
          <Shield className="w-4 h-4" />
          <span>Защищено SSL шифрованием</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#F2F2F7]">
        <Button
          onClick={() => navigate('/booking/confirmation')}
          className="w-full h-14 bg-[#4A00E0] hover:bg-[#3a00b0] text-white rounded-2xl"
        >
          Оплатить {totalAmount.toLocaleString()} ₸
        </Button>
      </div>
    </div>
  );
}
