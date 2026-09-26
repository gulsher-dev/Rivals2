import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

function material(color) {
    return new THREE.MeshStandardMaterial({ color });
}

// PISTOL
export function createPistol() {
    const gun = new THREE.Group();

    // ==========================================
    // MATERIALS
    // ==========================================

    const slideMaterial = new THREE.MeshStandardMaterial({
        color: 0xd8d8d8,
        metalness: 0.85,
        roughness: 0.25
    });

    const blackMetal = new THREE.MeshStandardMaterial({
        color: 0x151515,
        metalness: 0.8,
        roughness: 0.3
    });

    const darkMetal = new THREE.MeshStandardMaterial({
        color: 0x292929,
        metalness: 0.7,
        roughness: 0.35
    });

    const gripMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.75
    });

    const gloveMaterial = new THREE.MeshStandardMaterial({
        color: 0x20242a,
        roughness: 0.9
    });

    // ==========================================
    // SLIDE
    // ==========================================

    const slide = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, 0.23, 0.95),
        slideMaterial
    );

    slide.position.set(0, 0.08, -0.05);
    gun.add(slide);

    // Slightly rounded-looking slide top
    const slideTop = new THREE.Mesh(
        new THREE.BoxGeometry(0.30, 0.06, 0.82),
        slideMaterial
    );

    slideTop.position.set(0, 0.22, -0.05);
    gun.add(slideTop);

    // ==========================================
    // BLACK LOWER FRAME
    // ==========================================

    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(0.37, 0.17, 0.72),
        blackMetal
    );

    frame.position.set(0, -0.10, 0.10);
    gun.add(frame);

    // ==========================================
    // BARREL
    // ==========================================

    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.055, 0.38, 16),
        blackMetal
    );

    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.08, -0.68);
    gun.add(barrel);

    // Barrel opening
    const barrelTip = new THREE.Mesh(
        new THREE.CylinderGeometry(0.075, 0.075, 0.035, 16),
        darkMetal
    );

    barrelTip.rotation.x = Math.PI / 2;
    barrelTip.position.set(0, 0.08, -0.87);
    gun.add(barrelTip);

    // ==========================================
    // REAR SLIDE SERRATIONS
    // ==========================================

    for (let i = 0; i < 7; i++) {
        const serration = new THREE.Mesh(
            new THREE.BoxGeometry(0.025, 0.13, 0.035),
            darkMetal
        );

        serration.position.set(
            0,
            0.09,
            0.24 + i * 0.055
        );

        gun.add(serration);
    }

    // ==========================================
    // FRONT SIGHT
    // ==========================================

    const frontSight = new THREE.Mesh(
        new THREE.BoxGeometry(0.065, 0.075, 0.09),
        blackMetal
    );

    frontSight.position.set(0, 0.24, -0.34);
    gun.add(frontSight);

    // Green sight dot
    const sightDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 8, 8),
        new THREE.MeshStandardMaterial({
            color: 0x39ff66,
            emissive: 0x39ff66,
            emissiveIntensity: 3
        })
    );

    sightDot.position.set(0, 0.275, -0.37);
    gun.add(sightDot);

    // ==========================================
    // REAR SIGHT
    // ==========================================

    const rearSight = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.08, 0.08),
        blackMetal
    );

    rearSight.position.set(0, 0.24, 0.32);
    gun.add(rearSight);

    // ==========================================
    // GRIP
    // ==========================================

    const grip = new THREE.Mesh(
        new THREE.BoxGeometry(0.20, 0.48, 0.27),
        gripMaterial
    );

    grip.position.set(0, -0.37, 0.28);
    grip.rotation.x = -0.16;
    gun.add(grip);

    // ==========================================
    // GRIP PANELS
    // ==========================================

    const leftGripPanel = new THREE.Mesh(
        new THREE.BoxGeometry(0.025, 0.34, 0.23),
        darkMetal
    );

    leftGripPanel.position.set(-0.105, -0.37, 0.29);
    leftGripPanel.rotation.x = -0.16;
    gun.add(leftGripPanel);

    const rightGripPanel = leftGripPanel.clone();

    rightGripPanel.position.x = 0.105;
    gun.add(rightGripPanel);

    // ==========================================
    // TRIGGER GUARD
    // ==========================================

    const triggerGuard = new THREE.Mesh(
        new THREE.TorusGeometry(
            0.10,
            0.025,
            8,
            16,
            Math.PI
        ),
        blackMetal
    );

    triggerGuard.rotation.x = Math.PI / 2;
    triggerGuard.position.set(0, -0.19, 0.02);
    gun.add(triggerGuard);

    // ==========================================
    // TRIGGER
    // ==========================================

    const trigger = new THREE.Mesh(
        new THREE.BoxGeometry(0.035, 0.12, 0.055),
        darkMetal
    );

    trigger.position.set(0, -0.20, 0.01);
    trigger.rotation.x = -0.2;
    gun.add(trigger);

    // ==========================================
    // MAGAZINE
    // ==========================================

    const magazine = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.38, 0.17),
        blackMetal
    );

    magazine.position.set(0, -0.39, 0.28);
    gun.add(magazine);

    // ==========================================
    // MAGAZINE BASE
    // ==========================================

    const magazineBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.17, 0.045, 0.20),
        darkMetal
    );

    magazineBase.position.set(0, -0.58, 0.28);
    gun.add(magazineBase);

    // ==========================================
    // SMALL FRAME DETAILS
    // ==========================================

    const detail = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.07, 0.10),
        darkMetal
    );

    detail.position.set(0, -0.02, 0.34);
    gun.add(detail);

    // ==========================================
    // FRONT SLIDE DETAIL
    // ==========================================

    for (let i = 0; i < 3; i++) {
        const detailLine = new THREE.Mesh(
            new THREE.BoxGeometry(0.035, 0.13, 0.025),
            blackMetal
        );

        detailLine.position.set(
            0,
            0.08,
            -0.38 - i * 0.06
        );

        gun.add(detailLine);
    }

    // ==========================================
    // VISIBLE GLOVED HAND
    // ==========================================

    const hand = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 12, 8),
        gloveMaterial
    );

    hand.scale.set(1.1, 0.7, 1.35);
    hand.position.set(0.03, -0.48, 0.38);
    gun.add(hand);

    // Thumb
    const thumb = new THREE.Mesh(
        new THREE.SphereGeometry(0.10, 10, 8),
        gloveMaterial
    );

    thumb.scale.set(0.8, 0.7, 1.25);
    thumb.position.set(0.18, -0.30, 0.17);
    gun.add(thumb);

    // ==========================================
    // SMALL FOREARM / SLEEVE
    // ==========================================

    const sleeve = new THREE.Mesh(
        new THREE.CylinderGeometry(0.13, 0.17, 0.42, 10),
        gloveMaterial
    );

    sleeve.rotation.x = -0.35;
    sleeve.position.set(0.08, -0.58, 0.60);
    gun.add(sleeve);

    // ==========================================
    // FINAL FIRST-PERSON POSITION
    // ==========================================

    gun.position.set(0.43, -0.34, -0.78);

    gun.rotation.y = -0.02;

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
