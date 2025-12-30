'use client';

import { Cards, Card } from 'fumadocs-ui/components/card';
import { BoxIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CardItem {
  order: number;
  slug: string;
  title: string;
  description?: string;
}

export function FolderCardsRoot({ folder }: { folder: string[] }) {
  const normalizedFolder =
    folder[0] === 'home' ? folder.slice(1) : folder;

  const [cards, setCards] = useState<CardItem[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch(
        `/api/folder-cards-root?folder=${normalizedFolder.join('/')}`
      );
      const data = await res.json();
      data.sort((a: CardItem, b: CardItem) => b.order - a.order);
      setCards(data);
    };
    fetchCards();
  }, [normalizedFolder.join('/')]);

  return (
    <Cards>
      {cards.map((item) => (
        <Card
          key={item.slug}
          icon={<BoxIcon className="text-pink-500" />}
          title={item.title}
          description={item.description}
          href={`/docs/${folder.join("/")}/${item.slug}`}
        />
      ))}
    </Cards>
  );
}
