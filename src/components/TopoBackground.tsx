import { useEffect, useRef } from "react";

const TopoBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.002;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const cols = 60;
      const rows = 40;
      const cellW = width / cols;
      const cellH = height / rows;

      // Generate noise field
      const field: number[][] = [];
      for (let y = 0; y <= rows; y++) {
        field[y] = [];
        for (let x = 0; x <= cols; x++) {
          const nx = x / cols;
          const ny = y / rows;
          field[y][x] =
            Math.sin(nx * 6 + time) * Math.cos(ny * 4 + time * 0.7) +
            Math.sin(nx * 3 - ny * 2 + time * 1.3) * 0.5 +
            Math.cos(nx * 8 + ny * 6 + time * 0.5) * 0.3;
        }
      }

      // Draw contour lines via marching squares (simplified)
      const levels = 8;
      for (let l = 0; l < levels; l++) {
        const threshold = -1.2 + (l * 2.4) / levels;
        ctx.beginPath();
        ctx.strokeStyle = `hsla(24, 95%, 53%, ${0.06 + l * 0.015})`;
        ctx.lineWidth = 0.6;

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const tl = field[y][x];
            const tr = field[y][x + 1];
            const bl = field[y + 1][x];
            const br = field[y + 1][x + 1];

            const px = x * cellW;
            const py = y * cellH;

            // Simple linear interpolation contour
            const edges: [number, number][] = [];
            if ((tl >= threshold) !== (tr >= threshold)) {
              const t = (threshold - tl) / (tr - tl);
              edges.push([px + t * cellW, py]);
            }
            if ((tr >= threshold) !== (br >= threshold)) {
              const t = (threshold - tr) / (br - tr);
              edges.push([px + cellW, py + t * cellH]);
            }
            if ((bl >= threshold) !== (br >= threshold)) {
              const t = (threshold - bl) / (br - bl);
              edges.push([px + t * cellW, py + cellH]);
            }
            if ((tl >= threshold) !== (bl >= threshold)) {
              const t = (threshold - tl) / (bl - tl);
              edges.push([px, py + t * cellH]);
            }

            if (edges.length === 2) {
              ctx.moveTo(edges[0][0], edges[0][1]);
              ctx.lineTo(edges[1][0], edges[1][1]);
            }
          }
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default TopoBackground;
