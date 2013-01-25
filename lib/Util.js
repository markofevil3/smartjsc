function Util() {
};

Util.sortByProperties = function(properties, type) {
  return function (a, b) {
    var index = 0;
    while (index < properties.length && a[properties[index]] == b[properties[index]]) {
      index++;
    }
    if (index == properties.length) {
      return 0;
    } else {
      if (type == 'asc') {
        return a[properties[index]] < b[properties[index]] ? -1 : 1;
      } else {
        return a[properties[index]] < b[properties[index]] ? 1 : -1;
      }
    }
  }
};

Util.createUUID = function() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
};

Util.formatDate = function(value) {
  value = new Date(value);
  return value.getDate() + "-" + (value.getMonth() + 1) + "-" + (value.getYear() + 1900);
}

module.exports = Util;