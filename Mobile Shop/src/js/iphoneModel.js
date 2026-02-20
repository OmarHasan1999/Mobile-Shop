import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

export function iphoneModel (iphoneContainer) {
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    45,
    iphoneContainer.clientWidth / iphoneContainer.clientHeight,
    0.1,
    1000
)
camera.position.set(0, 0, 10.8)

const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(iphoneContainer.clientWidth , iphoneContainer.clientHeight)
iphoneContainer.appendChild(renderer.domElement)

// control the object with x position
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true
controls.enablePan = false;
controls.enableZoom = false;
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;

// create CSS2DRenderer element
const labelRenderer = new CSS2DRenderer()
labelRenderer.setSize(iphoneContainer.clientWidth , iphoneContainer.clientHeight)
labelRenderer.domElement.style.position = "absolute"
labelRenderer.domElement.style.top = "105.4vh"
labelRenderer.domElement.style.pointerEvents = "none"
iphoneContainer.appendChild(labelRenderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
ambientLight.position.set(0,-2.4,0)
scene.add(ambientLight)

// loading 3D object
let iphone
const mobile = new URL("/assets/3D-img/iphone_15_pro_max_made_in_blender.glb", import.meta.url)

const objectLoader = new GLTFLoader()

objectLoader.load(mobile.href, (gltf) => {
    if(iphone) return
    iphone = gltf.scene
    iphone.position.set(0,-2.4,0)
    iphone.rotation.set(0,-0.6,0)
    iphone.scale.set(2.3,2,2);

    let logoPos = new THREE.Vector3()
    let flashPos = new THREE.Vector3()

    iphone.traverse((child) => {
        if(child.isMesh && child.material){
            const material = child.material
            material.metalness = 0.1
            material.roughness = 0.2
            material.envMapIntensity = 0.5
            material.needsUpdate = true

            if(child.name === "Object_24") { 
            child.getWorldPosition(logoPos)
            }
            if(child.name === "Object_19") {
            child.getWorldPosition(flashPos)
            }
        }
})
            // create logo element
            const hotspot = document.createElement("div")
            hotspot.className = "hotspotLogo"
            
            // create logo tooltip
            const tooltip = document.createElement("div")
            tooltip.className = "tooltip"
            tooltip.innerHTML = "Signature Apple Logo"
            tooltip.setAttribute("role", "tooltip")
            tooltip.setAttribute("aria-label", "Signature Apple Logo")

            hotspot.appendChild(tooltip)

            // convert element to CSS2DObject
            const hotSpotLabel = new CSS2DObject(hotspot)
            hotSpotLabel.position.copy(logoPos)
            scene.add(hotSpotLabel)

            // create flash element
            const flashhotspot = document.createElement("div")
            flashhotspot.className = "flashhotspot"
            
            // create tooltip
            const flashtooltip = document.createElement("div")
            flashtooltip.className = "flashtooltip"
            flashtooltip.innerHTML = "High-Intensity Flash"
            flashtooltip.setAttribute("role", "tooltip")
            flashtooltip.setAttribute("aria-label", "High-Intensity Flash")

            flashhotspot.appendChild(flashtooltip)

            // convert element to CSS2DObject
            const flashLabel = new CSS2DObject(flashhotspot)
            flashLabel.position.copy(flashPos)
            scene.add(flashLabel)

            scene.add(iphone)
}
)

const animate = () => {
    renderer.render(scene, camera)
    controls.update()
    if(labelRenderer) labelRenderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()

// responsive
window.addEventListener("resize", () => {
    camera.aspect = iphoneContainer.clientWidth / iphoneContainer.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(iphoneContainer.clientWidth, iphoneContainer.clientHeight)
    labelRenderer.setSize(iphoneContainer.clientWidth, iphoneContainer.clientHeight)
})

// change the color of the model
return{
setIphoneColor(color) {
    if(!iphone) return
    iphone.traverse((child) => {
    if(child.isMesh && child.material && child.name === "Object_5"){
    child.material.color.set(color)
    }
    })
}}
}
