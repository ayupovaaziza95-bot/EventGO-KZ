import { useNavigate, useLocation } from 'react-router';
import { Home, Search, Calendar, User } from 'lucide-react';

export default function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'home', icon: Home, label: 'Главная', path: '/home' },
    { id: 'search', icon: Search, label: 'Поиск', path: '/search' },
    { id: 'trips', icon: Calendar, label: 'Мои поездки', path: '/trips' },
    { id: 'profile', icon: User, label: 'Профиль', path: '/profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[83px] bg-white border-t border-[#E5E5EA] z-50">
      <div className="flex items-center justify-around h-full px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center gap-1 flex-1"
            >
              <Icon
                className={`w-6 h-6 ${active ? 'text-[#4A00E0]' : 'text-[#8A8A9A]'}`}
                strokeWidth={active ? 2.5 : 2}
              />
              <span className={`text-[11px] ${active ? 'text-[#4A00E0] font-semibold' : 'text-[#8A8A9A]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
