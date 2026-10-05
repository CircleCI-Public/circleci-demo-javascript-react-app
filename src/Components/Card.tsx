import type { Post } from '../types';

const Cards = ({ cards }: { cards: Post[] }) => (
  <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
    {cards.map((card) => (
      <figure key={card.id}>
        <img className="h-[300px] w-full object-cover" src={card.image} alt={card.title} />
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

export default Cards;
