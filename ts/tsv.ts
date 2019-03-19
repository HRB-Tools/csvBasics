// TSV Splitter -> returns a two dimensional array

export const resultArr = function(value){
    let temp = value.split('\r\n'), arr = [];
    if ( temp.length >= 1 ) {
        temp.forEach(function(element){
            arr.push(element.split('\t'));
        });
    }
    return arr;
};

export const tsvArray = function (arr) {
    let tsvArr = [];
    arr.forEach(element => tsvArr.push(element.join('\t')));
    return tsvArr.join('\n');
};