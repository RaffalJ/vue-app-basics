let activeEffect = null;
const targetMap = new WeakMap();
function track(target, key) {
    if (activeEffect) {
        let depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()));
        }
        let dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, (dep = new Set()));
        }
        dep.add(activeEffect);
    }
}
function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
        return;
    }
    let dep = depsMap.get(key);
    if (dep) {
        dep.forEach(effect => { effect(); });
    }
}
function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            let result = Reflect.get(target, key, receiver);
            track(target, key);
            return result;
        },
        set(target, key, value, receiver) {
            let oldValue = target[key];
            let result = Reflect.set(target, key, value, receiver);
            if (!oldValue !== result) {
                trigger(target, key);
            }
            return result;
        },
    };
    return new Proxy(target, handler);
}
function ref(raw) {
    const r = {
        get value() {
            track(r, 'value');
            return raw;
        },
        set value(newVal) {
            raw = newVal;
            trigger(r, 'value');
        },
    };
    return r;
}
function effect(eff) {
    activeEffect = eff;
    activeEffect();
    activeEffect = null;
}
function computed(getter) {
    let result = ref({});
    effect(() => { result.value = getter(); });
    return result;
}
let product = reactive({ price: 5, quantity: 2 });
let salePrice = computed(() => { return product.price * 0.9; });
let total = computed(() => { return salePrice.value * product.quantity; });
const printTotal = () => { console.log('total:', total.value); };
const printSalePrice = () => { console.log('sale price:', salePrice.value); };
// TESTING
printTotal();
printSalePrice();
product.price = 10;
printTotal();
printSalePrice();
