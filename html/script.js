
//轮播图摘抄自https://cloud.tencent.com/developer/article/1861965//
window.addEventListener('load',function(){
    //获取元素
    var leftb = document.querySelector('.left');
    var rightb = document.querySelector('.right');
    var box = document.querySelector('.box');
    var imgs = box.querySelector('.imgs');   
    var imgt = imgs.querySelectorAll('li');
    //自动翻页函数
    var timeone = setInterval(function(){
        rightf();
    },1000);
    //左右按钮的出现
    box.addEventListener('mouseover',function(){
        leftb.style.display = 'block';
        rightb.style.display = 'block';
        //移入时清除定时器
        clearInterval(timeone);
        timeone = null;       
    })
    
    //左右按钮的消失
    box.addEventListener('mouseout',function(){
            leftb.style.display = 'none';
            rightb.style.display = 'none';
            //恢复定时器
            clearInterval(timeone);
            timeone = setInterval(function(){
            rightf();
        },1000)
        })
    //动态生成小圆圈，小圈圈模块
    var list = box.querySelector('.list');
    for(var i = 0;i < imgs.children.length;i++){
        //创建li，加入ul中
        var li =document.createElement('li');
        list.appendChild(li);
        //给小圈圈添加类名
        li.setAttribute('index',i);
        //排他思想，实现点击小圆圈，变色
        li.addEventListener('click',colors);
        //经过小圆圈，切换图片
        li.addEventListener('mouseenter',jump);
    }
    //一开始第二个亮
    list.children[1].className = 'change';
    //变色函数 
    function colors(){
        //把所有的小圆圈变白
        for(var i = 0 ; i < list.children.length ; i++){
            list.children[i].className = '';
        }
        //给图片对应的小圆圈上色
        var index = this.getAttribute('index');
        list.children[index].className = 'change';
    } 
    //跳转函数
    function jump(){
        var index = this.getAttribute('index');
        var now = num.indexOf('two');
        //计算经过点与当前点的距离
        var dif = Math.max(index,now) - Math.min(index,now);
        // console.log(dis);
        if(index > now){
            while(dif--){
                rightf();
            }
        }else {
            while(dif--){
                leftf();
            }
        }
    }
     //小圆圈跟随着图片移动
    var j = 1;
    function colort (){
        for(var i = 0 ; i < list.children.length ; i++){
            list.children[i].className = '';
        }
        if(j >= 6){
            j = 0;
        }else if (j < 0 ){
            j = 5;
        }
        list.children[j].className = 'change';
    }
     //翻页模块
     var num = ['one','two','three','four','five','six'];
     //右翻页
        rightb.addEventListener('click',rightf);
        function rightf(){
            //把数组的最后一个添加到第一个
            num.unshift(num[5]);
            //删除最后一个
            num.pop();
            //重新给li添加类名
            for(var i = 0;i < num.length;i++){
                imgt[i].setAttribute('class',num[i]);
            }
            //通过这个全局变量来让小圆圈的颜色一起变化
            j++;
            colort();
        }
    //左翻页
        leftb.addEventListener('click',leftf)
        function leftf(){
            num.push(num[0]);
            num.shift();
            for(var i = 0;i < num.length;i++){
                imgt[i].setAttribute('class',num[i]);
            }
            j--;
            colort();
        }
    //点击图片实现翻页,这里我是通过在左右两边添加一个盒子来实现的
        var rights = document.querySelector('.rights');
        rights.addEventListener('click',function(){
            rightf();
        })
        var lefts = document.querySelector('.lefts');
        lefts.addEventListener('click',function(){
            leftf();
        })
})
const playlist = [
    { title: "歌曲 1", src: "song1.mp3" },
    { title: "歌曲 2", src: "song2.mp3" },
    { title: "歌曲 3", src: "song3.mp3" },
  ];
  
  const audio = new Audio();
  let currentSongIndex = 0;
  
  const playlistElement = document.getElementById("playlist");
  const currentSongElement = document.getElementById("currentSong");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressBar = document.getElementById("progress");
  const volumeControl = document.getElementById("volume");
  
  // 初始化播放列表
  function initPlaylist() {
    playlist.forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = song.title;
      li.addEventListener("click", () => playSong(index));
      playlistElement.appendChild(li);
    });
  }
  
  // 播放歌曲
  function playSong(index) {
    if (index >= 0 && index < playlist.length) {
      currentSongIndex = index;
      audio.src = playlist[currentSongIndex].src;
      audio.play();
      currentSongElement.textContent = playlist[currentSongIndex].title;
      playPauseBtn.textContent = "暂停";
    }
  }
  
  // 播放/暂停
  playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = "暂停";
    } else {
      audio.pause();
      playPauseBtn.textContent = "播放";
    }
  });
  
  // 上一首
  prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSong(currentSongIndex);
  });
  
  // 下一首
  nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    playSong(currentSongIndex);
  });
  
  // 更新进度条
  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
  });
  
  // 拖动进度条
  progressBar.addEventListener("input", () => {
    const time = (progressBar.value / 100) * audio.duration;
    audio.currentTime = time;
  });
  
  // 音量控制
  volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value / 100;
  });
  
  // 初始化
  initPlaylist();
  playSong(0); // 默认播放第一首
