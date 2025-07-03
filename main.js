console.log('main');

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    navigator.wakeLock.request('screen');
  }
});

navigator.wakeLock.request('screen');
