import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

gsap.to('.diagram', {
    scrollTrigger: {
        trigger: '.diagram', // start the animation when ".box" enters the viewport (once)
        start: "top center",
        end: "top 100px"
    },
    x: 500,
    // duration: 3
    repeat: -1,
    yoyo: true
});

gsap.to(gltf.scene.rotation, {
    duration: 10, 
    z: Math.PI * 2, 
    repeat: -1, 
    ease: "none"
});