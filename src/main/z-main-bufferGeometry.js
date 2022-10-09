import * as THREE from "three";

//导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//导入dat.gui库
import * as dat from "dat.gui";

//导入动画库
import gsap from "gsap";
import { Material } from "three";

//目标：掌握gsap,设置各种动画效果

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

//添加物体
//创建几何体
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -1.0, -1.0, 1.0, 
    1.0, -1.0, 1.0, 
    1.0, 1.0, 1.0,
    1.0,1.0,1.0,
    -1.0,1.0,1.0,
    -1.0,-1.0,1.0
]);

geometry.setAttribute('position',new THREE.BufferAttribute(vertices, 3))
const material = new THREE.MeshBasicMaterial({color:0xffff00})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
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
