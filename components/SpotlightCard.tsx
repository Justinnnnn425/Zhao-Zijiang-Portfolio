'use client';
import { useRef, type ReactNode, type MouseEvent } from 'react';
import './SpotlightCard.css';

export default function SpotlightCard({children,className='',spotlightColor='rgba(255,75,26,.28)'}:{children:ReactNode;className?:string;spotlightColor?:string}){
 const divRef=useRef<HTMLDivElement>(null);
 const frameRef=useRef<number|null>(null);
 const handleMouseMove=(e:MouseEvent<HTMLDivElement>)=>{
  const el=divRef.current;if(!el)return;const rect=el.getBoundingClientRect();
  const x=e.clientX-rect.left;
  const y=e.clientY-rect.top;
  const nx=x/rect.width-.5;
  const ny=y/rect.height-.5;
  if(frameRef.current!==null)cancelAnimationFrame(frameRef.current);
  frameRef.current=requestAnimationFrame(()=>{
   el.style.setProperty('--mouse-x',`${x}px`);
   el.style.setProperty('--mouse-y',`${y}px`);
   el.style.setProperty('--spotlight-color',spotlightColor);
   el.style.setProperty('--tilt-x',`${ny*-18}deg`);
   el.style.setProperty('--tilt-y',`${nx*24}deg`);
   el.style.transform=`perspective(1000px) rotateX(${ny*-18}deg) rotateY(${nx*24}deg) scale3d(1.04,1.04,1.04)`;
  });
 };
 const handleMouseEnter=()=>{
  const el=divRef.current;if(!el)return;
  el.classList.add('is-hovered');
  el.style.transform='perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.04,1.04,1.04)';
 };
 const handleMouseLeave=()=>{
  const el=divRef.current;if(!el)return;
  if(frameRef.current!==null)cancelAnimationFrame(frameRef.current);
  el.classList.remove('is-hovered');
  el.style.setProperty('--tilt-x','0deg');
  el.style.setProperty('--tilt-y','0deg');
  el.style.transform='none';
  el.style.setProperty('--mouse-x','50%');
  el.style.setProperty('--mouse-y','50%');
 };
 return <div ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`card-spotlight ${className}`}>{children}</div>;
}
