import React, { useEffect, useRef } from 'react';

export const NeuralSphere: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = 320);
    const height = (canvas.height = 320);
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 95;
    const particleCount = 750;

    // Generate points on sphere using Fibonacci spiral with slight noise
    const points: { x: number; y: number; z: number; baseRadius: number; speed: number }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      // Add delicate organic shell displacement
      const noise = (Math.sin(i * 0.2) + Math.cos(i * 0.3)) * 4;
      const r = radius + noise;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      points.push({
        x: x * r,
        y: y * r,
        z: z * r,
        baseRadius: r,
        speed: 0.002 + (i % 5) * 0.0005,
      });
    }

    let rotX = 0;
    let rotY = 0;

    const render = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      rotX += 0.003;
      rotY += 0.004;

      const sinX = Math.sin(rotX);
      const cosX = Math.cos(rotX);
      const sinY = Math.sin(rotY);
      const cosY = Math.cos(rotY);

      // Sort points by z for proper optical depth
      const projected = points.map((p) => {
        // Rotate Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Perspective projection
        const fov = 340;
        const scale = fov / (fov + z2);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;
        const alpha = Math.max(0.08, Math.min(1, (z2 + radius) / (radius * 1.8)));

        return { px, py, scale, alpha, z: z2 };
      });

      projected.sort((a, b) => a.z - b.z);

      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        ctx.beginPath();
        const size = Math.max(0.6, pt.scale * 1.2);
        ctx.arc(pt.px, pt.py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pt.alpha * 0.9})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full object-contain ${className}`}
      width={320}
      height={320}
    />
  );
};
