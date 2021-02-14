export const validateFields = (event) => {
    let checkValidate = true;
    event.map((input) => {
        if (input.value === "") {
            input.setAttribute("style", "border-color: red");
            checkValidate = false;
        } else {
            input.setAttribute("style", "border-color: #bababa");
        }
    });

    return checkValidate;
}