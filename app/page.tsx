import { ArrowDown, ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import Grainient from '@/components/Grainient';
import SpotlightCard from '@/components/SpotlightCard';
import PortfolioMotion from '@/components/PortfolioMotion';
import BendingMarquee from '@/components/BendingMarquee';
import WarpedCard from '@/components/WarpedCard';
import FluidSectionTitle from '@/components/FluidSectionTitle';
import GlitterWrap from '@/components/originkit/ui/glitterwrap-custom-style';

const projects = [
  { index: '01', title: '知鸟品牌视觉系统', subtitle: 'BRAND IDENTITY / 2021—2025', tone: 'blue', copy: '重塑企业培训平台的品牌语言，从主视觉、字体与色彩规范，到课程、活动与运营物料的完整视觉系统。' },
  { index: '02', title: '直播与课程营销设计', subtitle: 'CAMPAIGN SYSTEM / 2022—2025', tone: 'silver', copy: '建立直播长图与营销海报规范，让分散的内容输出成为可复用、可规模化的视觉资产。' },
  { index: '03', title: '面授教学视觉体系', subtitle: 'OFFLINE EXPERIENCE / 2024—2025', tone: 'lime', copy: '覆盖开班、教学、结业全流程，以统一而清晰的视觉载体沉淀线下培训价值。' },
  { index: '04', title: '加油宝产品与运营视觉', subtitle: 'UI / CAMPAIGN / 2016—2018', tone: 'violet', copy: '从 APP 界面、图标体系到营销闪屏和 H5，统一金融产品的专业感与业务转化体验。' },
];

const strengths = [
  { num:'01', title:'视觉表达', en:'VISUAL EXPRESSION', copy:'14 年设计积淀，以多元视觉语言构建高品质体验。', image:'/assets/advantage-1-front.png', back:'/assets/advantage-1-back.png' },
  { num:'02', title:'产品思维', en:'PRODUCT THINKING', copy:'融合视觉、交互与产品，推动体验与设计完整落地。', image:'/assets/advantage-2-front.png', back:'/assets/advantage-2-back.png' },
  { num:'03', title:'品牌塑造', en:'BRAND BUILDING', copy:'构建统一品牌语言，持续沉淀并拓展视觉资产。', image:'/assets/advantage-3-front.png', back:'/assets/advantage-3-back.png' },
  { num:'04', title:'商业洞察', en:'BUSINESS INSIGHT', copy:'连接设计与营销，让创意产生传播与转化价值。', image:'/assets/advantage-4-front.png', back:'/assets/advantage-4-back.png' },
  { num:'05', title:'智能创意', en:'AI-POWERED CREATIVITY', copy:'以 AI 拓展创意边界，重塑设计效率与表达方式。', image:'/assets/advantage-5-front.png', back:'/assets/advantage-5-back.png' },
  { num:'06', title:'设计引领', en:'DESIGN LEADERSHIP', copy:'统筹团队、项目与标准，驱动更高质量的设计产出。', image:'/assets/advantage-6-front.png', back:'/assets/advantage-6-back.png' },
];

export default function Home() {
  return (
    <main>
      <PortfolioMotion />
      <section className="hero" id="home">
        <Grainient className="hero-grainient" color1="#ff4b1f" color2="#090208" color3="#ffb137" timeSpeed={0.86} warpStrength={1.4} warpFrequency={5.5} warpAmplitude={22} blendAngle={-28} grainAmount={0.08} contrast={1.32} saturation={1.08} />
        <div className="hero-grid" />
        <nav className="site-nav" aria-label="主要导航">
          <a className="site-nav-brand" href="#home"><img src="/assets/zhaozijiang-logo.png" alt="赵兹江个人标志" /></a>
          <div className="site-nav-links"><a href="#home">PORTFOLIO</a><a href="#experience">EXPERIENCE</a><a href="#strengths">CAPABILITIES</a><a href="#services">SERVICE</a><a href="#process">PROCESS</a><a href="#projects">PROJECTS</a><a href="#contact">CONTACT</a></div>
        </nav>
        <div className="hero-title shell"><svg className="title-star" aria-hidden="true" viewBox="0 0 100 100"><path d="M50 0C54 34 66 46 100 50C66 54 54 66 50 100C46 66 34 54 0 50C34 46 46 34 50 0Z" /></svg><img src="/assets/hero-title-creative-portfolio.png" alt="Creative Portfolio" /></div>
        <div className="hero-character"><div className="hero-character-stage"><img src="/assets/hero-character-v2.png" alt="伸手向镜头的黑白潮流人物形象" /></div></div>
        <div className="hero-tag"><strong>ZhaoZijiang</strong><span>赵兹江 VISUAL / UI&nbsp;&nbsp;Portfolio</span></div>
        <a className="hero-scroll" href="#experience"><ArrowDown size={22}/> Scroll to view my work</a>
        <div className="hero-signature"><span className="signature-slash" aria-hidden="true">/</span><p>DESIGNING <em>BEYOND</em><br/>THE VISIBLE.</p></div>
      </section>

      <section className="experience-visual" id="experience" aria-labelledby="experience-title">
        <div className="experience-glitter" aria-hidden="true"><GlitterWrap /></div>
        <header className="section-head experience-heading shell">
          <div className="module-heading-main"><div className="section-label">WORK EXPERIENCE</div><h2 className="fluid-title-heading" id="experience-title"><span>工作经历</span><FluidSectionTitle text="工作经历" /></h2></div>
          <p>CAREER JOURNEY<br />2012—NOW</p>
        </header>
        <div className="experience-timeline shell">
          {[
            ['01', '深圳市中电电力技术', '2012.07 – 2014.11'],
            ['02', '深圳市爱都科技', '2015.01 – 2016.05'],
            ['03', '加油宝金融科技', '2016.05 – 2018.03'],
            ['04', '平安国际智慧城市知鸟', '2018.03 – 2025.09'],
          ].map(([number, company, period]) => (
            <article className="experience-item" key={number}>
              <strong>{number}</strong>
              <span className="experience-marker" aria-hidden="true" />
              <h3>{company}</h3>
              <p>{period}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section strengths shell" id="strengths">
        <div className="section-head"><div className="module-heading-main"><div className="section-label">CAPABILITIES</div><h2 className="fluid-title-heading"><span>个人优势</span><FluidSectionTitle text="个人优势" /></h2></div><p>STRATEGY × CRAFT<br />× DELIVERY</p></div>
        <div className="strength-grid">{strengths.map((item) => <article className="advantage-card" key={item.num} tabIndex={0}><div className="advantage-card-media"><img className="advantage-card-front" src={item.image} alt={`${item.title}，正面`} /><img className="advantage-card-back" src={item.back} alt={`${item.title}，背面`} /></div><div className="strength-copy"><h3>{item.title}</h3><small>{item.en}</small><i/><p>{item.copy}</p></div></article>)}</div>
      </section>

      <BendingMarquee
        className="bending-marquee-section"
        items={['VISUAL DESIGN', 'UI DESIGN', 'AI CREATIVE', 'BRAND IDENTITY', 'DESIGN SYSTEM', 'ART DIRECTION']}
        separator="✳︎"
        panelWidth={420}
        panelHeight={208}
        bend={50}
        depth={-200}
        perspective={800}
        speed={16}
        rows={2}
        rowGap={12}
        itemGap={30}
        bandPadding={6}
        fontSize={18}
        fontWeight={800}
        letterSpacing={1.25}
        color="#050505"
        bandColor="#FF4F2A"
        markSway={14}
        pauseDamping={0.85}
      />

      <section className="services-showcase" id="services">
        <img className="services-bg-image" src="/assets/services-background-final.png" alt="" />
        <div className="services-inner shell">
          <div className="services-title">WHAT I DO</div>
          <div className="services-cards">
            {[
              ['VISUAL','DESIGN','视觉设计'],
              ['UI','DESIGN','界面设计'],
              ['BRAND','IDENTITY','品牌设计'],
              ['AI','DESIGN','AI设计'],
            ].map(([lineOne,lineTwo,cn])=>(
              <SpotlightCard key={`${lineOne}-${lineTwo}`} className="service-card" spotlightColor="rgba(255,79,42,.3)">
                <h2><span>{lineOne}</span><span>{lineTwo}</span></h2><p>{cn}</p><b>///</b>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <section className="workflow-section" id="process" aria-label="工作流程">
        <header className="section-head workflow-heading shell">
          <div className="module-heading-main"><div className="section-label">DESIGN PROCESS</div><h2 className="fluid-title-heading"><span>工作流程</span><FluidSectionTitle text="工作流程" /></h2></div>
          <p>INSIGHT × CRAFT<br />× VALIDATION</p>
        </header>
        <div className="workflow-list shell">
          {[
            ['INSIGHT', '洞察', '问题', 'PROBLEM', '01'],
            ['DISTILL', '提炼', '方向', 'DIRECTION', '02'],
            ['CRAFT', '执行', '设计', 'DESIGN', '03'],
            ['REFINE', '反馈', '验证', 'VALIDATION', '04'],
          ].map(([title, cn, detail, en, number]) => (
            <article className="workflow-row" key={number} tabIndex={0}>
              <div className="workflow-copy"><h2>{title}</h2><p><strong>{cn}</strong><i>/</i><span>{detail}</span><small>{en}</small></p></div>
              <span className="workflow-number">{number}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section about shell" id="about">
        <div className="about-grid">
          <WarpedCard className="portrait-wrap" imageSrc="/assets/profile-portrait-final.png" />
          <div className="about-copy">
            <p className="kicker">HIGHLY EXPERIENCED SENIOR DESIGNER</p>
            <h2>在审美、秩序与商业目标之间，<br />创造真正<span>有效</span>的视觉体验。</h2>
            <p className="bio">我是一名拥有 14 年经验的高级视觉 / UI 设计师。长期负责企业学习平台、金融产品与品牌运营的全渠道视觉设计，既能独立从 0 到 1 搭建产品与品牌体系，也能带领团队稳定交付高质量设计。</p>
            <div className="contact-row"><a href="tel:13620215425"><Phone size={15}/> 136 2021 5425</a><a href="mailto:215292285@qq.com"><Mail size={15}/> 215292285@qq.com</a><span className="about-location"><MapPin size={15}/> BASED IN SHENZHEN</span></div>
          </div>
        </div>
      </section>

      <section className="section projects shell" id="projects">
        <div className="section-head"><div className="module-heading-main"><div className="section-label">PROJECT SHOWCASE</div><h2 className="fluid-title-heading"><span>项目展示</span><FluidSectionTitle text="项目展示" /></h2></div><p>SELECTED PROJECTS<br />2016—2025</p></div>
        <div className="project-list">{projects.map((project) => (
          <article className={`project-card ${project.tone}`} key={project.index}>
            <header className="project-card-head"><span>{project.index}</span><p>{project.subtitle}</p></header>
            <div className="project-image"><img src="/assets/hero-art.png" alt="" /><div className="mock-ui"><i/><i/><i/></div></div>
            <div className="project-info"><div><h3>{project.title}</h3><p className="project-copy">{project.copy}</p></div><button aria-label={`查看${project.title}`}>VIEW CASE <ArrowUpRight size={18}/></button></div>
          </article>
        ))}</div>
      </section>

      <footer className="contact-section" id="contact">
        <div className="contact-inner shell">
          <header className="section-head contact-heading"><div className="module-heading-main"><div className="section-label">CONTACT ME</div><h2 className="fluid-title-heading"><span>联系我</span><FluidSectionTitle text="联系我" /></h2></div></header>
          <p className="contact-intro">I’m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Just reach out!</p>
          <div className="contact-build">
            <h3><span>LET’S BUILD</span><strong>SOMETHING<br/><em>AMAZING</em></strong></h3>
            <div className="contact-details">
              <a href="mailto:215292285@qq.com"><i><Mail size={24}/></i><span>215292285@qq.com</span></a>
              <a href="tel:13620215425"><i><Phone size={24}/></i><span>136 2021 5425</span></a>
              <div><i><MapPin size={24}/></i><span>ShenZhen</span></div>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-marquee" aria-label="Thanks for watching">
        <div className="footer-marquee-track">
          <span>✳ THANKS FOR STOPPING BY</span><span>✳ CONTACT ME</span><span>✳ THANKS FOR STOPPING BY</span><span>✳ CONTACT ME</span>
          <span aria-hidden="true">✳ THANKS FOR STOPPING BY</span><span aria-hidden="true">✳ CONTACT ME</span><span aria-hidden="true">✳ THANKS FOR STOPPING BY</span><span aria-hidden="true">✳ CONTACT ME</span>
        </div>
      </div>
      <a className="back-to-top" href="#home" aria-label="返回顶部"><ArrowUp size={21} /></a>
    </main>
  );
}
