document.addEventListener('DOMContentLoaded', () => {
    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherData(lat, lon);
            getRenewableEnergyData(lat, lon);
            getElectricityRate(lat, lon);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }

    // Fetch weather data
    async function getWeatherData(lat, lon) {
        const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('appliance-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const appliance = document.getElementById('appliance').value;
            const tips = getUsageTips(appliance, data);
            document.getElementById('usage-tips').textContent = tips;
        });
    }

    // Fetch renewable energy data
    async function getRenewableEnergyData(lat, lon) {
        const apiKey = 'YOUR_NREL_API_KEY';
        const solarUrl = `https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=${apiKey}&lat=${lat}&lon=${lon}`;
        const windUrl = `https://developer.nrel.gov/api/wind-toolkit/v2/wind/wind_resource_data?api_key=${apiKey}&lat=${lat}&lon=${lon}`;

        const [solarResponse, windResponse] = await Promise.all([fetch(solarUrl), fetch(windUrl)]);
        const solarData = await solarResponse.json();
        const windData = await windResponse.json();

        document.getElementById('solar-info').textContent = `Average solar radiation: ${solarData.outputs.avg_dni.monthly}`;
        document.getElementById('wind-info').textContent = `Average wind speed: ${windData.outputs.wind_speed.mean} m/s`;
    }

    // Fetch electricity rate data (mock implementation, replace with real API if available)
    async function getElectricityRate(lat, lon) {
        // For demonstration purposes, we'll use a fixed rate
        const rate = 0.13; // USD per kWh
        document.getElementById('calculator-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const acCount = parseInt(document.getElementById('ac-count').value, 10);
            const heaterCount = parseInt(document.getElementById('heater-count').value, 10);
            const washerCount = parseInt(document.getElementById('washer-count').value, 10);
            const bill = calculateBill(acCount, heaterCount, washerCount, rate);
            document.getElementById('bill-estimate').textContent = `Estimated Monthly Bill: $${bill.toFixed(2)}`;
        });
    }

    // Calculate the estimated bill
    function calculateBill(acCount, heaterCount, washerCount, rate) {
        const acPower = 1.5; // kW
        const heaterPower = 1.2; // kW
        const washerPower = 0.5; // kW

        const acUsage = acCount * acPower * 8 * 30; // 8 hours/day for 30 days
        const heaterUsage = heaterCount * heaterPower * 6 * 30; // 6 hours/day for 30 days
        const washerUsage = washerCount * washerPower * 1 * 30; // 1 hour/day for 30 days

        const totalUsage = acUsage + heaterUsage + washerUsage; // kWh
        const totalCost = totalUsage * rate;

        return totalCost;
    }

    // Get usage tips based on appliance and weather
    function getUsageTips(appliance, weatherData) {
        const temperature = weatherData.main.temp;
        let tips = '';

        switch (appliance) {
            case 'ac':
                if (temperature > 25) {
                    tips = 'Use the AC during the hottest parts of the day and set the thermostat to 24°C.';
                } else {
                    tips = 'Consider using a fan instead of the AC.';
                }
                break;
            case 'heater':
                if (temperature < 15) {
                    tips = 'Use the heater during the coldest parts of the day and set the thermostat to 20°C.';
                } else {
                    tips = 'Consider wearing warm clothes instead of using the heater.';
                }
                break;
            case 'washer':
                tips = 'Use the washing machine during off-peak hours and wash with cold water when possible.';
                break;
            default:
                tips = 'Select an appliance to get tips.';
        }

        return tips;
    }
});
