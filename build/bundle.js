(function () {
    'use strict';

    // Creates a File Input element, activates it and returns the result if nonempty
    const fileresult = function (encode) {
        return new Promise(function (resolve, reject) {
            let fileInput = document.createElement('input'), reader = new FileReader();
            fileInput.setAttribute('type', 'file');
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);
            fileInput.addEventListener('change', function () { reader.readAsText(this.files[0], encode); });
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

    // TSV Splitter -> returns a two dimensional array
    const tsvArray = function (arr) {
        let tsvArr = [];
        arr.forEach(element => tsvArr.push(element.join('\t')));
        return tsvArr.join('\n');
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

    function sollHaben(arr, indexSH, indexUmsatz) {
        for (let i = 2; i < arr.length; i++) {
            if (arr[i][indexSH] == '"S"') {
                arr[i][indexUmsatz] = '-' + arr[i][indexUmsatz];
            }
        }
        return arr;
    }

    const datum = function dateFormat(dateValue, year) {
        let val = ('0' + dateValue).slice(-4);
        let month = parseInt(val.slice(-2)) > 9 ? val.slice(-2) : val.slice(-1), day = parseInt(val.slice(0, 2)) > 9 ? val.slice(0, 2) : val.slice(1, 2);
        let str = `${day}.${month}.${year}`;
        return str;
    };

    const lohn = function (arr, year) {
        let temparr = arr.slice(2, -1);
        temparr.forEach(el => {
            el[4] = el[4].slice(0, -1);
            el[5] = el[5].slice(0, -1);
            el[4] = 'S' + el[4];
            el[5] = 'S' + el[5];
            el[3] = 1;
            el[1] = datum(el[1], year);
            el[0] = el[1];
        });
        temparr.unshift(['Buchungsdatum', 'Belegdatum', 'Buchungstext', 'Buchungskreis', 'Soll-Konto', 'Habenkonto', 'Kostenstelle', 'Kostenträger', 'Umsatz', 'Steuerart', 'Steuercode', 'Steuerbetrag', 'Belegnummer']);
        return temparr;
    };

    // Init when document is loaded
    document.onreadystatechange = function () {
        if (document.readyState == 'complete') {
            init();
        }
    };
    const reverseMap = [8, -1, -1, -1, -1, -1, 5, 4, -1, 1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7];
    let year = '2019';
    let init = function () {
        let text;
        // Adds EventListeners to each item
        let btn1 = document.querySelector('#tsv');
        btn1.addEventListener('mousedown', function () {
            text = fileresult('ISO-8859-1');
            text.then(function (csvFile) {
                return resultArray(csvFile);
            }).then(function (intermediateArr) {
                console.log(intermediateArr);
                return {
                    arr: sollHaben(intermediateArr, 1, 0),
                    filename: `EXTF_${intermediateArr[0][11]}_${intermediateArr[0][14].slice(0, 6)}.tsv`,
                    year: intermediateArr[0][13]
                };
            }).then(function (result) {
                console.log(result);
                return {
                    arr: colSwap(result.arr, reverseMap),
                    filename: result.filename,
                    year: year
                };
            }).then(function (result) {
                console.log(result);
                return {
                    arr: lohn(result.arr, result.year).map((el, idx) => el.concat([, , , idx])),
                    filename: result.filename
                };
            }).then(function (result) {
                console.log(result);
                return {
                    arr: tsvArray(result.arr),
                    filename: result.filename
                };
            }).then(function (result) {
                filedownload(result.arr, result.filename);
            });
        });
        let btn2 = document.querySelector('#csv');
        btn2.addEventListener('mousedown', function () {
            text = fileresult('ISO-8859-1');
            text.then(function (csvFile) {
                return resultArray(csvFile);
            }).then(function (intermediateArr) {
                return {
                    arr: sollHaben(intermediateArr, 1, 0),
                    filename: `EXTF_${intermediateArr[0][11]}_${intermediateArr[0][14].slice(0, 6)}.csv`,
                    year: intermediateArr[0][13]
                };
            }).then(function (result) {
                return {
                    arr: colSwap(result.arr, reverseMap),
                    filename: result.filename,
                    year: year,
                };
            }).then(function (result) {
                return {
                    arr: lohn(result.arr, result.year).map((el, idx) => el.concat([, , , idx])),
                    filename: result.filename
                };
            }).then(function (result) {
                return {
                    arr: csvArray(result.arr),
                    filename: result.filename
                };
            }).then(function (result) {
                filedownload(result.arr, result.filename);
            });
        });
    };

}());
