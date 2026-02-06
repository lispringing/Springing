---
title: 用three.js手搓一个3D小房子
cover: ./img/微信图片_2026-01-23_230649_523.png
date: '2026-1-21'
updated: '2026-1-21'
description: 假期浅浅的学了一下three.js，结合blender来做了一个小项目
tags:
- 教程
- 学习笔记
- 分享
- 代码
categories:
- 代码开发
top: false
abbrlink: '20250121'
---
# blender模型制作
这一部分没有什么好说的东西
主要就是看大家平时的blender建模功底了，在这里需要注意几点
首先是大家的blender模型不要过大！要不然在three.js中调用glb的时候加载需要很长时间
再一个是尽量不要用修改器(尤其是倒角!)导出glb的时候可能会丢失相关细节
我的小房子建模如下图
![](/img/微信图片_2026-01-23_230649_523.png)
可以看到还是很简陋的，但是对于这个项目来说够用

# 项目逻辑结构
第二步则是对项目逻辑结构进行一个规划
>在这里我门使用模块化设计，如下图
![](/img/微信图片_2026-01-23_231103_410.png)

我们从下往下说：
custom.css：html的配套样式文件，其实可以写到html文件里面的，但是我习惯分开然后引入
controls.js： 场景控制器，用于实现鼠标控制，支持鼠标左键旋转、滚轮缩放、右键平移模型
custom.js： 自定义js，后续功能拓展可以在这里面写，我在里面写了个控制面板的js
main.js：主入口，初始化场景管理器，之后映射到html中绑定窗口事件
modeloader.js: 模型加载器，加载我的两个模型
scenemanager.js ：场景管理器，包含模型状态判断，交互功能实现等等
house.glb 和 interior.glb是我的两个blnder模型，即上文建的模型，一个是室外，一个是室内（室内那个就是放大版本的室外模型）
index.html： 主html文件，没啥好说的

# index.html
直接上完整代码
```html
<!--@小春子 2026.1.20 创建项目-->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <title>小春子の3D小房子</title>
    <link rel="stylesheet" href="./css/custom.css">
</head>
<body>
    <div id="canvas-container"></div>
    <div id="loading">加载中(首次加载耗时较长)</div>
    <div id="error提示">模型加载失败了</div>

    <!-- 右上角控制面板 -->
    <div class="control-panel">
        <div class="panel-notice">
            <div class="notice-title">操作说明</div>
            <div class="notice-content"><p>点击门可进入室内场景，支持鼠标左键旋转、滚轮缩放模型</p></div>
        </div>
        <div class="panel-buttons">
            <button class="panel-btn btn-home" id="btnHome">回到室外</button>
            <button class="panel-btn btn-link" id="btnLink">项目说明</button>
        </div>
    </div>
    
    <!-- Three.js 相关的部分cdn引入 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.min.js"></script>
    
    <!-- 相关脚本 -->
    <script src="js/modelLoader.js"></script>
    <script src="js/controls.js"></script>
    <script src="js/sceneManager.js"></script>
    <script src="js/main.js"></script>
    <script src="js/custom.js"></script>

</body>
</html>
```
可以看到这个html就是做了窗口大小适应，之后three.js的一些核心文件用了cdn引入,同时我自己做了一个控制面板，用于显示操作说明，以及一些按钮功能

# controls.js

```js
/**
 * 鼠标交互控制器
 * 封装 OrbitControls，实现左键旋转、滚轮缩放、右键平移
 */
class ModelControls {
    constructor(camera, rendererDom) {
        this.controls = new THREE.OrbitControls(camera, rendererDom);
        this.initControls();
    }

    /**
     * 初始化控制器配置
     */
    initControls() {
        // 核心交互配置
        this.controls.enableRotate = true; // 左键旋转
        this.controls.enableZoom = true;   // 滚轮缩放
        this.controls.enablePan = true;    // 右键平移
        
        // 顺滑交互参数
        this.controls.enableDamping = true; // 阻尼（顺滑效果）
        this.controls.dampingFactor = 0.05; // 阻尼系数（越小越顺滑）
        
        // 缩放限制（避免缩放过度）
        this.controls.minDistance = 1;    // 最小缩放距离
        this.controls.maxDistance = 50;   // 最大缩放距离
        
        // 旋转限制（可选，若需要限制旋转角度可开启）
        // this.controls.maxPolarAngle = Math.PI / 2; // 垂直旋转限制为90度
        
        // 更新控制器
        this.controls.update();
    }

    /**
     * 动画帧更新（必须在动画循环中调用）
     */
    update() {
        this.controls.update();
    }

    /**
     * 窗口适配时更新控制器
     */
    resize() {
        this.controls.update();
    }

    /**
     * 销毁控制器（可选）
     */
    dispose() {
        this.controls.dispose();
    }
}
```

