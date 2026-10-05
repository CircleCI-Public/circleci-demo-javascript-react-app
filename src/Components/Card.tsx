import { useState } from 'react';
import type { Post } from '../types';

const Cards = ({ cards }: { cards: Post[] }) => {
  const [likedCards, setLikedCards] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
      {cards.map((card) => (
        <figure key={card.id}>
          <button
            type="button"
            className="block w-full cursor-pointer"
            aria-pressed={!!likedCards[card.id]}
            onClick={() => toggleLike(card.id)}
          >
            <img className="h-[300px] w-full object-cover" src={card.image} alt={card.title} />
          </button>
          {likedCards[card.id] && (
            <div className="text-center text-2xl" aria-label="Liked">
              ❤️
            </div>
          )}
          <figcaption className="px-5 py-2">
            <div>{card.title}</div>
            <small className="text-sm text-zinc-500">
              Photo:{' '}
              <a className="text-blue-600 hover:underline" href={card.source}>
                {card.author}
              </a>
              ,{' '}
              <a className="text-blue-600 hover:underline" href={card.licenseUrl}>
                {card.license}
              </a>
            </small>
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default Cards;
