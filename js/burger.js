
const burger = document.querySelector('.burger')
const lineTop = burger.querySelector('.burger__top-line')
const lineMid = burger.querySelector('.burger__mid-line')
const lineBot = burger.querySelector('.burger__bot-line')
const mainNavList = document.querySelector('.main-nav__list')

mainNavList.addEventListener('click', function ({ target }) {
    if (target !== burger) {
        mainNavList.classList.remove('show')
        lineTop.classList.remove('active')
        lineMid.classList.remove('active')
        lineBot.classList.remove('active')
    }
})

burger.addEventListener('click', function () {
    lineTop.classList.toggle('active')
    lineMid.classList.toggle('active')
    lineBot.classList.toggle('active')
    mainNavList.classList.toggle('show')
})

document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
        lineTop.classList.remove('active')
        lineMid.classList.remove('active')
        lineBot.classList.remove('active')
        mainNavList.classList.remove('show')
    }
})