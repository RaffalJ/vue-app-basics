// let product = { price: 5, quantity: 2 };
// let total = 0;
//
// let effect = () => {
//   total = product.price * product.quantity;
// };
//
// 
// // reactivity engine
// const depsMap: Map<string, Set<() => void>> = new Map();
//
// function track(key: string) {
//   let dep = depsMap.get(key);
//   if (!dep) {
//     depsMap.set(key, dep = new Set());
//   }
//
//   dep.add(effect);
// }
//
// function trigger(key: string) {
//   let dep = depsMap.get(key);
//   if (dep) {
//     dep.forEach(effect => {
//       effect();
//     })
//   }
// }
//
// // testing
// const printTotal = () => { console.log('total: ', total) };
//
// track('quantity');
// effect();
// printTotal();
//
// product.quantity = 12;
// trigger('quantity');
// printTotal();
