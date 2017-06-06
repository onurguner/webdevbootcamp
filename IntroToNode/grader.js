function average(scores) {
    // body...
    var sum = 0;
    for (var i=0; i<scores.length; i++) {
        sum += scores[i];
    }
    return Math.round(sum / scores.length);
}

var scores1 = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores1));

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2));