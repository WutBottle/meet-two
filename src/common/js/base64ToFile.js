function base64ToFile(urlData, fileName) {
  let arr = urlData.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bytes = atob(arr[1]); // 解码base64
  let n = bytes.length;
  let ia = new Uint8Array(n);
  while (n--) {
    ia[n] = bytes.charCodeAt(n);
  }
  const u = navigator.userAgent;
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isiOS) {
    const blob = new Blob([ia], { type: mime });
    return new File([blob], fileName, {type: mime});
  } else {
    return new File([ia], fileName, {type: mime});
  }
}

export default base64ToFile;