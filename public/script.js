document.getElementById("get-started-form").addEventListener("submit", function (event) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password.length < 8) {
        event.preventDefault(); // Prevent form submission

        // Show toast with a message
        const toast = document.getElementById("toast");
        toast.textContent = "Password must be at least 8 characters long!";
        toast.style.display = "block";

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.style.display = "none";
        }, 3000);
    } else if (password !== confirmPassword) {
        event.preventDefault(); // Prevent form submission

        // Show toast with a message
        const toast = document.getElementById("toast");
        toast.textContent = "Password and Confirm Password do not match!";
        toast.style.display = "block";

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.style.display = "none";
        }, 3000);
    }
});
