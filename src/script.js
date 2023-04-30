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

const body = document.querySelector('body');
const keyboardContainer = document.createElement('div');
keyboardContainer.classList.add('keyboard');

let capslockActive = false;
let lang = 'eng';

function deleteRows() {
  const rows = document.querySelectorAll('.row');
  rows.forEach((elem) => {
    elem.remove();
  });
}

const drawKeyboard = function (keysArray) {
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
    });
    keyboardContainer.appendChild(rowElement);
  });
};

const switchLang = (lang, capslockActive) => {
  deleteRows();
  if (lang === 'eng' && capslockActive === false) {
    drawKeyboard(KEYS_ENG);
  } else if (lang === 'eng' && capslockActive === true) {
    drawKeyboard(KEYS_ENG_CAPS);
  } else if (lang === 'ru' && capslockActive === false) {
    drawKeyboard(KEYS_RU);
  } else if (lang === 'ru' && capslockActive === true) {
    drawKeyboard(KEYS_RU_CAPS);
  }
  document.body.appendChild(keyboardContainer);
};

switchLang(lang, capslockActive);

// add textarea
const textarea = document.createElement('textarea');
body.insertBefore(textarea, keyboardContainer);
textarea.classList.add('text-area');

const specialKeys = ['Backspace', 'Del', 'Shift', 'Enter', 'Caps Lock', 'Tab', 'Space', 'Alt', 'Ctrl', 'Win'];
const keys = document.querySelectorAll('.key');

const handleBackspace = () => {
  const cursorPos = textarea.selectionStart;
  const value = textarea.value;
  const newValue = value.slice(0, cursorPos - 1) + value.slice(cursorPos);
  if (cursorPos > 0) {
    textarea.value = newValue;
    textarea.selectionStart = cursorPos - 1;
    textarea.selectionEnd = cursorPos - 1;
  }
  textarea.focus();
};

const handleDel = () => {
  const cursorPos = textarea.selectionStart;
  const value = textarea.value;
  const newValue = value.slice(0, cursorPos) + value.slice(cursorPos + 1);
  if (cursorPos < value.length) {
    textarea.value = newValue;
    textarea.selectionStart = cursorPos;
    textarea.selectionEnd = cursorPos;
  }
  textarea.focus();
};

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
        textarea.value += '    ';
        textarea.focus();
      });
    } else if (key.textContent === 'Caps Lock') {
      key.addEventListener('click', () => {
        capslockActive = !capslockActive; // Toggle the state of the Caps Lock
        switchLang(lang, capslockActive);
      });
    } else if (key.textContent === 'Backspace') {
      key.addEventListener('click', handleBackspace);
      window.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace') {
          handleBackspace();
        }
      });
    } else if (key.textContent === 'Del') {
      key.addEventListener('click', handleDel);
      window.addEventListener('keydown', (event) => {
        if (event.key === 'Delete') {
          handleDel();
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

// add onclick event
