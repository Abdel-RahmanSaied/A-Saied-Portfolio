"use client";

import { useEffect, useRef } from "react";

const NODE_COUNT = 65;
const PACKET_COUNT = 22;
const CONNECTION_DIST = 125;
const BOUNDS = { x: 310, y: 210, z: 140 };

export default function NetworkCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let mounted = true;
    let raf: number;

    import("three").then((THREE) => {
      if (!mounted) return;

      // ── Renderer ────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      // ── Scene + Camera ───────────────────────────────────────────
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        55, mount.clientWidth / mount.clientHeight, 1, 2000
      );
      camera.position.set(0, 0, 370);

      // ── Nodes ────────────────────────────────────────────────────
      const nodePositions = Array.from({ length: NODE_COUNT }, () =>
        new THREE.Vector3(
          (Math.random() - 0.5) * BOUNDS.x * 2,
          (Math.random() - 0.5) * BOUNDS.y * 2,
          (Math.random() - 0.5) * BOUNDS.z * 2,
        )
      );
      const nodeVelocities = Array.from({ length: NODE_COUNT }, () =>
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.16,
          (Math.random() - 0.5) * 0.16,
          (Math.random() - 0.5) * 0.07,
        )
      );

      const nodePosArr = new Float32Array(NODE_COUNT * 3);
      nodePositions.forEach((p, i) => {
        nodePosArr[i * 3]     = p.x;
        nodePosArr[i * 3 + 1] = p.y;
        nodePosArr[i * 3 + 2] = p.z;
      });

      const nodeGeom = new THREE.BufferGeometry();
      nodeGeom.setAttribute("position", new THREE.BufferAttribute(nodePosArr, 3));
      const nodeMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2.2,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      });
      scene.add(new THREE.Points(nodeGeom, nodeMat));

      // Hub nodes — larger, brighter (first 9 = key system components)
      const hubPosArr = new Float32Array(9 * 3);
      for (let i = 0; i < 9; i++) {
        hubPosArr[i * 3]     = nodePositions[i].x;
        hubPosArr[i * 3 + 1] = nodePositions[i].y;
        hubPosArr[i * 3 + 2] = nodePositions[i].z;
      }
      const hubGeom = new THREE.BufferGeometry();
      hubGeom.setAttribute("position", new THREE.BufferAttribute(hubPosArr, 3));
      const hubMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 5.5,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      });
      scene.add(new THREE.Points(hubGeom, hubMat));

      // ── Connection Lines ─────────────────────────────────────────
      const MAX_LINES = 1000;
      const linePosArr = new Float32Array(MAX_LINES * 2 * 3);
      const lineGeom = new THREE.BufferGeometry();
      lineGeom.setAttribute("position", new THREE.BufferAttribute(linePosArr, 3));
      lineGeom.setDrawRange(0, 0);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.055,
      });
      scene.add(new THREE.LineSegments(lineGeom, lineMat));

      // ── Data Packets ─────────────────────────────────────────────
      type Packet = { from: number; to: number; t: number; speed: number };

      const getNeighbors = (idx: number): number[] => {
        const out: number[] = [];
        for (let j = 0; j < NODE_COUNT; j++) {
          if (j !== idx && nodePositions[idx].distanceTo(nodePositions[j]) < CONNECTION_DIST)
            out.push(j);
        }
        return out;
      };

      const packets: Packet[] = Array.from({ length: PACKET_COUNT }, () => {
        const from = Math.floor(Math.random() * NODE_COUNT);
        const neighbors = getNeighbors(from);
        const to = neighbors.length > 0
          ? neighbors[Math.floor(Math.random() * neighbors.length)]
          : (from + 1) % NODE_COUNT;
        return { from, to, t: Math.random(), speed: 0.004 + Math.random() * 0.005 };
      });

      const packetPosArr = new Float32Array(PACKET_COUNT * 3);
      const packetGeom = new THREE.BufferGeometry();
      packetGeom.setAttribute("position", new THREE.BufferAttribute(packetPosArr, 3));
      const packetMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 3.8,
        transparent: true,
        opacity: 0.92,
        sizeAttenuation: true,
      });
      scene.add(new THREE.Points(packetGeom, packetMat));

      // ── Mouse Parallax ───────────────────────────────────────────
      const mouse = { x: 0, y: 0 };
      const onMouse = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse, { passive: true });

      // ── Resize ───────────────────────────────────────────────────
      const onResize = () => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener("resize", onResize);

      // ── Animation Loop ───────────────────────────────────────────
      const animate = () => {
        raf = requestAnimationFrame(animate);

        // Drift nodes
        for (let i = 0; i < NODE_COUNT; i++) {
          const p = nodePositions[i];
          const v = nodeVelocities[i];
          p.x += v.x; p.y += v.y; p.z += v.z;
          if (Math.abs(p.x) > BOUNDS.x) v.x *= -1;
          if (Math.abs(p.y) > BOUNDS.y) v.y *= -1;
          if (Math.abs(p.z) > BOUNDS.z) v.z *= -1;
          nodePosArr[i * 3]     = p.x;
          nodePosArr[i * 3 + 1] = p.y;
          nodePosArr[i * 3 + 2] = p.z;
        }
        nodeGeom.attributes.position.needsUpdate = true;

        // Sync hub positions
        for (let i = 0; i < 9; i++) {
          hubPosArr[i * 3]     = nodePositions[i].x;
          hubPosArr[i * 3 + 1] = nodePositions[i].y;
          hubPosArr[i * 3 + 2] = nodePositions[i].z;
        }
        hubGeom.attributes.position.needsUpdate = true;

        // Update connections
        let lIdx = 0;
        for (let i = 0; i < NODE_COUNT && lIdx < MAX_LINES; i++) {
          for (let j = i + 1; j < NODE_COUNT && lIdx < MAX_LINES; j++) {
            if (nodePositions[i].distanceTo(nodePositions[j]) < CONNECTION_DIST) {
              linePosArr[lIdx * 6]     = nodePositions[i].x;
              linePosArr[lIdx * 6 + 1] = nodePositions[i].y;
              linePosArr[lIdx * 6 + 2] = nodePositions[i].z;
              linePosArr[lIdx * 6 + 3] = nodePositions[j].x;
              linePosArr[lIdx * 6 + 4] = nodePositions[j].y;
              linePosArr[lIdx * 6 + 5] = nodePositions[j].z;
              lIdx++;
            }
          }
        }
        lineGeom.attributes.position.needsUpdate = true;
        lineGeom.setDrawRange(0, lIdx * 2);

        // Move data packets
        for (let i = 0; i < PACKET_COUNT; i++) {
          const pkt = packets[i];
          pkt.t += pkt.speed;
          if (pkt.t >= 1) {
            pkt.from = pkt.to;
            const nb = getNeighbors(pkt.from);
            pkt.to   = nb.length > 0 ? nb[Math.floor(Math.random() * nb.length)] : (pkt.from + 1) % NODE_COUNT;
            pkt.t    = 0;
          }
          const fp = nodePositions[pkt.from];
          const tp = nodePositions[pkt.to];
          packetPosArr[i * 3]     = fp.x + (tp.x - fp.x) * pkt.t;
          packetPosArr[i * 3 + 1] = fp.y + (tp.y - fp.y) * pkt.t;
          packetPosArr[i * 3 + 2] = fp.z + (tp.z - fp.z) * pkt.t;
        }
        packetGeom.attributes.position.needsUpdate = true;

        // Camera parallax
        camera.position.x += (mouse.x * 24 - camera.position.x) * 0.025;
        camera.position.y += (-mouse.y * 16 - camera.position.y) * 0.025;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };
      animate();

      // Cleanup
      const dispose = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize",    onResize);
        renderer.dispose();
        nodeGeom.dispose();   nodeMat.dispose();
        hubGeom.dispose();    hubMat.dispose();
        lineGeom.dispose();   lineMat.dispose();
        packetGeom.dispose(); packetMat.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };

      if (!mounted) { dispose(); return; }
      // Store dispose for cleanup return
      (mount as HTMLDivElement & { __threeDispose?: () => void }).__threeDispose = dispose;
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      const dispose = (mount as HTMLDivElement & { __threeDispose?: () => void }).__threeDispose;
      dispose?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
