var maxNumber = 50;
var numberList = createNumbersList(maxNumber);
var randomList = [];
var bubbleWL = [];
var recursiveBubbleWL = [];
var quickSortList = [];
var originalList = [];

var waitTime = 100;

const iterationOutput = document.getElementById("iteration");
const recursiveOutput = document.getElementById("recursive");
const recursiveCanvas = document.getElementById("recursiveCanvas");
const iterationCanvas = document.getElementById("iterationCanvas");
const quickSortCanvas = document.getElementById("quickSortCanvas");
const quickSortOutput = document.getElementById("quickSort");

const waitSpeedSlider = document.getElementById("waitSpeedSlider");
const waitSpeedSliderLabel = document.getElementById("waitSpeedNumber");
const listLength = document.getElementById("listLength");
const listLengthSlider = document.getElementById("listLengthSlider");

window.onload = handleSpeedChange;

// *****************************
// *** Iteration Bubble Sort ***
// *****************************

async function bubbleSort(arr, n) {
    var i, j;
    // Loop over the length of the array.
    for (i = 0; i < n - 1; i++) {
        writeIteration(i + 1, arr); // Prints the current state of the list
        await sleep(waitTime); // Waits to let you see progress
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
    writeRecursive(recursiveIteration, arr);

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

// Quick Sort:
var quickSortIteration = 0;
function quickSort(array) {
    quickSortIteration++;
    displayArrayUpdate(quickSortIteration, quickSortList, quickSortOutput);

    // Sorting:
    if (array.length <= 1) {
        return array;
    } else {
        var pivot = array[0];
        var left = [];
        var right = [];
        for (var i = 1; i < array.length; i++) {
            if (array[i] < pivot) {
                left.push(array[i]);
            } else {
                right.push(array[i]);
            }
            // drawArray(quickSortCanvas, quickSortList, i + 1);
        }
        return quickSort(left).concat(pivot, quickSort(right));
    }
}

// ***************
// *** Helpers ***
// ***************

function handleSpeedChange() {
    console.log(waitSpeedSlider.value);
    waitTime = waitSpeedSlider.value;
    waitSpeedSliderLabel.innerHTML = waitSpeedSlider.value / 1000;

    maxNumber = listLengthSlider.value;
    listLength.innerHTML = maxNumber;
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

        let height = canvas.height;
        let width = canvas.width;
        let barWidth = 10;
        let scale = (height - 10) / maxNumber;
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
            return "❌";
        }
    }
    return "✔️";
}

/**
 * Appends a item to the Recursive HTML list.
 * @param {string} text
 * @deprecated Switch to use of displayArrayUpdate instead.
 */
function writeRecursive(iteration, arr) {
    displayArrayUpdate(iteration, arr, recursiveOutput);
}

/**
 * Appends a item to the Iteration HTML list.
 * @param {string} text
 * @deprecated Switch to use of displayArrayUpdate instead.
 */
function writeIteration(iteration, arr) {
    displayArrayUpdate(iteration, arr, iterationOutput);
}

/**
 * Displays the iteration of the array in the UI.
 * @param {Number} iteration The iteration the algorithm is on.
 * @param {Array} arr The array that is being sorted.
 * @param {HTMLElement} outputObject The <ul> element to append a line to.
 */
function displayArrayUpdate(iteration, arr, outputObject) {
    let newLIne = document.createElement("li");

    let iterationLabel = document.createElement("p");
    iterationLabel.innerHTML = `Iteration: ${iteration} Passing: ${isSorted(
        arr
    )}`;

    let arrayContent = document.createElement("p");
    arrayContent.innerHTML = `Array: ${arr}`;

    newLIne.appendChild(iterationLabel);
    newLIne.appendChild(arrayContent);

    outputObject.appendChild(newLIne);
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

function createNumbersList(max) {
    let arr = [];

    for (let i = 0; i < max; i++) {
        arr.push(i + 1);
    }
    return arr;
}

// ***************
// *** Driving ***
// ***************

async function run() {
    readySorts();
    runSorts();
}

function readySorts() {
    numberList = createNumbersList(maxNumber);
    randomList = shuffle(numberList);
    bubbleWL = [...randomList];
    recursiveBubbleWL = [...randomList];
    originalList = [...randomList];
    quickSortList = [...randomList];

    recursiveOutput.innerHTML = "";
    iterationOutput.innerHTML = "";

    drawArray(recursiveCanvas, recursiveBubbleWL);
    drawArray(iterationCanvas, bubbleWL);
    drawArray(quickSortCanvas, quickSortList);
}

function runSorts() {
    bubbleSort(bubbleWL, bubbleWL.length);

    recursiveIteration = 0;
    recursiveBubbleSort(recursiveBubbleWL, recursiveBubbleWL.length);

    // quickSortList = quickSort(quickSortList);
    console.log(quickSort(quickSortList));
    drawArray(quickSortCanvas, quickSortList);
}

run();
