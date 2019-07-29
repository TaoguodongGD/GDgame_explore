//通过自调用函数，构造一个新的局部作用域，防止命名冲突
(function () {
    var map = document.getElementById('map');
    var game = new Game(map);
    game.start();
})()