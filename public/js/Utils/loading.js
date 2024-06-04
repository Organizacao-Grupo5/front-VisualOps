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

const showPopup = (title, content, type) => {
  const popup = document.createElement("div");
  popup.className = "custom-popup";

  const popupContent = document.createElement("div");
  popupContent.className = `custom-popup-content ${type}`;

  const closeButton = document.createElement("span");
  closeButton.className = "custom-popup-close-btn";
  closeButton.innerHTML = "&times;";
  closeButton.onclick = () => {
    document.body.removeChild(popup);
  };

  const popupTitle = document.createElement("h2");
  popupTitle.innerText = title;

  const popupBody = document.createElement("p");
  popupBody.innerText = content;

  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";

  popupContent.appendChild(closeButton);
  popupContent.appendChild(popupTitle);
  popupContent.appendChild(popupBody);
  popupContent.appendChild(progressBar);

  popup.appendChild(popupContent);
  document.body.appendChild(popup);

  setTimeout(() => {
    document.body.removeChild(popup);
  }, 3000);
};

const hidePopup = (popup) => {
  document.body.removeChild(popup);
};

export default {
  showLoadingPopup,
  hideLoadingPopup,
  showPopup,
  hidePopup,
};
