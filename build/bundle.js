(function () {
    'use strict';

    // Creates a File Input element, activates it and returns the result if nonempty
    const fileresult = function () {
        return new Promise(function (resolve, reject) {
            let fileInput = document.createElement('input'), reader = new FileReader();
            fileInput.setAttribute('type', 'file');
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);
            fileInput.addEventListener('change', function () { reader.readAsText(this.files[0]); });
            reader.addEventListener('loadend', function () {
                if (this.result !== '') {
                    resolve(this.result);
                }
                else {
                    reject(this.result);
                }
            });
            fileInput.click();
        });
    };

    // CSV Splitter -> returns a two dimensional array
    const resultArray = function (value) {
        let temp = value.split('\r\n'), arr = [];
        if (temp.length >= 1) {
            temp.forEach(function (element) {
                arr.push(element.split(';'));
            });
        }
        return arr;
    };
    const csvArray = function (arr) {
        let csvArray = [];
        arr.forEach(element => csvArray.push(element.join(';')));
        return csvArray.join('\n');
    };

    const filedownload = function (arr, filename) {
        let blob = new Blob([arr], { type: 'text/csv; charset=utf-8' });
        let link = document.createElement("a");
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    // new comment

    function colSwap(arr, map) {
        let emptyArr = [];
        for (let i = 0; i < arr.length; i++) {
            let tempArr = new Array(Math.max(...map));
            for (let j = 0; j < map.length; j++) {
                if (map[j] >= 0) {
                    tempArr[map[j]] = arr[i][j];
                }
            }
            emptyArr.push(tempArr);
        }
        return emptyArr;
    }

    function sollHaben(arr, indexSH, indexUmsatz) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][indexSH] = 'S') {
                arr[i][indexUmsatz] = '-' + arr[i][indexUmsatz];
            }
        }
        return arr;
    }

    // Init when document is loaded
    document.onreadystatechange = function () {
        if (document.readyState == 'complete') {
            init();
        }
    };
    const reverseMap = [1, -1, -1, -1, -1, -1, 0, 2, -1, 3, 4, -1, -1, 7];
    let init = function () {
        let text;
        // Adds EventListeners to each item
        let btn1 = document.querySelector('ul .nav');
        btn1.addEventListener('mousedown', function () {
            text = fileresult();
            text.then(function (csvFile) {
                return resultArray(csvFile);
            }).then(function (intermediateArr) {
                return sollHaben(intermediateArr, 1, 0);
            }).then(function (resultArr) {
                return colSwap(resultArr, reverseMap);
            }).then(function (arr2d) {
                return csvArray(arr2d);
            }).then(function (csvArr) {
                filedownload(csvArr, `DTVF_${new Date().getFullYear()}_${('00' + (new Date().getMonth() + 1)).slice(-2)}${('00' + new Date().getDate()).slice(-2)}.csv`);
            });
        });
    };
    // .then(function (arr2d) {
    //     let information = classify(arr2d);
    //     console.log(information);
    //     return arr2d;
    // })

}());
