export const saveInfo = localStorage.setItem(key, JSON.stringify(info));

export const getInfo = JSON.parse(localStorage.getItem(key));
