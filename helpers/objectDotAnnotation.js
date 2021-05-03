  function convertToDotAnnotation (obj, newObj={}, prefix="") {

  for(let key in obj) {
      if (typeof obj[key] === "object") {
          convertToDotAnnotation(obj[key], newObj, prefix + key + ".");
      } else {
          newObj[prefix + key] = obj[key];
      }
  }

  return newObj;
}
 exports.toDotAnnotation = convertToDotAnnotation