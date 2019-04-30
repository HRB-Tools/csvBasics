import { fileresult } from './fileio';
import { csvArray, resultArray } from './csv';
import { tsvArray } from './tsv';
import { filedownload } from './filedownload';
import { colSwap } from './colswap';
import { sollHaben } from './sh';
import { lohn } from "./lohnbuchungen";
// Init when document is loaded
document.onreadystatechange = function () {
    if (document.readyState == 'complete') {
        init();
    }
};
const colMap = [6, 0, 7, 9, 10, -1, -1, 13]; // from Index => map[Index]
const reverseMap = [8, -1, -1, -1, -1, -1, 5, 4, -1, 1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7];
const tagsSource = ['Sollkonto', 'Betrag', 'Habenkonto', 'Belegdatum', 'Belegnummer', 'Steuercode', 'Steuerart', 'Kost 1', 'Kost 2'];
const tagsTarget = ['Umsatz', 'Soll/Haben', 'leer', 'leer', 'leer', 'leer', 'Konto', 'Gegenkonto', 'leer', 'Belegdatum', 'Belegfeld 1', 'Belegfeld 2', 'leer', 'Buchungstext'];
let year = '2019';
let mandantennummer = 0, yearMonth = 0;
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
//# sourceMappingURL=index.js.map