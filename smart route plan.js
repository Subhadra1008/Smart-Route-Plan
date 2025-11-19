document.addEventListener('DOMContentLoaded', () => {

    // Get DOM elements
    const planRouteBtn = document.getElementById('plan-route-btn');
    const loadWeightInput = document.getElementById('load-weight');
    const weatherConditionSelect = document.getElementById('weather-condition');
    const transportModeSelect = document.getElementById('transport-mode');
    const routeDetails = document.getElementById('route-details');
    const totalTime = document.getElementById('total-time');
    const alertsList = document.getElementById('alerts-list');

    // Function to add a new alert to the list
    function addAlert(type, message) {
        const newAlert = document.createElement('li');
        newAlert.innerHTML = `<span class="alert-type ${type}"></span> ${message}`;
        alertsList.appendChild(newAlert);
    }

    planRouteBtn.addEventListener('click', () => {
        const loadWeight = parseFloat(loadWeightInput.value);
        const weatherCondition = weatherConditionSelect.value;
        const transportMode = transportModeSelect.value;
        
        let baseTime = 0;
        let chosenRoute = "";
        let newAlerts = [];

        // Determine base time based on transport mode
        switch (transportMode) {
            case 'bus':
                baseTime = 180; // 3 hours
                break;
            case 'car':
                baseTime = 120; // 2 hours
                break;
            case 'two-wheeler':
                baseTime = 100; // 1 hour 40 minutes
                break;
            case 'public-transport':
                baseTime = 200; // 3 hours 20 minutes
                break;
            case 'walk':
                baseTime = 480; // 8 hours
                break;
        }

        // --- Smart Route Planning Logic with Weather and Time ---

        // 1. Load-Based Optimization (only applies to specific modes)
        const weightLimit = 20; // tons
        if (transportMode === 'car' || transportMode === 'bus') {
            if (loadWeight > weightLimit) {
                chosenRoute = "Alternate Route: Via State Highway 101. Avoids bridge weight limit.";
                newAlerts.push({ type: 'regulation', message: 'Warning: Load exceeds weight limit for primary route.' });
                baseTime += 30; // Add 30 minutes for the detour
            } else {
                chosenRoute = "Main Route: Take I-95 North.";
            }
        } else {
            chosenRoute = "Standard Route.";
        }
        
        // 2. Weather-Based Adjustments
        if (weatherCondition === 'rain') {
            chosenRoute += " Avoid steep grades due to heavy rain.";
            newAlerts.push({ type: 'weather', message: 'Heavy rain advisory. Route has been adjusted for safety.' });
            baseTime += 20; // Add 20 minutes for rain
        } else if (weatherCondition === 'snow') {
            chosenRoute += " All mountain passes closed. Take a southern detour.";
            newAlerts.push({ type: 'weather', message: 'Snow advisory. All high-altitude routes are closed.' });
            baseTime += 60; // Add 60 minutes for snow delays
        }

        // Display the route details and alerts
        routeDetails.textContent = "Calculating optimal route...";
        totalTime.textContent = "";
        alertsList.innerHTML = ''; // Clear existing alerts
        
        setTimeout(() => {
            routeDetails.textContent = chosenRoute;
            totalTime.textContent = `Estimated Time: ${baseTime} minutes`;
            newAlerts.forEach(alert => addAlert(alert.type, alert.message));
        }, 1000); // Simulate a 1-second calculation time
    });
});