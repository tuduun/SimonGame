let green = document.getElementById("top-right");
green.addEventListener("click", () => {
    document.getElementById("interactButton").innerText = "Points: 0";
    green.style.backgroundColor = "#FF3898";
    console.log("MADE IT HERE");
});