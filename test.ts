/* Write your code below. Good luck! 🙂 */

function calcAverage (a, b, c) {
    return (a + b + c) / 3   
}

console.log(calcAverage(3, 4, 5));

//Test 1
let scroreDophins = calcAverage(44, 23, 71)
let scoreKoalas = calcAverage(65, 54, 49)

console.log(scroreDophins, scoreKoalas);

const checkWinner = function (avgDophins, avgKoalas) {
    if(avgDophins >= 2 * avgKoalas) {
        console.log(`Dophins win (${avgDophins}) vs. ${avgKoalas}`)
    } else if (avgKoalas >= 2 * avgKoalas) {
        console.log(`Koalas win (${avgKoalas}) vs. ${avgKoalas} vs. ${avgDophins}`)
    } else {
        console.log('No team wins...');
    }
}

checkWinner(scroreDophins, scoreKoalas);

checkWinner(576, 111);

// Test 2
scroreDophins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27)

console.log(scroreDophins, scoreKoalas);
checkWinner(scroreDophins, scoreKoalas);