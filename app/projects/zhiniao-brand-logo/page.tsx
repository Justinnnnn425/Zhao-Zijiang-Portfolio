import { ArrowLeft } from 'lucide-react';
import './brand-logo.css';

export const metadata = {
  title: '平安知鸟品牌 LOGO 系统升级｜赵兹江作品集',
  description: '平安知鸟品牌 LOGO 系统升级完整项目展示。',
};

const projectImages = Array.from({ length: 28 }, (_, index) => index + 1);

export default function ZhiniaoBrandLogoPage() {
  return (
    <main className="brand-logo-page">
      <a className="brand-logo-back" href="/#projects" aria-label="返回首页项目展示">
        <ArrowLeft size={20} />
        <span>返回项目展示</span>
      </a>

      <section className="brand-logo-gallery" aria-label="平安知鸟品牌 LOGO 系统升级项目图片">
        {projectImages.map((imageNumber) => (
          <img
            key={imageNumber}
            src={`/assets/zhiniao-brand-logo/4-${imageNumber}.webp`}
            alt={`平安知鸟品牌 LOGO 系统升级 ${imageNumber}`}
            loading="lazy"
            decoding="async"
          />
        ))}
      </section>
    </main>
  );
}
