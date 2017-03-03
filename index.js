const replaceRefs = (obj, searchStr, replaceStr) => {
  return Object.assign(
    {},
    ...Object.keys(obj).map(k => {
      if (typeof obj[k] === 'object') {
        return {[k]: replaceRefs(obj[k], searchStr, replaceStr)};
      }
      if (k === searchStr) {
        return {[replaceStr]: obj[k]};
      }
      return {[k]: obj[k]};
    })
  );
};

exports.replaceRefsJSON = obj => replaceRefs(obj, '$ref', '_ref');
exports.replaceRefsMongo = obj => replaceRefs(obj, '_ref', '$ref');
