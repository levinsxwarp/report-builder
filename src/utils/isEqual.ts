const isObject = (obj: any): boolean => {
  return obj !== null && typeof obj === "object";
};

const isEqual = (value1: any, value2: any): boolean => {
  if (value1 === value2) {
    return true;
  }

  if (isObject(value1) && isObject(value2)) {
    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (value1.length !== value2.length) {
        return false;
      }
      for (let i = 0; i < value1.length; i++) {
        if (!isEqual(value1[i], value2[i])) {
          return false;
        }
      }
      return true;
    } else {
      const keys1 = Object.keys(value1);
      const keys2 = Object.keys(value2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (let key of keys1) {
        if (!keys2.includes(key) || !isEqual(value1[key], value2[key])) {
          return false;
        }
      }
      return true;
    }
  }

  return false;
};

export default isEqual;
