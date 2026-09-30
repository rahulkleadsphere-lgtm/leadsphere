import { useEffect, useRef } from "react";
import type { Vector3 } from "three";

export function LeadSphereScene() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = mount.current;
    if (!element) return;
    let disposed = false;
    let cleanup = () => {};
    import("three").then((THREE) => {
      if (disposed || !element) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.z = 8.2;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      element.appendChild(renderer.domElement);
      const group = new THREE.Group();
      scene.add(group);
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(2.15, 48, 32),
        new THREE.MeshPhysicalMaterial({ color: 0x244db9, metalness: 0.2, roughness: 0.18, transmission: 0.87, transparent: true, opacity: 0.44, thickness: 0.7, side: THREE.DoubleSide, depthWrite: false })
      );
      group.add(sphere);
      const wire = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.17, 2)),
        new THREE.LineBasicMaterial({ color: 0x6f94e8, transparent: true, opacity: 0.13 })
      );
      group.add(wire);
      const glow = new THREE.Mesh(new THREE.SphereGeometry(1.83, 32, 24), new THREE.MeshBasicMaterial({ color: 0x194cb7, transparent: true, opacity: 0.1, depthWrite: false }));
      group.add(glow);
      const points: Vector3[] = [];
      const pointGeometry = new THREE.SphereGeometry(0.034, 8, 8);
      for (let i = 0; i < 46; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / 46);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const point = new THREE.Vector3(Math.cos(theta) * Math.sin(phi), Math.cos(phi), Math.sin(theta) * Math.sin(phi)).multiplyScalar(2.18);
        points.push(point);
        const node = new THREE.Mesh(pointGeometry, new THREE.MeshBasicMaterial({ color: i % 6 === 0 ? 0xb7a2ff : 0x6edcff }));
        node.position.copy(point);
        group.add(node);
      }
      const segments: number[] = [];
      for (let i = 0; i < points.length; i++) {
        const origin = points[i];
        if (!origin) continue;
        const nearest = points.map((p, j) => ({ point: p, j, d: p.distanceTo(origin) })).filter((x) => x.j !== i).sort((a, b) => a.d - b.d).slice(0, 2);
        for (const n of nearest) segments.push(...origin.toArray(), ...n.point.toArray());
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(segments, 3));
      group.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0x6b9dff, transparent: true, opacity: 0.35 })));
      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x789aff, transparent: true, opacity: 0.17, side: THREE.DoubleSide, depthWrite: false });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.57, 0.007, 5, 100), ringMaterial);
      ring.rotation.x = 1.2;
      ring.rotation.y = 0.35;
      group.add(ring);
      const stars: number[] = [];
      for (let i = 0; i < 100; i++) {
        const a = i * 2.39996;
        const r = 2.4 + (i % 11) * 0.13;
        stars.push(Math.cos(a) * r, Math.sin(a * 1.3) * r * 0.67, Math.sin(a) * r * 0.8);
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.Float32BufferAttribute(stars, 3));
      const particles = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x91baff, size: 0.028, transparent: true, opacity: 0.65 }));
      scene.add(particles);
      const resize = () => {
        const { width, height } = element.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.position.z = width < 520 ? 9.9 : 8.2;
        camera.updateProjectionMatrix();
      };
      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(element);
      let mouseX = 0, mouseY = 0;
      const onMove = (event: PointerEvent) => {
        const box = element.getBoundingClientRect();
        mouseX = ((event.clientX - box.left) / box.width - 0.5) * 0.24;
        mouseY = ((event.clientY - box.top) / box.height - 0.5) * 0.16;
      };
      element.addEventListener("pointermove", onMove);
      let frame = 0;
      const clock = new THREE.Clock();
      const animate = () => {
        frame = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        group.rotation.y += ((reduced ? 0.12 : t * 0.085 + mouseX) - group.rotation.y) * 0.025;
        group.rotation.x += ((reduced ? -0.1 : -0.1 + mouseY) - group.rotation.x) * 0.025;
        group.position.y = reduced ? 0 : Math.sin(t * 0.55) * 0.09;
        particles.rotation.y = reduced ? 0 : t * 0.012;
        renderer.render(scene, camera);
      };
      animate();
      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        element.removeEventListener("pointermove", onMove);
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => material.dispose());
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    });
    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={mount} className="sphere-canvas" aria-hidden="true" />;
}
