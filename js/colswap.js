export { colSwap };
function colSwap(arr, map) {
    let emptyArr = [];
    for (let i = 0; i < arr.length; i++) {
        let tempArr = new Array(Math.max(...map) + 1);
        for (let j = 0; j < map.length; j++) {
            if (map[j] >= 0) {
                tempArr[map[j]] = arr[i][j];
            }
        }
        emptyArr.push(tempArr);
    }
    return emptyArr;
}
//# sourceMappingURL=colswap.js.map