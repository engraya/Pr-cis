import { LandingText } from './components/LandingText';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';

export function HomePage() {
  return (
    <div>
      <LandingText />
      <Features />
      <Testimonials />
    </div>
  );
}
