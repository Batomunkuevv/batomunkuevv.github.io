//*<WebP>=================================================================================================

//! Проверка поддержки webp, добавление класса webp или no-webp для HTML
export function isWebp() {
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    //! Добавление класса _webp или _no-webp для HTML
    testWebP(function (support) {
        let className = support === true ? "webp" : "no-webp";
        document.documentElement.classList.add(className);
    });
}

//*</WebP>=================================================================================================

//*<Ibg>=================================================================================================

export function ibg() {
    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector("img")) {
            ibg[i].style.backgroundImage =
                "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
        }
    }
}

//*</Ibg>=================================================================================================

//*<Hide element>=================================================================================================

export function hideElement(element) {
    element.classList.add("hide");
    element.classList.remove("show");
}

//*</Hide element>=================================================================================================

//*<Show element>=================================================================================================

export function showElement(element) {
    element.classList.remove("hide");
    element.classList.add("show");
}

//*</Show element>=================================================================================================
