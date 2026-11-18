import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';

export default function DataEntryScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '+7 ',
    email: '',
    comment: '',
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const isFormValid = formData.firstName && formData.lastName && formData.phone.length > 4 && formData.email && acceptedTerms;

  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="px-4 pt-[60px] pb-4 sticky top-0 bg-white z-10 border-b border-[#F2F2F7]">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#1A1A2E]" />
          </button>
          <h1 className="text-[24px] font-bold text-[#1A1A2E]">Ваши данные</h1>
          <span className="ml-auto text-sm text-[#8A8A9A]">2 из 3</span>
        </div>

        <div className="flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-1 rounded-full ${
                step <= 2 ? 'bg-[#4A00E0]' : 'bg-[#D1D1D6]'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 pt-6 space-y-3">
        <div>
          <label className="text-sm text-[#8A8A9A] mb-1 block">Имя</label>
          <Input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="Асель"
            className="h-[52px] bg-[#F2F2F7] border-0 rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm text-[#8A8A9A] mb-1 block">Фамилия</label>
          <Input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Нурланова"
            className="h-[52px] bg-[#F2F2F7] border-0 rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm text-[#8A8A9A] mb-1 block">Телефон</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+7 701 000 0000"
            className="h-[52px] bg-[#F2F2F7] border-0 rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm text-[#8A8A9A] mb-1 block">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="example@email.com"
            className="h-[52px] bg-[#F2F2F7] border-0 rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm text-[#8A8A9A] mb-1 block">Комментарий (необязательно)</label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="Укажите пожелания к заказу"
            className="w-full h-[88px] px-4 py-3 bg-[#F2F2F7] border-0 rounded-xl resize-none text-[15px] text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#4A00E0]"
          />
        </div>

        <div className="pt-4 space-y-3">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              className="mt-1"
            />
            <label className="text-sm text-[#1A1A2E] leading-relaxed">
              Согласен с{' '}
              <button className="text-[#4A00E0] underline">
                условиями оферты
              </button>
            </label>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              checked={newsletter}
              onCheckedChange={(checked) => setNewsletter(checked as boolean)}
              className="mt-1"
            />
            <label className="text-sm text-[#1A1A2E] leading-relaxed">
              Получать новости о событиях и акциях
            </label>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#F2F2F7]">
        <Button
          onClick={() => navigate(`/booking/payment/${eventId}`)}
          disabled={!isFormValid}
          className="w-full h-14 bg-[#4A00E0] hover:bg-[#3a00b0] disabled:bg-[#D1D1D6] disabled:text-[#8A8A9A] text-white rounded-2xl"
        >
          Перейти к оплате
        </Button>
      </div>
    </div>
  );
}
