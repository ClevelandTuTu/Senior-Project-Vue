<template>
    <div class="container">
    <div id="mainbox" class="mainbox" ref="mainbox">
		<div id="box" class="box" ref="box">
			<div class="box1">
				<span class="span1"><b>Compliment</b></span>
				<span class="span2"><b>Compliment 2</b></span>
				<span class="span3"><b>Compliment 3</b></span>
				<span class="span4"><b>Compliment 4</b></span>
			</div>
			<div class="box2">
				<span class="span1"><b>Compliment 5</b></span>
				<span class="span2"><b>Compliment 6</b></span>
				<span class="span3"><b>Compliment 7</b></span>
				<span class="span4"><b>Compliment 8</b></span>
			</div>
		</div>

		<button class="spin" @click="myfunction()">SPIN</button>
	</div>
</div>
</template>

<script>
export default {
    methods: {
        myfunction() {

            var x = 1024; //min value
            var y = 9999; // max value

            var deg = Math.floor(Math.random() * (x - y)) + y;

            this.$refs.box.style.transform = "rotate("+deg+"deg)";

            var element = this.$refs.mainbox;
            element.classList.remove('animate');
            setTimeout(function(){
                element.classList.add('animate');
            }, 5000); //5000 = 5 second
        }
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: none;
  }
  
  .container {
    font-family: 'Open Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    overflow: hidden;
    background: linear-gradient(135deg, #89b8ff, #ffb5d8);
  }
  
  .mainbox {
    position: relative;
    width: 500px;
    height: 500px;
  }
  
  .mainbox:after {
    position: absolute;
    content: '';
    width: 32px;
    height: 32px;
    background: url('../assets/wheel-arrow.png') no-repeat;
    background-size: 32px;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .box {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 50%;
    border: 10px solid #fff;
    overflow: hidden;
    transition: all ease 0.5s;
  }
  
  span {
    width: 50%;
    height: 50%;
    display: inline-block;
    position: absolute;
  }
  
  .span1 {
    clip-path: polygon(0 92%, 100% 50%, 0 8%);
    background-color: #ff7ac1; /* Cute pink color */
    top: 120px;
    left: 0;
  }
  
  .span2 {
    clip-path: polygon(100% 92%, 0 50%, 100% 8%);
    background-color: #72d8ff; /* Cool cyan color */
    top: 120px;
    right: 0;
  }
  
  .span3 {
    clip-path: polygon(50% 0%, 8% 100%, 92% 100%);
    background-color: #ffae7a; /* Cute orange color */
    bottom: 0;
    left: 120px;
  }
  
  .span4 {
    clip-path: polygon(50% 100%, 92% 0, 8% 0);
    background-color: #a9ff7a; /* Cute green color */
    top: 0;
    left: 120px;
  }
  
  .box1 .span3 b {
    transform: translate(-50%, -50%) rotate(-270deg);
  }
  
  .box1 .span1 b,
  .box2 .span1 b {
    transform: translate(-50%, -50%) rotate(185deg);
  }
  
  .box2 .span3 b {
    transform: translate(-50%, -50%) rotate(90deg);
  }
  
  .box1 .span4 b,
  .box2 .span4 b {
    transform: translate(-50%, -50%) rotate(-85deg);
  }
  
  .box2 {
    width: 100%;
    height: 100%;
    transform: rotate(-135deg);
  }
  
  span b {
    font-size: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 50px;
    border-radius: 50%;
    border: 4px solid #fff;
    background-color: #ff5c5c;
    color: #fff;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    font-weight: bold;
    font-size: 22px;
    cursor: pointer;
  }
  
  .spin:hover {
      background-color: #27ae60; /* Hover background color */
  }
  
  .spin:active {
      background-color: #219653; /* Click background color */
  }
  
  .spin:active {
    width: 70px;
    height: 70px;
    font-size: 20px;
  }
  
  .mainbox.animate:after {
    animation: animateArrow 0.7s ease infinite;
  }
  
  @keyframes animateArrow {
    50% {
      right: -40px;
    }
  }
  
</style>