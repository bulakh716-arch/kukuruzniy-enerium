'use client';

export default function BackToHomeLink() {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    event.preventDefault();
    window.location.assign('/');
  };

  return (
    <a
      href="/"
      onClick={handleClick}
      className="relative z-10 mb-8 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
    >
      <span aria-hidden="true">←</span>
      <span>Back to Home</span>
    </a>
  );
}