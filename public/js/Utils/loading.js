const showLoadingPopup = () => {
  const popup = document.createElement("div");
  popup.id = "popup-loading";

  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");

  const loadingIcon = document.createElement("img");
  loadingIcon.src = "../assets/img/loading.webp";
  loadingIcon.alt = "Loading";
  loadingIcon.classList.add("loading-icon");

  const loadingText = document.createElement("p");
  loadingText.textContent = "Carregando...";
  loadingText.classList.add("loading-text");

  popupContent.appendChild(loadingIcon);
  popupContent.appendChild(loadingText);

  popup.appendChild(popupContent);
  document.body.appendChild(popup);

  setInterval(() => {
    loadingText.classList.toggle("tracking-in-contract");
    loadingText.classList.toggle("tracking-out-expand");
  }, 2500);
};

const hideLoadingPopup = () => {
  const popup = document.getElementById("popup-loading");
  if (popup) {
    popup.remove();
  }
};

export default {
  showLoadingPopup,
  hideLoadingPopup
};