import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Ball from './ball'

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
camera.position.x = 11
camera.position.y = 4
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

const TIME_STEP = 0.0001

const balls = []

const ball1 = new Ball(0, 0, 0, 0.4, 0xFFFF06, 2, 2150, 0, 300)
const ball2 = new Ball(-2, 1, 0, 0.4, 0xFF6C69, 2, 0, 2150, 300)
const ball3 = new Ball(2, -1, 0, 0.4, 0xFF882A, 2, 750, 2120, 300)
const ball4 = new Ball(3, -2, 0, 0.4, 0x89CBD7, 2, 0, 2150, 300)
const ball5 = new Ball(2, 0, 0, 0.4, 0x0DEA00, 2, 0, 2000, 300)
const ball6 = new Ball(-1, 3, 0, 0.4, 0x89CBD7, 2, 0, 2800, 300)
const ball7 = new Ball(0, 4, 0, 0.4, 0xFFFF06, 2, 0, 2000, 300)
const ball8 = new Ball(4, 2, 0, 0.4, 0xFF6C69, 2, 0, 1150, 300)
const ball9 = new Ball(2, -2, 0, 0.4, 0xFF882A, 2, 2150, 520, 300)
const ball10 = new Ball(1, -3, 0, 0.4, 0x0DEA00, 2, 0, 1150, 300)


const ball11 = new Ball(1, 0, 2, 0.4, 0xFFFF06, 2, 950, 0, 1100)
const ball12 = new Ball(2, 1, 1, 0.4, 0xFF6C69, 2, 0, 950, 1100)
const ball13 = new Ball(2, -1, -3, 0.4, 0xFF882A, 2, 950, 620, 1100)
const ball14 = new Ball(3, -2, 3, 0.4, 0x89CBD7, 2, 0, 850, 1100)
const ball15 = new Ball(2, 0, 1, 0.4, 0x0DEA00, 2, 0, 2500, 1100)
const ball16 = new Ball(-1, 3, 3, 0.4, 0x89CBD7, 2, 0, 1800, 1100)
const ball17 = new Ball(0, 4, -4, 0.4, 0xFFFF06, 2, 0, 1500, 1100)
const ball18 = new Ball(4, 2, 2, 0.4, 0xFF6C69, 2, 0, 1150, 1100)
const ball19 = new Ball(2, -2, -1, 0.4, 0xFF882A, 2, 1750, 520, 1100)
const ball20 = new Ball(1, -3, 4, 0.4, 0x0DEA00, 2, 0, 950, 1100)

balls.push(ball1)
balls.push(ball2)
balls.push(ball3)
balls.push(ball4)
balls.push(ball5)
balls.push(ball6)
balls.push(ball7)
balls.push(ball8)
balls.push(ball9)
balls.push(ball10)

balls.push(ball11)
balls.push(ball12)
balls.push(ball13)
balls.push(ball14)
balls.push(ball15)
balls.push(ball16)
balls.push(ball17)
balls.push(ball18)
balls.push(ball19)
balls.push(ball20)

scene.add(ball1.mesh)
scene.add(ball2.mesh)
scene.add(ball3.mesh)
scene.add(ball4.mesh)
scene.add(ball5.mesh)
scene.add(ball6.mesh)
scene.add(ball7.mesh)
scene.add(ball8.mesh)
scene.add(ball9.mesh)
scene.add(ball10.mesh)

scene.add(ball11.mesh)
scene.add(ball12.mesh)
scene.add(ball13.mesh)
scene.add(ball14.mesh)
scene.add(ball15.mesh)
scene.add(ball16.mesh)
scene.add(ball17.mesh)
scene.add(ball18.mesh)
scene.add(ball19.mesh)
scene.add(ball20.mesh)

const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(10, 10, 10, 10, 10, 10));
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x0000FF }));

line.position.x = 0
line.position.y = 0
line.position.z = 0

scene.add(line)


const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    controls.update()

    balls.forEach((ball) => {
        collisionUpdate(ball)
        updatePos(ball)
    })

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()

