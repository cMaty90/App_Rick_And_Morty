//animacion con GSAP

gsap.from(".clasegsap", {
 duration: 1.5,
  y:-200,
  scale: 0,  
  delay: 0.5, 
  stagger: 0.5,
  ease: "elastic", 
  force3D: true
});
