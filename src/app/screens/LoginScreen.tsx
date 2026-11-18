import { useNavigate } from 'react-router';
import { Mail, Lock, Chrome, Apple, Smartphone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function LoginScreen() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-white">
      <div className="h-[380px] relative overflow-hidden">
        <img
          src="https://travelpress.kz/userfiles/item/5134/fullimage1.jpg"
          alt="Kazakhstan mountains"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
          <h1 className="text-4xl font-bold text-white mb-2">EventGO KZ</h1>
          <p className="text-base text-white/75">находи неожиданное</p>
        </div>
      </div>

      <div className="bg-white rounded-t-[28px] -mt-7 relative px-5 py-8">
        <h2 className="text-[28px] font-bold text-[#1A1A2E] text-center mb-2">
          Добро пожаловать
        </h2>
        <p className="text-[15px] text-[#8A8A9A] text-center mb-8">
          Войди или создай аккаунт
        </p>

        <div className="space-y-3 mb-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A9A]" />
            <Input
              type="email"
              placeholder="Email"
              className="h-[52px] pl-12 bg-[#F2F2F7] border-0 rounded-xl text-[15px]"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A9A]" />
            <Input
              type="password"
              placeholder="Пароль"
              className="h-[52px] pl-12 bg-[#F2F2F7] border-0 rounded-xl text-[15px]"
            />
          </div>
        </div>

        <Button
          onClick={() => navigate('/home')}
          className="w-full h-14 bg-[#4A00E0] hover:bg-[#3a00b0] text-white rounded-2xl text-[17px] font-semibold mb-4"
        >
          Войти
        </Button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-[#D1D1D6]" />
          <span className="text-[13px] text-[#D1D1D6]">или</span>
          <div className="flex-1 h-px bg-[#D1D1D6]" />
        </div>

        <div className="flex gap-3 mb-6">
          <Button
            variant="outline"
            className="flex-1 h-[52px] border-[#E5E5EA] rounded-xl"
            onClick={() => navigate('/home')}
          >
            <Chrome className="w-5 h-5 mr-2" />
            Google
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-[52px] bg-black text-white border-0 rounded-xl hover:bg-black/90"
            onClick={() => navigate('/home')}
          >
            <Apple className="w-5 h-5 mr-2" />
            Apple
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-[52px] bg-[#F2F2F7] border-0 rounded-xl"
            onClick={() => navigate('/home')}
          >
            <Smartphone className="w-5 h-5" />
          </Button>
        </div>

        <button
          onClick={() => navigate('/home')}
          className="text-[15px] font-medium text-[#4A00E0] block mx-auto mb-4"
        >
          Создать аккаунт
        </button>

        <button
          onClick={() => navigate('/onboarding/1')}
          className="text-[13px] text-[#8A8A9A] block mx-auto"
        >
          Продолжить без входа
        </button>
      </div>
    </div>
  );
}
