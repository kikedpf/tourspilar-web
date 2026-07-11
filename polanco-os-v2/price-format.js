(function () {
  'use strict';

  const selector = '[data-price-input]';
  const onlyDigits = value => String(value ?? '').replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  const withDots = digits => digits ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';

  function digitCountBefore(value, cursor) {
    return (String(value).slice(0, cursor).match(/\d/g) || []).length;
  }

  function cursorAfterDigits(value, digitCount) {
    if (digitCount <= 0) return 0;
    let seen = 0;
    for (let index = 0; index < value.length; index += 1) {
      if (/\d/.test(value[index])) {
        seen += 1;
        if (seen === digitCount) return index + 1;
      }
    }
    return value.length;
  }

  function formatLive(input) {
    const original = input.value;
    const selectionStart = input.selectionStart ?? original.length;
    const digitsBeforeCursor = digitCountBefore(original, selectionStart);
    const formatted = withDots(onlyDigits(original));

    input.value = formatted;

    const nextCursor = cursorAfterDigits(formatted, digitsBeforeCursor);
    requestAnimationFrame(() => {
      try { input.setSelectionRange(nextCursor, nextCursor); } catch (_) {}
    });
  }

  document.addEventListener('input', event => {
    const input = event.target.closest?.(selector);
    if (input) formatLive(input);
  });

  document.addEventListener('focusin', event => {
    const input = event.target.closest?.(selector);
    if (!input) return;
    input.value = withDots(onlyDigits(input.value));
    requestAnimationFrame(() => {
      try { input.setSelectionRange(0, input.value.length); } catch (_) {}
    });
  });

  document.addEventListener('focusout', event => {
    const input = event.target.closest?.(selector);
    if (input) input.value = withDots(onlyDigits(input.value));
  });
})();
