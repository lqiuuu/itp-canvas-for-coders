import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

gsap.to('.test', {
    scrollTrigger: {
        trigger: '.test2', // start the animation when ".box" enters the viewport (once)
        start: "top center",
        end: "top 100px"
    },
    y: 500,
    // duration: 3
    repeat: -1,
    yoyo: true
});