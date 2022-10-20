import JustValidate from 'just-validate';

const validate = new JustValidate('#form');
const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
const string = /[azAZ]/;
const numbers = /[0-9]/

validate.addField("#number", [
    {
        // @ts-ignore
        rule: 'required',
        errorMessage: "the input is required"
    },
    {
        // @ts-ignore
        rule: "minLength",
        value: 16,
        errorMessage: "invalid length"
    },
    {
        // @ts-ignore
        rule: "maxLength",
        value: 16,
        errorMessage: "invalid length"
    },
    {
        validator: (value: string | boolean) => {
            const containSpecialChar: boolean = specialChar.test(String(value));
            const containString: boolean = string.test(String(value));
            return (!(containSpecialChar || containString));
        },
        errorMessage: "contain invalid character(s)"
    },
    {
        validator: (value: string | any) => {
            const firstNumber = value.split('')[0];

            if (firstNumber === String(4) || firstNumber === String(5)) {
                return true;
            }
            return false;
        },
        errorMessage: "number invalid"
    },
]).addField("#name", [
    {
        validator: (value: string | boolean) => {
            const containNumbers = numbers.test(String(value));
            const containSpecialChar = specialChar.test(String(value));
            return (!(containNumbers || containSpecialChar));
        },
        errorMessage: "contain invalid character(s)"
    },
    {
        // @ts-ignore
        rule: "required",
        errorMessage: "the input is required"
    },
    {
        // @ts-ignore
        rule: "minLength",
        errorMessage: "invalid length",
        value: 7,
    },
    {
        // @ts-ignore
        rule: "maxLength",
        errorMessage: "invalid length",
        value: 83,
    }
]).addField("#cvv", [
    {
        // @ts-ignore
        rule: "minLength",
        value: 3,
        errorMessage: "invalid length"
    },
    {
        // @ts-ignore
        rule: "maxLength",
        value: 4,
        errorMessage: "invalid length"
    },
    {
        // @ts-ignore
        rule: "required",
        errorMessage: "the input is required"
    }
]).addField("#date", [
    {
        // @ts-ignore
        rule: "required",
        errorMessage: "the input is required"
    }
]);

export function brandOfCard(e: any): string {
    const isVisa = /^4\d{0,15}/.test(e.target.value);
    const masterCard = /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/.test(e.target.value);

    if (isVisa) {
        return 'visa'
    } else if (masterCard) {
        return 'master'
    } else {
        return 'undefined'
    }
}

export function formatCreditCardNumbers(e: any) {
    return e.target.value.replace(/(.{4})/g, "$1 ")
}

export function formatDate(e: any) {
    const date = e.target.value.split('-').reverse();
    return `${date[0]}/${date[1].slice(2)}`;
}

export function cardIsValid() {
    const msgError = "just-validate-error-field";
    let isValid = false;

    return new Promise((resolve) => {
        setTimeout(resolve, 500)
    }).then(() => {
        const numberContainMsg = document.querySelector("#number")?.classList[0];
        const nameContainMsg = document.querySelector("#name")?.classList[0];
        const dateContainMsg = document.querySelector("#date")?.classList[0];
        const securityContainMsg = document.querySelector("#cvv")?.classList[0];

        if (numberContainMsg != msgError && nameContainMsg != msgError && dateContainMsg != msgError && securityContainMsg != msgError) {
            isValid = !isValid;
        }

        return isValid;
    })
}