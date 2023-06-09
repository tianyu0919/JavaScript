/*
 * @Author: tianyu
 * @Date: 2023-06-09 14:10:27
 * @Description: 原型链继承
 */

// * 创建一个 Person 构造函数
function Person(name) {
  this.name = name;
  this.sayName = function () {
    console.log(this.name);
  };
}

// * Person 新增原型方法listen
Person.prototype.listen = function () {
  console.log("listening");
};

const person = new Person("tianyu");
console.log(person);

// * 创建一个 Student 构造函数
function Student(name) {
  this.name = name;
}

// * 将 Student 的原型修改为 Person 的实例。
Student.prototype = new Person();

// * 接着给Person的原型上新增一个方法xx。
Person.prototype.xx = 123;

const student = new Student("tianyu1");

student.xx; // * 还是可以找到的

console.log(student);

student instanceof Student; // * true
student instanceof Person; // * 也是 true

// * summarize：
// * 优点：
// * 简单易实现
// * 父类新增原型方法/原型属性，子类都能访问
// * 实例是子类的实例也是父类的实例

// * 缺点
// * 为子类新增属性和方法，不能在构造函数中
// * 无法实现多继承
// * 创建子类实例时，不能向父类构造函数传递参数。
// * 所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改。）

// * Existing Problems：
// * constructor 指向不对。
// * 解决办法：
Student.prototype.constructor = Student;
