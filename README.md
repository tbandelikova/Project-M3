# Project-M3
Разработать онлайн-конвертер валют, получая актуальные данные с открытого API:
https://exchangerate.host/#/#docs 
Для получения данных по курсу валют, вам нужно запросить данные по валютной паре, добавив к URL-адресу два сокращения этих валют (без пробелов и разделителей). Пример для пары USD и RUB:
https://api.exchangerate.host/latest?base=USD&symbols=RUB 
В ответ приходит JSON с объектом. В поле rates этого объекта лежит объект пар ключ-значение. По ключу RUB будет находится число — текущий курс на данный момент.
Калькулятор с помощью элементов управления позволяет пользователю выбрать две валюты и сумму конвертации. После выбора калькулятор отображает кросс-курс и итоговую сумму. 
Предусмотреть обработку ошибок загрузки.
![image](https://user-images.githubusercontent.com/93816022/178785821-4bc76092-4625-422b-9206-265604e61d48.png)
Меню не активно, только hover-эффект.
