'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './Grainient.css';

type Props = {
  color1?: string; color2?: string; color3?: string; timeSpeed?: number;
  colorBalance?: number; warpStrength?: number; warpFrequency?: number;
  warpSpeed?: number; warpAmplitude?: number; blendAngle?: number;
  blendSoftness?: number; rotationAmount?: number; noiseScale?: number;
  grainAmount?: number; grainScale?: number; grainAnimated?: boolean;
  contrast?: number; gamma?: number; saturation?: number; centerX?: number;
  centerY?: number; zoom?: number; lightMode?: boolean; className?: string;
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [parseInt(result[1],16)/255,parseInt(result[2],16)/255,parseInt(result[3],16)/255];
};

const vertex = `#version 300 es
in vec2 position;
void main(){gl_Position=vec4(position,0.0,1.0);}`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution; uniform float iTime; uniform float uTimeSpeed;
uniform float uColorBalance; uniform float uWarpStrength; uniform float uWarpFrequency;
uniform float uWarpSpeed; uniform float uWarpAmplitude; uniform float uBlendAngle;
uniform float uBlendSoftness; uniform float uRotationAmount; uniform float uNoiseScale;
uniform float uGrainAmount; uniform float uGrainScale; uniform float uGrainAnimated;
uniform float uContrast; uniform float uGamma; uniform float uSaturation;
uniform vec2 uCenterOffset; uniform float uZoom; uniform vec3 uColor1;
uniform vec3 uColor2; uniform vec3 uColor3; uniform float uLightMode;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i),f),dot(-1.0+2.0*hash(i+vec2(1,0)),f-vec2(1,0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0,1)),f-vec2(0,1)),dot(-1.0+2.0*hash(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);return .5+.5*n;}
void mainImage(out vec4 o,vec2 C){
 float t=iTime*uTimeSpeed;vec2 uv=C/iResolution.xy;float ratio=iResolution.x/iResolution.y;
 vec2 tuv=uv-.5+uCenterOffset;tuv/=max(uZoom,.001);
 float degree=noise(vec2(t*.1,tuv.x*tuv.y)*uNoiseScale);tuv.y*=1.0/ratio;
 tuv*=Rot(radians((degree-.5)*uRotationAmount+180.0));tuv.y*=ratio;
 float amp=uWarpAmplitude/max(uWarpStrength,.001),wt=t*uWarpSpeed;
 tuv.x+=sin(tuv.y*uWarpFrequency+wt)/amp;
 tuv.y+=sin(tuv.x*(uWarpFrequency*1.5)+wt)/(amp*.5);
 float b=uColorBalance,s=max(uBlendSoftness,0.0),x=(tuv*Rot(radians(uBlendAngle))).x;
 float e0=-.3-b-s,e1=.2-b+s,v0=.5-b+s,v1=-.3-b-s;
 vec3 col=mix(mix(uColor3,uColor2,S(e0,e1,x)),mix(uColor2,uColor1,S(e0,e1,x)),S(v0,v1,tuv.y));
 vec2 guv=uv*max(uGrainScale,.001);if(uGrainAnimated>.5)guv+=vec2(iTime*.05);
 float grain=fract(sin(dot(guv,vec2(12.9898,78.233)))*43758.5453);col+=(grain-.5)*uGrainAmount;
 col=(col-.5)*uContrast+.5;float luma=dot(col,vec3(.2126,.7152,.0722));
 col=mix(vec3(luma),col,uSaturation);col=pow(max(col,0.0),vec3(1.0/max(uGamma,.001)));
 o=vec4(clamp(col,0.0,1.0),1.0);
}
void main(){vec4 o=vec4(0);mainImage(o,gl_FragCoord.xy);fragColor=o;}`;

export default function Grainient({
  timeSpeed=.8,colorBalance=0,warpStrength=1.6,warpFrequency=6.1,warpSpeed=2,
  warpAmplitude=18,blendAngle=-35,blendSoftness=.16,rotationAmount=460,
  noiseScale=1.65,grainAmount=.06,grainScale=1.8,grainAnimated=false,
  contrast=1.25,gamma=1.1,saturation=1.05,centerX=0,centerY=.04,zoom=.95,
  color1='#FF4F2A',color2='#040111',color3='#C4FF41',lightMode=false,className=''
}:Props){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const container=ref.current;if(!container)return;
  const renderer=new Renderer({webgl:2,alpha:true,antialias:false,dpr:Math.min(devicePixelRatio||1,2)});
  const gl=renderer.gl,canvas=gl.canvas as HTMLCanvasElement;container.appendChild(canvas);
  const geometry=new Triangle(gl);
  const uniforms:any={
   iTime:{value:0},iResolution:{value:new Float32Array([1,1])},
   uTimeSpeed:{value:timeSpeed},uColorBalance:{value:colorBalance},uWarpStrength:{value:warpStrength},
   uWarpFrequency:{value:warpFrequency},uWarpSpeed:{value:warpSpeed},uWarpAmplitude:{value:warpAmplitude},
   uBlendAngle:{value:blendAngle},uBlendSoftness:{value:blendSoftness},uRotationAmount:{value:rotationAmount},
   uNoiseScale:{value:noiseScale},uGrainAmount:{value:grainAmount},uGrainScale:{value:grainScale},
   uGrainAnimated:{value:grainAnimated?1:0},uContrast:{value:contrast},uGamma:{value:gamma},
   uSaturation:{value:saturation},uCenterOffset:{value:new Float32Array([centerX,centerY])},uZoom:{value:zoom},
   uColor1:{value:new Float32Array(hexToRgb(color1))},uColor2:{value:new Float32Array(hexToRgb(color2))},
   uColor3:{value:new Float32Array(hexToRgb(color3))},uLightMode:{value:lightMode?1:0}
  };
  const program=new Program(gl,{vertex,fragment,uniforms}),mesh=new Mesh(gl,{geometry,program});
  const resize=()=>{const r=container.getBoundingClientRect();renderer.setSize(Math.max(1,r.width),Math.max(1,r.height));uniforms.iResolution.value[0]=gl.drawingBufferWidth;uniforms.iResolution.value[1]=gl.drawingBufferHeight;};
  const ro=new ResizeObserver(resize);ro.observe(container);resize();
  let raf=0,visible=true;const t0=performance.now();
  const loop=(t:number)=>{uniforms.iTime.value=(t-t0)*.001;renderer.render({scene:mesh});raf=requestAnimationFrame(loop)};
  const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible&&!raf)raf=requestAnimationFrame(loop);else if(!visible&&raf){cancelAnimationFrame(raf);raf=0}});io.observe(container);raf=requestAnimationFrame(loop);
  return()=>{if(raf)cancelAnimationFrame(raf);ro.disconnect();io.disconnect();canvas.remove()};
 },[timeSpeed,colorBalance,warpStrength,warpFrequency,warpSpeed,warpAmplitude,blendAngle,blendSoftness,rotationAmount,noiseScale,grainAmount,grainScale,grainAnimated,contrast,gamma,saturation,centerX,centerY,zoom,color1,color2,color3,lightMode]);
 return <div ref={ref} className={`grainient-container ${className}`.trim()}/>;
}
