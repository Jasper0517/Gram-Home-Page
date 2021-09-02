let currentButton = '#home'
let isLockButton = false

// 我所有的按鈕
const allLinks = [...document.getElementsByClassName('button')]
const allDots = [...document.getElementsByClassName('dot')]

const allSections = [...document.getElementsByClassName('section')]

const clickFunction = ({ target, isLock = true }) => {
  // 當點擊按鈕時停整呼叫io
  if (isLock) isLockButton = true
  // 單前的class名稱
  const classList = [...target.classList]

  // 找出上一個被點擊的按鈕
  const beforeActiveButton = allLinks.find(button => {
    return [...button.classList].includes('active')
  })

  // 找出上一個被點擊的按鈕
  const beforeActiveDot = allDots.find(button => {
    return [...button.classList].includes('active')
  })

  // 移除已經active的按鈕 且不相等同一顆按鈕
  if (beforeActiveButton && target.attributes.href.value !== currentButton) {
    console.log('in', isLock)
    beforeActiveButton.classList.remove('active')
  }

  // 移除已經active的按鈕 且不相等同一顆按鈕
  if (beforeActiveDot && target.attributes.href.value !== currentButton) {
    beforeActiveDot.classList.remove('active')
  }

  // 如果該按鈕沒被點擊時候，加上active class
  if (!classList.includes('active')) target.classList.add('active')

  // 存下當前被點擊的按鈕
  currentButton = target.attributes.href.value

  // 1.5秒後解鎖io
  if (isLock) {
    setTimeout(() => {
      isLockButton = false
    }, 1500)
  }
}


// 所有按鈕綁定監聽
// allLinks.forEach((_, index) => allLinks[index].addEventListener('click', clickFunction))
// allDots.forEach((_, index) => allDots[index].addEventListener('click', clickFunction))


// window.onscroll = myFunction;
  
// const header = document.getElementById("myHeader");
// const sticky = header.offsetTop;

// function myFunction(e) {
//   console.log('e: ', e);
// };


let options = [
  {
    // root: document.getElementsByTagName('body')[0],
    threshold: [0.5]
  },
  {
    // root: document.getElementsByTagName('body')[0],
    threshold: [0.5]
  },
  {
    // root: document.getElementsByTagName('body')[0],
    // rootMargin: "60px 0px 0px 0px",
    threshold: [0.5]
  },
  {
    // root: document.getElementsByTagName('body')[0],
    threshold: [0.5]
  }
]

let callback = (entries, observer) => {
  entries.forEach(entry => {
    // console.log(entry)
    const { intersectionRatio, isIntersecting, isVisible, target } = entry
    
    
    if (isIntersecting && !isLockButton) {
      clickFunction({ isLock: false, target: allLinks.find(link => `#${target.id}` === link.attributes.href.value) })
      clickFunction({ isLock: false, target: allDots.find(link => `#${target.id}` === link.attributes.href.value) })
    }
    if (intersectionRatio === 0 && !isIntersecting && !isVisible && target.id === 'serve' && !isLockButton) {
      allLinks.forEach(link => link.classList.remove('active'))
      allDots.forEach(dot => dot.classList.remove('active'))
    }
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  });
};

allSections.forEach((element, index) => {
  let observerInstance = new IntersectionObserver(callback, options[index]);
  observerInstance.observe(element)
})

