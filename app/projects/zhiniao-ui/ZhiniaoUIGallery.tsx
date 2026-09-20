'use client';

import { ArrowLeft, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const uiFiles = Array.from({ length: 30 }, (_, index) => `${String(index + 1).padStart(2, '0')}.webp`);
const introFiles = Array.from({ length: 9 }, (_, index) => `${String(index + 1).padStart(2, '0')}.webp`);

export default function ZhiniaoUIGallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const columns = useMemo(
    () => Array.from({ length: 3 }, (_, column) => uiFiles.filter((_, index) => index % 3 === column)),
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
    <main className="zhiniao-ui-page">
      <a className="zhiniao-ui-back" href="/#projects" aria-label="返回首页项目展示">
        <ArrowLeft size={20} />
        <span>返回项目展示</span>
      </a>

      <section className="zhiniao-ui-intro" aria-label="平安知鸟UI设计规范">
        {introFiles.map((file, index) => {
          const src = `/assets/zhiniao-ui-intro/${file}`;
          return (
            <button
              className="zhiniao-ui-intro-tile"
              type="button"
              key={file}
              onClick={() => setActiveImage(src)}
              aria-label={`放大查看平安知鸟UI设计规范 ${index + 1}`}
            >
              <img src={src} alt={`平安知鸟UI设计规范 ${index + 1}`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
            </button>
          );
        })}
      </section>

      <section className="zhiniao-ui-grid" aria-label="平安知鸟UI设计作品">
        {columns.map((files, columnIndex) => (
          <div className="zhiniao-ui-column" key={columnIndex}>
            {files.map((file) => {
              const index = Number.parseInt(file, 10);
              const src = `/assets/zhiniao-ui/${file}`;
              return (
                <button
                  className="zhiniao-ui-tile"
                  type="button"
                  key={file}
                  onClick={() => setActiveImage(src)}
                  aria-label={`放大查看平安知鸟UI设计作品 ${index}`}
                >
                  <span className="zhiniao-ui-image">
                    <img src={src} alt={`平安知鸟UI设计作品 ${index}`} loading="lazy" decoding="async" />
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </section>

      {activeImage && (
        <div className="zhiniao-ui-lightbox" role="dialog" aria-modal="true" aria-label="平安知鸟UI设计大图预览" onClick={() => setActiveImage(null)}>
          <button className="zhiniao-ui-close" type="button" onClick={() => setActiveImage(null)} aria-label="关闭大图">
            <X size={24} />
          </button>
          <img src={activeImage} alt="平安知鸟UI设计大图" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
