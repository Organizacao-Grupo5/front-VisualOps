const elements = {
    chartLogo: document.getElementById("chart_logo"),
    tituloDash: document.getElementById("titulo_dash"),
    minimizar: document.getElementById("minimizar"),
    menu: document.getElementById("menu"),
    btnsNav: document.querySelectorAll(".btn-section"),
    sidebar: document.getElementById("sidebar"),
    choseSections: document.querySelectorAll(".chose-section"),
    dashboard: document.getElementById("dashboard"),
    logoSideBar: document.getElementById("logo_sidebar"),
    tituloSideBar: document.getElementById("title_sidebar"),
    menuTitle: document.getElementById("menu_title"),
    topSideBar: document.getElementById("top_sidebar"),
    suporteText: document.getElementById("suporte_text"),
    btnMaximizar: document.getElementById("maximizar")
};

const defaultStyles = {
    btnMax: elements.btnMaximizar.style.display,
    chartLogo: elements.chartLogo.style.opacity,
    tituloDash: elements.tituloDash.classList,
    sidebar: elements.sidebar.style.width,
    dashboard: elements.dashboard.style.width,
    logoSideBarWidth: elements.logoSideBar.style.width,
    logoSideBarMarginTop: elements.logoSideBar.style.marginTop,
    minimizar: elements.minimizar.style.opacity,
    tituloSideBar: elements.tituloSideBar.style.fontSize,
    menuTitleFontSize: elements.menuTitle.style.fontSize,
    menuTitleAlign: elements.menuTitle.style.textAlign,
    menuTitlePadding: elements.menuTitle.style.padding,
    menuTitleBorderTop: elements.menuTitle.style.borderTop,
    menuTitleMarginTop: elements.menuTitle.style.marginTop,
    menuTitleWidth: elements.menuTitle.style.width,
    menuTitleMarginLeft: elements.menuTitle.style.marginLeft,
    suporteTextFontSize: elements.suporteText.style.fontSize,
    suporteTextAlign: elements.suporteText.style.textAlign,
    topSideBarGap: elements.topSideBar.style.gap
};

elements.minimizar.addEventListener("click", () => {
    elements.btnMaximizar.style.display = "block";
    elements.chartLogo.style.opacity = "0";
    elements.tituloDash.classList.toggle('oculto');
    elements.sidebar.style.width = "4%";
    elements.dashboard.style.width = "96%";
    elements.logoSideBar.style.width = "70%";
    elements.logoSideBar.style.marginTop = "5%";
    elements.minimizar.style.opacity = 0;
    elements.tituloSideBar.style.fontSize = "0.3rem";
    elements.menuTitle.style.fontSize = "0.4rem";
    elements.menuTitle.style.textAlign = "center";
    elements.menuTitle.style.padding = "2%";
    elements.menuTitle.style.borderTop = "1px solid #766ec6";
    elements.menuTitle.style.marginTop = "10%";
    elements.menuTitle.style.width = "100%";
    elements.menuTitle.style.marginLeft = "0%";
    elements.suporteText.style.fontSize = "0.33rem";
    elements.suporteText.innerText = "SUPORTE";
    elements.suporteText.style.textAlign = "center";

    elements.topSideBar.style.gap = "5%";
    elements.btnsNav.forEach(e => {
        e.style.opacity = 0;
        setTimeout(() => {
            elements.chartLogo.style.display = "none";
            elements.minimizar.style.display = "none";
            e.style.display = "none";
        }, 300);
    });

});

elements.btnMaximizar.addEventListener("click", () => {
    elements.btnMaximizar.style.display = defaultStyles.btnMax;
    elements.chartLogo.style.opacity = defaultStyles.chartLogo;
    elements.sidebar.style.width = defaultStyles.sidebar;
    elements.tituloDash.classList.remove('oculto');
    elements.tituloDash.classList.add('title-dash');
    elements.dashboard.style.width = defaultStyles.dashboard;
    elements.logoSideBar.style.width = defaultStyles.logoSideBarWidth;
    elements.logoSideBar.style.marginTop = defaultStyles.logoSideBarMarginTop;
    elements.minimizar.style.opacity = defaultStyles.minimizar;
    elements.tituloSideBar.style.fontSize = defaultStyles.tituloSideBar;
    elements.menuTitle.style.fontSize = defaultStyles.menuTitleFontSize;
    elements.menuTitle.style.textAlign = defaultStyles.menuTitleAlign;
    elements.menuTitle.style.padding = defaultStyles.menuTitlePadding;
    elements.menuTitle.style.borderTop = defaultStyles.menuTitleBorderTop;
    elements.menuTitle.style.marginTop = defaultStyles.menuTitleMarginTop;
    elements.menuTitle.style.width = defaultStyles.menuTitleWidth;
    elements.menuTitle.style.marginLeft = defaultStyles.menuTitleMarginLeft;
    elements.suporteText.style.fontSize = defaultStyles.suporteTextFontSize;
    elements.suporteText.innerText = "SUPORTE / CONFIGURAÇÃO";
    elements.suporteText.style.textAlign = "left";

    elements.topSideBar.style.gap = defaultStyles.topSideBarGap;

    elements.btnsNav.forEach(e => {
        e.style.opacity = 1;
        setTimeout(() => {
            elements.chartLogo.style.display = "block";
            elements.minimizar.style.display = "flex";
            e.style.display = "block";
        }, 300);
    });
});

document.getElementById('txt_welcome_user').innerHTML = `BEM-VINDO(A) ${sessionStorage.getItem("nomeUsuario").toUpperCase()}`;
document.getElementById('txt_user_and_interprise').innerHTML = `${sessionStorage.getItem("nomeUsuario").toUpperCase()}<br>${sessionStorage.getItem("nomeEmpresa").toUpperCase()}`;