import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import Story from '@/components/sections/Story';
import Curriculum from '@/components/sections/Curriculum';
import SignUpForm from '@/components/sections/SignUpForm';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/sections/ScrollToTop';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Story />
        <Curriculum />
        <SignUpForm />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
