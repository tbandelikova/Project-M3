const URL = 'https://api.exchangerate.host';
let available = document.querySelector('.available input');
let currencyAv = document.querySelectorAll('.available li');
let currencyDes = document.querySelectorAll('.desirable li');
available.value = '1';

currencyAv.forEach(item => {
    item.addEventListener('click', (event) => {
        currencyAv.forEach(item => {
            item.classList.remove('chosen');
        })
        event.target.classList.add('chosen');
    })
});
currencyDes.forEach(item => {
    item.addEventListener('click', (event) => {
        currencyDes.forEach(item => {
            item.classList.remove('chosen');
        })
        event.target.classList.add('chosen');
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
    fetch(URL + `/latest?base=${base}&symbols=${symbols}`)
    .then(response => response.json())
    .then(data => {
        let ratesEl = data.rates[symbols];
        let result = (available.value * ratesEl).toFixed(4);
        document.querySelector('.available span').innerHTML = `1 ${symbols} = ${(1 / ratesEl).toFixed(4)} ${base}`;
        document.querySelector('.desirable span').innerHTML = `1 ${base} = ${ratesEl.toFixed(4)} ${symbols}`;
        document.querySelector('.desirable input').value = result;
    })
    .catch(error => {
        console.log(`Произошла ошибка:
        ${error.message}`);
        });
}

getCurrencyCourse();