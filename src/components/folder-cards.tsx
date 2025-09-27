// components/FolderCards.tsx

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

interface Props {
  folder: string[];
}

export function FolderCards({ folder }: Props) {
  const [cards, setCards] = useState<CardItem[]>([]);
  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch(`/api/folder-cards?folder=${folder.join('/')}`);
      const data = await res.json();
      data.sort((a: CardItem, b: CardItem) => (a.order < b.order ? 1 : -1));
      setCards(data);
    };
    fetchCards();
  }, [folder]);

  return (
    <Cards>
      {cards.map((item) => (
        <Card
          icon={<BoxIcon className="text-green-300" />}
          key={item.slug}
          title={item.title}
          href={`./${folder[1]}/${item.slug}`}
          description={item.description}
        />
      ))}
    </Cards>
  );
}
