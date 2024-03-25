var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(name, dept) {
        this.name = name;
        this.dept = dept;
    }
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(empcode, name, dept) {
        var _this = _super.call(this, name, dept) || this;
        _this.empCode = empcode;
        return _this;
    }
    Employee.prototype.displayName = function () {
        console.log("Name = " + this.name + ", Department = " + this.dept + ", Employee Code = " + this.empCode);
    };
    return Employee;
}(Person));
var emp = new Employee(178, "Aditya", "CSE");
emp.displayName();
