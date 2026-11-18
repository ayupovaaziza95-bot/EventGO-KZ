import { useNavigate, useParams } from 'react-router';
import { Button } from '../components/ui/button';
import { Backpack, Film, Ticket } from 'lucide-react';

const onboardingData = [
  {
    step: 1,
    icon: Backpack,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    title: 'Секретные места',
    description: 'Узнавай о локациях, которых нет в обычных путеводителях. Только проверенные советы от местных жителей.',
  },
  {
    step: 2,
    icon: Film,
    image: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=400',
    title: 'Кино-маршруты',
    description: 'Пройди по местам съёмок любимых фильмов и сериалов. Сравни кадры из кино с реальностью.',
  },
  {
    step: 3,
    icon: Ticket,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
    title: 'События и путешествия',
    description: 'Находи мероприятия и планируй поездки в одном приложении — быстро и удобно.',
  },
];

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const { step } = useParams();
  const currentStep = parseInt(step || '1');
  const data = onboardingData[currentStep - 1];
  const Icon = data.icon;

  const handleNext = () => {
    if (currentStep < 3) {
      navigate(`/onboarding/${currentStep + 1}`);
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="h-screen w-full bg-white">
      <div className="h-[470px] relative overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1A2E]/70" />

        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-20 h-20 text-white" strokeWidth={1.5} />
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`rounded-full transition-all ${
                dot === currentStep
                  ? 'w-2 h-2 bg-[#4A00E0]'
                  : 'w-1.5 h-1.5 bg-[#D1D1D6]'
              }`}
            />
          ))}
        </div>

        <h2 className="text-[26px] font-bold text-[#1A1A2E] text-center mb-4">
          {data.title}
        </h2>

        <p className="text-[15px] text-[#8A8A9A] text-center leading-[22px] max-w-[333px] mx-auto mb-12">
          {data.description}
        </p>

        <Button
          onClick={handleNext}
          className="w-full h-14 bg-[#4A00E0] hover:bg-[#3a00b0] text-white rounded-2xl text-[17px] font-semibold"
        >
          {currentStep < 3 ? 'Далее →' : 'Начать →'}
        </Button>
      </div>
    </div>
  );
}
