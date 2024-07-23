// Carbon Footprint Calculator
const carbonCalculator = document.getElementById('carbon-calculator');
const result = document.getElementById('result');
const emissionFactors = {
    usa: 0.42, // kg CO2 per kWh
    uk: 0.23,
    germany: 0.34,
    india: 0.82,
};

carbonCalculator.addEventListener('submit', function(e) {
    e.preventDefault();
    const electricity = parseFloat(document.getElementById('electricity').value);
    const country = document.getElementById('country').value;
    const annualUsage = electricity * 12;
    const carbonFootprint = annualUsage * emissionFactors[country];
    result.innerHTML = `
        <h3>Your Annual Carbon Footprint</h3>
        <p>${carbonFootprint.toFixed(2)} kg CO2</p>
        <p>This is equivalent to:</p>
        <ul>
            <li>${(carbonFootprint / 200).toFixed(2)} trees needed to offset</li>
            <li>${(carbonFootprint / 4000).toFixed(2)} cars driven for one year</li>
        </ul>
    `;
});

// Add smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Energy Mix Chart
const ctx = document.getElementById('energyChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Solar', 'Wind', 'Hydro', 'Geothermal', 'Biomass', 'Biofuel', 'Other Renewables'],
        datasets: [{
            data: [10, 24, 37, 4, 15, 4, 6],
            backgroundColor: [
                '#FFA726',
                '#66BB6A',
                '#29B6F6',
                '#EF5350',
                '#8D6E63',
                '#26A69A',
                '#AB47BC'
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Global Renewable Energy Mix 2023',
                color: '#1a73e8',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            legend: {
                position: 'bottom'
            }
        }
    }
});

// Energy Savings Simulator
const savingsSimulator = document.getElementById('savings-simulator');
const savingsResult = document.getElementById('savings-result');
const savingsPercentageInput = document.getElementById('savings-percentage');
const savingsPercentageOutput = document.querySelector('output[for="savings-percentage"]');

savingsPercentageInput.addEventListener('input', function() {
    savingsPercentageOutput.value = this.value + '%';
});

savingsSimulator.addEventListener('submit', function(e) {
    e.preventDefault();
    const currentUsage = parseFloat(document.getElementById('current-usage').value);
    const savingsPercentage = parseFloat(savingsPercentageInput.value);
    const country = document.getElementById('country').value;
    
    const annualUsage = currentUsage * 12;
    const savedEnergy = annualUsage * (savingsPercentage / 100);
    const carbonSaved = savedEnergy * emissionFactors[country];
    const moneySaved = savedEnergy * 0.15; // Assuming $0.15 per kWh

    savingsResult.innerHTML = `
        <h3>Your Potential Savings</h3>
        <p>Energy Saved: ${savedEnergy.toFixed(2)} kWh per year</p>
        <p>Carbon Emissions Reduced: ${carbonSaved.toFixed(2)} kg CO2 per year</p>
        <p>Money Saved: $${moneySaved.toFixed(2)} per year</p>
        <p>Impact:</p>
        <ul>
            <li>${(carbonSaved / 200).toFixed(2)} trees saved</li>
            <li>${(carbonSaved / 4000).toFixed(2)} cars taken off the road for a year</li>
        </ul>
        <div class="savings-chart">
            <div class="bar" style="height: 100%;">
                <span>Current: ${annualUsage.toFixed(0)} kWh</span>
            </div>
            <div class="bar new" style="height: ${100 - savingsPercentage}%;">
                <span>New: ${(annualUsage - savedEnergy).toFixed(0)} kWh</span>
            </div>
        </div>
    `;
});

// Tooltip functionality
const tooltipContainer = document.getElementById('tooltip-container');
const tooltipTrigger = document.getElementById('tooltip-trigger');
const tooltipContent = document.getElementById('tooltip-content');

tooltipTrigger.addEventListener('click', function() {
    tooltipContainer.classList.toggle('open');
});

document.addEventListener('click', function(event) {
    if (!tooltipContainer.contains(event.target) && tooltipContainer.classList.contains('open')) {
        tooltipContainer.classList.remove('open');
    }
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
document.querySelector('footer p').textContent = `© ${currentYear} SDG-7 Energy Tracker. All rights reserved.`;

// Add animation to energy types
const energyTypes = document.querySelectorAll('.energy-type');
energyTypes.forEach(type => {
    type.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    type.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add responsiveness to the chart
window.addEventListener('resize', function() {
    chart.resize();
});