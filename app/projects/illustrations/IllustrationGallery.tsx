'use client';

import { ArrowLeft, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const illustrationFiles = Array.from({ length: 28 }, (_, index) => {
  const number = index + 1;
  return `${number}.webp`;
});

export default function IllustrationGallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (!activeImage) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [activeImage]);

  return (
    <main className="illustration-page">
      <a className="illustration-back" href="/#projects" aria-label="返回首页项目展示">
        <ArrowLeft size={20} />
        <span>返回项目展示</span>
      </a>

      <section className="illustration-grid" aria-label="插画与手绘作品">
        {illustrationFiles.map((file, index) => {
          const src = `/assets/illustrations/${file}`;
          return (
            <button
              className="illustration-tile"
              type="button"
              key={file}
              onClick={() => setActiveImage(src)}
              aria-label={`放大查看插画作品 ${index + 1}`}
            >
              <span className="illustration-image">
                <img src={src} alt={`插画与手绘作品 ${index + 1}`} loading="lazy" decoding="async" />
              </span>
            </button>
          );
        })}
      </section>

      {activeImage && (
        <div
          className="illustration-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="插画大图预览"
          onClick={() => setActiveImage(null)}
        >
          <button className="illustration-close" type="button" onClick={() => setActiveImage(null)} aria-label="关闭大图">
            <X size={24} />
          </button>
          <img src={activeImage} alt="插画作品大图" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
