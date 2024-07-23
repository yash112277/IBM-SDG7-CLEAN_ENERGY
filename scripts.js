// Carbon Footprint Calculator
const carbonCalculator = document.getElementById('carbon-calculator');
const result = document.getElementById('result');
const emissionFactors = {
    usa: 0.42,
    uk: 0.23,
    germany: 0.34,
    india: 0.82,
};

carbonCalculator.addEventListener('submit', function(e) {
    e.preventDefault();
    const electricity = parseFloat(document.getElementById('electricity').value);
    const country = document.getElementById('country').value;
    const evUsage = parseFloat(document.getElementById('ev-usage').value) || 0;
    const evEfficiency = parseFloat(document.getElementById('ev-efficiency').value) || 1;

    const annualElectricityUsage = electricity * 12;
    const annualEVUsage = evUsage * 52; // Assuming weekly usage
    const evEmissions = (annualEVUsage / evEfficiency) * emissionFactors[country];
    
    const totalCarbonFootprint = (annualElectricityUsage * emissionFactors[country]) + evEmissions;

    result.innerHTML = `
        <h3>Your Annual Carbon Footprint</h3>
        <p>${totalCarbonFootprint.toFixed(2)} kg CO2</p>
        <p>This is equivalent to:</p>
        <ul>
            <li>${(totalCarbonFootprint / 200).toFixed(2)} trees needed to offset</li>
            <li>${(totalCarbonFootprint / 4000).toFixed(2)} cars driven for one year</li>
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
    const electricityRate = 0.15; // Assume $0.15 per kWh

    const annualUsage = currentUsage * 12;
    const savedEnergy = annualUsage * (savingsPercentage / 100);
    const newUsage = annualUsage - savedEnergy;
    const moneySaved = savedEnergy * electricityRate;

    const ctx = document.getElementById('savingsChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Current Usage', 'Potential Savings'],
            datasets: [{
                data: [newUsage, savedEnergy],
                backgroundColor: ['#1a73e8', '#4caf50']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.toFixed(2) + ' kWh';
                            return label;
                        }
                    }
                }
            }
        }
    });

    savingsResult.innerHTML = `
        <h3>Your Potential Savings</h3>
        <p>Energy Saved: ${savedEnergy.toFixed(2)} kWh per year</p>
        <p>New Annual Usage: ${newUsage.toFixed(2)} kWh</p>
        <p>Money Saved: $${moneySaved.toFixed(2)} per year</p>
        <canvas id="savingsChart"></canvas>
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

// Incentive Finder (Need to Implement API also)
const incentivesFinder = document.getElementById('incentives-finder');
const incentivesResult = document.getElementById('incentives-result');

incentivesFinder.addEventListener('submit', function(e) {
    e.preventDefault();
    const zipcode = document.getElementById('zipcode').value;
    
    // Simulated API call or database lookup
    const incentives = getIncentives(zipcode);
    
    incentivesResult.innerHTML = `
        <h3>Available Incentives in ${zipcode}</h3>
        <ul>
            ${incentives.map(incentive => `<li>${incentive}</li>`).join('')}
        </ul>
    `;
});

function getIncentives(zipcode) {
    // Replace this with actual data retrieval
    return [
        "Solar Panel Installation Tax Credit",
        "Energy Efficient Appliance Rebate",
        "Electric Vehicle Charging Station Grant"
    ];
}

// Gaming / Kids Section(Logic needs to be built)

function startEnergyMatch() {
    alert("Energy Match Game starting soon!");
    const energySources = [
        { name: "Solar", description: "Harnesses power from the sun" },
        { name: "Wind", description: "Uses turbines to capture wind energy" },
        { name: "Hydro", description: "Generates power from flowing water" },
        { name: "Geothermal", description: "Utilizes heat from the Earth's core" },
        { name: "Biofuel", description: "Produced from organic materials" }
    ];
    
    let currentPair, score;
    
    function startEnergyMatch() {
        score = 0;
        nextPair();
    }
    
    function nextPair() {
        if (energySources.length === 0) {
            alert(`Game Over! Your score: ${score}`);
            return;
        }
    
        const index = Math.floor(Math.random() * energySources.length);
        currentPair = energySources.splice(index, 1)[0];
    
        const gameArea = document.getElementById('energy-match');
        gameArea.innerHTML = `
            <h3>Match the energy source to its description:</h3>
            <p>${currentPair.description}</p>
            <div id="options"></div>
        `;
    
        const options = [...energySources, currentPair].sort(() => Math.random() - 0.5);
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.name;
            button.onclick = () => checkAnswer(option.name);
            document.getElementById('options').appendChild(button);
        });
    }
    
    function checkAnswer(answer) {
        if (answer === currentPair.name) {
            score++;
            alert('Correct!');
        } else {
            alert(`Incorrect. The correct answer was ${currentPair.name}.`);
        }
        nextPair();
    }
}

function startEnergyQuiz() {
    alert("Energy Quiz starting soon!");
    // Implement quiz logic
}

// Expand Collapse functionality

document.querySelectorAll('.more-info').forEach(button => {
    button.addEventListener('click', function() {
        const expandedInfo = this.nextElementSibling;
        expandedInfo.style.display = expandedInfo.style.display === 'none' ? 'block' : 'none';
        this.textContent = expandedInfo.style.display === 'none' ? 'More Info' : 'Less Info';
    });
});

// rotate tips

