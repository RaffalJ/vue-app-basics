var price = 5;
var quantity = 2;
var total = 0;
var dep = new Set();
var effect = function () { total = price * quantity; };
function track() {
    dep.add(effect);
}
function trigger() {
    dep.forEach(function (e) {
        e();
    });
}
track();
console.log('total: ', total);
price = 10;
trigger();
console.log('total: ', total);
// effect();
// console.log('total: ', total);
//
// price = 10;
// console.log('price changed from 2 to', price);
//
// effect();
// console.log('total:', total);
