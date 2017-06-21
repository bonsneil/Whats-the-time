function shuffle(arr) {
    var rand, temp, i;

    for (i = arr.length - 1; i > 0; i -= 1) {
        rand = Math.floor((i + 1) * Math.random());//get random between zero and i (inclusive)
        temp = arr[rand];//swap i and the zero-indexed number
        arr[rand] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function timeAsNumber(timeString) {
    var timeAsNumberMap = { "O'clock": 0, "Quarter past": 15, "Half past": 30, "Quarter to": 45 };
    return timeAsNumberMap[timeString];
}

function numberAsString(number) {
    if (number < 10) {
        number = "0" + number;
    }
    if (number == 0) {
        number = "00";
    }
    number = number + "";
    return number
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
