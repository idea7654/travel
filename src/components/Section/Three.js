import React, {useState, useEffect, useRef} from 'react';
import * as THREE from 'three';
import { Interaction } from 'three.interaction';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {ColladaLoader} from 'three/examples/jsm/loaders/ColladaLoader';

const Three = ({onSelect}) => {
    const ref = useRef();
    useEffect(()=>{
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        const model = new THREE.Object3D();
        scene.background = new THREE.Color("#FFFFFF"); //배경색 지정
        renderer.setSize( window.innerWidth, window.innerHeight );
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        ref.current.appendChild(renderer.domElement);

        let flag = null;
        let kagawa = null;
        let tokyo = null;
        

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableKeys = false;
        controls.enableZoom = false;
        controls.rotateSpeed = 0.3;
        camera.position.x = 10;
        camera.position.y = 10;
        camera.position.z = 0;
        controls.update();

        const color = 0xFFFFFF;
        const intensity = 2;

        {
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(1, 1, 1);
            scene.add(light);
            
            const light2 = new THREE.DirectionalLight(color, intensity);
            light2.position.set(-1, -1, -1);
            scene.add(light2);
            
            const light3 = new THREE.DirectionalLight(color, intensity);
            light3.position.set(20, 0, 0);
            scene.add(light3);
            
            const light4 = new THREE.DirectionalLight(color, intensity);
            light4.position.set(0, 20, 0);
            scene.add(light4);
            
            const light5 = new THREE.DirectionalLight(color, intensity);
            light5.position.set(0, 0, 20);
            scene.add(light5);
        }

        const load = function(){
            const loader = new ColladaLoader();

            loader.load(process.env.PUBLIC_URL + '/model 3.dae', (collada) => {
                const box = new THREE.Box3().setFromObject(collada.scene);
                const boxSize = box.getSize(new THREE.Vector3()).length();
                const boxCenter = box.getCenter(new THREE.Vector3());

                controls.target.copy(boxCenter);
                for(let i = 0; i < 15; i++){
                    controls.dollyIn();
                }
                controls.update();
                
                collada.scene.children[0].children.forEach((i) => {
                    if(i.children[0]){
                        i.children[0].material[0] = new THREE.MeshLambertMaterial({color: 'rgb(62, 76, 51)'});
                    }
                });

                model.add(collada.scene);
                scene.add(model);
                //console.log(collada.scene.children[0].children);
                kagawa = collada.scene.children[0].children[29];
                tokyo = collada.scene.children[0].children[12];

                kagawa.children[0].material[0] = new THREE.MeshLambertMaterial({color: 'rgb(46, 65, 33)'});
                tokyo.children[0].material[0] = new THREE.MeshLambertMaterial({color: 'rgb(46, 65, 33)'});

                kagawa.name = "kagawa";
                tokyo.name = "tokyo";

                const interaction = new Interaction(renderer, kagawa, camera);
                kagawa.on('mousemove', (ev) => {
                    flag = "kagawa";
                    onSelect("kagawa");
                });
                const interactionTokyo = new Interaction(renderer, tokyo, camera);
                tokyo.on('mousemove', (ev) => {
                    flag = "tokyo";
                    onSelect("tokyo");
                });
            });
        }

        const resizeRendererToDisplaySize = function(renderer) {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }
        const texLoader = new THREE.TextureLoader();

        const move = function(obj){
            if(obj.name && flag === obj.name){
                if(obj.position.z < 3){
                    obj.position.z += 0.1;
                    obj.children[0].material[0] = new THREE.MeshLambertMaterial({color: 0x000000});
                }
            }else if(flag && obj.name){
                if(obj.position.z >= 0){
                    obj.position.z -= 0.1;
                    obj.children[0].material[0] = new THREE.MeshLambertMaterial({color: 'rgb(46, 65, 33)'});
                }
            }
        }
        const animate = function () {
            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }
            requestAnimationFrame( animate );

            if(kagawa){
                move(kagawa);
            }
            if(tokyo){
                move(tokyo);
            }

            renderer.render( scene, camera );
        }
        load();
        animate();
    },[]);

    return (
        <div className="h-4/5" ref={ref}>
        </div>
    );
}

export default Three;
