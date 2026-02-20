import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createCube (imgContainer, imgGroups, click) {
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    45,
    imgContainer.clientWidth / imgContainer.clientHeight,
    0.1,
    1000
)

const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true})
renderer.setSize(imgContainer.clientWidth , imgContainer.clientHeight)

imgContainer.appendChild(renderer.domElement)

camera.position.set(0, 0, 12)

const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

const textureLoader = new THREE.TextureLoader()
let modleMesh = null

// create the cube
const cubeGeo = new THREE.BoxGeometry(6,4,3)
const cubeMat = [
    new THREE.MeshBasicMaterial({map: textureLoader.load(imgGroups[0]), transparent:true}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(imgGroups[1]), transparent:true}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(imgGroups[2]), transparent:true}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(imgGroups[3]), transparent:true}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(imgGroups[2]), transparent:true}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(imgGroups[3]), transparent:true}),
]

const cube = new THREE.Mesh(cubeGeo,cubeMat)
cube.scale.set(1.3, 1.3, 1.3)
cube.position.set(0, 0, 0)
cube.rotation.set(0,0,0)
scene.add(cube)

modleMesh = cube

// control the object with x position
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true
controls.enablePan = false;
controls.enableZoom = false;
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;


// ray caster for mouse events
const mousePosition = new THREE.Vector2()
const rayCaster = new THREE.Raycaster();

window.addEventListener('mousemove', (e) => {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1

    rayCaster.setFromCamera(mousePosition,camera)

    if(modleMesh){
      const intersects = rayCaster.intersectObjects(scene.children)
      if(intersects.length > 0){
        controls.enabled = true
      }else
      (
        controls.enabled = false
      )

    }
})

renderer.domElement.addEventListener("click", (e) => {
  const rect = renderer.domElement.getBoundingClientRect()
  mousePosition.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  mousePosition.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
  rayCaster.setFromCamera(mousePosition,camera)

  const intersects = rayCaster.intersectObjects(scene.children, true)
  if (intersects.length > 0) {
      const faceIndex = intersects[0].face.materialIndex
      const faceToImageIndex = [0, 1, 2, 3, 2, 3];
      const imageIndex = faceToImageIndex[faceIndex]
      if (imgGroups[imageIndex] && typeof click === 'function') {
        click(imgGroups[imageIndex]) 
      }
    }
})

const animate = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
    controls.update()
    cube.rotation.y += 0.0045
}

animate()

// responsive
window.addEventListener("resize", () => {
    camera.aspect = imgContainer.clientWidth / imgContainer.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(imgContainer.clientWidth, imgContainer.clientHeight)
})

}