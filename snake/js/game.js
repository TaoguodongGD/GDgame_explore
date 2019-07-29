//使用自调用函数，创建一个新的局部作用域，防止命名冲突
(function () {
    var that; //记录游戏对象
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    Game.prototype.start = function () {
        //1.把蛇和食物对象，渲染到地图上 
        this.food.render(this.map);
        this.snake.render(this.map);

        // 以下为测试remove方法
        // this.snake.move();
        // this.snake.render(this.map);
        // this.snake.move();
        // this.snake.render(this.map);
        // this.snake.move();

        //2.开始游戏的逻辑
        //2.1 让蛇移动起来
        //2.2 当蛇遇到边界 游戏结束
        runSnake();
        //2.3 通过键盘控制蛇移动的方向
        bindKey();

        //2.4 当蛇遇到食物 做相应的处理 
        //    判断蛇头是否和食物的坐标重合



    }

    //通过键盘控制蛇移动的方向
    function bindKey() {
        // document.onkeydown=function(){}
        document.addEventListener('keydown', function (e) {
            console.log(e.keyCode);//获取键盘ascii码
            //37左 38上 39右 40下
            switch (e.keyCode) {
                case 37:
                    that.snake.direction = 'left';
                    break;
                case 38:
                    that.snake.direction = 'top';
                    break;
                case 39:
                    that.snake.direction = 'right';
                    break;
                case 40:
                    that.snake.direction = 'bottom';
                    break;
                case 65:
                    that.snake.direction = 'left';
                    break;
                case 87:
                    that.snake.direction = 'top';
                    break;
                case 68:
                    that.snake.direction = 'right';
                    break;
                case 83:
                    that.snake.direction = 'bottom';
                    break;
            }
        }, false);

    }

    //私有函数 让外部不能访问 只给外部一个start方法
    function runSnake() {
        var timerId = setInterval(function () {
            //让蛇走一格   
            //在定时器的function中this是指向window对象的
            //this.snake用不了
            //所以我们要获取游戏对象中的蛇属性
            that.snake.move(that.food,that.map);
            that.snake.render(that.map);

            //2.2 当蛇遇到边界 游戏结束
            //获取蛇头的坐标
            var maxX = that.map.offsetWidth / that.snake.width;
            var maxY = that.map.offsetHeight / that.snake.height;

            var headX = that.snake.body[0].x;
            var headY = that.snake.body[0].y;
            if (headX < 0 || headX >= maxX) {
                alert('GAME OVER');
                clearInterval(timerId);
            }
            if (headY < 0 || headY >= maxY) {
                alert('GAME OVER');
                clearInterval(timerId);
            }
        }, 100);
    }

    //暴露构造函数给外部
    window.Game = Game;
})();

// var map = document.getElementById('map');
// var game = new Game(map);
// game.start();