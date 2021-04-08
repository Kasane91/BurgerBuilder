export const checkValidity = (value, rules) => {
  let isValid = false;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "";
  }

  if (rules.minLength) {
    isValid = value.length > 6 && isValid;
  }

  if (rules.validZip) {
    isValid = value.length >= 4 && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
