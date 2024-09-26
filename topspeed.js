function calculateTopSpeed() {
    // Get the user's 100m time input
    const userTime = parseFloat(document.getElementById('timeInput').value);
    const sprinterType = document.getElementById('sprinterType').value;

    // Check if the user entered a valid time
    if (isNaN(userTime) || userTime <= 0) {
        document.getElementById('resultMin').textContent = "Please enter a valid time.";
        return;
    }

    // Calculate the value of k, set k = 1.03 if time is more than 14 seconds
    let k;
    if (userTime > 14) {
        k = 1.03;
    } else {
        k = -0.01 * userTime + 1.17;
    }

    // Calculate the base top speed
    let topSpeed = (100 / userTime) * k * k;

    // Define minimum and maximum adjustment factors based on sprinter type
    let minFactor = 1;
    let maxFactor = 1;

    switch (sprinterType) {
        case "blockStarts":
            minFactor = 0.97;
            maxFactor = 0.99;
            break;
        case "both":
            minFactor = 0.99;
            maxFactor = 1.01;
            break;
        case "topSpeed":
            minFactor = 1.01;
            maxFactor = 1.03;
            break;
    }

    // Apply the adjustment factors
    const minTopSpeed = topSpeed * minFactor;
    const maxTopSpeed = topSpeed * maxFactor;

    // Display the result as a range
    document.getElementById('resultMin').textContent = `Your estimated top speed is ${minTopSpeed.toFixed(2)} m/s to ${maxTopSpeed.toFixed(2)} m/s.`;
}
