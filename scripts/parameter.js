function addQueryParam(key, value) {
    var currentUrl = window.location.href;
    var url = new URL(currentUrl);
    url.searchParams.set(key, value);
    var newUrl = url.href;
    window.history.replaceState(null, null, newUrl);
}
function getParameterValueFromCurrentURL(parameterName) {
    const currentURL = window.location.href;
    const urlObject = new URL(currentURL);
    return urlObject.searchParams.get(parameterName);
  }