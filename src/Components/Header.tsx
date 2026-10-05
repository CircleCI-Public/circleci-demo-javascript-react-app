export default function Header({ title }: { title: string }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-10 flex h-14 items-center gap-6 bg-zinc-800 px-4 text-white">
      <a className="text-xl" href="/#">
        {title}
      </a>
      <a className="text-white/80 hover:text-white" href="/#" aria-current="page">
        Home
      </a>
    </nav>
  );
}
