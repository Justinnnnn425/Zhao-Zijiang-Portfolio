'use client';

import { ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';

const iconNumbers = [
  1, 2, 3, 4, 5, 6,
  7, 8, 9, 10, 12, 13,
  14, 15, 16, 18, 19, 20,
  21, 22, 23, 24, 25, 27,
  28, 30, 31, 32, 33, 34,
  35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46,
  47, 48, 50, 51, 52, 53,
];

type IconItem = {
  key: string;
  src: string;
};

const newIcons: IconItem[] = Array.from({ length: 24 }, (_, index) => ({
  key: `new-${index + 1}`,
  src: `/assets/new-icon-grid/new_${String(index + 1).padStart(2, '0')}.webp`,
}));

const originalIcons: IconItem[] = iconNumbers.map((number) => ({
  key: `original-${number}`,
  src: `/assets/icon-grid/6_1_${number}.webp`,
}));

const outlineIcons: IconItem[] = Array.from({ length: 35 }, (_, index) => ({
  key: `outline-${index + 1}`,
  src: `/assets/outline-icon-grid/outline_${String(index + 1).padStart(2, '0')}.webp`,
}));

function InteractiveIconGrid({ items, label, columns = 6 }: { items: IconItem[]; label: string; columns?: number }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const neighbours = useMemo(() => {
    if (hovered === null) return new Set<number>();
    const nearby = [hovered - columns, hovered + columns];
    if (hovered % columns !== 0) nearby.push(hovered - 1);
    if (hovered % columns !== columns - 1) nearby.push(hovered + 1);
    return new Set(nearby.filter((index) => index >= 0 && index < items.length));
  }, [hovered, items.length]);

  return (
    <section className={`icons-grid${columns === 8 ? ' icons-grid--8' : ''}`} aria-label={label}>
      {items.map((item, index) => (
        <div
          className={`icon-cell${hovered === index ? ' is-active' : ''}${neighbours.has(index) ? ' is-neighbour' : ''}`}
          key={item.key}
          onPointerEnter={() => setHovered(index)}
          onPointerLeave={() => setHovered(null)}
        >
          <img src={item.src} alt={`${label} ${index + 1}`} loading="lazy" decoding="async" draggable={false} />
        </div>
      ))}
    </section>
  );
}

export default function IconGrid() {

  return (
    <main className="icons-page">
      <a className="icons-back" href="/#projects" aria-label="返回首页项目展示">
        <ArrowLeft size={20} />
        <span>返回项目展示</span>
      </a>

      <div className="icons-galleries">
        <InteractiveIconGrid items={newIcons} label="新图标设计作品" />
        <InteractiveIconGrid items={originalIcons} label="原图标设计作品" />
        <InteractiveIconGrid items={outlineIcons} label="线性图标设计作品" columns={8} />
      </div>
    </main>
  );
}
