export const handleBackspace = (textarea) => {
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

export const handleDel = (textarea) => {
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

export function addKeyupKeydownEvents(keyboardKeys) {
  document.addEventListener('keydown', (event) => {
    const pressedKey = event.key;
    keyboardKeys.forEach((key) => {
      if (key.textContent === pressedKey) {
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
