import flatpickr from "flatpickr";

const datePicker = flatpickr('.datePicker', {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        static: true,
        minDate: "today"
    });

export {datePicker};