import { ArrowLeft } from 'lucide-react';

const groupOne = Array.from({ length: 4 }, (_, index) => `/assets/materials-collection/01/${String(index + 1).padStart(2, '0')}.webp`);
const groupTwo = Array.from({ length: 12 }, (_, index) => `/assets/materials-collection/02/${String(index + 1).padStart(2, '0')}.webp`);

export default function MaterialsCollection() {
  return (
    <main className="materials-page">
      <a className="materials-back" href="/#projects" aria-label="返回首页项目展示">
        <ArrowLeft size={20} />
        <span>返回项目展示</span>
      </a>

      <div className="materials-content">
        <section className="materials-slice-stack" aria-label="加油宝网页设计">
          {groupOne.map((src, index) => <img src={src} alt={`加油宝网页设计 ${index + 1}`} key={src} decoding="async" />)}
        </section>

        <section className="materials-slice-stack" aria-label="加油宝品牌设计">
          {groupTwo.map((src, index) => <img src={src} alt={`加油宝品牌设计 ${index + 1}`} key={src} loading="lazy" decoding="async" />)}
        </section>

        <section className="materials-pair" aria-label="加油宝标志方案">
          <img src="/assets/materials-collection/03.webp" alt="加油宝标志方案一" loading="lazy" decoding="async" />
          <img src="/assets/materials-collection/04.webp" alt="加油宝标志方案二" loading="lazy" decoding="async" />
        </section>

        <section className="materials-pair materials-videos" aria-label="加油宝动态设计">
          <video autoPlay muted loop playsInline preload="metadata" aria-label="加油宝动态设计一">
            <source src="/assets/materials-collection/05.mp4" type="video/mp4" />
          </video>
          <video autoPlay muted loop playsInline preload="metadata" aria-label="加油宝动态设计二">
            <source src="/assets/materials-collection/06.mp4" type="video/mp4" />
          </video>
        </section>

        <img className="materials-wide" src="/assets/materials-collection/07.webp" alt="平安知鸟行业培训解决方案" loading="lazy" decoding="async" />
        <img className="materials-wide" src="/assets/materials-collection/08.webp" alt="平安知鸟品牌宣传册" loading="lazy" decoding="async" />
      </div>
    </main>
  );
}
