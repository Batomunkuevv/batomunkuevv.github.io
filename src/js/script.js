"use strict";

//*<Import>=====================================================================================================

import * as myFunctions from "./modules/functions.js";

//*</Import>====================================================================================================

window.addEventListener("DOMContentLoaded", () => {
    //*<Functions>=================================================================================================

    myFunctions.ibg();
    myFunctions.isWebp();

    //*</Functions>=================================================================================================

    //*<Menu>=================================================================================================

    const burger = document.querySelector(".mainscreen__burger"),
        menuClose = document.querySelector(".menu__close"),
        menu = document.querySelector(".mainscreen__menu"),
        overlay = document.querySelector(".overlay");

    function menuOpen() {
        menu.classList.add("mainscreen__menu_active");
        overlay.classList.add("fadeIn");
        overlay.classList.remove("hide");
        document.body.classList.add("lock");
    }

    function menuCloses() {
        menu.classList.remove("mainscreen__menu_active");
        overlay.classList.add("hide");
        overlay.classList.remove("fadeIn");
        document.body.classList.remove("lock");
    }

    burger.addEventListener("click", () => {
        menuOpen();
    });

    menuClose.addEventListener("click", () => {
        menuCloses();
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
            menuCloses();
        }
    });
    //*</Menu>=================================================================================================

    //*<Progress>=================================================================================================

    const progressItemProcent = document.querySelectorAll(".progress-item__procent"),
        progressItemLine = document.querySelectorAll(".progress-item__line span");

    progressItemProcent.forEach((item, i) => {
        progressItemLine[i].style.cssText = `width: ${item.textContent}`;
    });
    //*</Progress>=================================================================================================
});
