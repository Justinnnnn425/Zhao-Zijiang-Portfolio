'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
uniform vec2 uRes;
uniform vec2 uTexRes;
vec2 coverUv(vec2 uv, vec2 texSize, vec2 viewSize) {
  vec2 ratio = vec2(min((viewSize.x/viewSize.y)/(texSize.x/texSize.y),1.0),min((viewSize.y/viewSize.x)/(texSize.y/texSize.x),1.0));
  return uv * ratio + (1.0-ratio) * 0.5;
}
void main(){vUv=coverUv(uv,uTexRes,uRes);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;

const fragmentShader = `
precision highp float;
uniform sampler2D uTexture;uniform vec2 uMouse;uniform float uBulge;uniform float uRadius;uniform float uStrength;varying vec2 vUv;
void main(){vec2 uv=vUv-uMouse;float d=length(uv)/uRadius;float scale=uStrength/(1.0+pow(d,4.0));uv*=mix(1.0,scale,uBulge);uv+=uMouse;gl_FragColor=texture2D(uTexture,uv);}`;

function Scene({ imageSrc, pointer, bulge }: { imageSrc: string; pointer: [number, number]; bulge: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => new THREE.TextureLoader().load(imageSrc), [imageSrc]);
  const smoothPointer = useRef(new THREE.Vector2(.5,.5));
  const smoothBulge = useRef(0);
  const { size, viewport } = useThree();
  const uniforms = useMemo(() => ({uTexture:{value:texture},uRes:{value:new THREE.Vector2(1,1)},uTexRes:{value:new THREE.Vector2(16,9)},uMouse:{value:new THREE.Vector2(.5,.5)},uBulge:{value:0},uRadius:{value:.72},uStrength:{value:1.32}}), [texture]);

  useEffect(() => () => texture.dispose(), [texture]);
  useFrame((_, delta) => {
    if (!mesh.current) return;
    const material = mesh.current.material as THREE.ShaderMaterial;
    const ease = 1-Math.exp(-delta/.075);
    smoothPointer.current.x += (pointer[0]-smoothPointer.current.x)*ease;
    smoothPointer.current.y += (pointer[1]-smoothPointer.current.y)*ease;
    smoothBulge.current += (bulge-smoothBulge.current)*ease;
    material.uniforms.uMouse.value.copy(smoothPointer.current);
    material.uniforms.uBulge.value=smoothBulge.current;
    material.uniforms.uRes.value.set(size.width*viewport.dpr,size.height*viewport.dpr);
    const image = texture.image as HTMLImageElement | undefined;
    if (image) material.uniforms.uTexRes.value.set(image.naturalWidth||image.width,image.naturalHeight||image.height);
  });
  return <mesh ref={mesh}><planeGeometry args={[2,2]}/><shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader}/></mesh>;
}

export default function WarpedCard({ imageSrc, className='' }: { imageSrc: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pointer,setPointer]=useState<[number,number]>([.5,.5]);
  const [bulge,setBulge]=useState(0);
  const onPointerMove=useCallback((event: React.PointerEvent<HTMLDivElement>)=>{const rect=ref.current?.getBoundingClientRect();if(!rect)return;setPointer([(event.clientX-rect.left)/rect.width,1-(event.clientY-rect.top)/rect.height]);},[]);
  return <div ref={ref} className={`warped-card ${className}`} onPointerMove={onPointerMove} onPointerEnter={()=>setBulge(1)} onPointerLeave={()=>setBulge(0)}>
    <Canvas orthographic camera={{position:[0,0,1],zoom:1,left:-1,right:1,top:1,bottom:-1}} gl={{antialias:true,alpha:true}}>
      <Scene imageSrc={imageSrc} pointer={pointer} bulge={bulge}/>
    </Canvas>
  </div>;
}
