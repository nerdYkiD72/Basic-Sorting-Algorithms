var maxNumber = 50;
var numberList = createNumbersList(maxNumber);
var randomList = [];
var bubbleWL = [];
var recursiveBubbleWL = [];
var quickSortList = [];
var originalList = [];

var waitTime = 100;

const quickSortCanvas = document.getElementById("quickSortCanvas");
const quickSortOutput = document.getElementById("quickSort");

const waitSpeedSlider = document.getElementById("waitSpeedSlider");
const waitSpeedSliderLabel = document.getElementById("waitSpeedNumber");
const listLength = document.getElementById("listLength");
const listLengthSlider = document.getElementById("listLengthSlider");

const numberInput = document.getElementById("numberInput");
const numberInputButton = document.getElementById("numberInputButton");

window.onload = handleLengthInput;

// ******************
// *** Quick Sort ***
// ******************
var quickSortIteration = 0;
function quickSort(array) {
    quickSortIteration++;

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

// *********************
// *** Binary Search ***
// *********************

function binarySearch(arr, low, high, target) {
    if (high >= low) {
        let mid = low + Math.floor((high - low) / 2);

        // If the element is present at the middle
        // itself
        if (arr[mid] == target) return mid;

        // If element is smaller than mid, then
        // it can only be present in left subarray
        if (arr[mid] > target) return binarySearch(arr, low, mid - 1, target);

        // Else the element can only be present
        // in right subarray
        return binarySearch(arr, mid + 1, high, target);
    }

    // We reach here when element is not
    // present in array
    return -1;
}

// ***************
// *** Helpers ***
// ***************

function handleLengthInput() {
    maxNumber = listLengthSlider.value;
    listLength.innerHTML = maxNumber;
}

function handleLengthChange() {
    readySorts();
}

function handleNumberSearch() {
    let input = numberInput.value;
    let affectedElements = [numberInput, numberInputButton];
    if (isNaN(input)) {
        handleInvalidInput(affectedElements, "NaN");
    } else {
        input = Number(input);
        if (input <= Number(maxNumber) && input >= 1) {
            handleValidInput(affectedElements);
            console.log(input);
            // Valid input: Search for the number from here.
            console.log(`quickSortList: ${quickSortList}`);
            console.log(binarySearch(quickSortList, 0, quickSortList.length, input));
        } else {
            handleInvalidInput(affectedElements, "Out of range");
        }
    }
}

function handleInvalidInput(htmlCollection, errorMessage) {
    console.log(`Please enter a integer from values 1 to ${maxNumber}. ${errorMessage}`);
    alert(`Please enter a integer from values 1 to ${maxNumber}. ${errorMessage}`);

    htmlCollection.forEach((element) => {
        setDanger(element);
    });

    numberInput.value = "";
}

function handleValidInput(htmlCollection) {
    htmlCollection.forEach((element) => {
        setPrimary(element);
    });
}

function setPrimary(element) {
    if (element.classList.contains("is-danger")) {
        element.classList.remove("is-danger");
    }
    if (!element.classList.contains("is-primary")) {
        element.classList.add("is-primary");
    }
}

function setDanger(element) {
    if (element.classList.contains("is-primary")) {
        element.classList.remove("is-primary");
    }
    if (!element.classList.contains("is-danger")) {
        element.classList.add("is-danger");
    }
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
        let tempWidth = width / arr.length;
        let barWidth = tempWidth > 0 ? tempWidth : 1;
        let scale = (height - 10) / maxNumber;
        let x = width / arr.length;

        ctx.fillStyle = i == selectedIndex ? "#3477eb" : "#00D1B2";
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
 * Displays the iteration of the array in the UI.
 * @param {Number} iteration The iteration the algorithm is on.
 * @param {Array} arr The array that is being sorted.
 * @param {HTMLElement} outputObject The <ul> element to append a line to.
 */
function displayArrayUpdate(iteration, arr, outputObject) {
    let newLIne = document.createElement("li");

    let iterationLabel = document.createElement("p");
    iterationLabel.innerHTML = `Iteration: ${iteration} Passing: ${isSorted(arr)}`;

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
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
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

    quickSortList = [...randomList];

    drawArray(quickSortCanvas, quickSortList);
}

async function runSorts() {
    quickSortList = quickSort(quickSortList);

    console.log(quickSortList);
    drawArray(quickSortCanvas, quickSortList);
}

run();
