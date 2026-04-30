uniform vec3 uAtmosphereColor;
uniform float uIntensity;
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);
  float alpha = pow(rim, 3.0) * uIntensity * 0.8;
  gl_FragColor = vec4(uAtmosphereColor, alpha);
}
