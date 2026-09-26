import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

function material(color) {
    return new THREE.MeshStandardMaterial({ color });
}

// PISTOL
export function createPistol() {
    const gun = new THREE.Group();

    // =========================
    // MAIN WHITE SLIDE
    // =========================
    const slide = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, 0.22, 0.85),
        material(0xf2f2f2)
    );
    slide.position.set(0, 0.05, -0.05);
    gun.add(slide);

    // Black lower frame
    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(0.36, 0.16, 0.65),
        material(0x181818)
    );
    frame.position.set(0, -0.12, 0.08);
    gun.add(frame);

    // =========================
    // FRONT BARREL
    // =========================
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.055, 0.32, 12),
        material(0x111111)
    );
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.04, -0.62);
    gun.add(barrel);

    // Barrel housing
    const barrelHousing = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.13, 0.22),
        material(0x252525)
    );
    barrelHousing.position.set(0, 0.04, -0.52);
    gun.add(barrelHousing);

    // =========================
    // GRIP
    // =========================
    const grip = new THREE.Mesh(
        new THREE.BoxGeometry(0.19, 0.48, 0.25),
        material(0x111111)
    );
    grip.position.set(0, -0.38, 0.23);
    grip.rotation.x = -0.18;
    gun.add(grip);

    // Grip side panel
    const gripPanel = new THREE.Mesh(
        new THREE.BoxGeometry(0.205, 0.28, 0.03),
        material(0x292929)
    );
    gripPanel.position.set(0, -0.37, 0.36);
    gripPanel.rotation.x = -0.18;
    gun.add(gripPanel);

    // =========================
    // MAGAZINE
    // =========================
    const magazine = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.36, 0.16),
        material(0x242424)
    );
    magazine.position.set(0, -0.32, 0.12);
    gun.add(magazine);

    // =========================
    // TRIGGER
    // =========================
    const trigger = new THREE.Mesh(
        new THREE.BoxGeometry(0.07, 0.13, 0.06),
        material(0x050505)
    );
    trigger.position.set(0, -0.19, 0.02);
    trigger.rotation.x = -0.2;
    gun.add(trigger);

    // =========================
    // GREEN FRONT SIGHT
    // =========================
    const frontSight = new THREE.Mesh(
        new THREE.BoxGeometry(0.07, 0.06, 0.07),
        new THREE.MeshStandardMaterial({
            color: 0x39ff66,
            emissive: 0x39ff66,
            emissiveIntensity: 2
        })
    );
    frontSight.position.set(0, 0.18, -0.35);
    gun.add(frontSight);

    // =========================
    // GREEN REAR SIGHT
    // =========================
    const rearSight = new THREE.Mesh(
        new THREE.BoxGeometry(0.10, 0.06, 0.08),
        new THREE.MeshStandardMaterial({
            color: 0x39ff66,
            emissive: 0x39ff66,
            emissiveIntensity: 2
        })
    );
    rearSight.position.set(0, 0.18, 0.27);
    gun.add(rearSight);

    // =========================
    // SLIDE DETAILS
    // =========================
    for (let i = 0; i < 3; i++) {
        const detail = new THREE.Mesh(
            new THREE.BoxGeometry(0.04, 0.12, 0.07),
            material(0x222222)
        );

        detail.position.set(
            0,
            0.05,
            0.12 + i * 0.10
        );

        gun.add(detail);
    }

    // =========================
    // FINAL POSITION
    // =========================
    gun.position.set(0.45, -0.35, -0.8);

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
