'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

const highlights = [
  {
    category: 'UI / 产品体验',
    project: '平安知鸟 UI 设计',
    copy: '围绕学习场景梳理信息层级与页面结构，让复杂内容拥有清晰、统一的视觉表达。',
  },
  {
    category: '品牌 / 视觉系统',
    project: '平安知鸟品牌升级',
    copy: '从品牌标志、字体与色彩规范，到实际物料应用，建立连贯且具有辨识度的品牌语言。',
  },
  {
    category: '创意 / 运营设计',
    project: '海报与长图设计',
    copy: '结合传播目标与内容重点，构建适用于不同活动场景的视觉方案与可复用设计规范。',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(1);

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="testimonials-heading">
        <h2 id="testimonials-title">Testimonials that<br />Speak to <span>My Results</span></h2>
        <p>真实合作评价内容整理中，以下先展示代表项目的设计实践。</p>
      </div>

      <div className="testimonials-carousel" aria-live="polite">
        {highlights.map((item, index) => {
          const position = index === active ? 'active' : index === (active + highlights.length - 1) % highlights.length ? 'previous' : 'next';
          return (
            <article className={`testimonial-card testimonial-card--${position}`} key={item.project} aria-hidden={position !== 'active'}>
              <div className="testimonial-stars" aria-hidden="true">
                {Array.from({ length: 5 }, (_, star) => <Star key={star} size={23} fill="currentColor" strokeWidth={1} />)}
                <span>PROJECT HIGHLIGHT</span>
              </div>
              <p className="testimonial-copy">{item.copy}</p>
              <div className="testimonial-card-bottom"><div className="testimonial-person"><span className="testimonial-avatar" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><strong>{item.project}</strong><small>{item.category}</small></div></div><span className="testimonial-quote" aria-hidden="true">“</span></div>
            </article>
          );
        })}
      </div>

      <div className="testimonials-controls">
        <button type="button" onClick={() => setActive((active + highlights.length - 1) % highlights.length)} aria-label="查看上一项"><ArrowLeft size={24} /></button>
        <button type="button" onClick={() => setActive((active + 1) % highlights.length)} aria-label="查看下一项"><ArrowRight size={24} /></button>
      </div>
    </section>
  );
}
