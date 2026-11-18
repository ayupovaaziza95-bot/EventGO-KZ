import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Globe } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#4A00E0] to-[#8E2DE2] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400')] bg-cover bg-center mix-blend-overlay" />

      <div className="relative h-full flex flex-col items-center justify-center px-8">
        <div className="w-[120px] h-[120px] rounded-full bg-white/15 flex items-center justify-center mb-8">
          <Globe className="w-16 h-16 text-white" strokeWidth={1.5} />
        </div>

        <h1 className="text-[38px] font-bold text-white tracking-tight mb-2">
          EventGO KZ
        </h1>

        <p className="text-[13px] text-white/75 uppercase tracking-[2px]">
          НАХОДИ НЕОЖИДАННОЕ
        </p>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <div className="w-[120px] h-[3px] bg-white/60 rounded-full" />
      </div>
    </div>
  );
}
