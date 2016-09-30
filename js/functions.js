//ie6-8不能识别getE                                                                                       lementByClassName 兼容的通过类名获取元素集合
function getClass (selector,obj) {
  obj=obj||document
	if (obj.getElementByClassName) {
       return obj.getElementByClassName(selector);
	}else{
		var arr=obj.getElementsByTagName("*")
		var objarr=[]
		for (var i = 0; i < arr.length; i++) {
			if (check(arr[i].className,selector)) {
				objarr.push(arr[i])
			};
		};
		return objarr;
	}	
}
function check(longstr,str){
  var arr=longstr.split(" ")
  for (var i = 0; i < arr.length; i++) {
  	if(arr[i]==str){
  		return true;
  	}
  }
  return false; 
}
//ie6-8 获取标签内的文字不能识别textContent，用innerText    兼容的获取或者设置文本信息
function getText(obj,value){
  if (arguments.length==1) {
         if (obj.textContent!=undefined) {
            return obj.textContent
         }else{
            return obj.innerText
         }
     }else if (arguments.length==2){
       if (obj.textContent!=undefined) {
             obj.textContent=value
         }else{
             obj.innerText=value
         }
     }    
}
//兼容的获取元素的样式
function getStyle(obj,value){
   if (obj.currentStyle) {
      return obj.currentStyle[value]
   }else{
      return getComputedStyle(obj,null)[value]
   }
}

//获取元素的函数   通过类名 id 标签 都能获取
function $(selector,obj){
if (typeof selector=="string") {
 obj=obj||document;
 if(selector.charAt(0)=="."){
  return getClass(selector.slice(1),obj)
 }else if(selector.charAt(0)=="#"){
  return obj.getElementById(selector.slice(1))
 }else{
  return obj.getElementsByTagName(selector)
 }
}else if(typeof selector=="function"){
  /* window.onload=function(){
    addEvent(window,"load",selector)
   }*/
   addEvent(window,"load",selector)
}
}

//获取一个元素的所有的元素子节点
function getChildren(obj){
  var arr=obj.childNodes
  var newarr=[];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].nodeType==1) {
      newarr.push(arr[i])
    };
  };
  return newarr;
}


//获取一个元素的第一个元素子节点
function getFirst(obj){
 return getChildren(obj)[0]
}

//获取一个元素的最后一个元素子节点
function getLast(obj){
  var arr=getChildren(obj)
  return arr[arr.length-1]
}

//获取一个元素的下一个元素节点
function getNext(obj){
  if (obj.getElementsByClassName) {
    return obj.nextElementSibling
  }else{
    var next=obj.nextSibling
    if (next==null) {
      return null;
    };
    while(next.nodeType!=1){
      next=next.nextSibling
      if (next==null) {
      return null;
      };
    }
    return next;
  }
}

//获取一个元素的上一个元素节点
function getPrevious(obj){
  if (obj.getElementsByClassName) {
    return obj.previousElementSibling
  }else{
    var previous=obj.previousSibling
    if (previous==null) {
      return null;
    };
    while(previous.nodeType!=1){
      previous=previous.previousSibling
      if (previous==null) {
      return null;
      };
    }
    return previous;
  }
}

//将一个元素插入到另一个元素之后
function after(newobj,obj){
  /*var bf=bfobj;
  var fu=bfobj.parentNode
  fu.replaceChild(obj,bfobj)
  fu.insertBefore(bf,obj)*/
  var parent=obj.parentNode
  var next=getNext(obj)
  if (next==null) {
    partent.appendChild(newobj)
  }else{
    parent.insertBefore(newobj,next)
  }
}


//获取浏览器窗口的宽高
function offsetWindow(){
       var w=document.documentElement.clientWidth;
       var h=document.documentElement.clientHeight;
       return {width:w,height:h}
}


function getPosition(obj){
 var parent=obj.parentNode
 var left=obj.offsetLeft
 var top=obj.offsetTop; 
 while(parent.nodeName!="BODY"){
  if (getStyle(parent,"position")=="absolute"||getStyle(parent,"position")=="relative") {
  left=left+parent.offsetLeft+parseInt(getStyle(parent,"borderLeftWidth"))
  top=top+parent.offsetTop+parseInt(getStyle(parent,"borderTopWidth"))
}
  parent=parent.parentNode
 } 
 return {x:left,y:top}
}
//兼容的绑定事件
 function addEvent(obj,event,callback){
   if(obj.addEventListener){
    obj.addEventListener(event,callback,false)
   }else{
    obj.attachEvent("on"+event,callback)
   }
 }

//兼容的移除事件
  function removeEvent(obj,event,callback){
   if(obj.removeEventListener){
    obj.removeEventListener(event,callback,false)
   }else{
    obj.detachEvent("on"+event,callback)
   }
 }
//滚轮滑动事件
function mouseWheel(obj,unfun,downfun){
   if(obj.addEventListener){
     obj.addEventListener("mousewheel",fun,false)
     obj.addEventListener("DOMMouseScroll",fun,false)
   }else{
    obj.attachEvent("onmousewheel",fun)
   }
   function fun(e){
    var ev=e||window.event;
    if(ev.detail==-3||ev.wheelDelta==120){
      if(unfun){
        unfun.call(obj,e)
        //call函数调用的时候快递一个参数这个参数将作为函数中的this使用并且只在当前这次调用有效果
        //e传递参数
      }
    }else if(ev.detail==3||ev.wheelDelta==-120){
      if(downfun){
        downfun.call(obj,e)
      }
    }
   }
}
//阻止事件流用hover
 //判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

 //判断鼠标是否真正的从外部移入，或者是真正的移出到外部；

  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }


//鼠标移入移除事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 
  function getEvent(e){
    return e||window.event;
  }