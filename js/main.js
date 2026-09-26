import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';


// ================================
// SCENE
// ================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);


// ================================
// CAMERA
// ================================

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 3, 8);


// ================================
// RENDERER
// ================================

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


// ================================
// LIGHT
// ================================

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.7
);

scene.add(ambientLight);


const sunLight = new THREE.DirectionalLight(
    0xffffff,
    1
);

sunLight.position.set(10, 20, 10);

scene.add(sunLight);


// ================================
// GROUND
// ================================

const groundGeometry = new THREE.BoxGeometry(
    50,
    1,
    50
);

const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x444444
});

const ground = new THREE.Mesh(
    groundGeometry,
    groundMaterial
);

ground.position.y = -0.5;

scene.add(ground);


// ================================
// TEST CUBE
// ================================

const cubeGeometry = new THREE.BoxGeometry(
    2,
    2,
    2
);

const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0xff3333
});

const cube = new THREE.Mesh(
    cubeGeometry,
    cubeMaterial
);

cube.position.set(0, 1, 0);

scene.add(cube);


// ================================
// ANIMATION
// ================================

function animate() {

    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(
        scene,
        camera
    );
}

animate();


// ================================
// RESIZE
// ================================

window.addEventListener(
    "resize",
    () => {

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
