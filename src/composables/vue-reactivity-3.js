var product = { price: 5, quantity: 2 };
var total = 0;
var effect = function () {
    total = product.price * product.quantity;
};
// reactivity engine
var depsMap = new Map();
function track(key) {
    var dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, dep = new Set());
    }
    dep.add(effect);
}
function trigger(key) {
    var dep = depsMap.get(key);
    if (dep) {
        dep.forEach(function (effect) {
            effect();
        });
    }
}
// testing
var printTotal = function () { console.log('total: ', total); };
track('quantity');
effect();
printTotal();
product.quantity = 12;
trigger('quantity');
printTotal();
