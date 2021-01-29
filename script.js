data = [
    {
      "label": "Bawcomville",
      "id": 0
    },
    {
      "label": "Rushford",
      "id": 1
    },
    {
      "label": "Bayview",
      "id": 2
    }
]
 
let ul = document.getElementById('dropdown__list')
let button = document.getElementById('dropdown__button')
let input = document.getElementById('dropdown__input')

//генерация списка
for (let element of data) {
    let li = document.createElement('li')
    li.className = 'dropdown__list__item'
    li.innerHTML = element.label
    ul.append(li)
    if (data.length>5) {
        ul.style.overflowY = 'scroll'
    }
}

//закрытие списка при изменении размера экрана
window.addEventListener('resize', function() {
    ul.classList.remove('dropdown__list_show')
}, false)


//закрытие списка при прокрутке
window.addEventListener('scroll', function() {
    ul.classList.remove('dropdown__list_show')
}, false)

document.addEventListener('click', function(event) {
    //клик вне поля ввода для сворачивания списка
    if (!button.contains(event.target) && !input.contains(event.target)) {
        ul.classList.remove('dropdown__list_show')
    }
    //очищение ввода, если слово введено не полностью
    for (let element of data) {
        if (element.label == input.value) {
            flag = true
            break
        } else {
            flag = false
        }
    }
    if (flag == false) {
        input.value = ''
    }
    inputCheck()
}, false)

//скрипт для кнопки
button.addEventListener('click', function() {
    openToDownCheck()
    ul.classList.toggle('dropdown__list_show')
    if (ul.className == 'dropdown__list dropdown__list_show') {
        input.focus()
        input.value = ''
    }
}, false)


//открытие списка при нажатии на input
input.addEventListener('click', function() {
    openToDownCheck()
    ul.classList.add('dropdown__list_show')
}, false)

//выбор элемента из списка и его закрытие
ul.addEventListener('click', function(event) {
    if (event.target.tagName == 'LI') {
        input.value = event.target.textContent
        ul.classList.remove('dropdown__list_show')
    }
}, false)

//фильтрация записей
input.addEventListener('input', function() {
    inputCheck()
}, false)

function inputCheck () {
    let lis = document.getElementsByClassName('dropdown__list__item')
    for (let li of lis) {
        let inputValue = input.value.toLowerCase()
        let liTextContent = li.textContent.toLowerCase()
        if (liTextContent.startsWith(inputValue)) {
            li.style.display = ''
        } else {
            li.style.display = 'none'
        }
    }
}

//расстояние от inputa до конца окна
function openToDownCheck() {
    if (document.documentElement.clientHeight - input.getBoundingClientRect().bottom < 100) {
        ul.style.bottom = '30px'
    }
}