function collisionUpdate(planet) {

    const COR = 1

    if (planet.position.x + planet.radius > 5 || planet.position.x - planet.radius < -5) {
        planet.momentum.multiply(new THREE.Vector3(-1, 1, 1))
    }
    if (planet.position.y + planet.radius > 5 || planet.position.y - planet.radius < -5) {
        planet.momentum.multiply(new THREE.Vector3(1, -1, 1))
    }
    if (planet.position.z + planet.radius > 5 || planet.position.z - planet.radius < -5) {
        planet.momentum.multiply(new THREE.Vector3(1, 1, -1))
    }
    balls.forEach((tempPlanet) => {
        if (planet != tempPlanet) {
            if (areCollided(tempPlanet, planet)) {
                // const n = planet.position.clone().sub(tempPlanet.position.clone());
                // const un = n.clone().divideScalar(n.length());


                // // const ut = getVector(un)
                // let ut = new THREE.Vector3(-un.z, un.x, un.y)

                // // !: Start of Danger Zone
                // const temp = un.clone().cross(ut); 
                // ut = temp.clone();
                // // !: End of Danger Zone
                
                const n = planet.position.clone().sub(tempPlanet.position.clone());
                const f = new THREE.Vector3(1, 1, -1 * ((n.x + n.y) / (n.z === 0 ? 1e-9 : n.z)));

                const un = n.clone().divideScalar(n.length());
                const uf = f.clone().divideScalar(f.length());

                const ut = un.clone().cross(uf);

                const tempPlanetVN = un.clone().dot(tempPlanet.getVelocity().clone());
                const tempPlanetVT = ut.clone().dot(tempPlanet.getVelocity().clone());
                const planetVN = un.clone().dot(planet.getVelocity().clone());
                const planetVT = ut.clone().dot(planet.getVelocity().clone());

                const newTempPlanetVN = (tempPlanetVN * tempPlanet.mass + planetVN * planet.mass + planet.mass * (planetVN - tempPlanetVN) * COR) / (planet.mass + tempPlanet.mass);
                const newPlanetVN = (planetVN * planet.mass + tempPlanetVN * tempPlanet.mass + tempPlanet.mass * (tempPlanetVN - planetVN) * COR) / (planet.mass + tempPlanet.mass);

                const finalTempPlanetVN = un.clone().multiplyScalar(newTempPlanetVN);
                const finalTempPlanetVT = ut.clone().multiplyScalar(tempPlanetVT);
                const finalPlanetVN = un.clone().multiplyScalar(newPlanetVN);
                const finalPlanetVT = ut.clone().multiplyScalar(planetVT);

                const newTempPlanetVelocity = finalTempPlanetVN.add(finalTempPlanetVT);
                const newPlanetVelocity = finalPlanetVN.add(finalPlanetVT);

                tempPlanet.momentum = newTempPlanetVelocity.multiplyScalar(tempPlanet.mass)
                planet.momentum = newPlanetVelocity.multiplyScalar(planet.mass)
            }
        }
    })
}

function updatePos(planet) {
    const speed = planet.momentum.clone().divideScalar(planet.mass)
    planet.position = planet.position.clone().add(speed.clone().multiplyScalar(TIME_STEP))
    planet.mesh.position.x = planet.position.x
    planet.mesh.position.y = planet.position.y
    planet.mesh.position.z = planet.position.z
}

function areCollided(planet1, planet2) {
    return planet1.position.distanceTo(planet2.position) <= planet1.radius + planet2.radius
}

function getVector(n) {
    const temp = new THREE.Vector3();
    do {
        temp.x = Math.random() + 0.01;
        temp.y = Math.random() + 0.01;
        temp.z = Math.random() + 0.01;
    } while (n.angleTo(temp) == 0 || n.angleTo(temp) == Math.PI)
    // or new THREE.Vector3.crossVectors(temp , n).equals(new THREE.Vector3(0 , 0 , 0))
    return temp;
}

/*
function drawSquare(x1, y1, x2, y2) {

    const points = [];
    points.push(new THREE.Vector3(x1, y1, 0));
    points.push(new THREE.Vector3(x2, y1, 0));
    points.push(new THREE.Vector3(x2, y2, 0));
    points.push(new THREE.Vector3(x1, y2, 0));
    points.push(new THREE.Vector3(x1, y1, 0));

    return new THREE.Line(
        new THREE.BufferGeometry().setFromPoints( points ),
        new THREE.LineBasicMaterial({ color: 0x193663 })
    )
}
*/