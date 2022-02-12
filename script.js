const URL = 'https://api.exchangerate.host';
let available = document.querySelector('.available input');
let desirable = document.querySelector('.desirable input');
let currencyAv = document.querySelectorAll('.available li');
let currencyDes = document.querySelectorAll('.desirable li');
available.value = '1';

currencyAv.forEach(item => {
    item.addEventListener('click', (event) => {
        currencyAv.forEach(item => {
            item.classList.remove('chosen');
        })
        event.target.classList.add('chosen');
        getCurrencyCourse();
    })
});

currencyDes.forEach(item => {
    item.addEventListener('click', (event) => {
        currencyDes.forEach(item => {
            item.classList.remove('chosen');
        })
        event.target.classList.add('chosen');
        getCurrencyCourse();
    })
});

document.querySelectorAll('input').forEach(item => {
    item.addEventListener('keyup', (event) => {
        if (event.key == 'Enter'){
            getCurrencyCourse();
        }
    })
})

function getCurrencyCourse() {
    let base = document.querySelector('.desirable li.chosen').innerHTML;
    let symbols = document.querySelector('.available li.chosen').innerHTML;

    if (base == symbols) {
        document.querySelector('.available span').innerHTML = `1 ${symbols} = 1.0000 ${base}`;
        document.querySelector('.desirable span').innerHTML = `1 ${base} = 1.0000 ${symbols}`;
        desirable.value = available.value;
    } else {
        fetch(URL + `/latest?base=${base}&symbols=${symbols}`)
        .then(response => response.json())
        .then(data => {
            let ratesEl = data.rates[symbols];
            let result = (available.value * ratesEl).toFixed(4);
            let reverseResult = (desirable.value / ratesEl).toFixed(4);
            document.querySelector('.available span').innerHTML = `1 ${symbols} = ${(1 / ratesEl).toFixed(4)} ${base}`;
            document.querySelector('.desirable span').innerHTML = `1 ${base} = ${ratesEl.toFixed(4)} ${symbols}`;
            // available.value = reverseResult;
            desirable.value = result;
        })
        .catch(error => {
            alert(`Произошла ошибка:
            ${error.message}`);
            });}
}

getCurrencyCourse();