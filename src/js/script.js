"use strict";

//*<Import>=====================================================================================================

import * as myFunctions from "./modules/functions.js";

//*</Import>====================================================================================================

window.addEventListener("DOMContentLoaded", () => {
    //*<Web-p>=================================================================================================

    myFunctions.isWebp();

    //*</Web-p>=================================================================================================

    //*<Menu>=================================================================================================

    const burger = document.querySelector(".mainscreen__burger"),
        menuClose = document.querySelector(".menu__close"),
        menu = document.querySelector(".mainscreen__menu"),
        menuItems = menu.querySelectorAll(".menu__item"),
        overlay = document.querySelector(".overlay");

    function menuOpen() {
        menu.classList.add("mainscreen__menu_active");
        myFunctions.showElement(overlay);
        document.body.classList.add("lock");
    }

    function menuCloses() {
        menu.classList.remove("mainscreen__menu_active");
        myFunctions.hideElement(overlay);
        document.body.classList.remove("lock");
    }

    burger.addEventListener("click", () => {
        menuOpen();
    });

    menuClose.addEventListener("click", () => {
        menuCloses();
    });

    menuItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            menuCloses();
            myFunctions.scrollTo(e.target);
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
            menuCloses();
        }
    });

    //*</Menu>=================================================================================================

    //*<Mainscreen-Btn>=================================================================================================

    const mainscreenBtn = document.querySelectorAll(".mainscreen__btn");

    mainscreenBtn.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            myFunctions.scrollTo(e.target);
        });
    });

    //*</Mainscreen-Btn>=================================================================================================

    //*<Progress>=================================================================================================

    const progressItemProcent = document.querySelectorAll(".progress-item__procent"),
        progressItemLine = document.querySelectorAll(".progress-item__line span");

    progressItemProcent.forEach((item, i) => {
        progressItemLine[i].style.cssText = `width: ${item.textContent}`;
    });

    //*</Progress>=================================================================================================

    //*<Sidepanel>=================================================================================================

    const sidePanel = document.querySelector(".sidepanel"),
        sidePanelDivider = sidePanel.querySelector(".sidepanel__divider");

    window.addEventListener("scroll", (e) => {
        if (document.documentElement.scrollTop > 600) {
            sidePanel.style.cssText = "color: #000;";
            sidePanelDivider.style.cssText = "background: #000";
            myFunctions.showElement(pageUp);
        } else {
            myFunctions.hideElement(pageUp);
            sidePanel.style.cssText = "color: #fff;";
            sidePanelDivider.style.cssText = "background: #fff";
        }
    });

    //*</Sidepanel>=================================================================================================

    //*<Pageup>=================================================================================================

    const pageUp = document.querySelector(".pageup");

    pageUp.addEventListener("click", (e) => {
        e.preventDefault();

        myFunctions.scrollTo(pageUp);
    });

    //*</Pageup>=================================================================================================

    //*<Modal>=================================================================================================

    const modalOverlay = document.querySelector(".overlay_modal"),
        modalThanks = modalOverlay.querySelector(".modal__thanks"),
        modalThanksClose = modalThanks.querySelector(".modal-thanks__close");

    function openModalThanks() {
        myFunctions.showElement(modalOverlay);
        myFunctions.showElement(modalThanks);
        document.body.classList.add("lock");
    }

    function closeModal() {
        myFunctions.hideElement(modalThanks);
        myFunctions.hideElement(modalOverlay);
        document.body.classList.remove("lock");
    }

    modalThanksClose.addEventListener("click", () => {
        closeModal();
    });

    window.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
            closeModal();
        }
    });

    //*</Modal>=================================================================================================

    //*<Form Validate>=================================================================================================

    const form = document.querySelector(".form"),
        MIN_NAME_LENGTH = 2;

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);
        let formData = new FormData(form); //! Вытягивание из полей

        if (error === 0) {
            form.classList.add("_sending");
            let response = await fetch("sendmail.php", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                openModalThanks();
                form.reset();
                form.classList.remove("_sending");
            } else {
                alert("Ошибка");
                form.classList.remove("_sending");
            }
        } else {
            alert("Заполните обязательные поля");
        }
    }

    function formAddError(input) {
        input.classList.add("_error");
        input.parentElement.classList.add("_error");
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");
    }

    function isIncorrectEmail(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function isIncorrectName(input) {
        return input.value.length < MIN_NAME_LENGTH;
    }

    function formValidate(form) {
        let error = 0;
        // Тут можно прочитать по работе с формами https://learn.javascript.ru/forms-controls
        // Также ты можешь полям установить атрибут required и тогда пользователь не сможет отправить форму, если поля не заполнены
        let formReq = form.querySelectorAll("._req");

        formReq.forEach((item, i) => {
            const input = formReq[i];

            formRemoveError(input);

            if (input.classList.contains("_email")) {
                if (isIncorrectEmail(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (isIncorrectName(input)) {
                formAddError(input);
                error++;
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }
        });

        return error;
    }

    form.addEventListener("submit", formSend);

    //*</Form Validate>=================================================================================================
});
