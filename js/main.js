import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

// ==========================================
// SCENE
// ==========================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);


// ==========================================
// CAMERA
// ==========================================

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 1.7, 8);


// ==========================================
// RENDERER
// ==========================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

document
    .getElementById("game")
    .appendChild(renderer.domElement);


// ==========================================
// LIGHTING
// ==========================================

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.8
);

scene.add(ambientLight);


const sunLight = new THREE.DirectionalLight(
    0xffffff,
    1
);

sunLight.position.set(
    10,
    20,
    10
);

scene.add(sunLight);


// ==========================================
// GROUND
// ==========================================

const groundGeometry =
    new THREE.BoxGeometry(
        100,
        1,
        100
    );

const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x444444
    });

const ground =
    new THREE.Mesh(
        groundGeometry,
        groundMaterial
    );

ground.position.y = -0.5;

scene.add(ground);


// ==========================================
// PLAYER
// ==========================================

const player = {

    height: 1.7,

    speed: 8,

    jumpForce: 7,

    velocityY: 0,

    onGround: true

};

camera.position.y =
    player.height;


// ==========================================
// KEYBOARD
// ==========================================

const keys = {};

window.addEventListener(
    "keydown",
    function(event) {

        keys[event.code] = true;


        if (
            event.code === "Space" &&
            player.onGround
        ) {

            player.velocityY =
                player.jumpForce;

            player.onGround = false;

        }


        if (
            event.code === "KeyR"
        ) {

            reload();

        }

    }
);


window.addEventListener(
    "keyup",
    function(event) {

        keys[event.code] = false;

    }
);


// ==========================================
// MOUSE LOOK
// ==========================================

let yaw = 0;

let pitch = 0;

const mouseSensitivity =
    0.002;


document.body.addEventListener(
    "click",
    function() {

        if (
            document.pointerLockElement !==
            document.body
        ) {

            document.body.requestPointerLock();

        }

    }
);


document.addEventListener(
    "mousemove",
    function(event) {

        if (
            document.pointerLockElement !==
            document.body
        ) {

            return;

        }


        yaw -=
            event.movementX *
            mouseSensitivity;


        pitch -=
            event.movementY *
            mouseSensitivity;


        const maxPitch =
            Math.PI / 2 - 0.05;


        pitch = Math.max(
            -maxPitch,
            Math.min(
                maxPitch,
                pitch
            )
        );


        camera.rotation.order =
            "YXZ";


        camera.rotation.y =
            yaw;


        camera.rotation.x =
            pitch;

    }
);


// ==========================================
// GUN
// ==========================================

const gun = new THREE.Group();


// Gun body

const gunBody =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.35,
            0.25,
            1.4
        ),
        new THREE.MeshStandardMaterial({
            color: 0x222222
        })
    );

gun.add(gunBody);


// Barrel

const barrel =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.055,
            0.055,
            0.8,
            12
        ),
        new THREE.MeshStandardMaterial({
            color: 0x111111
        })
    );

barrel.rotation.x =
    Math.PI / 2;

barrel.position.z =
    -0.95;

gun.add(barrel);


// Grip

const grip =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.18,
            0.45,
            0.25
        ),
        new THREE.MeshStandardMaterial({
            color: 0x151515
        })
    );

grip.position.y =
    -0.3;

grip.position.z =
    0.25;

grip.rotation.x =
    -0.2;

gun.add(grip);


// Gun position

gun.position.set(
    0.45,
    -0.35,
    -0.8
);

camera.add(gun);

scene.add(camera);


// ==========================================
// MUZZLE FLASH
// ==========================================

const muzzleFlash =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.13,
            8,
            8
        ),
        new THREE.MeshBasicMaterial({
            color: 0xffaa00
        })
    );

muzzleFlash.position.set(
    0,
    0,
    -1.35
);

muzzleFlash.visible =
    false;

gun.add(muzzleFlash);


// ==========================================
// TARGET SYSTEM
// ==========================================

const targets = [];


// Create target

function createTarget(
    x,
    y,
    z
) {

    const target =
        new THREE.Group();


    // Body

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1,
                2,
                0.5
            ),
            new THREE.MeshStandardMaterial({
                color: 0x3366ff
            })
        );

    body.position.y = 1;

    target.add(body);


    // Head

    const head =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.35,
                16,
                16
            ),
            new THREE.MeshStandardMaterial({
                color: 0xffcc99
            })
        );

    head.position.y = 2.35;

    target.add(head);


    // Health

    target.userData.health =
        100;

    target.userData.maxHealth =
        100;


    // Target identifier

    target.userData.isTarget =
        true;


    target.position.set(
        x,
        y,
        z
    );


    scene.add(target);

    targets.push(target);

}


// Create test targets

createTarget(
    0,
    0,
    -10
);

createTarget(
    -6,
    0,
    -15
);

createTarget(
    7,
    0,
    -18
);


// ==========================================
// DAMAGE
// ==========================================

function damageTarget(
    target,
    amount
) {

    if (!target) {
        return;
    }


    target.userData.health -=
        amount;


    console.log(
        "Target HP:",
        target.userData.health
    );


    // Flash target

    target.traverse(
        function(object) {

            if (
                object.isMesh &&
                object.material
            ) {

                object.material.emissive =
                    new THREE.Color(
                        0xff0000
                    );

                object.material.emissiveIntensity =
                    1;

            }

        }
    );


    setTimeout(
        function() {

            target.traverse(
                function(object) {

                    if (
                        object.isMesh &&
                        object.material
                    ) {

                        if (
                            object.material
                                .emissive
                        ) {

                            object.material
                                .emissive
                                .setHex(
                                    0x000000
                                );

                        }

                    }

                }
            );

        },
        80
    );


    if (
        target.userData.health <= 0
    ) {

        killTarget(target);

    }

}


