var maxNumber = 50;
var numberList = createNumbersList(maxNumber);
var randomList = [];
var bubbleWL = [];
var recursiveBubbleWL = [];
var quickSortList = [];
var originalList = [];
var listTypeConsecutive = true;
var listMaxVariation = 0;

var waitTime = 100;

const quickSortCanvas = document.getElementById("quickSortCanvas");
const quickSortOutput = document.getElementById("quickSort");

const waitSpeedSlider = document.getElementById("waitSpeedSlider");
const waitSpeedSliderLabel = document.getElementById("waitSpeedNumber");
const listLengthElement = document.getElementById("listLength");
const listLengthSlider = document.getElementById("listLengthSlider");
var listLength = 0;

const numberInput = document.getElementById("numberInput");
const numberInputButton = document.getElementById("numberInputButton");

const searchResults = document.getElementById("searchResults");
const searchLocation = document.getElementById("searchLocation");

const consecutiveEnabled = document.getElementById("consecutiveEnabled");
const randomEnabled = document.getElementById("randomEnabled");
const listMaxVariationElement = document.getElementById("listMaxVariation");
const listTypeLabel = document.getElementById("listTypeLabel");

window.onload = () => {
    handleLengthInput();
    handleLengthChange();
    handleMaxVariationChange();
    handleListTypeChange();
};

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

function handleListTypeChange() {
    listTypeConsecutive = consecutiveEnabled.checked;

    if (listTypeConsecutive) {
        listTypeLabel.innerHTML = "Consecutive";
    } else {
        listTypeLabel.innerHTML = `Random, Variation: ${listMaxVariation}`;
    }
}

function handleMaxVariationChange() {
    listMaxVariation = listMaxVariationElement.value;

    if (listTypeConsecutive) {
        listTypeLabel.innerHTML = "Consecutive";
    } else {
        listTypeLabel.innerHTML = `Random, Variation: ${listMaxVariation}`;
    }
}

function handleLengthInput() {
    listLength = listLengthSlider.value;
    listLengthElement.innerHTML = listLength;
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

            let results = binarySearch(quickSortList, 0, quickSortList.length, input);

            console.log(`Results: ${results}`);
            if (results != -1) {
                searchResults.innerHTML = "✔️ Item found ✔️";
                searchLocation.innerHTML = results;
                drawArray(quickSortCanvas, quickSortList, results);
            } else {
                searchResults.innerHTML = "❌ Item not in list. ❌";
                searchLocation.innerHTML = "";
            }
        } else {
            handleInvalidInput(affectedElements, "Out of range");
        }
    }
}

function handleNumberSearchInput() {
    let input = numberInput.value;
    let affectedElements = [numberInput, numberInputButton];

    if (isNaN(input)) {
        affectedElements.forEach((element) => {
            setDanger(element);
        });
    } else {
        input = Number(input);
        if (input <= Number(maxNumber) && input >= 1) {
            affectedElements.forEach((element) => {
                setPrimary(element);
            });
        } else {
            affectedElements.forEach((element) => {
                setDanger(element);
            });
        }
    }
    if (input == "") {
        affectedElements.forEach((element) => {
            setPrimary(element);
        });
    }
}

numberInput.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    console.log(event.key);
    if (event.key == "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        handleNumberSearch();
    }
});

function handleInvalidInput(htmlCollection, errorMessage) {
    console.log(`Please enter a integer from values 1 to ${maxNumber}. ${errorMessage}`);
    alert(`Please enter a integer from values 1 to ${maxNumber}. ${errorMessage}`);

    searchResults.innerHTML = errorMessage;

    htmlCollection.forEach((element) => {
        setPrimary(element);
    });

    searchLocation.innerHTML = "";

    numberInput.value = "";
}

function handleValidInput(htmlCollection) {
    htmlCollection.forEach((element) => {
        setPrimary(element);
    });
}

function handleSettingsClick() {
    console.log("Settings clicked");
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
 * Toggle the disabled state of an array of elements.
 * @param {Array} element The html elements you want to toggle.
 * @param {Boolean} isDisabled Whether the element should be disabled.
 */
function toggleDisabled(elements, disabled) {
    elements.forEach((element) => {
        element.disabled = disabled;
    });
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
        let scale = (height - 10) / findLargestNumber(arr);
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

function findLargestNumber(arr) {
    let thisSortedArray = quickSort(arr);

    return thisSortedArray[thisSortedArray.length - 1];
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

function createNumbersList(max, consecutive, delta = 1) {
    let arr = [];

    if (consecutive) {
        for (let i = 0; i < max; i++) {
            arr.push(i + 1);
        }
        return arr;
    } else {
        arr.push(getRndInteger(0, delta));
        for (let i = 0; i < max; i++) {
            arr.push(arr[i] + getRndInteger(1, delta));
        }

        console.log(`Array Made: ${arr}, Random integer: ${getRndInteger(1, delta)}`);
        return arr;
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ***************
// *** Driving ***
// ***************

async function run() {
    readySorts();
    runSorts();
}

function readySorts() {
    console.log(listTypeConsecutive);
    numberList = createNumbersList(listLength, listTypeConsecutive, listMaxVariation);
    randomList = shuffle(numberList);
    quickSortList = [...randomList];

    // Disable searching for a number until the list is sorted.
    toggleDisabled([numberInput, numberInputButton], true);

    maxNumber = findLargestNumber(quickSortList);
    drawArray(quickSortCanvas, quickSortList);
}

function runSorts() {
    quickSortList = quickSort(quickSortList);

    console.log("Array Sorted.");
    drawArray(quickSortCanvas, quickSortList);
    toggleDisabled([numberInput, numberInputButton], false);
}

run();
