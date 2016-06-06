import 'prismjs';
import '!style!css!prismjs/themes/prism.css';


// import '!style!css!postcss!sass!../styles/styleguide.scss';

console.log('styleguide loaded');

var SELECTORS = {
  hideCodeBtn  : '.js-styleguide-hide-code',
  showCodeBtn  : '.js-styleguide-show-code',
  codeContainer: '.js-styleguide-code'
};

const hideCodeButtonEl = document.querySelector(SELECTORS.hideCodeBtn);
const showCodeButtonEl = document.querySelector(SELECTORS.showCodeBtn);


hideCodeButtonEl.addEventListener('click', hideCode);
showCodeButtonEl.addEventListener('click', showCode);


function hideCode () {
  const codeContainerElements = document.querySelectorAll(SELECTORS.codeContainer);
  Array.prototype.forEach.call(codeContainerElements, (el) => {
    addClass(el, 'is-hidden');
  });
  addClass(hideCodeButtonEl, 'is-hidden');
  removeClass(showCodeButtonEl, 'is-hidden');
}

function showCode () {
  const codeContainerElements = document.querySelectorAll(SELECTORS.codeContainer);
  Array.prototype.forEach.call(codeContainerElements, (el) => {
    removeClass(el, 'is-hidden');
  });
  addClass(showCodeButtonEl, 'is-hidden');
  removeClass(hideCodeButtonEl, 'is-hidden');
}

function addClass(el, classname) {
  el.classList.add(classname);
}

function removeClass (el, classname) {
  el.classList.remove(classname);
}
