const replaceRefs = (obj, searchStr, replaceStr) => {
  if (typeof obj === 'string') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(k => replaceRefs(k, searchStr, replaceStr));
  } else if (typeof obj === 'object') {
    return Object.assign(
      {},
      ...Object.keys(obj).map(k => {
        if (typeof obj[k] === 'object') {
          if (k === searchStr) {
            return {[replaceStr]: replaceRefs(obj[k], searchStr, replaceStr)};
          }
          return {[k]: replaceRefs(obj[k], searchStr, replaceStr)};
        }
        if (k === searchStr) {
          return {[replaceStr]: obj[k]};
        }
        return {[k]: obj[k]};
      })
    );
  }
};

exports.replaceRefsJSON = obj => replaceRefs(obj, '$ref', '_ref');
exports.replaceRefsMongo = obj => replaceRefs(obj, '_ref', '$ref');
