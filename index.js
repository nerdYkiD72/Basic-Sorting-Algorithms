var numberList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
var randomList = [];
var bubbleWL = [];
var recursiveBubbleWL = [];
var originalList = [];

var waitTime = 100;

const iterationOutput = document.getElementById("iteration");
const recursiveOutput = document.getElementById("recursive");
const recursiveCanvas = document.getElementById("recursiveCanvas");
const iterationCanvas = document.getElementById("iterationCanvas");

const waitSpeedSlider = document.getElementById("waitSpeedSlider");
const waitSpeedSliderLabel = document.getElementById("waitSpeedNumber");

// *****************************
// *** Iteration Bubble Sort ***
// *****************************

async function bubbleSort(arr, n) {
    var i, j;
    // Loop over the length of the array.
    for (i = 0; i < n - 1; i++) {
        writeIteration(
            `Iteration ${i + 1}: ${arr} ${isSorted(arr) ? "✔️" : "❌"}`
        );
        // drawArray(iterationCanvas, arr);
        await sleep(waitTime);
        // For each iteration loop until the selected item is in the right spot.
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                drawArray(iterationCanvas, arr, j + 1);
                await sleep(waitTime);
            }
        }
    }
}

// *****************************
// *** Recursive Bubble Sort ***
// *****************************

var recursiveIteration = 0;
async function recursiveBubbleSort(arr, n) {
    // Length of 1:
    if (n == 1) return;

    var count = 0;
    // One pass of bubble
    // sort. After this pass,
    // the largest element
    // is moved (or bubbled)
    // to end.
    recursiveIteration++;
    writeRecursive(
        `Iteration ${recursiveIteration}: ${arr}  ${
            isSorted(arr) ? "✔️" : "❌"
        }`
    );

    for (var i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            swap(arr, i, i + 1);
            drawArray(recursiveCanvas, arr, i + 1);
            await sleep(waitTime);
            count++;
        }
    }

    // Check if any recursion happens or not
    // If any recursion is not happen then return
    if (count == 0) return;

    // Largest element is fixed,
    // recur for remaining array
    recursiveBubbleSort(arr, n - 1);
}

// ***************
// *** Helpers ***
// ***************

function handleSpeedChange() {
    console.log(waitSpeedSlider.value);
    waitTime = waitSpeedSlider.value;
    waitSpeedSliderLabel.innerHTML = waitSpeedSlider.value / 1000;
}

/**
 * Handles drawing arrays to their intended canvases.
 * @param {*} canvas The HTML canvas to draw to.
 * @param {*} arr The array to draw to the canvas.
 */
function drawArray(canvas, arr, selectedIndex) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < arr.length; i++) {
        if (!canvas.getContext) {
            return;
        }

        let barWidth = 10;
        let scale = 19;
        let height = canvas.height;
        let width = canvas.width;
        let x = width / arr.length;

        ctx.fillStyle = i == selectedIndex ? "#3477eb" : "#F9DC5C";
        //           x,   y,  width, height
        ctx.fillRect(x * i, height, barWidth, arr[i] * scale * -1);
    }
}

/**
 * Checks if the array is sorted sequentially.
 * @param {Array} arr Array to check.
 * @returns Returns true if the array is sorted sequentially.
 */
function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

/**
 * Appends a item to the Recursive HTML list.
 * @param {string} text
 */
function writeRecursive(text) {
    let newLIne = document.createElement("li");
    newLIne.innerHTML = `${text}`;

    recursiveOutput.appendChild(newLIne);
}

/**
 * Appends a item to the Iteration HTML list.
 * @param {string} text
 */
function writeIteration(text) {
    let newLIne = document.createElement("li");
    newLIne.innerHTML = `${text}`;

    iterationOutput.appendChild(newLIne);
}

/**
 * Swaps two items in an array.
 * @param {Arr} arr Array in which to switch items in.
 * @param {*} xp First position.
 * @param {*} yp Second position.
 */
function swap(arr, xp, yp) {
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

/**
 * Randomizes or shuffles the given array.
 * @param {Arr} array Array to randomize.
 * @returns The randomized array.
 */
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

/**
 * Randomizes given list
 * @deprecated Use shuffle() instead.
 * @param {Array} list
 * @returns
 */
function randomizeList(list) {
    while (
        list.findIndex(function (v, i) {
            return v == i + 1 || (i && Math.abs(list[i - 1] - v) == 1);
        }) != -1
    ) {
        list.sort(function () {
            return Math.random() - 0.5;
        });
    }
    return list;
}

/**
 * Simple sleep function. Remember to use await to make it blocking.
 * @param {Num} ms Time to sleep.
 * @returns A promise that resolves after the sleep time.
 */
function sleep(ms) {
    if (ms > 0) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

// ***************
// *** Driving ***
// ***************

async function run() {
    readySorts();
    runSorts();
}

function readySorts() {
    randomList = shuffle(numberList);
    bubbleWL = [...randomList];
    recursiveBubbleWL = [...randomList];
    originalList = [...randomList];

    recursiveOutput.innerHTML = "";
    iterationOutput.innerHTML = "";

    drawArray(recursiveCanvas, recursiveBubbleWL);
    drawArray(iterationCanvas, bubbleWL);
}

function runSorts() {
    bubbleSort(bubbleWL, bubbleWL.length);

    recursiveIteration = 0;
    recursiveBubbleSort(recursiveBubbleWL, recursiveBubbleWL.length);
}

run();
