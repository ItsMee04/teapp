import Toastify from "toastify-js"
import "toastify-js/src/toastify.css"

export function showToast(message, type = "info") {
    let background = "linear-gradient(to right, #00b09b, #96c93d)" // default success

    if (type === "error") {
        background = "linear-gradient(to right, #ff512f, #dd2476)"
    } else if (type === "warning") {
        background = "linear-gradient(to right, #f7971e, #ffd200)"
    } else if (type === "info") {
        background = "linear-gradient(to right, #2193b0, #6dd5ed)"
    }

    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background:background
        },
        stopOnFocus: true,
    }).showToast()
}
