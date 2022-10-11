import * as THREE from "three";

//导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//导入dat.gui库
import * as dat from "dat.gui";

//导入动画库
import gsap from "gsap";
import { Material, Texture } from "three";

import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader"

//目标：掌握gsap,设置各种动画效果 


//加载hdr环境图
const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync(require("../assets/hdr/a4ley-cnbcr.hdr")).then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.background = texture;
  scene.environment = texture
})

//创建场景
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 设置cube纹理加载器
const cubeTextureLoader = new THREE.CubeTextureLoader()
const envMapTexture = cubeTextureLoader.load([
  require("../assets/imgs/3/px.jpg"),
  require("../assets/imgs/3/nx.jpg"),
  require("../assets/imgs/3/py.jpg"),
  require("../assets/imgs/3/ny.jpg"),
  require("../assets/imgs/3/pz.jpg"),
  require("../assets/imgs/3/nz.jpg")
])

const sphereGeometry = new THREE.SphereGeometry(1,20,20)
const material = new THREE.MeshStandardMaterial({
  metalness:0.7,
  roughness:0.1,
  // envMap:envMapTexture
})

const sphere = new THREE.Mesh(sphereGeometry, material)
scene.add(sphere)

//给场景添加背景
scene.background = envMapTexture;

//给场景所有的物体添加默认的环境背景 
scene.environment = envMapTexture;

const light = new THREE.AmbientLight(0xffffff,0.8)
scene.add(light)
// var div = document.createElement("div")
// div.style.width = "200px";
// div.style.height = "200px";
// div.style.position = "fixed";
// div.style.right = 0;
// div.style.top = "100px";
// div.style.color = "#fff"
// document.body.appendChild(div)

// let event = {}
// //单张纹理图加载进度
// event.onLoad = function(){
//   console.log("图片加载完成");
//   // alert("图片加载完成")
// }
// event.onProgress = function(url,num,total){
//   console.log("图片加载完成:", url);
//   console.log("图片加载进度:", num);
//   console.log("图片总数:",total);
//   console.log("图片加载进度百分比：" ,(num/total * 100).toFixed(2) + "%");
//   let value = (num/total * 100).toFixed(2) + "%";
//   div.innerHTML = value
//   // alert("图片加载进度")
// }
// event.onError = function(){
//   // alert("图片加载出现错误")
//   console.log("图片加载出现错误");
// }
//设置加载管理器
// const loadingManager = new THREE.LoadingManager(
//   event.onLoad,event.onProgress,event.onError
// )




// 导入纹理
// const textureLoader = new THREE.TextureLoader(loadingManager)
// const doorColorTexture = textureLoader.load(require("../assets/imgs/color.jpg"),
//   // event.onLoad,event.onProgress,event.onError
//   )
// const doorAplhaTexture = textureLoader.load(require('../assets/imgs/alpha.jpg'))
// const doorAoTexture = textureLoader.load(require('../assets/imgs/ambientOcclusion.jpg'))



// //导入置换贴图
// const doorHeightTexture = textureLoader.load(require('../assets/imgs/height.jpg'))
// //导入粗糙度贴图
// const roughnessTexture = textureLoader.load(require('../assets/imgs/roughness.jpg'))
// //导入金属贴图
//  const metalnessTexture = textureLoader.load(require('../assets/imgs/metalness.jpg'))
// //导入法线贴图
// const noramlTexture = textureLoader.load(require('../assets/imgs/normal.jpg'))

// const texture = textureLoader.load(require("../assets/imgs/minecraft.png"))
//添加物体
// const cubeGeometry = new THREE.BoxBufferGeometry(1,1,1,100,100,100)
//材质
// const basicMaterial = new THREE.MeshStandardMaterial({
//   color: "#ffff00",
//   map: doorColorTexture,
//   // map:texture,
//   alphaMap:doorAplhaTexture,
//   transparent:true,
//   aoMap:doorAoTexture,
//   aoMapIntensity:1,
//   // opacity: 0.6,
//   side:THREE.DoubleSide,
//   displacementMap: doorHeightTexture,
//   displacementScale:0.1,
//   roughness:1,
//   roughnessMap:roughnessTexture,
//   metalness:1,
//   metalnessMap:metalnessTexture,
//   normalMap:noramlTexture,

// })
//给plane添加第二组uv
// cubeGeometry.setAttribute("uv2", new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2))

// //灯光
// const light = new THREE.AmbientLight(0xffffff,0.5)
// scene.add(light)
// const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
// directionalLight.position.set(0,10,10)
// scene.add(directionalLight)

// texture.minFilter = THREE.NearestFilter;
// texture.magFilter = THREE.NearestFilter;
// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.LinearFilter;

