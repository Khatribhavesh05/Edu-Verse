'use client';

import { useRef, useEffect } from 'react';

export function MouseSparkleTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let sparkles: Sparkle[] = [];
        const colors = ['#FFD700', '#FFA500', '#FF69B4', '#00BFFF'];
        let mouse = { x: -100, y: -100 };

        class Sparkle {
            x: number;
            y: number;
            size: number;
            color: string;
            speedY: number;
            speedX: number;
            life: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 4 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speedY = Math.random() * 1 - 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.life = 1; // Alpha
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.life -= 0.02; // Fade out
                if (this.size > 0.1) this.size -= 0.05;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.globalAlpha = Math.max(0, this.life);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < sparkles.length; i++) {
                sparkles[i].update();
                sparkles[i].draw();
                if (sparkles[i].life <= 0) {
                    sparkles.splice(i, 1);
                    i--;
                }
            }
            requestAnimationFrame(animate);
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY + window.scrollY; // Account for scroll if using absolute positioning

            // Add sparkles on move
            for (let i = 0; i < 2; i++) {
                sparkles.push(new Sparkle(mouse.x, mouse.y));
            }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        handleResize();
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
        />
    );
}
