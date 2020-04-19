// let price = 5;
// let quantity = 2;
// let total = 0;
//
// let dep: Set<() => void> = new Set();
//
// let effect = () => { total = price * quantity };
//
// function track() {
//   dep.add(effect);
// }
//
// function trigger() {
//   dep.forEach(e => {
//     e();
//   })
// }
//
// track();
//
// console.log('total: ', total);
// price = 10;
// trigger();
// console.log('total: ', total);
