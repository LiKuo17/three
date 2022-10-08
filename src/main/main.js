import * as THREE from "three";

//导入轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

//导入动画库
import gsap from "gsap";

//目标：掌握gsap,设置各种动画效果

//创建场景
const scene = new THREE.Scene()

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

//设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

//添加物体
//创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00})

//根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

//修改物体的位置
// cube.position.set(5, 0, 0)
// cube.position.x = 5

//缩放
// cube.scale.set(3,2,1)
// cube.scale.x = 6

//旋转
cube.rotation.set(Math.PI / 4, 0, 0,"XZY");

//将几何体添加到场景当中
scene.add(cube)

//初始化渲染器
const renderer = new THREE.WebGLRenderer()

//设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);

//将webgl渲染的canvas内容添加到body上
document.body.appendChild(renderer.domElement)

//使用渲染器，通过相机将场景渲染进来
// renderer.render(scene,camera)

//创建轨道控制器
const controls = new OrbitControls(camera,renderer.domElement)

//添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 设置时钟
const clock = new THREE.Clock()

//设置动画
gsap.to(cube.position,{x:5,duration:5,ease:"power1.inOut"})
gsap.to(cube.rotation,{y:2 * Math.PI,duration:5,ease:"power1.inOut"})

function render(){
    renderer.render(scene,camera);
    //下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}

render()