/**
 * Solar System — Planet data & procedural GLSL shaders.
 * Ported 1:1 from solar-system.html (kept untouched as standalone backup).
 */

/* ── Planet type definition ── */
export type PlanetData = {
  name: string;
  radius: number;
  pos: [number, number, number];
  rotSpeed: number;
  axialTilt: number;
  colors: [string, string];
  shaderType: 'rocky' | 'venus' | 'earth' | 'banded' | 'ice';
  noiseScale: number;
  bandFreq?: number;
  hasSpot?: boolean;
  hasRings?: boolean;
  atmoColor: [number, number, number];
  atmoIntensity: number;
  data: { diameter: string; distance: string; temp: string; moons: string };
  desc: string;
};

export const PLANETS: PlanetData[] = [
  {
    name: 'Mercurio', radius: 0.6, pos: [-2, 0, -30], rotSpeed: 0.008, axialTilt: 0.03,
    colors: ['0.45,0.43,0.42', '0.3,0.28,0.27'], shaderType: 'rocky', noiseScale: 4.0,
    atmoColor: [0.6, 0.6, 0.65], atmoIntensity: 0.3,
    data: { diameter: '4.879', distance: '57,9M', temp: '167°C', moons: '0' },
    desc: 'Il messaggero degli dei, il pianeta più vicino al Sole e il più piccolo del sistema solare.',
  },
  {
    name: 'Venere', radius: 0.9, pos: [3, 0.5, -65], rotSpeed: 0.003, axialTilt: 2.64,
    colors: ['0.85,0.7,0.3', '0.75,0.55,0.2'], shaderType: 'venus', noiseScale: 2.5,
    atmoColor: [0.9, 0.75, 0.3], atmoIntensity: 0.5,
    data: { diameter: '12.104', distance: '108,2M', temp: '464°C', moons: '0' },
    desc: 'La stella del mattino, avvolta in nubi di acido solforico. Il pianeta più caldo del sistema solare.',
  },
  {
    name: 'Terra', radius: 1.0, pos: [-3.5, -0.3, -100], rotSpeed: 0.006, axialTilt: 0.41,
    colors: ['0.05,0.2,0.6', '0.15,0.5,0.15'], shaderType: 'earth', noiseScale: 2.5,
    atmoColor: [0.3, 0.5, 1], atmoIntensity: 0.6,
    data: { diameter: '12.742', distance: '149,6M', temp: '15°C', moons: '1' },
    desc: "L'unico mondo conosciuto che ospita la vita. Un'oasi blu nel vuoto cosmico.",
  },
  {
    name: 'Marte', radius: 0.75, pos: [2.5, 0.8, -135], rotSpeed: 0.006, axialTilt: 0.44,
    colors: ['0.7,0.25,0.1', '0.55,0.18,0.08'], shaderType: 'rocky', noiseScale: 3.5,
    atmoColor: [0.8, 0.4, 0.2], atmoIntensity: 0.25,
    data: { diameter: '6.779', distance: '227,9M', temp: '-65°C', moons: '2' },
    desc: "Il pianeta rosso, la prossima frontiera dell'esplorazione umana nello spazio.",
  },
  {
    name: 'Giove', radius: 2.5, pos: [-4.5, -0.5, -180], rotSpeed: 0.012, axialTilt: 0.05,
    colors: ['0.8,0.6,0.35', '0.55,0.35,0.15'], shaderType: 'banded', noiseScale: 2.0,
    bandFreq: 28.0, hasSpot: true,
    atmoColor: [0.8, 0.6, 0.3], atmoIntensity: 0.5,
    data: { diameter: '139.820', distance: '778,5M', temp: '-110°C', moons: '95' },
    desc: 'Il gigante gassoso, più massiccio di tutti gli altri pianeti messi insieme.',
  },
  {
    name: 'Saturno', radius: 2.1, pos: [5, 0, -230], rotSpeed: 0.01, axialTilt: 0.47,
    colors: ['0.85,0.75,0.45', '0.7,0.6,0.3'], shaderType: 'banded', noiseScale: 3.0,
    bandFreq: 18.0, hasRings: true,
    atmoColor: [0.85, 0.75, 0.45], atmoIntensity: 0.45,
    data: { diameter: '116.460', distance: '1,434 Mld', temp: '-140°C', moons: '146' },
    desc: "L'eleganza degli anelli. Miliardi di frammenti di ghiaccio in danza gravitazionale.",
  },
  {
    name: 'Urano', radius: 1.4, pos: [-4, 0.6, -280], rotSpeed: 0.007, axialTilt: 1.71,
    colors: ['0.5,0.82,0.85', '0.35,0.7,0.75'], shaderType: 'ice', noiseScale: 2.0,
    atmoColor: [0.5, 0.8, 0.85], atmoIntensity: 0.45,
    data: { diameter: '50.724', distance: '2,871 Mld', temp: '-195°C', moons: '28' },
    desc: 'Il gigante di ghiaccio inclinato su un fianco, che rotola lungo la sua orbita.',
  },
  {
    name: 'Nettuno', radius: 1.35, pos: [3.5, -0.4, -330], rotSpeed: 0.006, axialTilt: 0.49,
    colors: ['0.1,0.18,0.65', '0.2,0.3,0.85'], shaderType: 'ice', noiseScale: 2.8,
    atmoColor: [0.2, 0.3, 0.9], atmoIntensity: 0.5,
    data: { diameter: '49.244', distance: '4,495 Mld', temp: '-200°C', moons: '16' },
    desc: "L'ultimo avamposto conosciuto. Venti supersonici spazzano la sua atmosfera blu.",
  },
];