# custom.js 
```js
 // 页面加载完成后绑定按钮事件
        document.addEventListener('DOMContentLoaded', () => {
            // 回到主页按钮：调用场景管理器切换回房子场景
            const btnHome = document.getElementById('btnHome');
            btnHome.addEventListener('click', () => {
                if (window.sceneManager) {
                    window.sceneManager.switchToHouse();
                } else {
                    alert('模型还在加载中，请稍候');
                }
            });

            // 跳转外部链接按钮
            const btnLink = document.getElementById('btnLink');
            btnLink.addEventListener('click', () => {
                window.open('https://www.example.com', '_blank');
            });
        });
```
这一部分主要是负责控制首页中的控制面板部分

# main.js
```js
/**
 * 主入口文件
 * 初始化场景管理器，绑定窗口事件
 */
document.addEventListener('DOMContentLoaded', () => {
    // 获取容器元素
    const container = document.getElementById('canvas-container');
    
    // 初始化场景管理器，并暴露到全局
    const sceneManager = new SceneManager(container);
    window.sceneManager = sceneManager;
    
    // 绑定窗口大小变化事件
    window.addEventListener('resize', () => {
        sceneManager.onWindowResize();
    });
});
```

# modeloader.js
```js
/**
 * 模型加载工具类
 * 封装 GLB 模型加载逻辑，统一处理加载状态和错误
 */
class ModelLoader {
    constructor() {
        this.loader = new THREE.GLTFLoader();
        this.loadingCallback = null; // 加载进度回调
        this.completeCallback = null; // 加载完成回调
        this.errorCallback = null; // 加载失败回调
    }

    /**
     * 加载 GLB 模型
     * @param {string} url 模型文件路径
     * @returns {Promise<THREE.Group>} 模型场景对象
     */
    loadModel(url) {
        return new Promise((resolve, reject) => {
            this.loader.load(
                url,
                (gltf) => {
                    const model = gltf.scene;
                    // 模型默认居中、尺寸适配（可根据实际模型调整）
                    this.centerModel(model);
                    this.scaleModel(model, 1); // 基础缩放，可根据模型调整
                    resolve(model);
                    if (this.completeCallback) this.completeCallback();
                },
                (xhr) => {
                    // 加载进度（0-100）
                    const progress = Math.round((xhr.loaded / xhr.total) * 100);
                    if (this.loadingCallback) this.loadingCallback(progress);
                },
                (error) => {
                    console.error('模型加载失败：', error);
                    reject(error);
                    if (this.errorCallback) this.errorCallback(error);
                }
            );
        });
    }

    /**
     * 模型居中（基于包围盒）
     * @param {THREE.Group} model 模型对象
     */
    centerModel(model) {
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center); // 模型中心移到世界原点
    }

    /**
     * 统一缩放模型，保证尺寸合适
     * @param {THREE.Group} model 模型对象
     * @param {number} scale 缩放比例
     */
    scaleModel(model, scale) {
        model.scale.set(scale, scale, scale);
    }

    // 设置回调函数
    onLoading(callback) {
        this.loadingCallback = callback;
    }
    onComplete(callback) {
        this.completeCallback = callback;
    }
    onError(callback) {
        this.errorCallback = callback;
    }
}

```

