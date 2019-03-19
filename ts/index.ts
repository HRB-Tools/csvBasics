import { fileresult } from './fileio';
import {csvArray, resultArray} from './csv';
import {tsvArray, resultArr} from './tsv';
import { filedownload } from './filedownload';
import { colSwap } from './colswap';
import { sollHaben } from './sh';
import { datum } from './date'
import { lohn } from "./lohnbuchungen";

// Init when document is loaded
document.onreadystatechange = function(){
    if ( document.readyState == 'complete' ){
        init();
    }
};

const colMap : number[] = [6, 0, 7, 9, 10, -1, -1, 13] // from Index => map[Index]
const reverseMap : number[] = [8, -1, -1, -1, -1, -1, 4, 5, -1, 1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7]
const tagsSource : string[] = ['Sollkonto', 'Betrag', 'Habenkonto', 'Belegdatum', 'Belegnummer', 'Steuercode', 'Steuerart', 'Kost 1', 'Kost 2']
const tagsTarget : string[] = ['Umsatz', 'Soll/Haben', 'leer', 'leer', 'leer', 'leer', 'Konto', 'Gegenkonto', 'leer', 'Belegdatum', 'Belegfeld 1', 'Belegfeld 2', 'leer', 'Buchungstext']
let year = '2019'
console.log(reverseMap.length)
let init = function(){
    let text;
    // Adds EventListeners to each item
    let btn1 = document.querySelector('#tsv');
    btn1.addEventListener('mousedown', function (){
        text = fileresult();
        text.then(function(csvFile) {
            return resultArray(csvFile)
        }).then(function(intermediateArr){
            year = intermediateArr[0][12].slice(0,4)
            return sollHaben(intermediateArr, 1, 0)
        }).then(function(resultArr) {
            return colSwap(resultArr, reverseMap)
        }).then(function(arr2d){
            return lohn(arr2d, year)
        }).then(function (arr2d) {
            return tsvArray(arr2d)
        }).then(function(tsvArr){
            filedownload(tsvArr, `DTVF_${new Date().getFullYear()}_${('00' + (new Date().getMonth()+1)).slice(-2)}${('00' + new Date().getDate()).slice(-2)}.tsv`)
        })
    });
    let btn2 = document.querySelector('#csv');
    btn2.addEventListener('mousedown', function (){
        text = fileresult();
        text.then(function(csvFile) {
            return resultArray(csvFile)
        }).then(function(intermediateArr){
            year = intermediateArr[0][12].slice(0,4)
            return sollHaben(intermediateArr, 1, 0)
        }).then(function(resultArr) {
            return colSwap(resultArr, reverseMap)
        }).then(function(arr2d){
            return lohn(arr2d, year)
        }).then(function (arr2d) {
            return csvArray(arr2d)
        }).then(function(csvArr){
            filedownload(csvArr, `DTVF_${new Date().getFullYear()}_${('00' + (new Date().getMonth()+1)).slice(-2)}${('00' + new Date().getDate()).slice(-2)}.csv`)
        })
    });

};
// .then(function (arr2d) {
//     let information = classify(arr2d);
//     console.log(information);
//     return arr2d;
// })