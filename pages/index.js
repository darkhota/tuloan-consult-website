import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitText from '../components/plugins/SplitTextPlugin.min.js';
import drawSVG from '../components/plugins/DrawSVGPlugin.min.js'
// import { Swiper, SwiperSlide } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import $ from 'jquery'
import { findDomNode } from 'react-dom'
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Script from 'next/script'
import Contact from "../components/Contact"
import Cont from "../components/Cont"

SwiperCore.use([Navigation]);
SwiperCore.use([Pagination]);


export default function Home() {
  // const [galleryPercent, setGalleryPercent] = useState(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [gallerySwiper, setGallerySwiper] = useState()
  const ref = useRef(null);
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(drawSVG);
  ScrollTrigger.defaults(
		{ 
			scroller: '#scrollWrapper',
			//invalidateOnRefresh: true 
			//autoRefreshEvents: "resize,orientationchange,visibilitychange,DOMContentLoaded,load",
		  //invalidateOnRefresh: true 
      });
      

  useEffect(() => {
      const element = ref.current;
    ScrollTrigger.create({
			trigger: ".footer",
			start: "top bottom",
			toggleClass: {targets: "body", className: "footer-visible"},
			/*toggleClass: {targets: ".footer-bg", className: "play"},
			onEnter() {
				//$("#a1").addClass('fixed');
				//$("body").attr("data-footer-open", "");
				$("body").attr('data-logo','hide');
			},
			onLeaveBack() {
				$("body").attr('data-logo','');
				//$("#intro-bg").removeClass('play');
				//$("#a1 .mod-txtSwap").removeClass('play');
			}*/
    });
  }, []);

  useEffect(() => {
    const element = ref.current;
    var split = new SplitText("#a1_t", {type: "words", specialChars:["A KITA", "IN THE", "HEART OF"]});
    var wordSlideDuration = 1;
    var topFade = "20%";
    gsap.timeline({
      scrollTrigger: {
      trigger: "#a1",
      //toggleActions: "restart complete reverse none",
      toggleActions: "play none none none",
      start: "top bottom", 
      onLeaveBack() {
        $("#a1").removeClass('fixed');
      }
      },
  })
  //words left/right
			//.from(".mod-introtext", {delay:0, duration: 1, top:"-20%", ease: "power1.out"}) //, "<")
			//.from(".mod-introtext", {delay:0, duration: 1, top:"100%", ease: "power1.out"}) //, "<")
			.from(split.words[0], {duration: wordSlideDuration, left:"-120%", ease:"power1.inOut"}) //, "<+0.2") //"<") //, "<")
			
			.from(split.words[1], {duration: wordSlideDuration, left:"60%", ease:"power1.inOut"}, "<")
			//.to("#a1", {duration: wordSlideDuration, top:"0%"})
			.from(split.words[2], {duration: wordSlideDuration, left:"-40%", ease:"power1.inOut"}, "<")
			.from(split.words[3], {duration: wordSlideDuration, left:"38%", ease:"power1.inOut"}, "<")
			.from(split.words[4], {duration: wordSlideDuration, left:"-80%", ease:"power1.inOut"}, "<");
			
		
		gsap.timeline({
			    scrollTrigger: {
					trigger: "#a2",
					toggleActions: "restart complete none reverse",
					start: "top center", 
					markers: 0,
					onEnter() {
						$("#a1").addClass('fixed');
						$("#intro-bg").addClass('play');
						window.setTimeout(function(){
							$("#a1 .mod-txtSwap").addClass('play');
							
						}, 100);
					},
					onLeaveBack() {
						$("#intro-bg").removeClass('play');
						$("#a1 .mod-txtSwap").removeClass('play');
					}
			    },
			})
  })




  
  useEffect(() => {
    const element = ref.current;
   
    gsap.timeline({
      scrollTrigger: {
        trigger: "#intro",
        start: "top 80%", 
        end: "+=200%", 
        //scrub: 0.1, 
        markers: 0, 
        onEnter() {
          $("body").attr('data-logo','text');
        },
        onLeave() {
          $("body").attr('data-logo','');
        },
        onEnterBack() {
          $("body").attr('data-logo','text');	
        },
        onLeaveBack() {
          $("body").attr('data-logo','');
        },
      },
    });
    
}, []);

useEffect(() => {
  const element = ref.current;
  setGalleryPercent(0);
    	
    	
  //next gallery arrow animation
  var arrows_tl = gsap.timeline({
    onComplete: function(){
      //that.setGalleryPercent(10);
    }
  })
  .pause()

  //next arrow
  .from("#gallery .swiper-button-next #arrow_root path", {delay: .5, duration:.2, drawSVG:0})
  .from("#gallery .swiper-button-next #arrow_bottom path", {duration:.1, drawSVG:0})
  .from("#gallery .swiper-button-next #arrow_top path", {duration:.1, drawSVG:0})
  //prev arrow
  .from("#gallery .swiper-button-prev #arrow_root path", {duration:.2, drawSVG:0})
  .from("#gallery .swiper-button-prev #arrow_bottom path", {duration:.1, drawSVG:0})
  .from("#gallery .swiper-button-prev #arrow_top path", {duration:.1, drawSVG:0})
  // percent circle
  .set("#gallery .swiper-pagination-circle svg .path", {drawSVG:"0%"})
  .to("#gallery .swiper-pagination-circle svg .path", {duration:1.2, drawSVG:"10%"})



  //gallery intro (mousemove)
  gsap.timeline({
        scrollTrigger: {
        trigger: "#gallery",
        //toggleActions: "restart pause resume pause",
        toggleActions: "restart none resume none",
        //start: "-50% bottom", 
        //start: "0% bottom", 
        start: "0% 100%", 
        //end: "+=100%", 
        //scrub: true, 
        markers: 0, 
        //toggleClass: 'fixed',
        //toggleClass: 'slideshowEnabled',
        onEnter() { //on gallery intro start	
          $("#gallery").removeClass("slideshowEnabled");
          
          
          if(isTouchDevice) $("#gallery").addClass("fixed");
        
          //reset gallery
          if(gallerySwiper) gallerySwiper.slideTo(1, 0, false);
          setGalleryPercent(0, 0, 0);
          
        },
        onLeave() { //on gallery intro complete
          $("#gallery").removeClass("fixed");
          /*that.setGalleryPercent(10, 1.5);
          arrows_tl.restart();
          $("#gallery").addClass("slideshowEnabled");*/
        },
        onEnterBack() {	},
        onLeaveBack() {	
          //$("#gallery").removeClass("slideshowEnabled");
          $("#gallery").removeClass("fixed");
        },
        },
        duration: .5
        
    })
    .from("#galleryIntro .swiper-slide", {left:"-100%", stagger:0.08, ease:"power1.inOut",
      onComplete() { 
          setGalleryPercent(10, 1.5);
          arrows_tl.restart();
          $("#gallery").addClass("slideshowEnabled");
          $("#gallery").removeClass("fixed");
          
      } 
    } )
    .from("#gallerySlideshow", {duration:.2, opacity:0, ease:"power1.inOut"}, "-=0.2");
}, [])



  const setGalleryPercent = (p, delay, speed) => {
    const element = ref.current;
		if(speed==null) speed = 1.2;
		if(!delay) delay = 0;
		console.log("p: "+p+" / s: "+speed+" / d: "+delay);
		var path = $("#gallery .swiper-pagination-circle svg .path");
		gsap.to("#gallery .swiper-pagination-circle svg .path", {overwrite:true, duration:speed, delay:delay, drawSVG:p+"%"});
		

  }
  
  useEffect(() => {
    const element = ref.current;

    var scrup_title_x = false; //2; //3; //0.2
		var scrup_title_y = false; //2; //2; //0.2
		var ease_title_y = "power3.out";

    const wordAnimationDuration = .8;
    const toggleActions = "restart none none reset"; //"restart none none none"
    
    var tb_id = "#textbox1";
		if(!$(tb_id).length) return;
		//word animation left/right
		var split = new SplitText(tb_id+" .h2", {type: "words"});
		gsap.timeline({
			    scrollTrigger: {
					trigger: tb_id,
					toggleActions: toggleActions,
					start: "top 100%",
					end: "+=40%",
					scrub: scrup_title_x,
					//markers: 1,
			    },
			})
			.from(split.words[0], {duration: wordAnimationDuration, left:"-100%"})
			.from(split.words[1], {duration: wordAnimationDuration, top:"-10%"}, "-=.5")
			.from(split.words[2], {duration: wordAnimationDuration, left:"5%"}, "-=.2")
			.from(split.words[3], {duration: wordAnimationDuration, left:"-10%"}, "-=.2")
			.from(split.words[4], {duration: wordAnimationDuration, left:"5%"}, "<")
			//only en
			.from(split.words[5], {duration: wordAnimationDuration, left:"25%"}, "<")
			.from(split.words[7], {duration: wordAnimationDuration, top:"10%"}, "<")
			.from(split.words[8], {duration: wordAnimationDuration, left:"25%"}, "<");
			
				
		//-- TEXTBOX 2:	
		var tb_id = "#textbox2";
		if(!$(tb_id).length) return;
		//word animation left/right
		var split = new SplitText(tb_id+" .h2", {type: "words"});
		gsap.timeline({
			    scrollTrigger: {
					trigger: tb_id,
					toggleActions: toggleActions,
					start: "top 100%",
					end: "+=30%",
					scrub: scrup_title_x,
					markers: 0,
			    },
			})
			.from(split.words[0], {duration: wordAnimationDuration, top:"-10%"})
			.from(split.words[2], {duration: wordAnimationDuration, left:"20%"})
			.from(split.words[3], {duration: wordAnimationDuration, top:"20%"}, "<");
			
			
				
		
		//-- TEXTBOX 3:	
		var tb_id = "#textbox3";
		if(!$(tb_id).length) return;
		//word animation left/right
		var split = new SplitText(tb_id+" .h2", {type: "words"});
		gsap.timeline({
			    scrollTrigger: {
					trigger: tb_id,
					toggleActions: toggleActions,
					start: "top 100%",
					end: "+=30%",
					scrub: scrup_title_x,
					markers: 0,
			    },
			})
			.from(split.words[0], {duration: wordAnimationDuration, left:"-120%"})
			.from(split.words[2], {duration: wordAnimationDuration, left:"20%"}, "-=.3");
			
			
		
		
		
		//-- TEXTBOX 4:	
		var tb_id = "#textbox4";
		if(!$(tb_id).length) return;
		//word animation left/right
		var split = new SplitText(tb_id+" .h2", {type: "words"});
		gsap.timeline({
			    scrollTrigger: {
					trigger: tb_id,
					toggleActions: toggleActions,
					start: "top 100%",
					end: "+=30%",
					scrub: scrup_title_x,
					markers: 0,
			    },
			})
			.from(split.words[0], {duration: wordAnimationDuration, top:"-20%"})
			.from(split.words[1], {duration: wordAnimationDuration, left:"20%"})
			.from(split.words[2], {duration: wordAnimationDuration, top:"5%"}, "<");
			
			
		
		
		//-- TEXTBOX 5:	
		var tb_id = "#textbox5";
		if(!$(tb_id).length) return;
		//word animation left/right
		var split = new SplitText(tb_id+" .h2", {type: "words"});
		gsap.timeline({
			    scrollTrigger: {
					trigger: tb_id,
					toggleActions: toggleActions,
					start: "top 100%",
					end: "+=30%",
					scrub: scrup_title_x,
					markers: 0,
			    },
			})
			.from(split.words[0], {duration: wordAnimationDuration, left:"-100%"})
			.from(split.words[1], {duration: wordAnimationDuration, top:"-10%"})
			.from(split.words[2], {duration: wordAnimationDuration, left:"20%"}, "<+=0.2")
			.from(split.words[3], {duration: wordAnimationDuration, top:"10%"}, "<"); //not exiting in englisch
			
  }, [])

  useEffect(() => {
    const element = ref.current;
    $(".mod-textbox").each(function(){
			var $this = $(this);
			console.log($this.find(".p-inner").html( $this.find(".p-inner").html().replace("-", "- ") ))
			//add word-break to hyphens
			$this.find(".p-inner").html( $this.find(".p-inner").html().replace("-", "- ") );
			
			ScrollTrigger.create( {
				trigger: $this,
				toggleActions: "restart complete none none",
				start: "top 100%", 
						
				onEnter() {
					startGSAP_lineheight($this)
				}
			});
			
		});	  
  }, [])

 

    const startGSAP_lineheight = () => {
     
      var split = new SplitText(find(".p-inner"), {type: "lines, words", linesClass:"line"});
  
      //lineheight (not on last textbox)
      
        const element = ref.current;
      var tl = gsap.timeline()
        //.from($this.find("p"), {delay:.2, duration: 1.5, y:"100%", opacity:0, ease: "power1.inOut"});
        tl.from(split.lines, {overwrite:true, delay:0, duration: .8, y:400, opacity:0, ease: "power2.out", stagger: 0.1, onComplete: function(){
          split.revert();
        }});
        
      }





  
  return (
    <div >
      <Head>
        <title>Tuloan Consults</title>
        <meta name="description" content="Generated by create next app" />
        <meta charSet="UTF-8" />
    {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
    {/* <link rel="stylesheet" href="css/main.css" /> */}
    <link
      rel="stylesheet"
      href="https://unpkg.com/swiper@7/swiper-bundle.min.css"
    />
        <link rel="icon" href="/favicon.ico" />
       
      </Head>

      <body data-tplid="home" data-menu-open="" data-footer-open="" data-privacy-open="" data-logo="" data-loading="" data-cursor="yellow"  data-new-gr-c-s-check-loaded="14.1043.0" data-gr-ext-installed="" className="touchdevice">
    <div className="fullpages" id="scrollWrapper" ref={ref}>
      <div
        id="cover"
        className="mod-cover mod-page fullpage"
        data-cursor="rose"
        data-snap="1"
      >
        <video
          src="noelfega.mp4"
          type="video/mp4"
          autoPlay
          loop
          muted
          playsInline
          className="video"
        ></video>
      </div>
      <div id="intro" className="mod-page z-top fullpage relative" data-snap="1"> 
        <div className="mod-intro-wrap" data-cursor="blue"> 
          <div id="a1" className="mod-intro relative_ fixed" data-cursor="blue"> 
            <div className="mod-introtext" data-lan="en"> 
              <div id="a1_t" className="h1 unpinned-view">
                <div style={{position:"relative", display: "inline-block", left: '0px'}}>A </div> 
                <div style={{position:"relative", display: "inline-block", left: '0px'}}>PRE-SCHOOL.</div>
                <br />
                <div style={{position:"relative", display: "inline-block", left: '0px'}}>IN THE</div> 
                <div style={{position:"relative", display: "inline-block", left: '0px'}}>HEART OF</div> 
                <br />
                <div style={{position:"relative", display: "inline-block", left: '0px'}}>LAGOS.</div>
              </div> 
              <div id="a1_t2" className="h1 hidden pinned-view nobr"> 
                <div>A PRE-SCHOOL.</div> 
                <div>I<span className="mod-txtSwap play">
                  <ul>
                    <li>N A SERENE</li>
                    <li>NSPIRED BY</li>
                  </ul>
                </span></div> 
                <div><span className="mod-txtSwap play">
                  <ul>
                    <li>ENVIROMENT.</li>
                    <li>EYFS.</li>
                  </ul></span>&nbsp;
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div>
      <div id="a2" className="mod-page fullpage" data-snap="1"> <div id="intro-bg" className="mod-intro-bg bgcolor-rose play"></div> </div>
      <div className="mod-page z-top fullpage" data-snap="1">
        <div className="mod-gallery relative" data-cursor="red">
          <div id="gallery" className="mod-gallery bgcolor-rose_ slideshowEnabled">
            <div id="galleryIntro" className="gallery-size fixfix">
              <div
                className="swiper-slide .position-align"
                style={{backgroundImage: "url(" + "/Noel1.jpg" + ")", left: "0px"}}
              ></div>
              <div
                className="swiper-slide"
                style={{backgroundImage: "url(" + "/mumkids1.jpg" + ")", left: "0px"}}
              ></div>
              <div
                className="swiper-slide"
                style={{backgroundImage: "url(" + "/mumkids2.jpg" + ")", left: "0px"}}
              ></div>
              <div
                className="swiper-slide"
                style={{backgroundImage: "url(" + "/Noel2.jpeg" + ")", left: "0px"}}
              ></div>
            </div>
            <Swiper
              id="gallerySlideshow"
              className="swiper mySwiper gallery-size swiper-container-initialized swiper-container-horizontal"
              style={{opacity: 1}}
              loop 
              parallax
              speed = {900} 
              pagination = {{
                el: '.swiper-pagination',
                type: 'custom', //fraction
                renderCustom: function (swiper, current, total) {
                  var p = 100/total*current;
                    setGalleryPercent(p);
                    console.log(current + '/' + total)
                  return current + '/' + total;
                },
                
              }}
              navigation= {{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }} >
              <div
                className="swiper-wrapper"
                id="swiper-wrapper-0e819c4ac8cb9f0a"
                aria-live="polite"
                style={{transition:"all 0ms ease 0s", transform: "translate3d(-1479px, 0px, 0px)"}}
              >
                {/* Slides  */}
                <SwiperSlide
                  className="swiper-slide swiper-slide-duplicate swiper-slide-prev position-align"
                  data-swiper-slide-index="3"
                  role="group"
                  aria-label="1 / 6"
                  style={{width: "1479px"}}
                >
                  <Image
                    data-swiper-parallax-x="70%"
                    src="/Noel1.jpeg"
                    layout="fill"
                    alt="kids"
                    style={{transition: "all 0ms ease 0s"}}
                  />
                </SwiperSlide>
                <SwiperSlide
                  className="swiper-slide swiper-slide-active"
                  data-swiper-slide-index="0"
                  role="group"
                  aria-label="2 / 6"
                  style={{width: "1479px"}}
                >
                  <Image
                    data-swiper-parallax-x="70%"
                    src="/mumkids1.jpg"
                    layout="fill"
                    alt="kids"
                    style={{transition: "all 0ms ease 0s"}}
                  />
                </SwiperSlide>
                <SwiperSlide
                  className="swiper-slide swiper-slide-next"
                  data-swiper-slide-index="1"
                  role="group"
                  aria-label="3 / 6"
                  style={{width: "1479px"}}
                >
                  <Image
                    data-swiper-parallax-x="70%"
                    src="/mumkids2.jpg"
                    layout="fill"
                    alt="kids"
                    style={{transition: "all 0ms ease 0s"}}
                  />
                </SwiperSlide>
                <SwiperSlide
                  className="swiper-slide swiper-slide-next"
                  data-swiper-slide-index="2"
                  role="group"
                  aria-label="4 / 6"
                  style={{width: "1479px"}}
                >
                  <Image
                    data-swiper-parallax-x="70%"
                    src="/Noel2.jpg"
                    layout="fill"
                    alt="kids"
                    style={{transition: "all 0ms ease 0s"}}
                  />
                </SwiperSlide>
                <SwiperSlide
                  className="swiper-slide swiper-slide-duplicate-prev"
                  data-swiper-slide-index="3"
                  role="group"
                  aria-label="5 / 6"
                  style={{width: "1479px"}}
                >
                  <Image
                    data-swiper-parallax-x="70%"
                    src="/Noel1.jpeg"
                    layout="fill"
                    alt="kids"
                    style={{transition: "all 0ms ease 0s", layout: "fill"}}
                  />
                </SwiperSlide>
                <SwiperSlide
                  className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                  data-swiper-slide-index="0"
                  role="group"
                  aria-label="6 / 6"
                  style={{width: "1479px"}}
                >
                  <Image
                    data-swiper-parallax-x="70%"
                    src="/mumkids1.jpg"
                    alt="kids"
                    layout = "fill"
                    style={{transition: "all 0ms ease 0s", layout: "fill"}}
                  />
                </SwiperSlide>
                ...
              </div>
               {/* If we need pagination  */}
              <div className="swiper-pagination swiper-pagination-custom"></div>
              <div className="swiper-pagination-circle">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  // xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="200px"
                  height="200px"
                  viewBox="-5 -5 210 210"
                  enableBackground="new 0 0 200 200"
                  // xml:space="preserve"
                >
                  <path
                    className="path"
                    fill="none"
                    stroke="#2F85FF"
                    strokeWidth="10"
                    strokeMiterlimit="10"
                    d="M100.416,2.001C154.35,2.225,198,46.015,198,100
                      c0,54.124-43.876,98-98,98S2,154.124,2,100S45.876,2,100,2"
                    style={{strokeDashoffset: 0, strokeDasharray: "61.5423px, 553.981px"}}>

                    </path>
                </svg>
              </div>

               {/* If we need navigation buttons  */}
              <div
                className="swiper-button-prev"
                tabIndex="0"
                role="button"
                aria-label="Previous slide"
                aria-controls="swiper-wrapper-0e819c4ac8cb9f0a"
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 241 81"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  // xmlns:xlink="http://www.w3.org/1999/xlink"
                  // xml:space="preserve"
                  // xmlns:serif="http://www.serif.com/"
                  style={{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:1.5}}
                >
                  <g transform="matrix(1,0,0,1,-6,-4.90111)">
                    <g id="arrow" transform="matrix(1,0,0,1,-21.1686,10)">
                      <g id="arrow_root" transform="matrix(1,0,0,1,0,-16.644)">
                        <path
                          d="M31.169,51.74L261.664,51.74"
                          style={{fill: "none", stroke: "rgb(0, 132, 255)", strokeWidth: '8px', strokeDashoffset: 0, strokeDasharray: "none"}}
                        ></path>
                      </g>
                      <g
                        id="arrow_bottom"
                        transform="matrix(1,0,0,1,227.469,0)"
                      >
                        <path
                          d="M34.195,35.302L-0.549,69.634"
                          style={{fill: "none", stroke: "rgb(0, 132, 255)", strokeWidth: "8px", strokeLinecap: "square", strokeDashoffset: 0, strokeDasharray: "none"}}
                        ></path>
                      </g>
                      <g id="arrow_top" transform="matrix(1,0,0,1,227.469,0)">
                        <path
                          d="M-0.549,0.558L34.195,35.302"
                          style={{fill: "none", stroke: "rgb(0, 132, 255)", strokeWidth: "8px", strokeLinecap: "square", strokeDashoffset: 0, strokeDasharray: "none"}}
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div
                className="swiper-button-next"
                tabIndex="0"
                role="button"
                aria-label="Next slide"
                aria-controls="swiper-wrapper-0e819c4ac8cb9f0a"
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 241 81"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  // xmlns:xlink="http://www.w3.org/1999/xlink"
                  // xml:space="preserve"
                  // xmlns:serif="http://www.serif.com/"
                  style={{fillRule:"evenodd", clipRule:"evenodd", strokeLinejoin:"round",strokeMiterlimit:1.5}}
                >
                  <g transform="matrix(1,0,0,1,-6,-4.90111)">
                    <g id="arrow" transform="matrix(1,0,0,1,-21.1686,10)">
                      <g id="arrow_root" transform="matrix(1,0,0,1,0,-16.644)">
                        <path
                          d="M31.169,51.74L261.664,51.74"
                          style={{fill: "none", stroke: "rgb(0, 132, 255)", strokeWidth: "8px", strokeDashoffset: 0, strokeDasharray: "none"}}
                        ></path>
                      </g>
                      <g
                        id="arrow_bottom"
                        transform="matrix(1,0,0,1,227.469,0)"
                      >
                        <path
                          d="M34.195,35.302L-0.549,69.634"
                          style={{fill: "none", stroke: "rgb(0, 132, 255)", strokeWidth: '8px', strokeLinecap: "square", strokeDashoffset: 0, strokeDasharray: "none"}}
                        ></path>
                      </g>
                      <g id="arrow_top" transform="matrix(1,0,0,1,227.469,0)">
                        <path
                          d="M-0.549,0.558L34.195,35.302"
                          style={{fill: "none", stroke: "rgb(0, 132, 255)", strokeWidth:"8px", strokeLinecap: "square", strokeDashoffset: 0, strokeDasharray: "none"}}
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </Swiper>
          </div>
        </div>
      </div>

      <section
        id="text_2126"
        className="mod-outside mod-page nooverflow mod-textpage fullpage"
        data-snap="1"
        data-textsection-index="0"
        data-cursor="yellow"
      >
        <div id="textbox1" className="mod-textbox" data-invert>
          <h2 className="h2">
            <div style={{position:"relative", display: "inline-block", left: '0px'}}>
              Listening
            </div>
            {/* <div style={{position:"relative", display: "inline-block", left: '10px'}}>
              
            </div> */}
            <div style={{position:"relative", display: "inline-block", left: '20px'}}>
              ears,
            </div>
            <br />
            <div style={{position:"relative", display: "inline-block", left: '0px'}}>
              observant
            </div>
            <div style={{position:"relative", display: "inline-block", left: '30px'}}>
              eyes,
            </div>
            <br />
            <div style={{position:"relative", display: "inline-block"}}>caring hearts</div>
            {/* <div style={{position:"relative", display: "inline-block", left:"20px"}}>caring</div> */}
            <br />
            <div style={{position:"relative", display: "inline-block", top: '0px'}}>
              and
            </div>
            <div style={{position:"relative", display: "inline-block", left: '20px'}}>
              hands.
            </div>
          </h2>
          <div className="spacer h2"></div>
          <div className="p">
            <div className="p-inner" >
            Tuloan Consult is a team of seasoned Special Education Needs (SEN) Practitioners. Firstly, we recognise and embrace every child as a unique individual. Secondly, we accept and understand neurodiversity in children and we support them to learn, grow and thrive in spite of their differences
            </div>
          </div>
        </div>
      </section>

      <section
        id="text_2127"
        className="mod-outside mod-page nooverflow mod-textpage fullpage"
        data-snap="1"
        data-textsection-index="1"
        data-cursor="yellow"
      >
        <div id="textbox2" className="mod-textbox" data-invert>
          <h2 className="h2">
            <div style={{position:"relative", display: "inline-block", top: '0px'}}>
              Space
            </div>
            <div style={{position:"relative", display: "inline-block", left: "20px"}}>to</div>
            <br />
            <div style={{position:"relative", display: "inline-block", left: '0px'}}>
              develop
            </div>
            <br />
            <div style={{position:"relative", display: "inline-block", top: '0px'}}>
              freely.
            </div>
          </h2>
          <div className="spacer h2"></div>
          <div className="p">
            <div className="p-inner" >
            With due consideration to neurodiversity, we provide a safe, calm and flexible friendly environment for children to learn in their own way and at their own pace while having fun.
            </div>
          </div>
        </div>
      </section>

      <section
        id="text_2128"
        className="mod-outside mod-page nooverflow mod-textpage fullpage"
        data-snap="1"
        data-textsection-index="2"
        data-cursor="yellow"
      >
        <div id="textbox3" className="mod-textbox" data-invert="">
          <h2 className="h2">
            <div
              style={{position:"relative", display: "inline-block", left: '0px'}}>
            
              An
            </div>
            <br />
            <div style={{position:"relative", display: "inline-block"}}>
              experienced
            </div>
            <br />
            <div style={{position:"relative", display: "inline-block", left: '0px'}}>
              team.
            </div>
          </h2>
          <div className="spacer h2"></div>
          <div className="p">
            <div className="p-inner" >
            Our consultants and aides are experienced, creative and committed. We engage in continuous learning through adequate exposure to and participation in workshops, seminars, and webinars. Our team includes an Autism Specialist, a Speech Pathologist, an Occupational Therapist and a Special Education Needs (SEN) Practitioner.
            </div>
          </div>
        </div>
      </section>

      <section
        id="text_2129"
        className="mod-outside mod-page nooverflow mod-textpage fullpage"
        data-snap="1"
        data-textsection-index="3"
        data-cursor="yellow"
      >
        <div id="textbox4" className="mod-textbox" data-invert="1">
          <h2 className="h2">
            <div style={{position:"relative", display: "inline-block", top: '0px'}}>
              Inspired
            </div>
            <div style={{position:"relative", display: "inline-block", left: '20px'}}>
              by
            </div>
            <br />
            <div style={{position:"relative", display: "inline-block", top: '0px'}}>
            EYFS.
            </div>
          </h2>
          <div className="spacer h2"></div>
          <div className="p">
            <div className="p-inner" >
            Our core focus is to work with children whose ages range from 2 - 5 years and are living with Autism and or speech delay. This was inspired by EYFS (EYFS, a British Curriculum for  ages 0 - 5 years)
            </div>
          </div>
        </div>
      </section>

      {/* <section
        id="text_2130"
        className="mod-outside mod-page nooverflow mod-textpage fullpage"
        data-snap="1"
        data-textsection-index="4"
        data-cursor="yellow"
      >
        <div id="textbox5" className="mod-textbox" data-invert="">
          <h2 className="h2">
            <div style={{position:"relative", display: "inline-block", left: '0px'}}>
              Good,
            </div>
            <br />
            <div style={{position:"relative", display: "inline-block", top: '0px'}}>
              healthy
            </div>
            <div style={{position:"relative", display: "inline-block", left: '20px'}}>
              food.
            </div>
          </h2>
          <div className="spacer h2"></div>
          <div className="p">
            <div className="p-inner" >
              Healthy, varied and tasty — that aptly sums up our organic menu.
              We use lots of seasonal produce from Brandenburg, preparing it
              with creativity and the utmost care. A good, healthy diet is one
              priority. The other is to set an example with responsible
              attitudes to food.
            </div>
          </div>
        </div>
      </section> */}

      <section className="mod-page z-top fullpage form-container" data-snap="1">
        <h2> Contact us </h2>
       <Contact />
       {/* <Cont /> */}
      </section>

      <footer className="footer fullpage" data-cursor="blue"> 
      <div id="footer-bg" className="footer-bg play_ bgcolor-rose"></div> 
      <div className="footer-centerbox"> <div className="footer-box">
         <Image className="footer-logo" src="/logo-b.svg" height="220px" width="220px" alt="Logo"/> 
         <h2 className="h1 footer-logo-name">TULOAN CONSULTS</h2> 
         <p className="h2 footer-logo-text">
         In a serene environment. <br /> Inspired by EYFS British Curriculum
                 </p> 
                 <p className="footer-text p"><span>Ikeja</span> · <span>Lagos</span> · <span>+234 (0) 80 660 604 40</span> · <a href="mailto:%70%6f%73%74@%65%6d%6d%61%61%70%66%65%6c.%64%65" rel="nofollow">tioluwanipatricia@gmail.com</a> · <a href="#" target="_blank" rel="noopener noreferrer nofollow">Instagram</a></p> </div> </div> <div className="footer-nav"> <nav className="hoverLine defaultCursor"> 
                 {/* <a href="/en/impressum" data-id="imprint">Imprint</a>  */}
                 <a href="#" data-id="privacy">Privacy</a> </nav> </div> </footer>
    </div>

    <a href="#" className="mod-logo">
      <Image
        src="/logo-b.svg"
        alt="logo"
        width="90px"
        height="90px"
        className="logo-icon"
      />
      <Image
        src="/Untitled-6.svg"
        alt="logo"
        width="90px"
        height="90px"
        className="logo-text"
      />
    </a>
    <div id="main-menu" className="menu p animation_">
      <div className="sidenav">
        <nav className="nav-highlight">
          <a href="#" className="active" data-id="contact">Tuloan</a>
          <a href="#" data-id="form">Consult</a>
        </nav>
      </div>
    </div>
    </body>
    </div>

  );
}
