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

const columns = 6;

export default function IconGrid() {
  const [hovered, setHovered] = useState<number | null>(null);
  const neighbours = useMemo(() => {
    if (hovered === null) return new Set<number>();
    const nearby = [hovered - columns, hovered + columns];
    if (hovered % columns !== 0) nearby.push(hovered - 1);
    if (hovered % columns !== columns - 1) nearby.push(hovered + 1);
    return new Set(nearby.filter((index) => index >= 0 && index < iconNumbers.length));
  }, [hovered]);

  return (
    <main className="icons-page">
      <a className="icons-back" href="/#projects" aria-label="返回首页项目展示">
        <ArrowLeft size={20} />
        <span>返回项目展示</span>
      </a>

      <section className="icons-grid" aria-label="图标设计作品">
        {iconNumbers.map((number, index) => (
          <div
            className={`icon-cell${hovered === index ? ' is-active' : ''}${neighbours.has(index) ? ' is-neighbour' : ''}`}
            key={number}
            onPointerEnter={() => setHovered(index)}
            onPointerLeave={() => setHovered(null)}
          >
            <img src={`/assets/icon-grid/6_1_${number}.webp`} alt={`图标设计作品 ${index + 1}`} loading="lazy" decoding="async" draggable={false} />
          </div>
        ))}
      </section>
    </main>
  );
}
