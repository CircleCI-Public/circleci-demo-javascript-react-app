import { afterEach, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import App from './App';
import posts from './data/posts.json';

afterEach(cleanup);

it('renders the header', () => {
  render(<App />);
  expect(screen.getByText('Baby Hippo Gram')).toBeTruthy();
});

it('renders a card for each sample post', () => {
  render(<App />);
  const images = screen.getAllByRole('img');
  expect(images.map((img) => img.getAttribute('src'))).toEqual(posts.map((post) => post.image));
});

it('credits the photographer and license for every photo', () => {
  render(<App />);
  for (const post of posts) {
    expect(
      screen
        .getAllByRole('link', { name: post.author })
        .some((a) => a.getAttribute('href') === post.source),
    ).toBe(true);
  }
});
