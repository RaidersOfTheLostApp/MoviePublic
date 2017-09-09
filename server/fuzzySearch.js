'use strict';

const fuzzysearch = (query, list) => {
  var listLen = list.length;
  var queryLen = query.length;
  if (queryLen > listLen) {
    return false;
  }
  if (nlen === hlen) {
    return needle === haystack;
  }
  outer: for (var i = 0, j = 0; i < nlen; i++) {
    var nch = needle.charCodeAt(i);
    while (j < hlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
};

module.exports = fuzzysearch;
