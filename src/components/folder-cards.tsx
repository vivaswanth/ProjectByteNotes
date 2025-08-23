// components/FolderCards.tsx

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CardItem {
  slug: string;
  title: string;
  description?: string;
}

interface Props {
  folder: string[];
}

export function FolderCards({ folder }: Props) {
  const [cards, setCards] = useState<CardItem[]>([]);

  console.log("FolderCards rendered with folder:", folder);
  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch(`/api/folder-cards?folder=${folder.join('/')}`);
      const data = await res.json();
      setCards(data);
    };
    fetchCards();
  }, [folder]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
      {cards.map((item) => (
        <Link
          key={item.slug}
          href={`./${folder[1]}/${item.slug}`}
          className="border rounded-lg p-4 hover:shadow transition"
        >
          <h3 className="text-lg font-semibold">{item.title}</h3>
          {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
        </Link>
      ))}
    </div>
  );
}
