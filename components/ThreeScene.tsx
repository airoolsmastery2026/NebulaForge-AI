
import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
    mouseX: number;
    mouseY: number;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ mouseX, mouseY }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const mousePosRef = useRef({ x: mouseX, y: mouseY });

    useEffect(() => {
        mousePosRef.current = { x: mouseX, y: mouseY };
    }, [mouseX, mouseY]);

    useEffect(() => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;

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

        // Starfield
        const starCount = 15000;
        const positions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 3000;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 3000;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 3000;
        }
        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const starMaterial = new THREE.PointsMaterial({
            color: 0xaaaaff,
            size: 0.7,
            blending: THREE.AdditiveBlending,
            transparent: true,
        });
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Planets
        const planets: THREE.Mesh[] = [];

        // Sun
        const sunGeo = new THREE.SphereGeometry(80, 32, 32);
        const sunMat = new THREE.MeshBasicMaterial({ color: 0xffdd88, wireframe: true });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        scene.add(sun);
        planets.push(sun);

        // Planet 1 (Earth-like)
        const planet1Geo = new THREE.SphereGeometry(20, 32, 32);
        const planet1Mat = new THREE.MeshStandardMaterial({ color: 0x6699ff, roughness: 0.8 });
        const planet1 = new THREE.Mesh(planet1Geo, planet1Mat);
        planet1.position.x = 200;
        scene.add(planet1);
        planets.push(planet1);
        
        // Planet 2 (Mars-like)
        const planet2Geo = new THREE.SphereGeometry(15, 32, 32);
        const planet2Mat = new THREE.MeshStandardMaterial({ color: 0xff5733, roughness: 0.9 });
        const planet2 = new THREE.Mesh(planet2Geo, planet2Mat);
        planet2.position.x = -350;
        scene.add(planet2);
        planets.push(planet2);
        
        // Planet 3 (Jupiter-like)
        const planet3Geo = new THREE.SphereGeometry(50, 32, 32);
        const planet3Mat = new THREE.MeshStandardMaterial({ color: 0xddc5a3, roughness: 0.7 });
        const planet3 = new THREE.Mesh(planet3Geo, planet3Mat);
        planet3.position.z = -500;
        planet3.position.x = 400;
        scene.add(planet3);
        planets.push(planet3);

        const clock = new THREE.Clock();

        const animate = () => {
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
            requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if(currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -10, width: '100vw', height: '100vh' }} />;
};
