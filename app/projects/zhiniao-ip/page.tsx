import { ArrowLeft } from 'lucide-react';
import './project-detail.css';

export const metadata = {
  title: '平安知鸟 IP 形象优化设计｜赵兹江作品集',
  description: '平安知鸟 IP 形象优化设计完整项目展示。',
};

const projectImages = Array.from({ length: 27 }, (_, index) =>
  String(index + 1).padStart(2, '0'),
);

export default function ZhiniaoIpProjectPage() {
  return (
    <main className="ip-project-page">
      <a className="ip-project-back" href="/#projects" aria-label="返回首页项目展示">
        <ArrowLeft size={20} />
        <span>返回项目展示</span>
      </a>

      <section className="ip-project-gallery" aria-label="平安知鸟 IP 形象优化设计项目图片">
        {projectImages.map((imageNumber) => (
          <img
            key={imageNumber}
            src={`/assets/zhiniao-ip/${imageNumber}.png`}
            alt={`平安知鸟 IP 形象优化设计 ${imageNumber}`}
          />
        ))}
      </section>
    </main>
  );
}
