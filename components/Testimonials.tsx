'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: '陈道高',
    title: 'CEO，深圳一尺万丈科技',
    copy: '合作过好几次了，合作非常愉快，沟通效率很高，大部分时候都能第一时间知道我想要什么，做事很麻利，FSMS系统后台的整体设计和后续支持都非常符合我的预期，总之很满意，期待下次合作！',
  },
  {
    name: '黄远杰',
    title: '高级视觉设计师，平安知鸟',
    copy: '设计审美在线，需求分配也非常合理，知道小伙伴们的擅长点和想进步的方向，会适当加一些挑战让小伙伴们持续进化。需求时间把控也很稳，一般都会提前对接需求方，好给小伙伴们预留更多的准备时间，团队氛围也很融洽，团队输出效率高，能一起共事真的棒棒的！',
  },
  {
    name: '宋敬月',
    title: '高级品宣，平安知鸟',
    copy: '每次有紧急需求都能帮我快速搞定！相当靠谱！我的很多任务都是直属领导临时想起来告诉我的，我第一时间找大江对接，不管是前期风格尝试还是草稿出图，设计需求从没有耽误过！相当稳！',
  },
  {
    name: '蒋卫磊',
    title: '营销总监，深圳荣乔实业',
    copy: '老朋友了，很多设计项目都帮我圆满搞定！深圳礼品展多次展会的相关宣传物料都是阿江帮我做的设计，都挺满意的，合作沟通也挺好的，能够很快get我想要的点，真的省心省力，期待下次合作！',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="testimonials-heading">
        <h2 id="testimonials-title">合作者＆同事评价</h2>
        <p>Real feedback from collaborators &amp; workmates</p>
      </div>

      <div className="testimonials-carousel" aria-live="polite">
        {testimonials.map((item, index) => {
          const position = index === active ? 'active' : index === (active + testimonials.length - 1) % testimonials.length ? 'previous' : index === (active + 1) % testimonials.length ? 'next' : 'hidden';
          return (
            <article className={`testimonial-card testimonial-card--${position}`} key={item.name} aria-hidden={position !== 'active'}>
              <div className="testimonial-stars" aria-hidden="true">
                {Array.from({ length: 5 }, (_, star) => <Star key={star} size={23} fill="currentColor" strokeWidth={1} />)}
                <span>5.0</span>
              </div>
              <p className="testimonial-copy">{item.copy}</p>
              <div className="testimonial-card-bottom"><div className="testimonial-person"><span className="testimonial-avatar" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><strong>{item.name}</strong><small>{item.title}</small></div></div><span className="testimonial-quote" aria-hidden="true">“</span></div>
            </article>
          );
        })}
      </div>

      <div className="testimonials-controls">
        <button type="button" onClick={() => setActive((active + testimonials.length - 1) % testimonials.length)} aria-label="查看上一条评价"><ArrowLeft size={24} /></button>
        <button type="button" onClick={() => setActive((active + 1) % testimonials.length)} aria-label="查看下一条评价"><ArrowRight size={24} /></button>
      </div>
    </section>
  );
}
