const track = document.querySelector('.carouselTrack')
const slides = Array.from(track.children)
const nextButton = document.querySelector('.carouselButtonRight')
console.log(nextButton)
const previousButton = document.querySelector('.carouselButtonLeft')

const slideWidth = slides[0].getBoundingClientRect().width

slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px'
})

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-'+ targetSlide.style.left + ')'
  currentSlide.classList.remove('currentSlide')
  targetSlide.classList.add('currentSlide')
}

const buttonIsHidden = (slides, previousButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    previousButton.classList.add('isHidden')
    nextButton.classList.remove('isHidden')
  } else if (targetIndex === slides.length - 1) {
    previousButton.classList.remove('isHidden')
    nextButton.classList.add('isHidden')
  } else {
    previousButton.classList.remove('isHidden')
    nextButton.classList.remove('isHidden')
  }
}

previousButton.addEventListener('click', event => {
  const currentSlide = track.querySelector('.currentSlide')
  const previousSlide = currentSlide.previousElementSibling
  const previousIndex = slides.findIndex(slide => slide === previousSlide)

  moveToSlide(track, currentSlide, previousSlide)
  buttonIsHidden(slides, previousButton, nextButton, previousIndex)
})

nextButton.addEventListener('click', event => {
  const currentSlide = track.querySelector('.currentSlide')
  const nextSlide = currentSlide.nextElementSibling
  const nextIndex = slides.findIndex(slide => slide === nextSlide)


  moveToSlide(track, currentSlide, nextSlide)
  buttonIsHidden(slides, previousButton, nextButton, nextIndex)

})