/* ═══════════════════════════════════════════════════════
   GLSL SHADERS — identical to solar-system.html
   ═══════════════════════════════════════════════════════ */

export const NOISE_GLSL = /* glsl */ `
float hash(float n){return fract(sin(n)*43758.5453);}
float noise(vec3 x){
  vec3 p=floor(x);vec3 f=fract(x);f=f*f*(3.0-2.0*f);
  float n=p.x+p.y*57.0+113.0*p.z;
  return mix(mix(mix(hash(n),hash(n+1.0),f.x),mix(hash(n+57.0),hash(n+58.0),f.x),f.y),
             mix(mix(hash(n+113.0),hash(n+114.0),f.x),mix(hash(n+170.0),hash(n+171.0),f.x),f.y),f.z);
}
float fbm(vec3 p){float f=0.0;f+=.5*noise(p);p*=2.01;f+=.25*noise(p);p*=2.02;f+=.125*noise(p);p*=2.03;f+=.0625*noise(p);return f/.9375;}
`;

export const PLANET_VERT = /* glsl */ `
varying vec2 vUv;varying vec3 vNormal;varying vec3 vPosition;
void main(){
  vUv=uv;vNormal=normalize(normalMatrix*normal);vPosition=position;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
}`;

export const ATMO_VERT = /* glsl */ `
varying vec3 vNormal;
void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
`;

export const ATMO_FRAG = /* glsl */ `
uniform vec3 uColor;uniform float uIntensity;varying vec3 vNormal;
void main(){float i=pow(0.62-dot(vNormal,vec3(0,0,1)),2.5);gl_FragColor=vec4(uColor,i*uIntensity);}
`;

export const RING_VERT = /* glsl */ `
varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
`;

export const RING_FRAG = /* glsl */ `
varying vec2 vUv;
void main(){
  float r=length(vUv-0.5)*2.0;
  float ring=smoothstep(0.0,0.04,sin(r*50.0)*0.5+0.3);
  float a=ring*smoothstep(0.0,0.15,r)*smoothstep(1.0,0.65,r);
  vec3 c=mix(vec3(0.75,0.65,0.4),vec3(0.9,0.85,0.6),r);
  gl_FragColor=vec4(c,a*0.55);
}`;

/** Generate per-planet fragment shader based on shader type */
export function planetFrag(p: PlanetData): string {
  const header = /* glsl */ `
uniform float uTime;uniform vec3 uColor1;uniform vec3 uColor2;
varying vec2 vUv;varying vec3 vNormal;varying vec3 vPosition;
${NOISE_GLSL}
void main(){
  vec3 lDir=normalize(vec3(1.0,0.4,0.6));
  float light=max(dot(vNormal,lDir),0.0);
  float ambient=0.12;
  vec3 p=vPosition*${p.noiseScale.toFixed(1)};
  float n=fbm(p);
  vec3 col;
`;

  let body = '';
  switch (p.shaderType) {
    case 'rocky':
      body = `col=mix(uColor1,uColor2,n);col*=0.8+0.2*noise(p*6.0);`;
      break;
    case 'venus':
      body = `p+=vec3(0,uTime*0.04,0);n=fbm(p);col=mix(uColor1,uColor2,n);
      float sw=noise(p*3.0+vec3(uTime*0.02,0,0));col=mix(col,uColor1*1.15,sw*0.25);`;
      break;
    case 'earth':
      body = `float cont=smoothstep(0.42,0.56,n);
      vec3 ocean=uColor1;vec3 land=mix(uColor2,vec3(0.55,0.4,0.2),noise(p*5.0));
      col=mix(ocean,land,cont);
      float clouds=smoothstep(0.48,0.68,fbm(vPosition*3.0+vec3(uTime*0.025,0,0)));
      col=mix(col,vec3(0.95),clouds*0.55);`;
      break;
    case 'banded': {
      const freq = (p.bandFreq ?? 20).toFixed(1);
      body = `float band=sin(vUv.y*${freq}+noise(p)*2.0)*0.5+0.5;
      col=mix(uColor1,uColor2,band);col+=noise(p*4.0)*0.06;`;
      if (p.hasSpot) {
        body += `float sd=length(vUv-vec2(0.35,0.55));col=mix(col,vec3(0.8,0.2,0.1),0.65*(1.0-smoothstep(0.025,0.055,sd)));`;
      }
      break;
    }
    case 'ice':
      body = `p+=vec3(0,uTime*0.015,0);n=fbm(p);col=mix(uColor1,uColor2,n);`;
      break;
  }

  return header + body + `\n  gl_FragColor=vec4(col*(ambient+(1.0-ambient)*light),1.0);\n}`;
}

/* ── Camera waypoint helpers ── */
export function getCameraPosition(p: PlanetData): [number, number, number] {
  return [p.pos[0] * 0.3, p.pos[1] * 0.4, p.pos[2] + p.radius * 3.2];
}
