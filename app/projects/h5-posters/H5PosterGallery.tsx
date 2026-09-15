'use client';

import { ArrowLeft, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const posterFiles = Array.from({ length: 28 }, (_, index) => `${index + 1}.webp`);

export default function H5PosterGallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const columns = useMemo(
    () => Array.from({ length: 3 }, (_, column) => posterFiles.filter((_, index) => index % 3 === column)),
    [],
  );

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
    <main className="h5-posters-page">
      <a className="h5-posters-back" href="/#projects" aria-label="返回首页项目展示">
        <ArrowLeft size={20} />
        <span>返回项目展示</span>
      </a>

      <section className="h5-posters-grid" aria-label="H5长图海报作品">
        {columns.map((files, columnIndex) => (
          <div className="h5-posters-column" key={columnIndex}>
            {files.map((file) => {
              const index = Number.parseInt(file, 10);
              const src = `/assets/h5-posters/${file}`;
              return (
                <button
                  className="h5-poster-tile"
                  type="button"
                  key={file}
                  onClick={() => setActiveImage(src)}
                  aria-label={`放大查看H5长图海报 ${index}`}
                >
                  <span className="h5-poster-image">
                    <img src={src} alt={`H5长图海报作品 ${index}`} loading="lazy" decoding="async" />
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </section>

      {activeImage && (
        <div className="h5-posters-lightbox" role="dialog" aria-modal="true" aria-label="H5长图海报大图预览" onClick={() => setActiveImage(null)}>
          <button className="h5-posters-close" type="button" onClick={() => setActiveImage(null)} aria-label="关闭大图">
            <X size={24} />
          </button>
          <img src={activeImage} alt="H5长图海报大图" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
