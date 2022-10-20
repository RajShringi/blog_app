const ROOT_URL = "https://mighty-oasis-08080.herokuapp.com/api";
const articleURL = ROOT_URL + "/articles";
const singupURL = ROOT_URL + "/users";
const loginURL = ROOT_URL + "/users/login";
const localStorageKey = "app_user";
const userVerify = ROOT_URL + "/user";
const feedURL = articleURL + "/feed";

export {
  ROOT_URL,
  articleURL,
  singupURL,
  loginURL,
  localStorageKey,
  userVerify,
  feedURL,
};
