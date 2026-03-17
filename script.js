const clocks = [
    { tz: Intl.DateTimeFormat().resolvedOptions().timeZone, local: true }, // local
    { tz: "US/Eastern" },
    { tz: "Pacific/Auckland" },
    { tz: "Asia/Shanghai" },
    { tz: "US/Central" },
    { tz: "Australia/Sydney" },
];

function timeNow() {

    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    clocks.forEach(clock => {

        const now = new Date(new Date().toLocaleString("en-US", { timeZone: clock.tz }));
        const el = clock.element;

        el.querySelector(".weekday").innerHTML = weekdays[now.getDay()].toUpperCase();
        el.querySelector(".month").innerHTML = months[now.getMonth()].toUpperCase();
        el.querySelector(".date").innerHTML = now.getDate();

        let hour = now.getHours();
        let ampm = hour >= 12 ? "PM" : "AM";

        if (hour > 12) hour -= 12;
        if (hour === 0) hour = 12;

        el.querySelector(".hour").innerHTML = checkLength(hour);
        el.querySelector(".minute").innerHTML = checkLength(now.getMinutes());
        el.querySelector(".second").innerHTML = checkLength(now.getSeconds());
        el.querySelector(".ampm").innerHTML = ampm;

    });

    setTimeout(timeNow, 1000 - new Date().getMilliseconds());
}

function checkLength(number) {
    return number.toString().padStart(2, "0");
}


const wrapper = document.querySelector(".clock-wrapper");
const baseClock = document.querySelector(".timezone");

clocks.forEach((clock, i) => {

    let clockElement;

    if (i === 0) {
        clockElement = baseClock;
    } else {
        clockElement = baseClock.cloneNode(true);
        // const hueStep = 360 / clocks.length;
        // const jitter = 100; // small randomness
        // const hue = (i * hueStep) + (Math.random() * jitter - jitter/2);
        // clockElement.style.color = `hsl(${hue} 100% 85% / 0.2)`;
        wrapper.appendChild(clockElement);
    }

    clock.element = clockElement;

});

timeNow();