import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {}

export const ThreeScene: React.FC<ThreeSceneProps> = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const mousePosRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Wrap the entire effect in a try-catch block to prevent crashes
        // if WebGL is not supported or fails to initialize. This makes the
        // background a non-critical, gracefully-degrading feature.
        try {
            const currentMount = mountRef.current;
            if (!currentMount) return;

            // --- Mouse Listener ---
            const handleMouseMove = (event: MouseEvent) => {
                const { clientX, clientY } = event;
                const x = (clientX / window.innerWidth) * 2 - 1;
                const y = -(clientY / window.innerHeight) * 2 + 1;
                mousePosRef.current = { x, y };
            };
            window.addEventListener('mousemove', handleMouseMove);

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000);
            camera.position.z = 800;

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            currentMount.appendChild(renderer.domElement);
            
            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
            scene.add(ambientLight);

            const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
            pointLight.position.set(0, 0, 0); // Sun is the light source
            scene.add(pointLight);

            // --- Resource Tracking for Cleanup ---
            const geometries: THREE.BufferGeometry[] = [];
            const materials: THREE.Material[] = [];

            // Starfield
            const starGeometry = new THREE.BufferGeometry();
            const starCount = 15000;
            const positions = new Float32Array(starCount * 3);
            for (let i = 0; i < starCount; i++) {
                positions[i * 3 + 0] = (Math.random() - 0.5) * 3000;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 3000;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 3000;
            }
            starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometries.push(starGeometry);
            
            const starMaterial = new THREE.PointsMaterial({
                color: 0xaaaaff,
                size: 0.7,
                blending: THREE.AdditiveBlending,
                transparent: true,
            });
            materials.push(starMaterial);
            
            const stars = new THREE.Points(starGeometry, starMaterial);
            scene.add(stars);

            // Planets
            const createMesh = (geometry: THREE.BufferGeometry, material: THREE.Material) => {
                geometries.push(geometry);
                materials.push(material);
                const mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
                return mesh;
            };

            const sun = createMesh(new THREE.SphereGeometry(80, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffdd88, wireframe: true }));
            const planet1 = createMesh(new THREE.SphereGeometry(20, 32, 32), new THREE.MeshStandardMaterial({ color: 0x6699ff, roughness: 0.8 }));
            planet1.position.x = 200;
            const planet2 = createMesh(new THREE.SphereGeometry(15, 32, 32), new THREE.MeshStandardMaterial({ color: 0xff5733, roughness: 0.9 }));
            planet2.position.x = -350;
            const planet3 = createMesh(new THREE.SphereGeometry(50, 32, 32), new THREE.MeshStandardMaterial({ color: 0xddc5a3, roughness: 0.7 }));
            planet3.position.z = -500;
            planet3.position.x = 400;

            const clock = new THREE.Clock();
            let animationFrameId: number;

            const animate = () => {
                animationFrameId = requestAnimationFrame(animate);
                try {
                    const elapsedTime = clock.getElapsedTime();
                    
                    planet1.position.x = Math.cos(elapsedTime * 0.5) * 200;
                    planet1.position.z = Math.sin(elapsedTime * 0.5) * 200;
                    planet1.rotation.y += 0.005;

                    planet2.position.x = Math.cos(elapsedTime * 0.3) * -350;
                    planet2.position.z = Math.sin(elapsedTime * 0.3) * -350;
                    planet2.rotation.y += 0.003;

                    planet3.position.x = Math.cos(elapsedTime * 0.1) * 400;
                    planet3.position.z = Math.sin(elapsedTime * 0.1) * -500;
                    planet3.rotation.y += 0.001;

                    sun.rotation.y += 0.001;
                    
                    const { x, y } = mousePosRef.current;
                    camera.position.x += (x * 200 - camera.position.x) * 0.05;
                    camera.position.y += (-y * 200 - camera.position.y) * 0.05;
                    camera.lookAt(scene.position);

                    renderer.render(scene, camera);
                } catch (error) {
                    console.error("Error in Three.js animation loop, stopping animation.", error);
                    cancelAnimationFrame(animationFrameId);
                }
            };
            animate();

            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener('resize', handleResize);

            return () => {
                cancelAnimationFrame(animationFrameId);
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('mousemove', handleMouseMove);

                if (currentMount && currentMount.contains(renderer.domElement)) {
                    currentMount.removeChild(renderer.domElement);
                }
                
                renderer.dispose();
                geometries.forEach(g => g.dispose());
                materials.forEach(m => m.dispose());
                scene.clear();
            };
        } catch (error) {
            console.error("Three.js scene failed to initialize. This may be due to lack of WebGL support.", error);
        }
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -10, width: '100vw', height: '100vh' }} />;
};
