export const handleBackspace = (textarea) => {
  const { value, selectionStart } = textarea;
  const newValue = value.slice(0, selectionStart - 1) + value.slice(selectionStart);

  if (selectionStart > 0) {
    textarea.value = newValue;
    textarea.selectionStart = selectionStart - 1;
    textarea.selectionEnd = selectionStart - 1;
  }
  textarea.focus();
};

export const handleDel = (textarea) => {
  const { value, selectionStart: cursorPos } = textarea;
  const newValue = value.slice(0, cursorPos) + value.slice(cursorPos + 1);

  if (cursorPos < value.length) {
    textarea.value = newValue;
    textarea.selectionStart = cursorPos;
    textarea.selectionEnd = cursorPos;
  }
  textarea.focus();
};

export function addKeyupKeydownEvents(keyboardKeys) {
  const ctrls = document.querySelectorAll('.ctrl');

  ctrls[0].classList.add('controlLeft');
  ctrls[1].classList.add('controlRight');

  document.addEventListener('keydown', (event) => {
    const pressedKey = event.key;
    keyboardKeys.forEach((key) => {
      if (key.textContent === pressedKey) {
        key.classList.add('highlighted');
      }
      if (event.code === 'Space' && key.textContent === 'Space') {
        key.classList.add('highlighted');
      }
      if (key.textContent === '↑' && pressedKey === 'ArrowUp') {
        key.classList.add('highlighted');
      }
      if (key.textContent === '←' && pressedKey === 'ArrowLeft') {
        key.classList.add('highlighted');
      }
      if (key.textContent === '↓' && pressedKey === 'ArrowDown') {
        key.classList.add('highlighted');
      }
      if (key.textContent === '→' && pressedKey === 'ArrowRight') {
        key.classList.add('highlighted');
      }
      if (key.textContent === 'Del' && pressedKey === 'Delete') {
        key.classList.add('highlighted');
      }
      if (key.textContent === 'Ctrl' && pressedKey === 'Control') {
        key.classList.add('highlighted');
      }
      if (key.textContent === 'Win' && pressedKey === 'Meta') {
        key.classList.add('highlighted');
      }
    });
  });

  document.addEventListener('keyup', (event) => {
    const releasedKey = event.key;
    keyboardKeys.forEach((key) => {
      if (key.textContent === releasedKey) {
        key.classList.remove('highlighted');
      }
      if (event.code === 'Space' && key.textContent === 'Space') {
        key.classList.remove('highlighted');
      }
      if (key.textContent === '↑' && releasedKey === 'ArrowUp') {
        key.classList.remove('highlighted');
      }
      if (key.textContent === '←' && releasedKey === 'ArrowLeft') {
        key.classList.remove('highlighted');
      }
      if (key.textContent === '↓' && releasedKey === 'ArrowDown') {
        key.classList.remove('highlighted');
      }
      if (key.textContent === '→' && releasedKey === 'ArrowRight') {
        key.classList.remove('highlighted');
      }
      if (key.textContent === 'Del' && releasedKey === 'Delete') {
        key.classList.remove('highlighted');
      }
      if (key.textContent === 'Ctrl' && releasedKey === 'Control') {
        key.classList.remove('highlighted');
      }
      if (key.textContent === 'Win' && releasedKey === 'Meta') {
        key.classList.remove('highlighted');
      }
    });
  });
}

export function addAnimationEvents(keyboardKeys) {
  keyboardKeys.forEach((key) => {
    key.addEventListener('mousedown', () => {
      key.classList.add('highlighted');
    });
    key.addEventListener('mouseup', () => {
      key.classList.remove('highlighted');
    });
  });
}
