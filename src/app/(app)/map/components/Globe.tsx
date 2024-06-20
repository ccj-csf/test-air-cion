import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GlobeProps {
  width: number;
  height: number;
}

const Globe: React.FC<GlobeProps> = ({ width, height }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const dragRef = useRef({
    isDragging: false,
    previousMouse: { x: 0, y: 0 },
  });

  useEffect(() => {
    const currentElement = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    const sphereRadius = Math.min(width, height) / 4;
    camera.position.z = sphereRadius * 3.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    currentElement?.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x9bb6ed, 1.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0x9bb6ed, 1.5);
    directionalLight.position.set(0, 3, 3);
    scene.add(directionalLight);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/images/map.png', function (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1.2, 1.2); // 增加这个值使得纹理在每个方向上重复更多次
    });
    const geometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      specular: new THREE.Color('grey'),
      shininess: 10,
      // color: new THREE.Color(0x9bb6ed), // 白色基础色
      emissive: new THREE.Color(0x000000), // 不发光
      transparent: false,
      opacity: 1,
    });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    earthRef.current = earth;

    // Handle mouse and touch events
    const handleInteractionMove = (clientX: number, clientY: number) => {
      if (dragRef.current.isDragging) {
        const deltaX = clientX - dragRef.current.previousMouse.x;
        const deltaY = clientY - dragRef.current.previousMouse.y;
        if (earthRef.current) {
          earthRef.current.rotation.y += deltaX * 0.005;
          earthRef.current.rotation.x -= deltaY * 0.005;
        }
        dragRef.current.previousMouse = { x: clientX, y: clientY };
      }
    };

    const startInteraction = (clientX: number, clientY: number) => {
      dragRef.current.isDragging = true;
      dragRef.current.previousMouse = { x: clientX, y: clientY };
    };

    const endInteraction = () => {
      dragRef.current.isDragging = false;
    };

    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      startInteraction(event.clientX, event.clientY);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (dragRef.current.isDragging) {
        event.preventDefault();
        handleInteractionMove(event.clientX, event.clientY);
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      event.preventDefault();
      endInteraction();
    };

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      startInteraction(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (dragRef.current.isDragging) {
        event.preventDefault();
        const touch = event.touches[0];
        handleInteractionMove(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      endInteraction();
    };

    currentElement?.addEventListener('mousedown', handleMouseDown);
    currentElement?.addEventListener('mousemove', handleMouseMove);
    currentElement?.addEventListener('mouseup', handleMouseUp);
    currentElement?.addEventListener('touchstart', handleTouchStart, { passive: false });
    currentElement?.addEventListener('touchmove', handleTouchMove, { passive: false });
    currentElement?.addEventListener('touchend', handleTouchEnd);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      currentElement?.removeChild(renderer.domElement);
      currentElement?.removeEventListener('mousedown', handleMouseDown);
      currentElement?.removeEventListener('mousemove', handleMouseMove);
      currentElement?.removeEventListener('mouseup', handleMouseUp);
      currentElement?.removeEventListener('touchstart', handleTouchStart);
      currentElement?.removeEventListener('touchmove', handleTouchMove);
      currentElement?.removeEventListener('touchend', handleTouchEnd);
      scene.clear();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [width, height]);

  return <div ref={mountRef} style={{ width, height }} />;
};

export default Globe;
