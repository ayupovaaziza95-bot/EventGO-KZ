import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Edit3, MessageCircle, Users, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const participants = [
  { id: 1, name: 'Асель', avatar: 'pink', paid: 15000, total: 15000 },
  { id: 2, name: 'Айдар', avatar: 'blue', paid: 10000, total: 15000 },
  { id: 3, name: 'Динара', avatar: 'purple', paid: 15000, total: 15000 },
];

const messages = [
  { id: 1, sender: 'Айдар', text: 'Кто за VIP-билеты?', time: '14:23', isOwn: false },
  { id: 2, sender: 'Я', text: 'Я готова доплатить', time: '14:24', isOwn: true },
  { id: 3, sender: 'Динара', text: 'Я тоже за!', time: '14:25', isOwn: false },
];

export default function CollaborativeScreen() {
  const navigate = useNavigate();
  const [tripName, setTripName] = useState('Поездка на Каинды');
  const [isEditingName, setIsEditingName] = useState(false);

  const totalBudget = 90000;
  const collectedAmount = participants.reduce((sum, p) => sum + p.paid, 0);
  const progress = (collectedAmount / totalBudget) * 100;

  return (
    <div className="min-h-screen bg-white pb-8">
      <div className="px-4 pt-[60px] pb-4 sticky top-0 bg-white z-10 border-b border-[#F2F2F7]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-[#1A1A2E]" />
          </button>
          <h1 className="text-[24px] font-bold text-[#1A1A2E]">👥 Совместная</h1>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="mb-6">
          {isEditingName ? (
            <div className="flex gap-2">
              <Input
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                className="flex-1 h-12 bg-[#F2F2F7] border-0 rounded-xl"
                autoFocus
              />
              <Button
                onClick={() => setIsEditingName(false)}
                className="h-12 bg-[#4A00E0] hover:bg-[#3a00b0] text-white"
              >
                Готово
              </Button>
            </div>
          ) : (
            <div
              onClick={() => setIsEditingName(true)}
              className="flex items-center gap-2 p-3 bg-[#F2F2F7] rounded-xl cursor-pointer"
            >
              <span className="flex-1 text-[15px] font-semibold text-[#1A1A2E]">{tripName}</span>
              <Edit3 className="w-5 h-5 text-[#8A8A9A]" />
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[17px] font-semibold text-[#1A1A2E]">Участники</h2>
            <button className="w-10 h-10 border-2 border-dashed border-[#4A00E0] rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-[#4A00E0]" />
            </button>
          </div>

          <div className="flex gap-3 mb-4">
            {participants.map((participant) => (
              <div key={participant.id} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br from-${participant.avatar}-400 to-${participant.avatar}-600 border-2 border-white shadow flex items-center justify-center text-white font-semibold`}
                >
                  {participant.name[0]}
                </div>
                <span className="text-xs text-[#1A1A2E] mt-1">{participant.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-[17px] font-semibold text-[#1A1A2E] mb-3">Бюджет на участника</h2>

          <div className="bg-[#F8F7FC] rounded-2xl p-4">
            {participants.map((participant, idx) => (
              <div
                key={participant.id}
                className={`flex items-center justify-between py-3 ${
                  idx !== participants.length - 1 ? 'border-b border-[#E5E5EA]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br from-${participant.avatar}-400 to-${participant.avatar}-600 flex items-center justify-center text-white text-sm font-semibold`}
                  >
                    {participant.name[0]}
                  </div>
                  <span className="text-sm text-[#1A1A2E]">{participant.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-[#1A1A2E]">
                    {participant.paid.toLocaleString()} ₸
                  </div>
                  <div className="text-xs text-[#8A8A9A]">
                    из {participant.total.toLocaleString()} ₸
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#8A8A9A]">
                  Собрано {collectedAmount.toLocaleString()} ₸ из {totalBudget.toLocaleString()} ₸
                </span>
                <span className="text-sm font-semibold text-[#4A00E0]">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-[#E5E5EA] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4A00E0] rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-[17px] font-semibold text-[#1A1A2E] mb-3">Поделиться</h2>

          <div className="grid grid-cols-4 gap-3">
            {[
              { id: 'whatsapp', label: 'WhatsApp', color: '#25D366', url: 'https://wa.me/?text=EventGO+KZ' },
              { id: 'telegram', label: 'Telegram', color: '#2AABEE', url: 'https://t.me/share/url?url=eventgo.kz' },
              { id: 'instagram', label: 'Instagram', color: '#E4405F', url: null },
              { id: 'sms', label: 'СМС', color: '#34C759', url: null },
            ].map((social) => (
              <button
                key={social.id}
                onClick={() => {
                  if (social.url) {
                    window.open(social.url, '_blank');
                  }
                }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#F2F2F7]"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: social.color }}
                >
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-xs text-[#1A1A2E]">{social.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-[17px] font-semibold text-[#1A1A2E] mb-3">Чат</h2>

          <div className="bg-[#F8F7FC] rounded-2xl p-4 space-y-3 mb-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                    msg.isOwn
                      ? 'bg-[#4A00E0] text-white'
                      : 'bg-white text-[#1A1A2E]'
                  }`}
                >
                  {!msg.isOwn && (
                    <div className="text-xs font-semibold mb-1 opacity-70">{msg.sender}</div>
                  )}
                  <div className="text-sm">{msg.text}</div>
                  <div className={`text-xs mt-1 ${msg.isOwn ? 'opacity-70' : 'opacity-50'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Написать сообщение..."
              className="flex-1 h-12 bg-[#F2F2F7] border-0 rounded-xl"
            />
            <Button className="h-12 w-12 bg-[#4A00E0] hover:bg-[#3a00b0] rounded-xl">
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Button
          onClick={() => navigate('/booking/date/kaindy-lake-tour')}
          className="w-full h-14 bg-[#4A00E0] hover:bg-[#3a00b0] text-white rounded-2xl"
        >
          <Users className="w-5 h-5 mr-2" />
          Оформить поездку на всех
        </Button>
      </div>
    </div>
  );
}
