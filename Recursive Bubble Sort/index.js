var numberList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
var randomList = randomizeList(numberList);
var originalList = [...randomList];
var sortType = "recursive";
var waitTime = 0;

const iterationOutput = document.getElementById("iteration");
const recursiveOutput = document.getElementById("recursive");

window.onload = () => {
    // poo poo pee pee
};

//Bubble sort:

async function bubbleSort(arr, n) {
    var i, j;
    for (i = 0; i < n - 1; i++) {
        writeIteration(
            `Iteration ${i + 1}: ${randomList} ${isSorted(arr) ? "✔️" : "❌"}`
        );
        await sleep(waitTime);
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
}

// Recursive bubble sort:

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
        `Iteration ${recursiveIteration}: ${randomList}  ${
            isSorted(arr) ? "✔️" : "❌"
        }`
    );
    await sleep(waitTime);
    for (var i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            swap(arr, i, i + 1);
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

async function run() {
    // if (sortType == "recursive") {
    //     writeRecursive("Using recursive sorting");
    //     recursiveBubbleSort(randomList, randomList.length);
    // } else if (sortType == "normal") {
    //     writeIteration("Using recursive sorting");
    //     bubbleSort(randomList, randomList.length);
    // }
    // write(`Original list was: ${originalList}`);

    writeIteration("Using recursive sorting");
    bubbleSort(randomList, randomList.length);

    writeRecursive("Using recursive sorting");
    recursiveBubbleSort(randomList, randomList.length);

    // Just write the final result
    writeRecursive(
        `Iteration ${recursiveIteration}: ${randomList}  ${
            isSorted(arr) ? "Sorted" : "Mixed"
        }`
    );
}

run();

// Helpers:

function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

function writeRecursive(text) {
    let newLIne = document.createElement("li");
    newLIne.innerHTML = `${text}`;

    recursiveOutput.appendChild(newLIne);
}

function writeIteration(text) {
    let newLIne = document.createElement("li");
    newLIne.innerHTML = `${text}`;

    iterationOutput.appendChild(newLIne);
}

function swap(arr, xp, yp) {
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

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

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
