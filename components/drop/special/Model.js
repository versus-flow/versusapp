import "@google/model-viewer";

const Model = ({ src }) => (
  <div id="card" class="h-48 mb-6 md:h-full md:mb-0">
    <model-viewer
      src={src.glb}
      ios-src={src.usdz}
      //   poster="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2Fposter-astronaut.png?v=1599079951717"
      alt="A 3D model of an astronaut"
      shadow-intensity="1"
      camera-controls
      auto-rotate
      autoplay
      ar
      xr-environment
      ar-scale="fixed"
      class="w-full h-full"
    ></model-viewer>
  </div>
);

export default Model;
