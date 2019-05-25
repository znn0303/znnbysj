 //伪常量
 var BLOCK_SIZE = 20;        //格子大小
 var COLS = 40;                        //列数
 var ROWS = 30;                        //行数
 //变量
 var snakes = [];                //保存蛇坐标
 var c = null;                        //绘图对象
 var toGo = 3;                        //行进方向
 var snakecount =3;                //蛇身数量
 var interval = null;        //计时器
 var foodX = 0;                        //食物X轴坐标
 var foodY = 0;                        //食物Y轴坐标
 var oMark = null;                //分数显示框
 var isPause = false;        //是否暂停
 var myVid = document.getElementById("myAudio"); 


 
 // 绘图函数
 function draw(){
     c.clearRect(0,0,BLOCK_SIZE * COLS, BLOCK_SIZE * ROWS);
     //画出横线
     for( var i = 1; i <= ROWS; i++ ) {
         c.beginPath();
         c.moveTo(0, i * BLOCK_SIZE);
         c.lineTo(BLOCK_SIZE * COLS, i * BLOCK_SIZE);
         c.strokeStyle = "cyan";
         c.stroke();
     }
     //画出竖线
     for(var i = 1; i <= COLS; i++){
         c.beginPath();
         c.moveTo(i * BLOCK_SIZE, 0);
         c.lineTo(i * BLOCK_SIZE, BLOCK_SIZE * ROWS);
         c.stroke();
     }
     //画出蛇
     for (var i = 0; i < snakes.length; i++){
         c.beginPath();
         c.fillStyle = "red";
         c.fillRect(snakes[i].x, snakes[i].y, BLOCK_SIZE, BLOCK_SIZE);
         c.moveTo(snakes[i].x, snakes[i].y);
         c.lineTo(snakes[i].x + BLOCK_SIZE, snakes[i].y);
         c.lineTo(snakes[i].x + BLOCK_SIZE, snakes[i].y + BLOCK_SIZE);
         c.lineTo(snakes[i].x, snakes[i].y + BLOCK_SIZE);
         c.closePath();
         c.strokeStyle = "white";
         c.stroke();
     }
     //画出食物
     c.beginPath();
     c.fillStyle = "yellow";
     c.fillRect(foodX, foodY, BLOCK_SIZE, BLOCK_SIZE);
     c.moveTo(foodX, foodY);
     c.lineTo(foodX + BLOCK_SIZE, foodY);
     c.lineTo(foodX + BLOCK_SIZE, foodY + BLOCK_SIZE);
     c.lineTo(foodX, foodY + BLOCK_SIZE);
     c.closePath();
     c.strokeStyle = "red";
     c.stroke();
 }
 //游戏初始化
 function start(){
     for( var i = 0; i < snakecount; i++){
         snakes[i] = {x: i * BLOCK_SIZE, y: 0};
     }
     addFood();
     draw();
     oMark.innerHTML = 0;
 }
 //控制蛇的移动
 //移动函数
 function move(){
     switch(toGo){
         case 1: //左边
             snakes.push({x: snakes[snakecount - 1].x - BLOCK_SIZE, y: snakes[snakecount - 1].y});
         break;
         case 2: //上边
             snakes.push({x: snakes[snakecount - 1].x, y: snakes[snakecount - 1].y - BLOCK_SIZE});
         break;
         case 3: //右边
             snakes.push({x: snakes[snakecount - 1].x + BLOCK_SIZE, y: snakes[snakecount - 1].y});
         break;
         case 4: //下边
             snakes.push({x: snakes[snakecount - 1].x, y: snakes[snakecount - 1].y + BLOCK_SIZE});
         break;
         default:;
     }
     snakes.shift();
     isEat();
     isDie();
     draw();
 }
 //吃到食物判断
 function isEat(){
     if (snakes[snakecount - 1].x == foodX && snakes[snakecount - 1].y == foodY) {
         oMark.innerHTML = (parseInt(oMark.innerHTML) + 1).toString();
         addFood();
         addSnake();
     }
 }
 //添加蛇身
 function addSnake(){
     snakecount++;
     snakes.unshift({x:BLOCK_SIZE * COLS, y:BLOCK_SIZE * ROWS});
 }
 //交互响应函数
 function keydown(keyCode){
         switch(keyCode){
                 case 37: //左边
                         if(toGo != 1 && toGo != 3)       toGo = 1;break;
                 case 38: //上边
                         if(toGo != 2 && toGo != 4)        toGo = 2;break;
                 case 39: //右边
                         if(toGo != 3 && toGo != 1)         toGo = 3;break;
                 case 40: //下的
                         if(toGo != 4 && toGo != 2)        toGo = 4;break;
                 case 80: //开始/暂停   
                         if(isPause){
                                 interval = setInterval(move,300);
                                 isPause = false;
                                 myVid.play();
                                 document.getElementById('pause').innerHTML = "Pause";

                         }else{
                                 clearInterval(interval);
                                 myVid.pause()
                                 isPause = true;
                                 document.getElementById('pause').innerHTML = "Start";

                         }
                         break;
         }
 }
 //制造食物
 function addFood(){
         foodX = Math.floor(Math.random() * (COLS - 1)) * BLOCK_SIZE;
         foodY = Math.floor(Math.random() * (ROWS - 1)) * BLOCK_SIZE;
         // console.log(foodX + " -- " + foodY);
 }
 //死亡判断
 function isDie(){
         if(snakes[snakecount - 1].x == -20 || snakes[snakecount - 1].x == BLOCK_SIZE * COLS 
                 || snakes[snakecount - 1].y == -20 || snakes[snakecount - 1].y == BLOCK_SIZE * ROWS){
                    myVid.pause();
                    
                    alert("Game Over!");
                 
                 clearInterval(interval);
                 if((document.getElementById("score").innerHTML)*1 < snakecount) 
            {document.getElementById("score").innerHTML=snakecount-3;}//最高分信息
               
         }
         for(var i = 0; i < snakecount - 1; i++){
                 if(snakes[snakecount - 1].x == snakes[i].x && snakes[snakecount - 1].y == snakes[i].y){
                         clearInterval(interval);
                    myVid.pause();
                         
                         alert("Game Over!");
                         
                 }
         }
 }
 // 启动函数
 window.onload = function(){
     c = document.getElementById('canvas').getContext('2d');
     oMark = document.getElementById('mark_con');
     start();
     interval = setInterval(move,300);
     document.onkeydown = function(event){
         var event = event || window.event;
         keydown(event.keyCode);
     }
 }