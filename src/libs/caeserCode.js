export function caeserEncode(str, shift) {
  let result = "";
  shift = shift % 26;
  const aCode = "a".charCodeAt(0);
  const zCode = "z".charCodeAt(0);
  const ACode = "A".charCodeAt(0);
  const ZCode = "Z".charCodeAt(0);
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c >= aCode && c <= zCode) {
      result += String.fromCharCode(((c - aCode + shift) % 26) + aCode);
    } else if (c >= ACode && c <= ZCode) {
      result += String.fromCharCode(((c - ACode + shift) % 26) + ACode);
    } else {
      result += str.charAt(i);
    }
  }

  return result;
}

export function caeserDecode(str, shift) {
  let result = "";
  shift = shift % 26;
  const aCode = "a".charCodeAt(0);
  const zCode = "z".charCodeAt(0);
  const ACode = "A".charCodeAt(0);
  const ZCode = "Z".charCodeAt(0);
  for (var i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);

    if (c >= aCode && c <= zCode) {
      result += String.fromCharCode(((c - aCode - shift + 26) % 26) + aCode);
    } else if (c >= ACode && c <= ZCode) {
      result += String.fromCharCode(((c - ACode - shift + 26) % 26) + ACode);
    } else {
      result += str.charAt(i);
    }
  }

  return result;
}
