// !function(){
// 创建游戏类
function game(){
	this.arr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    // this.imgs={"A":"<img src='image/A.png' style='width:40px;height:40px'>","B":"<img src='image/B.png' style='width:40px;height:40px'>","C":"<img src='image/C.png' style='width:40px;height:40px'>"};
	this.len=5;
	this.guanqia=1;
	this.cerrentLetter=[];
	this.cerrentSpan=[];
	this.clientW=document.documentElement.clientWidth;
	this.clientH=document.documentElement.clientHeight;
	this.t;
	this.speed=3;
    this.life=5;
    this.score=0;
    this.zscore=0;
    this.guanka=$(".guanka")[0];
    this.lifea=$(".life")[0];
    this.scorea=$(".score")[0];
    this.boner=$(".bonerltr")[0];
}
game.prototype={
	play:function(){
		// 创建随机的字母
       
       // 创建随机的span
       this._createSpan(this._getRand(this.len));
       this._move();
       this._key();
	},
	_move:function(){
		var that=this;
		this.t=setInterval(function(){
          for(var i=0;i<that.cerrentSpan.length;i++){
          	var tops=that.cerrentSpan[i].offsetTop+that.speed;
          	that.cerrentSpan[i].style.top=tops+"px";
          	if (tops>that.clientH) {
          		document.body.removeChild(that.cerrentSpan[i]);
          		that.cerrentLetter.splice(i,1);
          		that.cerrentSpan.splice(i,1);
          		that._createSpan(that._getRand(1));
              that.life--;
              that.lifea.innerHTML=that.life;
              if (that.life<=0) {
                alert("game over!")
                location.reload();
              };
          	};
          }
		},60)
	},
	_key:function(){
		  var that=this;
          document.onkeydown=function(e){
          	var e=e||window.event;
          	for(var i=0;i<that.cerrentSpan.length;i++){
          		var key=String.fromCharCode(e.keyCode);
              //that.boner.innerHTML=key;
          		if(key==that.cerrentSpan[i].innerHTML){
                document.body.removeChild(that.cerrentSpan[i]);
          		that.cerrentLetter.splice(i,1);
          		that.cerrentSpan.splice(i,1);
          		that._createSpan(that._getRand(1));
              that.score++;
              that.zscore++;
              that.scorea.innerHTML=that.score;
              that.boner.innerHTML=that.zscore;
              if (that.score>=that.guanqia*10) {
                alert("恭喜你进入下一关！")
                that._next(that.lifea,that.scorea);
                  that.score=0;
                  that.scorea.innerHTML=that.score;

              };
          		}
          	}
          }
	},
  _next:function(lifea,scorea){
    var that=this;
    clearInterval(that.t);
    that.guanqia++;
    that.guanka.innerHTML=that.guanqia;
    for(var i=0;i<that.cerrentSpan.length;i++){
      document.body.removeChild(that.cerrentSpan[i]);
    }
    that.speed++;
    if (that.speed>20) {
      that.speed=20;
    }
    that.len++;
    if (that.len>10) {
      that.len=10;
    }
       this.cerrentLetter=[];
       this.cerrentSpan=[];
       that._createSpan(that._getRand(that.len));
       that._move();
       that._key();
  },
	_getRand:function(num){
	   var newarr=[];
	   for(var i=0;i<num;i++){
           var letter=this.arr[Math.floor(Math.random()*this.arr.length)];
           while(this._checkLetter(letter,this.cerrentLetter)){
               letter=this.arr[Math.floor(Math.random()*this.arr.length)];
       }
       this.cerrentLetter.push(letter);
       newarr.push(letter);
       }
       return newarr;
	},
	_checkLetter:function(val,arr){
       for(var i=0;i<arr.length;i++){
       	if (arr[i]==val) {
       		return true;
       	};
       }
       return false;
	},
	
    _createSpan:function(arr){
       var newarr=[];
          for(var i=0;i<arr.length;i++){
          	var span=document.createElement('span');
          	span.innerHTML=arr[i];
          	var lefts=(200+Math.random()*(this.clientW-400));
          	tops=(Math.random()*10);
          	span.lefts=lefts;
          	span.tops=tops;
          
          while(this._checkPos(span,this.cerrentSpan)){
          lefts=(200+Math.random()*(this.clientW-400));
         	tops=(Math.random()*10);
         	span.lefts=lefts;
         	span.tops=tops;
          }
          newarr.push(span);
          this.cerrentSpan.push(span);
          span.className="zimu";
          span.style.cssText="position:absolute;left:"+lefts+"px;top:"+tops+"px;width:80px;height:80px;font-size:24px;color:#green;"
          document.body.appendChild(span);
    }
    return newarr;
   },
   _checkPos:function(ele,eleArr){
   	for (var i=0;i<eleArr.length;i++){
          if(ele.lefts>eleArr[i].lefts-85&&ele.lefts<eleArr[i].lefts+85&&ele.tops>eleArr[i].tops-85&&ele.tops<eleArr[i].tops+85){
          	return true;
          }
        }
        return false;
   }
   
      
}
// }()