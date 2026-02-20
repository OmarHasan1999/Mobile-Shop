import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from "gsap"

export function createModel (phoneContainer) {
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    45,
    phoneContainer.clientWidth / phoneContainer.clientHeight,
    0.1,
    1000
)
camera.position.set(0, 0, 10.8)

const renderer = new THREE.WebGLRenderer({antialias: window.innerWidth > 768})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(phoneContainer.clientWidth , phoneContainer.clientHeight)
phoneContainer.appendChild(renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff, 7)
ambientLight.position.set(-2,1,0)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 7)
directionalLight.position.set(2, -1.4, 4)
scene.add(directionalLight)

// loading 3D object
let phone
const mobile = new URL("/assets/3D-img/samsung_galaxy_s21_ultra.glb", import.meta.url)

const objectLoader = new GLTFLoader()

objectLoader.load(mobile.href, (gltf) => {
    if(phone)return
    phone = gltf.scene
    phone.position.set(-2,1,0)
    phone.rotation.set(0,0.3,0)
    phone.scale.set(0.19, 0.19, 0.19);
    
    phone.traverse((child) => {
        if(child.isMesh){
            const material = child.material
            material.metalness = 0.1
            material.roughness = 0.2
            material.envMapIntensity = 0.5
            material.needsUpdate = true
        }
    })
    scene.add(phone)

    // gsap animation
    // const tl = gsap.timeline()
    const tl = gsap.timeline()
    const duration = 1.1
    const ease = 'power1.inOut'

    tl.to(phone.rotation, {y : 0.7,duration:0.5,ease:"power3.inOut"})
    .to(phone.scale, {x : 0.05, y:0.05, z:0.05, duration,ease:"power1.inOut"}, "-=1")
    .to(phone.rotation, {y: 0,duration,ease})
    .to(phone.position, {x : 0.3,z:-0.2, ease},)
    .to(phone.rotation, {y: 0.6,duration,ease,})
    .to(phone.scale, {x : 0.06, y:0.05, z:0.05, duration,ease}, "-=1")
})

// animation loop
const animate = () => {
    if(phone){ phone.rotation.y -= 0.0009 }
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()

// responsive
let resizeTimeOut
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeOut)
    resizeTimeOut = setTimeout(() => {
        camera.aspect = phoneContainer.clientWidth / phoneContainer.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(phoneContainer.clientWidth, phoneContainer.clientHeight)
    }, 200);
    
})

}