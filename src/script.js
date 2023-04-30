import {
  KEY_CODES,
  KEYS_EN,
  KEYS_EN_CAPS,
  KEYS_EN_SHIFT,
  KEYS_EN_CAPS_SHIFT,
  KEYS_RU,
  KEYS_RU_SHIFT,
  KEYS_RU_CAPS,
  KEYS_RU_CAPS_SHIFT,
} from './keys.js';

import './style.css';

const body = document.querySelector('body');
const keyboardContainer = document.createElement('div');
keyboardContainer.classList.add('keyboard');

// Create the keyboard container element

KEYS_EN.forEach((row) => {
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
    } else if (key === '\\') {
      keyElement.classList.add('backslash');
    } else if (key === '↑') {
      keyElement.classList.add('arrow-up');
    } else if (key === '&#x25CF;') {
      keyElement.classList.add('windows');
    } else if (key === 'Ctrl') {
      keyElement.classList.add(
        `${key.toLowerCase().replace(' ', '-')}-left`,
        `${key.toLowerCase().replace(' ', '-')}-right`,
      );
    }

    rowElement.appendChild(keyElement);
  });

  keyboardContainer.appendChild(rowElement);
});

document.body.appendChild(keyboardContainer);

// add textarea
const textarea = document.createElement('textarea');
body.insertBefore(textarea, keyboardContainer);
textarea.classList.add('text-area');

const keys = document.querySelectorAll('.key');
keys.forEach((key) => {
  key.addEventListener('click', () => {
    const value = key.textContent;
    textarea.value += value;
  });
});