// const cube = new THREE.Mesh(cubeGeometry,basicMaterial)
// scene.add(cube)

// const planeGeometry  = new THREE.PlaneBufferGeometry(1, 1, 200, 200)
// const plane = new THREE.Mesh( planeGeometry, basicMaterial)
// plane.position.set(1.5,0,0);
// scene.add(plane)

//给plane添加第二组uv
// planeGeometry.setAttribute("uv2", new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2))

//添加物体
//创建几何体

// const vertices = new Float32Array([
//     -1.0, -1.0, 1.0, 
//     1.0, -1.0, 1.0, 
//     1.0, 1.0, 1.0,
//     1.0,1.0,1.0,
//     -1.0,1.0,1.0,
//     -1.0,-1.0,1.0
// ]);

// for(let i = 0 ;i< 50;i++){
//     const geometry = new THREE.BufferGeometry();
//     const positionArray = new Float32Array(9);
//     for (let j =0;j<9;j++){
//         positionArray[j]  = Math.random() * 10 - 5
//     }
//     let color = new THREE.Color(Math.random(),Math.random(),Math.random())
//     geometry.setAttribute('position',new THREE.BufferAttribute(positionArray, 3))
//     const material = new THREE.MeshBasicMaterial({color: color,transparent:true,opacity:0.5})
//     const mesh = new THREE.Mesh(geometry, material)
//     scene.add(mesh)
// }

// //根据几何体和材质创建物体
// const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

// //修改物体的位置
// // cube.position.set(5, 0, 0)
// // cube.position.x = 5

// //缩放
// // cube.scale.set(3,2,1)
// // cube.scale.x = 6

// //旋转
// cube.rotation.set(Math.PI / 4, 0, 0,"XZY");

// //将几何体添加到场景当中
// scene.add(cube)

// const gui = new dat.GUI();
// gui.add(cube.position,"x").min(0).max(5).step(0.01).name('移动x轴').onChange((value)=>{
//     console.log("值被修改：",value);
// }).onFinishChange((value)=>{
//     console.log('最终值：',value);
// });
// gui.add(cube.position,"y").min(0).max(5).step(0.01).name('移动y轴');
// gui.add(cube.position,"z").min(0).max(5).step(0.01).name('移动z轴');

// //修改物体颜色
// const params = {
//     color: "#ffff00",
//     fn:()=>{
//         //让立方体运动起来
//         gsap.to(cube.position,{x:5,duration:5,yoyo:true,repeat:-1})
//     }
// }
// gui.addColor(params,"color").onChange((value)=>{
//     console.log("颜色被修改：",value);
//     cube.material.color.set(value)
// }).onFinishChange((value) => {
//     console.log("最终颜色：",value);
// })

// //设置显示属性
// gui.add(cube,"visible").name("是否显示")

// //设置点击按钮触发某个事件
// // gui.add(params,"fn").name("立方体运动")

// var folder = gui.addFolder("设置立方体")
// folder.add(cube.material, "wireframe")
// //设置点击按钮触发某个事件
// folder.add(params,"fn").name("立方体运动")

//初始化渲染器
const renderer = new THREE.WebGLRenderer();

//设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);

//将webgl渲染的canvas内容添加到body上
document.body.appendChild(renderer.domElement);

//使用渲染器，通过相机将场景渲染进来
// renderer.render(scene,camera)

//创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

//设置控制器阻尼，让控制器更有真实效果,必须在动画循环内update()

//添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

// //设置动画
// var animate = gsap.to(cube.position, {
//     x: 5,
//     duration: 5,
//     ease:"power1.inOut",
//     onComplete:()=>{
//         console.log("动画完成")
//     },
//     onStart:()=>{
//         console.log("动画开始");
//     },
//     //设置重复次数，无限次循环的值为-1
//     repeat: -1,
//     //往返运动
//     yoyo: true,
//     //延迟运动
//     delay:2,
// })

// gsap.to(cube.rotation,{y: 2 * Math.PI, duration: 5, ease:"power1.inOut"})

// window.addEventListener("click", ()=>{
//     console.log(animate);
//     //isActive()是内置方法，判断物体是否在运动
//     if(animate.isActive()){
//         //暂停
//         animate.pause()
//     }else{
//         //恢复
//         animate.resume()
//     }
// })
window.addEventListener("dblclick", () => {
  const fullscreenElement = document.fullscreenElement;
  if (!fullscreenElement) {
    // 双机控制全屏，推出全屏
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
    // renderer.domElement.exitFullscreen();
  }
});

function render() {
  controls.update();
  renderer.render(scene, camera);
  //下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();

//监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  //更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  //更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
