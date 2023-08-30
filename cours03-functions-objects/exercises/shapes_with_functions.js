const Point = function (x, y) {
    this.x = x;
    this.y = y;

    this.area = function () {
        return 0;
    }
};

Point.prototype.toString = function () {
    return `Point(${this.x}, ${this.y})`;
}

const Circle = function (x, y, r) {
    Point.call(this, x, y);
    this.r = r;

    this.area = function () {
        return Math.PI * this.r * this.r;
    }
};

Circle.prototype = Object.create(Point.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.toString = function () {
    return `Circle(${this.x}, ${this.y}, ${this.r})`;
}

const Ellipse = function (x, y, r1, r2) {
    Circle.call(this, x, y, r1);
    this.r2 = r2;

    this.area = function () {
        return Math.PI * this.r * this.r2;
    }
}

Ellipse.prototype = Object.create(Circle.prototype);
Ellipse.prototype.constructor = Ellipse;

Ellipse.prototype.toString = function () {
    return `Ellipse(${this.x}, ${this.y}, ${this.r}, ${this.r2})`;
}

let point = new Point(0, 1);
console.log(point.toString());

let circle = new Circle(1, 2, 1);
console.log(circle.toString());

let ellipse = new Ellipse(1, 2, 1, 2);
console.log(ellipse.toString());