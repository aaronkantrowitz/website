import type { Route } from './+types/home';
import { Hero } from '../components/Hero';
import { Work } from '../components/Work';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Aaron Kantrowitz - Developer & Digital Strategist' },
    {
      name: 'description',
      content:
        'Aaron Kantrowitz - Developer, digital strategist, and technology consultant working with leading brands and organizations.',
    },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Hero />
        <Work />
        <Footer />
      </div>
    </div>
  );
}