function rotateTips() {
    const tipsList = document.getElementById('rotating-tips');
    const firstTip = tipsList.firstElementChild;
    tipsList.appendChild(firstTip);
}

setInterval(rotateTips, 60000); // Rotate every minute

// Incentive Logic

const incentivesByState = {
    maharashtra: [
        "Maharashtra Solar Rooftop Subsidy",
        "Electric Vehicle Policy 2021",
        "Energy Conservation Building Code"
    ],
    gujarat: [
        "Gujarat Solar Power Policy 2021",
        "Wind Power Policy 2016",
        "Electric Vehicle Policy 2021"
    ],
    karnataka: [
        "Karnataka Renewable Energy Policy 2022-2027",
        "Solar Rooftop Incentive Program",
        "Electric Vehicle and Energy Storage Policy 2017"
    ]
    // Add more states and their incentives
};

document.getElementById('incentives-finder').addEventListener('submit', function(e) {
    e.preventDefault();
    const state = document.getElementById('state').value;
    const incentivesResult = document.getElementById('incentives-result');
    
    if (state && incentivesByState[state]) {
        const incentives = incentivesByState[state];
        incentivesResult.innerHTML = `
            <h3>Available Incentives in ${state.charAt(0).toUpperCase() + state.slice(1)}</h3>
            <ul>
                ${incentives.map(incentive => `<li>${incentive}</li>`).join('')}
            </ul>
        `;
    } else {
        incentivesResult.innerHTML = '<p>No incentives found for the selected state.</p>';
    }
});

document.getElementById('incentives-finder').addEventListener('submit', function(e) {
    e.preventDefault();
    const state = document.getElementById('state').value;
    const incentivesResult = document.getElementById('incentives-result');
    
    if (state && incentivesByState[state]) {
        const incentives = incentivesByState[state];
        incentivesResult.innerHTML = `
            <h3>Available Incentives in ${state.charAt(0).toUpperCase() + state.slice(1)}</h3>
            <ul>
                ${incentives.map(incentive => `<li>${incentive}</li>`).join('')}
            </ul>
        `;
    } else {
        incentivesResult.innerHTML = '<p>No incentives found for the selected state.</p>';
    }
});

// Energy Quiz Kids Sections

function startEnergyQuiz() {
    const questions = [
        {
            question: "Which renewable energy source uses the sun's power?",
            options: ["Wind", "Solar", "Hydro", "Geothermal"],
            answer: 1
        },
        {
            question: "What renewable energy source uses flowing water?",
            options: ["Wind", "Solar", "Hydro", "Biofuel"],
            answer: 2
        },
        {
            question: "Which energy source is produced from organic materials?",
            options: ["Geothermal", "Wind", "Solar", "Biofuel"],
            answer: 3
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function displayQuestion() {
        const quizArea = document.getElementById('energy-quiz');
        const q = questions[currentQuestion];
        quizArea.innerHTML = `
            <h3>${q.question}</h3>
            ${q.options.map((option, index) => `
                <button onclick="checkAnswer(${index})">${option}</button>
            `).join('')}
        `;
    }

    window.checkAnswer = function(answer) {
        if (answer === questions[currentQuestion].answer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        const quizArea = document.getElementById('energy-quiz');
        quizArea.innerHTML = `
            <h3>Quiz Complete!</h3>
            <p>You scored ${score} out of ${questions.length}.</p>
            <button onclick="startEnergyQuiz()">Play Again</button>
        `;
    }

    displayQuestion();
}

const energySources = [
    { name: "Solar", description: "Harnesses power from the sun" },
    { name: "Wind", description: "Uses turbines to capture wind energy" },
    { name: "Hydro", description: "Generates power from flowing water" },
    { name: "Geothermal", description: "Utilizes heat from the Earth's core" },
    { name: "Biofuel", description: "Produced from organic materials" }
];

let currentPair, score;

function startEnergyMatch() {
    score = 0;
    energySources.sort(() => Math.random() - 0.5);
    nextPair();
}

function nextPair() {
    if (energySources.length === 0) {
        alert(`Game Over! Your score: ${score}`);
        return;
    }

    currentPair = energySources.pop();

    const gameArea = document.getElementById('energy-match');
    gameArea.innerHTML = `
        <h3>Match the energy source to its description:</h3>
        <p>${currentPair.description}</p>
        <div id="options"></div>
    `;

    const options = [...energySources, currentPair].sort(() => Math.random() - 0.5);
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.name;
        button.onclick = () => checkAnswer(option.name);
        document.getElementById('options').appendChild(button);
    });
}

function checkAnswer(answer) {
    if (answer === currentPair.name) {
        score++;
        alert('Correct!');
    } else {
        alert(`Incorrect. The correct answer was ${currentPair.name}.`);
    }
    nextPair();
}

// Tips Rotation Logic

const tips = [
    "Use energy-efficient appliances",
    "Insulate your home",
    "Switch to LED lighting",
    "Unplug devices when not in use",
    "Use programmable thermostats",
    "Use natural light when possible",
    "Use fans instead of air conditioning",
    "Wash clothes in cold water",
    "Install low-flow showerheads",
    "Recycle and compost to reduce waste"
];

let currentTipIndex = 0;

function rotateTip() {
    const tipElement = document.getElementById('current-tip');
    tipElement.textContent = tips[currentTipIndex];
    currentTipIndex = (currentTipIndex + 1) % tips.length;
}

rotateTip(); // Display first tip immediately
setInterval(rotateTip, 60000); // Rotate every 60 seconds