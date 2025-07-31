import type { Route } from './+types/home';
import React from 'react';
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
  // ASCII AK Console Art
  React.useEffect(() => {
    console.log(
      '%c' +
        '     ╔═╗ ╦╔═\n' +
        '     ╠═╣ ╠╩╗\n' +
        '     ╩ ╩ ╩ ╩\n' +
        '\n' +
        '  Aaron Kantrowitz\n' +
        '  Digital Architect\n',
      'color: #6b7280; font-family: monospace; font-size: 14px; line-height: 1.2;'
    );

    console.log(
      '%cBuilding bridges between imagination and reality',
      'color: #9ca3af; font-style: italic; font-size: 12px;'
    );

    console.log(
      '%c' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
        '  A      K      A      K     \n' +
        '  A A    K K    A A    K  K  \n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'color: #4b5563; font-family: monospace; font-size: 10px;'
    );
  }, []);

  return (
    <>
      <Navigation />
      <div className="fixed inset-0 overflow-hidden">
        <div className="relative w-full h-full">
          <Hero />
          <Work />
          <Footer />
        </div>
      </div>
    </>
  );
}
