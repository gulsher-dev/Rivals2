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

document.body.appendChild(renderer.domElement);


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

sunLight.position.set(10, 20, 10);

scene.add(sunLight);


// ==========================================
// GROUND
// ==========================================

const groundGeometry = new THREE.BoxGeometry(
    100,
    1,
    100
);

const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x444444
    });

const ground = new THREE.Mesh(
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

camera.position.y = player.height;


// ==========================================
// KEYBOARD
// ==========================================

const keys = {};

window.addEventListener("keydown", function(event) {

    keys[event.code] = true;

    if (
        event.code === "Space" &&
        player.onGround
    ) {

        player.velocityY =
            player.jumpForce;

        player.onGround = false;

    }

});


window.addEventListener("keyup", function(event) {

    keys[event.code] = false;

});


// ==========================================
// MOUSE LOOK
// ==========================================

let yaw = 0;

let pitch = 0;

const mouseSensitivity = 0.002;


document.body.addEventListener("click", function() {

    if (
        document.pointerLockElement !== document.body
    ) {

        document.body.requestPointerLock();

    }

});


document.addEventListener("mousemove", function(event) {

    if (
        document.pointerLockElement !== document.body
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
        Math.min(maxPitch, pitch)
    );


    camera.rotation.order = "YXZ";

    camera.rotation.y = yaw;

    camera.rotation.x = pitch;

});


// ==========================================
// CLOCK
// ==========================================

const clock = new THREE.Clock();


// ==========================================
// PLAYER MOVEMENT
// ==========================================

function updatePlayer(delta) {

    let moveForward = 0;

    let moveRight = 0;


    // W / S

    if (keys["KeyW"]) {

        moveForward += 1;

    }

    if (keys["KeyS"]) {

        moveForward -= 1;

    }


    // A / D

    if (keys["KeyA"]) {

        moveRight -= 1;

    }

    if (keys["KeyD"]) {

        moveRight += 1;

    }


    // --------------------------------------
    // Movement
    // --------------------------------------

    if (
        moveForward !== 0 ||
        moveRight !== 0
    ) {

        const length = Math.sqrt(
            moveForward * moveForward +
            moveRight * moveRight
        );


        moveForward /= length;

        moveRight /= length;


        const sinYaw = Math.sin(yaw);

        const cosYaw = Math.cos(yaw);


        camera.position.x +=
            (
                -sinYaw * moveForward +
                cosYaw * moveRight
            ) *
            player.speed *
            delta;


        camera.position.z +=
            (
                -cosYaw * moveForward -
                sinYaw * moveRight
            ) *
            player.speed *
            delta;

    }


    // --------------------------------------
    // Gravity
    // --------------------------------------

    player.velocityY -=
        20 * delta;


    camera.position.y +=
        player.velocityY * delta;


    // --------------------------------------
    // Ground
    // --------------------------------------

    if (
        camera.position.y <=
        player.height
    ) {

        camera.position.y =
            player.height;

        player.velocityY = 0;

        player.onGround = true;

    }

}


// ==========================================
// GAME LOOP
// ==========================================

function animate() {

    requestAnimationFrame(animate);


    const delta =
        Math.min(
            clock.getDelta(),
            0.05
        );


    updatePlayer(delta);


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
