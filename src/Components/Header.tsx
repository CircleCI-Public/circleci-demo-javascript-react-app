import { useState } from 'react';

export default function Header({ title }: { title: string }) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-10 flex h-14 items-center gap-6 bg-zinc-800 px-4 text-white">
        <a className="text-xl" href="/#">
          {title}
        </a>
        <a className="text-white/80 hover:text-white" href="/#" aria-current="page">
          Home
        </a>
        <a
          className="text-white/80 hover:text-white"
          href="/#"
          onClick={(e) => {
            e.preventDefault();
            setShowAbout((prev) => !prev);
          }}
        >
          About
        </a>
      </nav>
      {showAbout && (
        <div className="bg-zinc-100 p-4 pt-[4.5rem]">
          <p>
            Baby Hippo Gram is a small demo app used to show how CircleCI Chunk sidecars catch
            AI-generated code mistakes in the inner loop before they ever reach CI.
            <br />
            Click on a baby hippo image to like it!
          </p>
        </div>
      )}
    </>
  );
}
