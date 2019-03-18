export const datum = function dateFormat(dateValue, year) {
    let val = ('0' + dateValue).slice(-4);
    let month = parseInt(val.slice(-2)) > 9 ? val.slice(-2) : val.slice(-1), day = parseInt(val.slice(0, 2)) > 9 ? val.slice(0, 2) : val.slice(1, 2);
    let str = `${month}/${day}/${year}`;
    return str;
};
//# sourceMappingURL=date.js.map