class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    area() {
        return 0;
    }

    toString () {
        return `Point(${this.x}, ${this.y})`;
    }
}

class Circle extends Point {
    constructor(x, y, r) {
        super(x, y);
        this.r = r;
    }

    area() {
        return Math.PI * this.r * this.r;
    }

    toString() {
        return `Circle(${this.x}, ${this.y}, ${this.r})`;
    }
}

class Ellipse extends Circle {
    constructor(x, y, r1, r2) {
        super(x, y, r1);
        this.r2 = r2;
    }

    area () {
        return Math.PI * this.r * this.r2;
    }

    toString() {
        return `Ellipse(${this.x}, ${this.y}, ${this.r}, ${this.r2})`;
    }
}

let point = new Point(0, 1);
console.log(point.toString());

let circle = new Circle(1, 2, 1);
console.log(circle.toString());

let ellipse = new Ellipse(1, 2, 1, 2);
console.log(ellipse.toString());