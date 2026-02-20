import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from "gsap"

export function slidePhones (slidePhones, categoryName) {
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    45,
    slidePhones.clientWidth / slidePhones.clientHeight,
    0.1,
    1000
)

const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true})
renderer.setSize(slidePhones.clientWidth , slidePhones.clientHeight)

camera.position.set(0, 0, 12)

slidePhones.appendChild(renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff, 3.5)
ambientLight.position.set(-10,0.8,0)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 3.5)
directionalLight.position.set(-10,0.8,0)
scene.add(directionalLight)

// loading 3D object
let swiperPhone = null
let tlAnimation1 = null
let tlAnimation2 = null
let pendingPlayAnimation2 = false
const objectLoader = new GLTFLoader()

const loadModel = (category) => {
  if(swiperPhone){
    //first remove model when change category name
    scene.remove(swiperPhone)
    swiperPhone.traverse(child => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    child.material.dispose();
                }
            });
    swiperPhone = null
  }
  // then change the model
  let models = {
  Iphone: "/assets/3D-img/iphone_14_pro_max.glb",
  Samsung: "/assets/3D-img/samsung-galaxy-s21-violettm.glb",
  Huawei: "/assets/3D-img/huawei_nexus_6p.glb"
}
  
  let modelPath = models[category] || models["Iphone"];
  const mobile = new URL(modelPath, import.meta.url)

objectLoader.load(mobile.href, (gltf) => {    
    swiperPhone = gltf.scene
    swiperPhone.position.set(-1,-2,0)
    if(category === 'Samsung'){
      swiperPhone.position.set(-1,1,0)
    }
    swiperPhone.rotation.set(0,0,0)
    swiperPhone.scale.set(32, 32, 32);

    swiperPhone.traverse((child) => {
        if(child.isMesh){
            const material = child.material
            material.metalness = 0.1
            material.roughness = 0.2
        }
    })
    scene.add(swiperPhone)

    tlAnimation1 = gsap.timeline()
    tlAnimation2 = gsap.timeline({ paused: true })
    const ease = 'power1.inOut'

    // animation 1
    tlAnimation1.to(swiperPhone.scale, { x : 39.2, y: 39.4,z: 39.2, duration:1.1, ease})
    tlAnimation1.to(swiperPhone.position, { x : -10, duration:0.7, ease})
    tlAnimation1.to(swiperPhone.rotation, { x : -0.1, y : -1.8, z: 0.3, duration:1.6,ease})
    tlAnimation1.to(swiperPhone.rotation, { x : 0, y : 1, z: 0.03, duration:1.3,ease})
    tlAnimation1.to(swiperPhone.scale, { x : 39.3,ease}, "-=1")

    // animation 2
    tlAnimation2.to(swiperPhone.rotation, { y: Math.PI * 3.47,duration: 1.2, ease })
    tlAnimation2.to(swiperPhone.scale, { x: 39.4, y:39.4, z:39.4,duration: 0.6, ease }, "-=1")
    tlAnimation2.to(swiperPhone.position, { x: -7.4, z: 0.01,duration: 1, ease }, "-=1")

  })

}

    // animation when slide 
    const playAnimation2 = () => {
    if (tlAnimation2 && swiperPhone) {
      tlAnimation2.restart()
      pendingPlayAnimation2 = false
    } else {
      pendingPlayAnimation2 = true
    }
  }

  const reverseAnimation2 = () => {
    if (tlAnimation2 && swiperPhone) {
      tlAnimation2.reverse()
    }
}

const animate = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()

// responsive
window.addEventListener("resize", () => {
    camera.aspect = slidePhones.clientWidth / slidePhones.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(slidePhones.clientWidth, slidePhones.clientHeight)
})

loadModel(categoryName)

return{
    playAnimation2, reverseAnimation2, loadModel
}
}