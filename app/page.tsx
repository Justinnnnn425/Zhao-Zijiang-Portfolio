import { ArrowDown, ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import Grainient from '@/components/Grainient';
import SpotlightCard from '@/components/SpotlightCard';
import PortfolioMotion from '@/components/PortfolioMotion';
import BendingMarquee from '@/components/BendingMarquee';
import WarpedCard from '@/components/WarpedCard';
import FluidSectionTitle from '@/components/FluidSectionTitle';
import GlitterWrap from '@/components/originkit/ui/glitterwrap-custom-style';

const projects = [
  { index: '01', title: '平安知鸟IP形象优化设计', subtitle: 'PINGAN ZHINIAO IP DESIGN', tone: 'blue', copy: '重塑平安知鸟IP形象，从主形象到周边运营物料应用的完整视觉系统。', image: '/assets/project-01-zhiniao.webp', href: '/projects/zhiniao-ip' },
  { index: '02', title: '平安知鸟UI设计', subtitle: 'PING AN ZHI NIAO UI DESIGN', tone: 'silver', copy: '建立直播长图与营销海报规范，让分散的内容输出成为可复用、可规模化的视觉资产。', image: '/assets/project-02-ui.webp', href: '/projects/zhiniao-ui' },
  { index: '03', title: '加油宝UI界面及规范设计', subtitle: 'JIA YOU BAO UI DESIGN', tone: 'lime', copy: '覆盖核心界面与交互场景，以清晰、一致的视觉语言提升产品体验。', image: '/assets/project-03-ui.webp', href: '/projects/ui-interface' },
  { index: '04', title: '平安知鸟品牌LOGO系统升级', subtitle: 'PINGAN ZHINIAO Brand upgrade design', tone: 'violet', copy: '从超级符号主视觉、字体与色彩规范，到落地应用规范的完整品牌系统性升级。', image: '/assets/project-04-slot.webp', href: '/projects/zhiniao-brand-logo' },
  { index: '05', title: 'H5长图海报', subtitle: 'H5 operation poster design', tone: 'blue', copy: '项目介绍占位文字，后续可替换为正式的项目背景、设计策略与成果说明。', image: '/assets/project-05-h5.webp', href: '/projects/h5-posters' },
  { index: '06', title: '图标设计', subtitle: 'ICON design', tone: 'silver', copy: '项目介绍占位文字，后续可替换为正式的项目背景、设计策略与成果说明。', image: '/assets/project-06-icons.webp', href: '/projects/icons' },
  { index: '07', title: '海报 / BANNER设计', subtitle: 'Poster & Banner design', tone: 'lime', copy: '项目介绍占位文字，后续可替换为正式的项目背景、设计策略与成果说明。', image: '/assets/project-07-poster-banner.webp', href: '/projects/poster-banner' },
  { index: '08', title: '插画 & 手绘', subtitle: 'Illustration & Drawings', tone: 'violet', copy: '项目介绍占位文字，后续可替换为正式的项目背景、设计策略与成果说明。', image: '/assets/project-08-illustration.webp', href: '/projects/illustrations' },
];

const strengths = [
  { num:'01', title:'视觉表达', en:'VISUAL EXPRESSION', copy:'14年视觉设计积淀，覆盖 UI、Web、运营及多元视觉场景，以成熟的审美与设计语言，构建高品质视觉体验。', image:'/assets/advantage-1-front.webp', back:'/assets/advantage-1-back.webp' },
  { num:'02', title:'产品思维', en:'PRODUCT THINKING', copy:'融合视觉、交互与产品思维，从用户需求与使用场景出发，兼顾体验、逻辑与多端落地，推动设计形成完整闭环。', image:'/assets/advantage-2-front.webp', back:'/assets/advantage-2-back.webp' },
  { num:'03', title:'品牌塑造', en:'BRAND BUILDING', copy:'从品牌 VI 到全渠道视觉体系，建立统一且具有辨识度的品牌语言，并持续推动视觉资产的搭建、迭代与延展。', image:'/assets/advantage-3-front.webp', back:'/assets/advantage-3-back.webp' },
  { num:'04', title:'商业洞察', en:'BUSINESS INSIGHT', copy:'拥有电商全链路与运营经验，将设计与营销策略结合，以商业目标驱动视觉表达，让创意兼具传播力与转化价值。', image:'/assets/advantage-4-front.webp', back:'/assets/advantage-4-back.webp' },
  { num:'05', title:'智能创意', en:'AI-POWERED CREATIVITY', copy:'将 AI 深度融入创意探索与设计工作流，拓展视觉表达边界，同时提升创意效率、方案丰富度与设计产能。', image:'/assets/advantage-5-front.webp', back:'/assets/advantage-5-back.webp' },
  { num:'06', title:'设计引领', en:'DESIGN LEADERSHIP', copy:'具备设计团队管理与项目统筹经验，通过流程标准化、资源协同与质量把控，持续提升团队整体设计效能。', image:'/assets/advantage-6-front.webp', back:'/assets/advantage-6-back.webp' },
];

export default function Home() {
  return (
    <main>
      <PortfolioMotion />
      <section className="hero" id="home">
        <Grainient className="hero-grainient" color1="#ff4b1f" color2="#090208" color3="#ffb137" timeSpeed={0.86} warpStrength={1.4} warpFrequency={5.5} warpAmplitude={22} blendAngle={-28} grainAmount={0.08} contrast={1.32} saturation={1.08} />
        <div className="hero-grid" />
        <nav className="site-nav" aria-label="主要导航">
          <a className="site-nav-brand" href="#home"><img src="/assets/zhaozijiang-logo.webp" alt="赵兹江个人标志" /></a>
          <div className="site-nav-links"><a href="#home">PORTFOLIO</a><a href="#experience">EXPERIENCE</a><a href="#strengths">CAPABILITIES</a><a href="#services">SERVICE</a><a href="#process">PROCESS</a><a href="#projects">PROJECTS</a><a href="#contact">CONTACT</a></div>
        </nav>
        <div className="hero-title shell"><svg className="title-star" aria-hidden="true" viewBox="0 0 100 100"><path d="M50 0C54 34 66 46 100 50C66 54 54 66 50 100C46 66 34 54 0 50C34 46 46 34 50 0Z" /></svg><img src="/assets/hero-title-creative-portfolio.webp" alt="Creative Portfolio" /></div>
        <div className="hero-character"><div className="hero-character-stage"><img src="/assets/hero-character-v2.webp" alt="伸手向镜头的黑白潮流人物形象" /></div></div>
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
        <div className="strength-grid">{strengths.map((item) => <article className="advantage-card" key={item.num} tabIndex={0}><div className="advantage-card-media"><img className="advantage-card-front" src={item.image} alt={`${item.title}，正面`} loading="lazy" decoding="async" /><img className="advantage-card-back" src={item.back} alt={`${item.title}，背面`} loading="lazy" decoding="async" /></div><div className="strength-copy"><h3>{item.title}</h3><small>{item.en}</small><i/><p>{item.copy}</p></div></article>)}</div>
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
        <img className="services-bg-image" src="/assets/services-background-final.webp" alt="" loading="lazy" decoding="async" />
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
          <WarpedCard className="portrait-wrap" imageSrc="/assets/profile-portrait-final.webp" />
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
            {project.href && <a className="project-card-hit" href={project.href} aria-label={`查看${project.title}完整项目`} />}
            <header className="project-card-head"><span>{project.index}</span><p>{project.subtitle}</p></header>
            <div className="project-image"><img src={project.image || '/assets/hero-art.webp'} alt={project.image ? `${project.title}项目封面` : ''} loading="lazy" decoding="async" />{!project.image && <div className="mock-ui"><i/><i/><i/></div>}</div>
            <div className="project-info"><div><h3>{project.title}</h3><p className="project-copy">{project.copy}</p></div><button aria-label={`查看${project.title}`}>VIEW CASE <ArrowUpRight size={18}/></button></div>
          </article>
        ))}</div>
      </section>

      <footer className="contact-section" id="contact">
        <div className="contact-inner shell">
          <header className="section-head contact-heading"><div className="module-heading-main"><div className="section-label">CONTACT ME</div><h2 className="fluid-title-heading"><span>联系我</span><FluidSectionTitle text="联系我" /></h2></div></header>
          <p className="contact-intro">I’m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Just reach out!</p>
          <div className="contact-build">
            <h3><span>LET’S BUILD</span><strong>SOMETHING<br/><em>AMAZING！</em></strong></h3>
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
