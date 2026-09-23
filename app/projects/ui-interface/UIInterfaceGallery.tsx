'use client';

import { ArrowLeft, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const upperFiles = Array.from({ length: 11 }, (_, index) => `${index + 1}.webp`);
const lowerFiles = Array.from({ length: 27 }, (_, index) => `${index + 1}.webp`);
const introFiles = ['0-1.jpg', '0-2.jpg', '0-3.jpg'];

export default function UIInterfaceGallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const lowerColumns = useMemo(
    () => Array.from({ length: 3 }, (_, column) => lowerFiles.filter((_, index) => index % 3 === column)),
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
    <main className="ui-interface-page">
      <a className="ui-interface-back" href="/#projects" aria-label="返回首页项目展示">
        <ArrowLeft size={20} />
        <span>返回项目展示</span>
      </a>

      <section className="ui-interface-intro" aria-label="加油宝UI界面与设计规范概览">
        {introFiles.map((file, index) => {
          const src = `/assets/ui-interface/intro/${file}`;
          return (
            <button className="ui-interface-hero" type="button" key={file} onClick={() => setActiveImage(src)} aria-label={`放大查看加油宝UI概览 ${index + 1}`}>
              <span><img src={src} alt={`加油宝UI概览 ${index + 1}`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" /></span>
            </button>
          );
        })}
      </section>

      <section className="ui-interface-upper" aria-label="UI设计规范作品">
        {upperFiles.map((file, index) => {
          const src = `/assets/ui-interface/upper/${file}`;
          return (
            <button className="ui-interface-hero" type="button" key={file} onClick={() => setActiveImage(src)} aria-label={`放大查看UI设计规范 ${index + 1}`}>
              <span><img src={src} alt={`UI设计规范作品 ${index + 1}`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" /></span>
            </button>
          );
        })}
      </section>

      <section className="ui-interface-masonry" aria-label="UI界面设计作品">
        {lowerColumns.map((files, columnIndex) => (
          <div className="ui-interface-column" key={columnIndex}>
            {files.map((file) => {
              const index = Number.parseInt(file, 10);
              const src = `/assets/ui-interface/lower/${file}`;
              return (
                <button className="ui-interface-tile" type="button" key={file} onClick={() => setActiveImage(src)} aria-label={`放大查看UI界面设计 ${index}`}>
                  <span className="ui-interface-image">
                    <img src={src} alt={`UI界面设计作品 ${index}`} loading="lazy" decoding="async" />
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </section>

      {activeImage && (
        <div className="ui-interface-lightbox" role="dialog" aria-modal="true" aria-label="UI界面设计大图预览" onClick={() => setActiveImage(null)}>
          <button className="ui-interface-close" type="button" onClick={() => setActiveImage(null)} aria-label="关闭大图"><X size={24} /></button>
          <img src={activeImage} alt="UI界面设计大图" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
