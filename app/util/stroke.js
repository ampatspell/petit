export const locked = 'rgba(0,0,0,0.15)';
export const editing = 'rgba(255,102,97,0.75)';
export const idle = 'rgba(96,190,253, 0.5)';

export const stroke = (_locked, _editing) => {
  if(_locked) {
    return locked;
  }
  if(_editing) {
    return editing;
  }
  return idle;
};
