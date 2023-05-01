import {
  KEY_CODES,
  KEYS_ENG,
  KEYS_ENG_CAPS,
  KEYS_ENG_SHIFT,
  KEYS_ENG_CAPS_SHIFT,
  KEYS_RU,
  KEYS_RU_SHIFT,
  KEYS_RU_CAPS,
  KEYS_RU_CAPS_SHIFT,
} from './keys.js';

import './style.css';

import {
  addKeyupKeydownEvents,
  addAnimationEvents,
  handleBackspace,
  handleDel,
} from './utils';

const specialKeys = [
  'Backspace',
  'Del',
  'Shift',
  'Enter',
  'Caps Lock',
  'Tab',
  'Space',
  'Alt',
  'Ctrl',
  'Win',
];
const body = document.querySelector('body');
const keyboardContainer = document.createElement('div');
keyboardContainer.classList.add('keyboard');

let lang = 'eng';
const capslockActive = { value: false };
// let shiftState = false;

const setState = (obj, value) => {
  obj.value = value;
};

function deleteRows() {
  const rows = document.querySelectorAll('.row');
  rows.forEach((elem) => {
    elem.remove();
  });
}

const drawKeyboard = function (keysArray) {
  let newKeys = [];
  keysArray.forEach((row) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    row.forEach((key) => {
      const keyElement = document.createElement('div');
      keyElement.classList.add('key');
      keyElement.textContent = key;
      // Add additional classes for special keys
      if (key === 'Backspace') {
        keyElement.classList.add('backspace');
      } else if (key === 'Del') {
        keyElement.classList.add('delete');
      } else if (key === 'Shift') {
        keyElement.classList.add('shift');
      } else if (key === 'Enter') {
        keyElement.classList.add('enter');
      } else if (key === 'Caps Lock') {
        keyElement.classList.add('caps-lock');
      } else if (key === 'Tab') {
        keyElement.classList.add('tab');
      } else if (key === 'Space') {
        keyElement.classList.add('space');
      } else if (key === '/') {
        keyElement.classList.add('backslash');
      } else if (key === '↑') {
        keyElement.classList.add('arrow-up');
      } else if (key === 'Win') {
        keyElement.classList.add('windows');
      } else if (key === 'Ctrl') {
        keyElement.classList.add('ctrl');
      }
      rowElement.appendChild(keyElement);
      newKeys.push(keyElement);
    });
    keyboardContainer.appendChild(rowElement);
  });
  return newKeys;
};

const switchLang = (language, capslocState) => {
  deleteRows();
  let newKeys = [];
  if (language === 'eng' && capslocState === false) {
    // if (shiftIsActive === true) {
    //   newKeys = drawKeyboard(KEYS_ENG_SHIFT);
    // }
    newKeys = drawKeyboard(KEYS_ENG);
  } else if (language === 'eng' && capslocState === true) {
    // if (shiftIsActive === true) {
    //   newKeys = drawKeyboard(KEYS_ENG_CAPS_SHIFT);
    // }
    newKeys = drawKeyboard(KEYS_ENG_CAPS);
  } else if (language === 'ru' && capslocState === false) {
    // if (shiftIsActive === true) {
    //   newKeys = drawKeyboard(KEYS_RU_SHIFT);
    // }
    newKeys = drawKeyboard(KEYS_RU);
  } else if (language === 'ru' && capslocState === true) {
    // if (shiftIsActive === true) {
    //   newKeys = drawKeyboard(KEYS_RU_CAPS_SHIFT);
    // }
    newKeys = drawKeyboard(KEYS_RU_CAPS);
  }

  document.body.appendChild(keyboardContainer);

  return newKeys;
};

function addOnclickEvents(textarea, keys) {
  keys.forEach((key) => {
    if (specialKeys.includes(key.textContent)) {
      if (key.textContent === 'Space') {
        key.addEventListener('click', () => {
          textarea.value += ' ';
          textarea.focus();
        });
      } else if (key.textContent === 'Enter') {
        key.addEventListener('click', () => {
          textarea.value += '\n';
          textarea.focus();
        });
      } else if (key.textContent === 'Tab') {
        key.addEventListener('click', () => {
          textarea.value += '    '; // '\t'
          textarea.focus();
        });
      } else if (key.textContent === 'Caps Lock') {
        key.addEventListener('click', () => {
          setState(capslockActive, !capslockActive.value);
          const newKeys = switchLang(lang, capslockActive.value);
          addKeyupKeydownEvents(newKeys);
          addAnimationEvents(newKeys);
          addOnclickEvents(textarea, newKeys);
        });
      } else if (key.textContent === 'Backspace') {
        key.addEventListener('click', () => {
          handleBackspace(textarea);
        });
        window.addEventListener('keydown', (event) => {
          if (event.key === 'Backspace') {
            handleBackspace(textarea);
          }
        });
      } else if (key.textContent === 'Del') {
        key.addEventListener('click', () => {
          handleDel(textarea);
        });
        document.addEventListener('keydown', (event) => {
          if (event.key === 'Delete') {
            handleDel(textarea);
          }
        });
      }
    } else {
      key.addEventListener('click', () => {
        const value = key.textContent;
        textarea.value += value;
        textarea.focus();
      });
    }
  });
}

// const keys = document.querySelectorAll('.key');
const keys = switchLang(lang, capslockActive.value);

// add textarea
const textarea = document.createElement('textarea');
body.insertBefore(textarea, keyboardContainer);
textarea.classList.add('text-area');

addKeyupKeydownEvents(keys);
addAnimationEvents(keys);
addOnclickEvents(textarea, keys);

document.addEventListener('keydown', (event) => {
  if (event.key === 'CapsLock') {
    setState(capslockActive, !capslockActive.value);
    const newKeys = switchLang(lang, capslockActive.value);
    newKeys.forEach((key) => {
      if (key.textContent === 'Caps Lock') {
        key.classList.add('highlighted');
      }
    });
    addKeyupKeydownEvents(newKeys);
    addAnimationEvents(newKeys);
    addOnclickEvents(textarea, newKeys);
  }
});

document.addEventListener('keydown', (event) => {
  console.log(event);
  if (event.shiftKey === true && event.altKey === true) {
    setState(capslockActive, capslockActive.value);
    if (lang === 'eng') {
      lang = 'ru';
      const newKeys = switchLang(lang, capslockActive.value);
      addKeyupKeydownEvents(newKeys);
      addAnimationEvents(newKeys);
      addOnclickEvents(textarea, newKeys);
    } else if (lang === 'ru') {
      lang = 'eng';
      const newKeys = switchLang(lang, capslockActive.value);
      addKeyupKeydownEvents(newKeys);
      addAnimationEvents(newKeys);
      addOnclickEvents(textarea, newKeys);
    }
  }
  // if (event.key === 'Shift') {
  //   shiftState = true;
  //   const newKeys = switchLang(lang, capslockActive.value, );
  //   addKeyupKeydownEvents(newKeys);
  //   addAnimationEvents(newKeys);
  //   addOnclickEvents(textarea, newKeys);
  // }
});