// ==========================================
// TARGET DEATH
// ==========================================

function killTarget(
    target
) {

    console.log(
        "TARGET ELIMINATED"
    );


    target.visible =
        false;


    setTimeout(
        function() {

            target.userData.health =
                target.userData.maxHealth;

            target.visible =
                true;

        },
        1500
    );

}


// ==========================================
// WEAPON SETTINGS
// ==========================================

let ammo = 30;

const maxAmmo = 30;

let reserveAmmo = 120;

let shooting = false;

let lastShot = 0;

const fireRate = 110;

const damage = 25;


// ==========================================
// HUD
// ==========================================

const ammoElement =
    document.getElementById(
        "ammo"
    );

const reserveElement =
    document.getElementById(
        "reserve"
    );


function updateAmmoUI() {

    ammoElement.textContent =
        ammo;

    reserveElement.textContent =
        reserveAmmo;

}


updateAmmoUI();


// ==========================================
// HIT MARKER
// ==========================================

function showHitMarker() {

    const marker =
        document.createElement(
            "div"
        );

    marker.textContent =
        "✕";

    marker.style.position =
        "fixed";

    marker.style.left =
        "50%";

    marker.style.top =
        "50%";

    marker.style.transform =
        "translate(-50%, -50%)";

    marker.style.color =
        "white";

    marker.style.fontSize =
        "24px";

    marker.style.fontWeight =
        "bold";

    marker.style.pointerEvents =
        "none";

    marker.style.zIndex =
        "100";

    document.body.appendChild(
        marker
    );


    setTimeout(
        function() {

            marker.remove();

        },
        100
    );

}


// ==========================================
// SHOOTING
// ==========================================

const raycaster =
    new THREE.Raycaster();


function shoot() {

    const now =
        performance.now();


    if (
        now - lastShot <
        fireRate
    ) {

        return;

    }


    if (
        ammo <= 0
    ) {

        return;

    }


    lastShot =
        now;


    ammo--;

    updateAmmoUI();


    // Ray from center of screen

    raycaster.setFromCamera(
        new THREE.Vector2(
            0,
            0
        ),
        camera
    );


    // Find objects

    const hitObjects =
        raycaster.intersectObjects(
            scene.children,
            true
        );


    for (
        let i = 0;
        i < hitObjects.length;
        i++
    ) {

        const object =
            hitObjects[i].object;


        // Walk up the hierarchy

        let target =
            object;


        while (
            target &&
            !target.userData.isTarget
        ) {

            target =
                target.parent;

        }


        if (
            target &&
            target.userData.isTarget
        ) {

            damageTarget(
                target,
                damage
            );

            showHitMarker();

            break;

        }

    }


    // Muzzle flash

    muzzleFlash.visible =
        true;


    setTimeout(
        function() {

            muzzleFlash.visible =
                false;

        },
        50
    );

}


// ==========================================
// MOUSE SHOOTING
// ==========================================

document.addEventListener(
    "mousedown",
    function(event) {

        if (
            event.button === 0
        ) {

            shooting = true;

            shoot();

        }

    }
);


document.addEventListener(
    "mouseup",
    function(event) {

        if (
            event.button === 0
        ) {

            shooting = false;

        }

    }
);


// ==========================================
// RELOAD
// ==========================================

function reload() {

    if (
        ammo >= maxAmmo
    ) {

        return;

    }


    if (
        reserveAmmo <= 0
    ) {

        return;

    }


    const needed =
        maxAmmo - ammo;


    const amount =
        Math.min(
            needed,
            reserveAmmo
        );


    ammo += amount;

    reserveAmmo -= amount;


    updateAmmoUI();

}


// ==========================================
// CLOCK
// ==========================================

const clock =
    new THREE.Clock();


// ==========================================
// PLAYER MOVEMENT
// ==========================================

function updatePlayer(delta) {

    let moveForward = 0;

    let moveRight = 0;


    if (keys["KeyW"]) {

        moveForward += 1;

    }

    if (keys["KeyS"]) {

        moveForward -= 1;

    }

    if (keys["KeyA"]) {

        moveRight -= 1;

    }

    if (keys["KeyD"]) {

        moveRight += 1;

    }


    if (
        moveForward !== 0 ||
        moveRight !== 0
    ) {

        const length =
            Math.sqrt(
                moveForward *
                moveForward +
                moveRight *
                moveRight
            );


        moveForward /=
            length;

        moveRight /=
            length;


        const sinYaw =
            Math.sin(yaw);

        const cosYaw =
            Math.cos(yaw);


        camera.position.x +=
            (
                -sinYaw *
                moveForward +
                cosYaw *
                moveRight
            ) *
            player.speed *
            delta;


        camera.position.z +=
            (
                -cosYaw *
                moveForward -
                sinYaw *
                moveRight
            ) *
            player.speed *
            delta;

    }


    // Gravity

    player.velocityY -=
        20 * delta;


    camera.position.y +=
        player.velocityY *
        delta;


    // Ground

    if (
        camera.position.y <=
        player.height
    ) {

        camera.position.y =
            player.height;

        player.velocityY =
            0;

        player.onGround =
            true;

    }

}


// ==========================================
// GAME LOOP
// ==========================================

function animate() {

    requestAnimationFrame(
        animate
    );


    const delta =
        Math.min(
            clock.getDelta(),
            0.05
        );


    updatePlayer(
        delta
    );


    if (shooting) {

        shoot();

    }


    renderer.render(
        scene,
        camera
    );

}


animate();


// ==========================================
// RESIZE
// ==========================================

window.addEventListener(
    "resize",
    function() {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);
