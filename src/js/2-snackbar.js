import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const fulfilledRadio = document.querySelector('input[name="state"][value="fulfilled"]');
const rejectedRadio = document.querySelector('input[name="state"][value="rejected"]');
const delayInput = document.querySelector('input[name="delay"]');



form.addEventListener('submit', (e) => {
    e.preventDefault();
    let delay = Number(delayInput.value);
    const state = form.elements.state.value;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            }
            else if (state === "rejected") {
                reject(delay);
            }

        }, delay);

    });

    promise.then(delay => {
        iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'center'
        });
    }).catch(delay => {
        iziToast.error({
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'center'
        });
    });
});

