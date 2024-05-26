const showLoadingPopup = () => {
  const popup = document.createElement("div");
  popup.id = "popup-loading";

  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");
  
  popupContent.classList.add("slide-in-elliptic-top-fwd")

  const loadingIcon = document.createElement("img");
  loadingIcon.src = "../assets/img/loading.webp";
  loadingIcon.alt = "Loading";
  loadingIcon.classList.add("loading-icon");

  const loadingText = document.createElement("p");
  loadingText.style.width = "220px"
  loadingText.style.fontSize = "18px"
  loadingText.textContent = "Carregando...";
  loadingText.classList.add("tracking-in-contract");

  setInterval(() => {
    loadingText.style.fontSize = "18px"
      loadingText.classList.remove("tracking-out-expand");
      loadingText.classList.add("tracking-in-contract");
  }, 2000);
  
  setInterval(() => {
    loadingText.style.fontSize = "7px"
    loadingText.classList.remove("tracking-in-contract");
    loadingText.classList.add("tracking-out-expand");
  }, 3000);
  

  popupContent.appendChild(loadingIcon);
  popupContent.appendChild(loadingText);

  popup.appendChild(popupContent);

  document.body.appendChild(popup);
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
}
