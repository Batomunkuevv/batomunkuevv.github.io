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

//*<Hide element>=================================================================================================

export function hideElement(element) {
    element.classList.add("hide");
    element.classList.remove("show");
    element.classList.remove("fadeOut");
}

//*</Hide element>=================================================================================================

//*<Show element>=================================================================================================

export function showElement(element) {
    element.classList.remove("hide");
    element.classList.add("show");
    element.classList.add("fadeIn");
}

//*</Show element>=================================================================================================

//*<Scroll-to>=================================================================================================

export function scrollTo(element, offset = 0) {
    let href = element.getAttribute("href").substring(1);

    const scrollTarget = document.getElementById(href),
        topOffset = offset,
        elementPosition = scrollTarget.getBoundingClientRect().top,
        offsetPosition = elementPosition - topOffset; //! const topOffset = 0; // если не нужен отступ сверху

    window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
    });
}

//*</Scroll-to>=================================================================================================
