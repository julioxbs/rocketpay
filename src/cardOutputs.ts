import {brandOfCard, cardIsValid, formatCreditCardNumbers, formatDate} from "./formValidation";

const cardNumbers = (document.querySelector("#card__numbers") as HTMLElement);
const cardBrand = (document.querySelector("#card__brand") as HTMLImageElement);
const cardName = (document.querySelector("#card__name") as HTMLElement);
const cardDate = (document.querySelector("#card__date") as HTMLElement);
const cardSecurity = (document.querySelector("#card__cvv") as HTMLElement);
const btn = (document.querySelector("button") as HTMLButtonElement);

document.querySelector("#number")?.addEventListener("input", (e: Event) => {
    const target = (e.target as HTMLInputElement);

    if (target.value === '') return cardNumbers.textContent = "0000 0000 0000 0000"

    if (target.value.length > 16) {
        return "";
    } else {
        cardNumbers.textContent = formatCreditCardNumbers(e);
        if (brandOfCard(e) != 'undefined') {
            return cardBrand.src = `./src/assets/${brandOfCard(e)}.svg`;
        } else {
            return cardBrand.src = "";
        }
    }
});

document.querySelector("#name")?.addEventListener("input", (e: Event) => {
    const target = (e.target as HTMLInputElement);
    if (target.value.length < 83) {
        cardName.innerText = target.value;
    }
});

document.querySelector("#date")?.addEventListener("input", (e: Event) => {
    return cardDate.innerText = formatDate(e);
});

document.querySelector("#cvv")?.addEventListener("input", (e: Event) => {
    const target = (e.target as HTMLInputElement);
    if (target.value.length <= 4) {
        return cardSecurity.innerText = target.value;
    } else if (target.value === "") {
        return cardSecurity.innerText = '000';
    }
    return;
});

btn.addEventListener("click", async () => {
    await cardIsValid().then(res => {
        if (res) {
            document.querySelector("#modal")?.classList.remove("hidden");
        }
    });
});

function clearInputs() {
    document.querySelectorAll("input")?.forEach((el: HTMLInputElement) => {
        el.value = ""
    });

    cardNumbers.textContent = "0000 0000 0000 0000";
    cardBrand.src = "";
    cardName.innerText = "your name";
    cardSecurity.innerText = '000';
    cardDate.innerText = "00/00"
}

document.querySelector("#close__btn")?.addEventListener("click", () => {
    document.querySelector("#modal")?.classList.add("hidden");
    clearInputs();
});