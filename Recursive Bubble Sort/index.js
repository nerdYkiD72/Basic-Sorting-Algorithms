var numberList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
var randomList = randomizeList(numberList);
var originalList = [...randomList];
const console_Element = document.getElementById("console");
var sortType = "recursive";

window.onload = () => {
    // poo poo pee pee
};

//Bubble sort:
async function bubbleSort(arr, n) {
    var i, j;
    for (i = 0; i < n - 1; i++) {
        write(`Iteration ${i + 1}: ${randomList}`);
        await sleep(1000);
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
}

var recursiveIteration = 0;
// Recursive bubble sort:
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
    write(`Iteration ${recursiveIteration}: ${randomList}`);
    await sleep(1000);
    for (var i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            // swap arr[i], arr[i+1]
            var temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
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
    if (sortType == "recursive") {
        write("Using recursive sorting");
        recursiveBubbleSort(randomList, randomList.length);
    } else if (sortType == "normal") {
        write("Using recursive sorting");
        bubbleSort(randomList, randomList.length);
    }
    write(`Original list was: ${originalList}`);
}

run();

// Helpers:

function write(text) {
    let newLIne = document.createElement("li");
    newLIne.innerHTML = `${text}`;

    console_Element.appendChild(newLIne);
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
