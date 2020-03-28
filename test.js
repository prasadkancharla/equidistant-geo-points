
const PathPlotter = require('./src/PathPlotter')

async function test(params) {
    const solution = new PathPlotter();

    const finalPoints = await solution.getPath([12.94523, 77.61896], [12.95944, 77.66085], 50);
    console.log(finalPoints);

    for (let i = 0; i < finalPoints.length; i++) {
        console.log(finalPoints[i][0] + ',' + finalPoints[i][1]);
    }
}
test();