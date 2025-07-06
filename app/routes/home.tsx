import type { Route } from './+types/home';
import { Hero } from '../components/Hero';
import { Work } from '../components/Work';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: 'Aaron Kantrowitz | CTO, Digital Product Leader & Storyteller',
    },
    {
      name: 'description',
      content:
        'Aaron Kantrowitz is a CTO, digital product leader, and storyteller who turns ideas into digital experiences. Expert in engineering, strategy, and leading teams to create meaningful work for top brands and startups.',
    },
    {
      name: 'keywords',
      content:
        'Aaron Kantrowitz, CTO, digital strategist, product leader, engineering, technology consultant, digital experiences, Spacebox Digital, Stealth Startup, US-based developer',
    },
    {
      name: 'author',
      content: 'Aaron Kantrowitz',
    },
    {
      property: 'og:title',
      content: 'Aaron Kantrowitz | CTO, Digital Product Leader & Storyteller',
    },
    {
      property: 'og:description',
      content:
        'CTO and digital product leader blending engineering and storytelling to build bridges between imagination and reality. Leading teams to create work that matters.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://aaronkantrowitz.com/',
    },
    {
      property: 'og:site_name',
      content: 'Aaron Kantrowitz',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Aaron Kantrowitz | CTO, Digital Product Leader & Storyteller',
    },
    {
      name: 'twitter:description',
      content:
        'Aaron Kantrowitz is a CTO, digital product leader, and storyteller who turns ideas into digital experiences. Expert in engineering, strategy, and leading teams to create meaningful work for top brands and startups.',
    },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Hero />
        <Work />
        <Footer />
      </div>
    </div>
  );
}
