const mainPage = document.querySelector('.main-page')
const feedbackPage = document.querySelector('.feedback-page')
const orderPage = document.querySelector('.order-page')
const currentDate = new Date().toLocaleDateString()
const offerDate = document.querySelector('.offer__date')

if (mainPage || feedbackPage) {
    const upBtn = document.querySelector('.upBtn')

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 600) {
            upBtn.classList.add('upBtnShow')
        } else if (window.pageYOffset < 600) {
            upBtn.classList.remove('upBtnShow')
        }
    }, { passive: true })


    upBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })
}

if (mainPage) {
    offerDate.textContent = currentDate
    const heightInput = document.querySelector('#height')
    const weightInput = document.querySelector('#weight')
    const resultBtn = document.querySelector('.imt-calc__btn')
    let result = document.querySelector('#calc-result')

    resultBtn.addEventListener('click', function () {
        let hValue = heightInput.value / 100
        let wValue = weightInput.value
        let resultValue = Math.floor((wValue / (hValue * hValue)))
        if (!resultValue || resultValue < 16 || resultValue > 100) {
            alert('Введите верное значение')
            hValue = 0
            wValue = 0
            return
        } else {
            result.textContent = resultValue
        }
    })
}

if (feedbackPage) {
    offerDate.textContent = currentDate
    const feedbackList = feedbackPage.querySelector('.feedback__list')
    const feedbackForm = feedbackPage.querySelector('.feedback-form')
    const nameInput = feedbackForm.querySelector('.feedback-form__name')
    const feedbackText = feedbackForm.querySelector('.feedback-form__text')
    const photoInput = feedbackForm.querySelector('.feedback-form__photo')
    const sendBtn = feedbackForm.querySelector('.feedback-form__btn')

    if (localStorage.getItem('feedback') !== null) {
        let oldFeedback = JSON.parse(localStorage.getItem('feedback'))
        let name = oldFeedback[0]
        let text = oldFeedback[1]
        let rating = oldFeedback[2]
        console.log(rating)
        addFeedback(name, text, rating)
    }

    photoInput.onchange = function () {
        if (this.files[0].size > 300000) {
            alert("Размер файла слишком большой!")
            this.value = ''
        } else {
            alert('Сервер перегружен, к сожалению загрузка фото сейчас не возможна')
            this.value = ''
        }
    }

    function addFeedback(name, text, rating) {

        let ratingValue
        let stars = feedbackForm.querySelectorAll('[name="star"]')

        if (rating) {
            ratingValue = rating
        } else {
            for (let i = 0; i < stars.length; i++) {
                if (stars[i].checked) {
                    ratingValue = stars[i].value
                }
            }
        }


        if (text.length < 2 || name.length < 2) {
            alert('Все поля должны быть заполнены')
            return
        }

        let newItem = document.createElement('li')
        let newItemPerson = document.createElement('div')
        let newItemPhoto = document.createElement('img')
        let newItemName = document.createElement('p')
        let newItemRateWrapper = document.createElement('div')
        let newItemRate = document.createElement('img')
        let newItemDate = document.createElement('p')
        let newItemText = document.createElement('p')

        newItem.classList.add('section-feedback__item')
        newItemPerson.classList.add('section-feedback__person')
        newItemPhoto.classList.add('section-feedback__avatar')
        newItemName.classList.add('section-feedback__name')
        newItemRateWrapper.classList.add('section-feedback__rate-date')
        newItemRate.classList.add('section-feedback__rate')
        newItemDate.classList.add('section-feedback__date')
        newItemText.classList.add('section-feedback__text')

        newItemPhoto.setAttribute('src', './images/avatar-blank.png')
        newItemRate.setAttribute('src', `./images/stars-${ratingValue}.png`)
        newItemRate.setAttribute('width', '150')

        newItemName.textContent = name
        newItemDate = currentDate
        newItemText.textContent = text

        newItemPerson.append(newItemPhoto)
        newItemPerson.append(newItemName)
        newItemRateWrapper.append(newItemRate)
        newItemRateWrapper.append(newItemDate)
        newItem.append(newItemPerson)
        newItem.append(newItemRateWrapper)
        newItem.append(newItemText)
        feedbackList.append(newItem)

        localStorage.setItem('feedback', JSON.stringify([name, text, ratingValue]))

        nameInput.value = ''
        feedbackText.value = ''
    }

    sendBtn.addEventListener('click', function (e) {
        e.preventDefault()

        addFeedback(nameInput.value, feedbackText.value)
    })
}

