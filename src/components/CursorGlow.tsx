import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  // Springs for the main neon dot
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  // Springs for the trailing dots
  const cursorX1 = useSpring(-100, { ...springConfig, damping: 30, stiffness: 250 });
  const cursorY1 = useSpring(-100, { ...springConfig, damping: 30, stiffness: 250 });
  
  const cursorX2 = useSpring(-100, { ...springConfig, damping: 35, stiffness: 150 });
  const cursorY2 = useSpring(-100, { ...springConfig, damping: 35, stiffness: 150 });

  const cursorX3 = useSpring(-100, { ...springConfig, damping: 40, stiffness: 100 });
  const cursorY3 = useSpring(-100, { ...springConfig, damping: 40, stiffness: 100 });

  useEffect(() => {
    let timeoutId: number;
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorX1.set(e.clientX);
      cursorY1.set(e.clientY);
      cursorX2.set(e.clientX);
      cursorY2.set(e.clientY);
      cursorX3.set(e.clientX);
      cursorY3.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(timeoutId);
    };
  }, [isVisible, cursorX, cursorY, cursorX1, cursorY1, cursorX2, cursorY2, cursorX3, cursorY3]);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}>
      {/* Main neon point light */}
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'var(--color-primary-blue)',
          boxShadow: '0 0 10px 2px var(--color-primary-blue), 0 0 20px 5px var(--color-primary-blue)',
        }}
      />
      
      {/* Trailing tail 1 */}
      <motion.div
        className="absolute w-2 h-2 rounded-full opacity-60"
        style={{
          x: cursorX1,
          y: cursorY1,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'var(--color-primary-blue)',
          filter: 'blur(2px)',
        }}
      />

      {/* Trailing tail 2 */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full opacity-40"
        style={{
          x: cursorX2,
          y: cursorY2,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'var(--color-primary-blue)',
          filter: 'blur(3px)',
        }}
      />

      {/* Trailing tail 3 */}
      <motion.div
        className="absolute w-1 h-1 rounded-full opacity-20"
        style={{
          x: cursorX3,
          y: cursorY3,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'var(--color-primary-blue)',
          filter: 'blur(4px)',
        }}
      />
    </div>
  );
}
