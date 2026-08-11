import siteData from './data/siteData.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import FounderCompact from './components/FounderCompact';
import CompactServices from './components/CompactServices';
import AiIntegration from './components/AiIntegration';
import Process from './components/Process';
import ModernTechnology from './components/ModernTechnology';
import Faq from './components/Faq';
import Cta from './components/Cta';
import Footer from './components/Footer';
import { SiteData } from './types';

const founderData: SiteData['founder'] = siteData.founder;
const data = { ...siteData, founder: founderData } as SiteData;

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--color-bg-base)] font-sans text-[var(--color-text-main)] transition-colors duration-300">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-on-accent)] transition-transform focus:translate-y-0"
      >
        {data.navigation.skipLinkLabel}
      </a>
      <Navbar data={data} />
      <main id="main-content">
        <Hero data={data} />
        <Stats data={data} />
        <CompactServices data={data} />
        <AiIntegration data={data} />
        <Process data={data} />
        <ModernTechnology data={data} />
        <FounderCompact data={data} />
        <Faq data={data} />
        <Cta data={data} />
      </main>
      <Footer data={data} />
    </div>
  );
}
