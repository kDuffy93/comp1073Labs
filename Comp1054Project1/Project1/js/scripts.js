let hummingBirdObj = document.getElementById("hummingBird");
let i = 1;

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delayInms);
    });
}
let hummingBirdAnimation = async(i) => {

    return new Promise(resolve => {
        console.log(i);
        if (i == 3) {

            hummingBirdObj.src = "./imgs/hummingbird3.png";
            console.log(`photo3`);

            resolve();
        } else if (i == 2) {
            //await delay(3);
            hummingBirdObj.src = "./imgs/hummingbird2.png";
            console.log(`photo1`);

            resolve();
        } else if (i == 1) {
            //await delay(5);
            hummingBirdObj.src = "./imgs/hummingbird.png";
            console.log(`photo2`);

            resolve();
        }
    });
    /*

    return new Promise(function(resolve) {
        setTimeout(() => {
            if (i % 2 == 0) {
                hummingBirdObj.src = "./imgs/hummingbird.png";
            } else {
                hummingBirdObj.src = "./imgs/hummingbird2.png";
            }
            i++
        }, i * 33.3);
        i++
        resolve();
    });

*/

}
let init = async() => {
    if (i == 2) {
        await delay(2.5);
        await hummingBirdAnimation(i);

    } else {
        await delay(5);
        await hummingBirdAnimation(i);
    }
    i++;
    i == 4 ? i = 1 : i = i;
    init();
}
init();