import { useNavigate } from 'react-router';
import { ChevronRight, List, Heart, Settings, CreditCard, HelpCircle, LogOut, Gift, Share2 } from 'lucide-react';
import TabBar from '../components/TabBar';

const menuItems = [
  { id: 'trips', icon: List, label: 'Мои поездки', route: '/trips', color: '#4A00E0' },
  { id: 'favorites', icon: Heart, label: 'Избранное', route: '/trips', color: '#4A00E0' },
  { id: 'settings', icon: Settings, label: 'Настройки', route: '/profile', color: '#4A00E0' },
  { id: 'payment', icon: CreditCard, label: 'Платёжные методы', route: '/profile', color: '#4A00E0' },
  { id: 'help', icon: HelpCircle, label: 'Помощь', route: '/profile', color: '#4A00E0' },
];

export default function ProfileScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="h-[200px] bg-gradient-to-br from-[#4A00E0] to-[#8E2DE2] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400')] bg-cover bg-center" />

        <div className="relative h-full flex flex-col items-center justify-center px-8">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-[3px] border-white mb-3 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-600" />
          </div>

          <h1 className="text-[22px] font-bold text-white mb-1">Асель Нурланова</h1>
          <p className="text-sm text-white/80 mb-2">asel.nurlanova@email.com</p>

          <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
            <span className="text-sm text-white">⭐ 3 поездки</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="space-y-0 mb-6">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.route)}
                className={`w-full flex items-center gap-4 py-4 ${
                  idx !== menuItems.length - 1 ? 'border-b border-[#F2F2F7]' : ''
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <span className="flex-1 text-left text-base text-[#1A1A2E]">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-[#D1D1D6]" />
              </button>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] rounded-2xl p-4 flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-semibold text-white mb-1">
              Пригласи друга — скидка 10%
            </h3>
            <p className="text-xs text-white/80">На следующую поездку</p>
          </div>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'EventGO KZ',
                  text: 'Присоединяйся к EventGO KZ!',
                  url: 'https://eventgo.kz',
                });
              } else {
                window.open('https://wa.me/?text=EventGO+KZ', '_blank');
              }
            }}
            className="px-4 py-2 bg-white rounded-xl text-[#4A00E0] text-sm font-semibold flex items-center gap-1"
          >
            <Share2 className="w-4 h-4" />
            Поделиться
          </button>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="w-full flex items-center justify-center gap-2 py-4 text-[#FF3B30] font-medium"
        >
          <LogOut className="w-5 h-5" />
          Выйти
        </button>
      </div>

      <TabBar />
    </div>
  );
}
