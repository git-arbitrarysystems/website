var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Module["export"](function () {
    var Person = /** @class */ (function () {
        function Person(firstname, lastname) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.cheers();
        }
        Object.defineProperty(Person.prototype, "name", {
            get: function () {
                return this.firstname + ' ' + this.lastname;
            },
            enumerable: true,
            configurable: true
        });
        Person.prototype.hello = function () {
            console.log("I am " + this.name + ", chin chin!");
        };
        Person.prototype.cheers = function () {
            this.hello();
        };
        return Person;
    }());
    var Jasper = /** @class */ (function (_super) {
        __extends(Jasper, _super);
        function Jasper() {
            return _super.call(this, 'Jasper', 'Funk-Smit') || this;
        }
        return Jasper;
    }(Person));
    function TypeScripted() {
        console.log('TypesScripted Module');
        new Jasper();
    }
    return TypeScripted;
});
