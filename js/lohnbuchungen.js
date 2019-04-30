import { datum } from "./date";
export const lohn = function (arr, year) {
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
//# sourceMappingURL=lohnbuchungen.js.map