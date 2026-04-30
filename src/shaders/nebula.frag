uniform float uTime;
varying vec2 vUv;
float hash(vec2 p){
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  f=f*f*(3.0-2.0*f);
  return mix(
    mix(hash(i),hash(i+vec2(1,0)),f.x),
    mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),
    f.y);
}
float fbm(vec2 p){
  float v=0.0,a=0.5;
  for(int i=0;i<4;i++){v+=a*noise(p);p*=2.1;a*=0.5;}
  return v;
}
void main(){
  float n=fbm(vUv*3.0+uTime*0.02);
  vec3 col=mix(
    vec3(0.05,0.0,0.15),
    vec3(0.2,0.05,0.4),n);
  float alpha=smoothstep(0.3,0.7,n)*0.4;
  gl_FragColor=vec4(col,alpha);
}
