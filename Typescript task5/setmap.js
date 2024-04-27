var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a;
//creating a Set
var set = new Set();
set.add(10);
set.add(20);
set.add("Developer");
set.add("Tester");
set.add(7.85);
console.log("Elements in the Set:");
try {
    for (var set_1 = __values(set), set_1_1 = set_1.next(); !set_1_1.done; set_1_1 = set_1.next()) {
        var item = set_1_1.value;
        console.log(item);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (set_1_1 && !set_1_1.done && (_a = set_1.return)) _a.call(set_1);
    }
    finally { if (e_1) throw e_1.error; }
}
// Creating a Map
var map = new Map();
map.set(1, "India");
map.set(2, "US");
map.set(3, "Finland");
console.log("\nEntries in the Map:");
map.forEach(function (value, key) {
    console.log("Key: ".concat(key, ", Value: ").concat(value));
});
