
// (function(){
// 
// })()
//★★★★通过自调用函数，开启一个新的作用域，避免命名冲突★★★

//所有的js文件中直接写的代码都是全局作用域 
(function () {
    //局部定义域
    var position = 'absolute';
    //记录上一次创建的食物，为删除做准备
    var elements = [];

    function Food(options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.height = options.height || 20;
        this.width = options.width || 20;
        this.color = options.color || 'green';
    }

    //渲染界面
    Food.prototype.render = function (map) {
        //删除食物
        remove();

        //随机设置xy值
        this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
        this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;

        //动态创建div 显示页面上的食物
        var div = document.createElement('div');
        map.appendChild(div);
        elements.push(div);

        div.style.position = position;
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;
    }

    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            //删除div
            elements[i].parentNode.removeChild(elements[i]);
            //删除数组中的元素
            //删除数组元素
            //第一个参数，从那个元素开始删
            //第二个元素，删除几个
            elements.splice(i, 1);
        }
    }
    //暴露构造函数给外部
    window.Food=Food; 
})();

//这样处理后，别人就不能访问我们我们的remouve等方法，因为我们自己都访问不了

// var map = document.getElementById('map');
// var food = new Food();
// food.render(map);
// console.log(food.x);