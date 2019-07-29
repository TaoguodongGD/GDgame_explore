//通过自调用函数，创建一个新的局部作用域，防止命名冲突
(function () {
    var positon = 'absolute';
    //记录之前创建的蛇
    var elements = [];
    function Snake(options) {
        options = options || {};
        //蛇节的大小
        this.width = options.width || 20;
        this.height = options.height || 20;
        //蛇移动的方向
        this.direction = options.direction || 'right';
        //蛇的身体 第一个元素是蛇头
        this.body = [
            { x: 3, y: 2, color: 'red' },
            { x: 2, y: 2, color: 'blue' },
            { x: 1, y: 2, color: 'blue' }
        ];
    }
    Snake.prototype.render = function (map) {
        //删除之前创建的蛇
        //render是创建蛇在地图上 和 food一样，在render之前要把之前的创建的蛇删除掉，否则会重叠
        remove();

        //把每个蛇节渲染到地图上
        for (var i = 0, len = this.body.length; i < len; i++) {
            //蛇节
            var object = this.body[i];
            //每个蛇节创建一个盒子
            var div = document.createElement('div');
            map.appendChild(div);
            //每在地图上添加一个蛇就记录下来
            elements.push(div);
            div.style.position = positon;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = object.x * this.width + 'px';
            div.style.top = object.y * this.height + 'px';
            div.style.backgroundColor = object.color;
        }
    }
    //删除蛇身的方法 设置为私有的成员
    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {//此时i要到0，因为要全删 并且，删的时候还要从后往前删
            //删除div
            elements[i].parentNode.removeChild(elements[i]);
            //还要删除数组中的元素
            elements.splice(i, 1);
        }
    }

    //控制蛇移动的方法 
    Snake.prototype.move = function (food, map) {
        //控制蛇的 “身体” 的移动 （当前蛇节 移动到 上一个蛇节的位置）
        for (var i = this.body.length - 1; i > 0; i--) {//i不取到0，因为0是蛇头
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        //控制蛇头的移动 

        //判断蛇移动的方向 只是移动的方向 不要想太复杂，就只有上下左右，没有什么往左拐右拐什么的
        var head = this.body[0];
        switch (this.direction) {
            case 'right':
                head.x += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'top':
                head.y -= 1;
                break;
            case 'bottom':
                head.y += 1;
                break;
        }
        //2.4 当蛇遇到食物 做相应的处理 
        //    判断蛇头是否和食物的坐标重合
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        if (headX === food.x && headY === food.y) {
            console.log('咋回事');
            //让蛇增加一节
            //获取蛇的最后一节
            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            })
            //删除食物，并随机在地图上重新生成
            food.render(map);//本方法中没有map，Snake中也没有，那就再参数列表中再传一个进去
        }
    }

    //暴露构造函数给外部
    window.Snake = Snake;
})();

// var map = document.getElementById('map');
// var snake = new Snake();
// snake.render(map);