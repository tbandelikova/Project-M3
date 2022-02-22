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
        getCurrencyCourse(true);
    })
});

currencyDes.forEach(item => {
    item.addEventListener('click', (event) => {
        currencyDes.forEach(item => {
            item.classList.remove('chosen');
        })
        event.target.classList.add('chosen');
        getCurrencyCourse(true);
    })
});

document.querySelectorAll('input').forEach(item => {
    item.addEventListener('keyup', (event) => {
        if (event.key == 'Enter'){
            if(event.target.classList.contains('available') == true) {
                getCurrencyCourse(true);
            } else {
                getCurrencyCourse(false);
            }
        }
    })
}) 

function getCurrencyCourse(isAvailable = true) {
    let right = document.querySelector('.desirable li.chosen').innerHTML;
    let left = document.querySelector('.available li.chosen').innerHTML;

    if (right == left) {
        document.querySelector('.available span').innerHTML = `1 ${left} = 1.0000 ${right}`;
        document.querySelector('.desirable span').innerHTML = `1 ${right} = 1.0000 ${left}`;
        desirable.value = available.value;
    } else {
        fetch(URL + `/latest?base=${right}&symbols=${left}`)
        .then(response => response.json())
        .then(data => {
            let ratesEl = data.rates[left];

            document.querySelector('.available span').innerHTML = `1 ${left} = ${(1 / ratesEl).toFixed(4)} ${right}`;
            document.querySelector('.desirable span').innerHTML = `1 ${right} = ${ratesEl.toFixed(4)} ${left}`;

            if(isAvailable) {
                return desirable.value = (available.value / ratesEl).toFixed(4);
            } else {
                return available.value = (desirable.value * ratesEl).toFixed(4);
                }
        })
        .catch(error => {
            alert(`Произошла ошибка: ${error.message}`);
            });
        }
}

getCurrencyCourse(true);