import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js';

function material(color) {
    return new THREE.MeshStandardMaterial({ color });
}

// PISTOL
export function createPistol() {
    const gun = new THREE.Group();

    const loader = new GLTFLoader();

    loader.load(
        'https://cdn.3dassets.dev/assets/19434/v1/model.glb',

        (gltf) => {
            const model = gltf.scene;

            // Realistic FPS weapon size
            model.scale.set(4.2, 4.2, 4.2);

            // The asset's +Z is the front of the pistol.
            // Rotate it so the barrel points toward the game world.
            model.rotation.y = Math.PI;

            // Position the pistol inside the FPS view
            model.position.set(0, 0, 0);

            // Enable realistic shadows
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            gun.add(model);
        },

        undefined,

        (error) => {
            console.error('Rivals pistol failed to load:', error);
        }
    );

    // First-person weapon position
    gun.position.set(0.43, -0.34, -0.78);

    return gun;
}

// SMG
export function createSMG() {
    const gun = new THREE.Group();

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.25, 1.15),
        material(0x202020)
    );
    gun.add(body);

    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.75, 12),
        material(0x111111)
    );
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = -0.9;
    gun.add(barrel);

    const grip = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.45, 0.25),
        material(0x151515)
    );
    grip.position.y = -0.3;
    grip.position.z = 0.2;
    grip.rotation.x = -0.2;
    gun.add(grip);

    const magazine = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.5, 0.2),
        material(0x333333)
    );
    magazine.position.y = -0.32;
    magazine.position.z = -0.1;
    gun.add(magazine);

    gun.position.set(0.45, -0.35, -0.8);
    return gun;
}

// SHOTGUN
export function createShotgun() {
    const gun = new THREE.Group();

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.3, 1.4),
        material(0x333333)
    );
    gun.add(body);

    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 1.4, 12),
        material(0x111111)
    );
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = -1.3;
    gun.add(barrel);

    const grip = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.45, 0.25),
        material(0x151515)
    );
    grip.position.y = -0.32;
    grip.position.z = 0.25;
    grip.rotation.x = -0.2;
    gun.add(grip);

    const pump = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.16, 0.45),
        material(0x555555)
    );
    pump.position.y = -0.05;
    pump.position.z = -0.75;
    gun.add(pump);

    gun.position.set(0.45, -0.35, -0.8);
    return gun;
}
