'use client';

import { ArrowLeft, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type GalleryImage = {
  key: string;
  src: string;
  alt: string;
};

const landscapeImages: GalleryImage[] = Array.from({ length: 14 }, (_, index) => ({
  key: `01-${index + 1}`,
  src: `/assets/poster-banner/01/${String(index + 1).padStart(2, '0')}.webp`,
  alt: `横版海报作品 ${index + 1}`,
}));

const masonryImages: GalleryImage[] = ['02', '03'].flatMap((group) =>
  Array.from({ length: 12 }, (_, index) => ({
    key: `${group}-${index + 1}`,
    src: `/assets/poster-banner/${group}/${String(index + 1).padStart(2, '0')}.webp`,
    alt: `海报作品 ${group}-${index + 1}`,
  })),
);

export default function PosterBannerGallery() {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const columns = useMemo(
    () => Array.from({ length: 3 }, (_, column) => masonryImages.filter((_, index) => index % 3 === column)),
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

  const renderTile = (image: GalleryImage, className: string) => (
    <button
      className={className}
      type="button"
      key={image.key}
      onClick={() => setActiveImage(image)}
      aria-label={`放大查看${image.alt}`}
    >
      <span className="poster-banner-image">
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
      </span>
    </button>
  );

  return (
    <main className="poster-banner-page">
      <a className="poster-banner-back" href="/#projects" aria-label="返回首页项目展示">
        <ArrowLeft size={20} />
        <span>返回项目展示</span>
      </a>

      <div className="poster-banner-content">
        <section className="poster-banner-landscape" aria-label="横版海报作品">
          {landscapeImages.map((image) => renderTile(image, 'poster-banner-landscape-tile'))}
        </section>

        <section className="poster-banner-masonry" aria-label="海报与Banner作品">
          {columns.map((images, columnIndex) => (
            <div className="poster-banner-column" key={columnIndex}>
              {images.map((image) => renderTile(image, 'poster-banner-masonry-tile'))}
            </div>
          ))}
        </section>
      </div>

      {activeImage && (
        <div
          className="poster-banner-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="海报大图预览"
          onClick={() => setActiveImage(null)}
        >
          <button className="poster-banner-close" type="button" onClick={() => setActiveImage(null)} aria-label="关闭大图">
            <X size={24} />
          </button>
          <img src={activeImage.src} alt={activeImage.alt} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
