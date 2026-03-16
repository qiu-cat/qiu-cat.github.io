const radio = document.getElementById("ado");
const radioPlay = document.querySelectorAll(".radioOption");
const nowRadioName = document.getElementById("nowRadioName");
const errorinfo = document.getElementById("error");

let radioSrc = "56";//第一财经广播（默认当前播放）
let isPlaying = false;//开始播放中状态锁

function playRadio(){
if(radio.paused==true){
	cont();
	radio.play().catch(err=>{
	error();
	isPlaying = false;
	});
	}else{
	radioPlay.forEach(b => b.classList.remove("playing"));
	radio.pause();
	isPlaying = false;
}
}
function cont(){
        let nowRadio = document.querySelector(`[data-src="${radioSrc}"]`);
        radioPlay.forEach(b => b.classList.remove("playing"));
        nowRadio?.classList.add("playing");
}
const playsvg = document.getElementById("playsvg");
const pausesvg = document.getElementById("pausesvg");
radio.addEventListener("play",()=>{
	playsvg.classList.remove("hidden");
	pausesvg.classList.add("hidden");
	cont();
	isPlaying = false;
});

radio.addEventListener("pause",()=>{
	pausesvg.classList.remove("hidden");
	playsvg.classList.add("hidden");
	radioPlay.forEach(b => b.classList.remove("playing"));
	isPlaying = false;
});

radioPlay.forEach(btn => {
	btn.addEventListener("click",() =>{
		if(isPlaying) return;
		if(radioSrc == btn.dataset.src){
			if(radio.paused==true){
				radio.play().then(()=>{
				//isPlaying = true;
				}).catch(err=>{
				isPlaying = false;
					error();
				});
				btn.classList.add("playing");
			}else{
				radio.pause();
				btn.classList.remove("playing");
			}//点的是同一个键
		}else{
			isPlaying = true;
			radioSrc = btn.dataset.src;
			radioPlay.forEach(b => b.classList.remove("playing"));
			btn.classList.add("playing");
			nowRadioName.textContent = btn.textContent.trim();

			radio.src = "https:\/\/live.ximalaya.com\/radio-first-page-app\/live\/" + radioSrc + "\/64.m3u8?transcode=ts";
			radio.load();
			radio.play().catch(err=>{
				error();
			isPlaying = false;
			});
		}

	});
});

function error(){
	//alert("播放时发生错误");
	errorinfo.textContent = "播放时发生错误";
	setTimeout(()=>{
		errorinfo.textContent = "";
	},3000);
}
