import { useState } from "react";
function toDataUrl(url: any, callback: any) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

function getBase64ImageUrl(image: string) {
  const [state, setstate] = useState("");
  toDataUrl(image, function (myBase64: any) {
    setstate(myBase64);
  });
  return state;
}

export default getBase64ImageUrl;