# scenemanager.js 
```js
/**
 * 场景管理器
 * 预加载房子+室内模型，点击门仅切换可见性
 */
class SceneManager {
    constructor(container) {
        // 核心组件
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.modelLoader = new ModelLoader();
        
        // 场景状态
        this.currentScene = 'house'; // 当前场景：house（房子）/ interior（室内）
        this.houseModel = null;     // 房子模型
        this.interiorModel = null;  // 室内模型
        this.doorMesh = null;       // 可点击的门模型
        this.loadedModelCount = 0;  // 已加载模型数量（用于进度提示）
        this.totalModelCount = 2;   // 总模型数量（房子+室内）

        // 初始化
        this.initCoreComponents();
        this.initLight();
        this.initRaycaster(); // 初始化射线检测（用于点击门）
        // 预加载所有模型
        this.preloadAllModels();
    }

    /**
     * 初始化 Three.js 核心组件
     */
    initCoreComponents() {
        // 1. 创建场景（浅灰色背景）
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0); // 浅灰色背景
        
        // 2. 创建相机
        this.camera = new THREE.PerspectiveCamera(
            75, // 视角
            window.innerWidth / window.innerHeight, // 宽高比
            0.1, // 近裁剪面
            1000 // 远裁剪面
        );
        this.camera.position.set(0, 2, 5); // 房子场景相机初始位置
        
        // 3. 创建渲染器（优化性能）
        this.renderer = new THREE.WebGLRenderer({
            antialias: true, // 抗锯齿
            alpha: false,
            powerPreference: "low-power" // 优先低功耗，适配更多设备
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // 限制高清比例，减少卡顿
        this.renderer.shadowMap.enabled = true; 
        this.container.appendChild(this.renderer.domElement);
        
        // 4. 创建交互控制器（优化顺滑度）
        this.controls = new ModelControls(this.camera, this.renderer.domElement);
    }

    /**
     * 初始化光源（保证亮度适中）
     */
    initLight() {
        // 环境光（基础照明，避免过暗）
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        // 方向光（模拟太阳光，提升明暗层次）
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, 10, 5);
        dirLight.castShadow = true; 
        this.scene.add(dirLight);
        
        // 补光（避免局部过暗）
        const fillLight = new THREE.PointLight(0xffffff, 0.3);
        fillLight.position.set(-5, 5, -5);
        this.scene.add(fillLight);
    }

    /**
     * 初始化射线检测（用于点击门交互）
     */
    initRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        window.addEventListener('click', (e) => this.onMouseClick(e));
    }

    /**
     * 预加载所有模型（房子+室内）
     */
    async preloadAllModels() {
        const loadingEl = document.getElementById('loading');
        const errorEl = document.getElementById('error提示');
        
        // 加载进度回调
        this.modelLoader.onLoading((progress) => {
            const totalProgress = Math.round((this.loadedModelCount + (progress/100)) / this.totalModelCount * 100);
            loadingEl.textContent = `加载中 ${totalProgress}% 稍等片刻哦`;
        });

        try {
            // 并行加载两个模型（提升加载速度）
            const [houseModel, interiorModel] = await Promise.all([
                this.modelLoader.loadModel('models/house.glb'),
                this.modelLoader.loadModel('models/interior.glb')
            ]);

            // 处理房子模型
            this.houseModel = houseModel;
            this.scene.add(this.houseModel);
            // 查找门模型（需确保 Blender 中门命名为 "door"）
            this.doorMesh = this.houseModel.getObjectByName('door');
            if (this.doorMesh) {
                this.doorMesh.userData.clickable = true;
                console.log('找到可点击的门模型');
            } else {
                console.warn('未找到门模型，请检查 Blender 中门的命名是否为 "door"');
            }

            // 处理室内模型（默认隐藏）
            this.interiorModel = interiorModel;
            this.interiorModel.visible = false; // 初始隐藏
            this.scene.add(this.interiorModel);

            // 加载完成
            this.loadedModelCount = 2;
            loadingEl.style.display = 'none';
            errorEl.style.display = 'none';

            // 启动动画循环
            this.animate();
        } catch (error) {
            loadingEl.style.display = 'none';
            errorEl.style.display = 'block';
            errorEl.textContent = '模型加载失败，请检查文件路径或网络';
            console.error('模型预加载失败：', error);
        }
    }

    /**
     * 切换到室内场景（无加载，直接切换）
     */
    switchToInterior() {
        if (!this.houseModel || !this.interiorModel) return;
        
        // 切换模型可见性
        this.houseModel.visible = false;
        this.interiorModel.visible = true;
        
        // 调整相机位置（适配室内模型）
        this.camera.position.set(0, 1, 3);
        this.camera.lookAt(0, 1, 0); // 相机看向室内中心
        this.controls.controls.reset(); // 重置控制器，避免视角异常
        
        this.currentScene = 'interior';
        console.log('已切换到室内场景');
    }

    /**
     * 回到房子场景（控制面板按钮调用）
     */
    switchToHouse() {
        if (!this.houseModel || !this.interiorModel) return;
        
        // 切换模型可见性
        this.houseModel.visible = true;
        this.interiorModel.visible = false;
        
        // 恢复相机位置
        this.camera.position.set(0, 2, 5);
        this.camera.lookAt(0, 1, 0);
        this.controls.controls.reset();
        
        this.currentScene = 'house';
        console.log('已回到房子场景');
    }

    /**
     * 鼠标点击事件处理（检测是否点击门）
     */
    onMouseClick(event) {
        if (this.currentScene !== 'house' || !this.doorMesh) return;
        
        // 转换鼠标坐标
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        
        // 射线检测门
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObject(this.doorMesh, true); // 递归检测子模型
        if (intersects.length > 0) {
            this.switchToInterior(); // 立刻切换，无加载等待
        }
    }

    /**
     * 窗口适配
     */
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.controls.resize();
    }

    /**
     * 动画循环
     */
    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// 暴露到全局，方便控制面板调用
window.SceneManager = SceneManager;
```

# 需要注意的问题
1.在做项目的时候要进行本地预览，不能从文件夹直接打开index.html，因为浏览器的安全策略组设置会认为你的glb文件是跨域文件，没法正常打开
建议使用node.js搞一个本地服务器，或者用vscode的liveserver插件来进行本地预览

2.glb文件不要太大！要不然加载过程会超级超级慢