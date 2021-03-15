let _didLoad = false;

export const didLoad = () => {
  if(_didLoad) {
    return;
  }
  _didLoad = true;
  setTimeout(() => {
    let el = document.querySelector('.application-loading');
    el.remove();
  }, 150);
}
