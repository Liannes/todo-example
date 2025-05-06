import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE, // Передаём экземпляр THREE.js
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x646cff,
          midtoneColor: 0x43ffd2,
          lowlightColor: 0x1a1a2e,
          baseColor: 0x0,
          blurFactor: 0.6,
          speed: 1.8,
          zoom: 0.8,
          highlightOpacity: 0.5,
          midtoneOpacity: 0.7,
          lowlightOpacity: 0.4,
        }),
      );
    }

    return () => {
      if (vantaEffect) controller.abort();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="vanta-bg" />;
};

export default VantaBackground;
