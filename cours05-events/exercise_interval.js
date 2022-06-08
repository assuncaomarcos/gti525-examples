// Solution à l'activité en classe en utilisant setInterval

const invokeTimes = (func, noTimes, time) => {
    console.log("Invocation: " + noTimes + " " + time);
    let count = 0;
    let interval;
    let intervalHandler = () => {
        console.log("invocation " + count);
        func(count);
        count += 1;
        if (count == noTimes) {
            clearInterval(interval);
        }
    };
    if (noTimes > 0)
        interval = setInterval(intervalHandler, time);
};

const setup = function () {
    invokeTimes(function (i) {
        console.log("hello " + i);
    }, 10, 1000);
};

setup();