document.addEventListener('DOMContentLoaded', function() {

    const factBtn = document.getElementById('random-fact-btn');
    const modal = document.getElementById('fact-modal');
    const closeBtn = modal.querySelector('.close');
    const factText = document.getElementById('random-fact');
    const tipElement = document.getElementById('tooltip-content');
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });


    const facts = [
        "Solar energy is the most abundant energy source on Earth.",
        "Wind power is one of the fastest-growing energy sources globally.",
        "Geothermal energy comes from heat stored in the Earth.",
        "Hydropower is the largest source of renewable electricity in the world.",
        "Bioenergy can be produced from a wide range of organic materials."
    ];

    factBtn.addEventListener('click', function() {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        factText.textContent = randomFact;
        modal.style.display = "block";
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
    
    // Kids' Corner - Energy Match Game
    const matchGame = document.getElementById('energy-match');
    const energySources = ['Solar', 'Wind', 'Hydro', 'Geothermal', 'Biofuel'];
    const descriptions = [
        'Harnesses the sun\'s power',
        'Uses moving air to generate electricity',
        'Generates power from flowing water',
        'Utilizes heat from the Earth\'s interior',
        'Produced from organic materials'
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startMatchGame() {
        shuffleArray(descriptions);
        let gameHTML = '<h3>Match the energy source to its description!</h3>';
        gameHTML += '<div class="match-container">';
        gameHTML += '<div class="sources-column">';
        energySources.forEach((source, index) => {
            gameHTML += `<div class="match-item" data-source="${source}">${source}</div>`;
        });
        gameHTML += '</div><div class="descriptions-column">';
        descriptions.forEach((desc, index) => {
            gameHTML += `<div class="match-item" data-desc="${index}">${desc}</div>`;
        });
        gameHTML += '</div></div>';
        gameHTML += '<button id="check-matches" class="cta-button">Check Matches</button>';
        matchGame.innerHTML = gameHTML;

        const matchItems = document.querySelectorAll('.match-item');
        let selectedSource = null;
        let selectedDesc = null;
    
        matchItems.forEach(item => {
            item.addEventListener('click', function() {
                if (this.dataset.source) {
                    if (selectedSource) selectedSource.classList.remove('selected');
                    this.classList.add('selected');
                    selectedSource = this;
                } else {
                    if (selectedDesc) selectedDesc.classList.remove('selected');
                    this.classList.add('selected');
                    selectedDesc = this;
                }
    
                if (selectedSource && selectedDesc) {
                    selectedSource.classList.add('matched');
                    selectedDesc.classList.add('matched');
                    selectedSource = null;
                    selectedDesc = null;
                }
            });
        });

        document.getElementById('check-matches').addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default button behavior
            checkMatches();
        });

        function checkMatches() {
            const matches = document.querySelectorAll('.matched');
            matches.forEach((match, index) => {
                if (index % 2 === 0) {
                    const sourceIndex = energySources.indexOf(match.textContent);
                    const descIndex = descriptions.indexOf(matches[index + 1].textContent);
                    if (sourceIndex === descIndex) {
                        match.classList.add('matched-correct');
                        matches[index + 1].classList.add('matched-correct');
                    } else {
                        match.classList.add('matched-incorrect');
                        matches[index + 1].classList.add('matched-incorrect');
                    }
                }
            });
        }
        document.getElementById('check-matches').addEventListener('click', checkMatches);
    }
    document.querySelector('#energy-match .cta-button').addEventListener('click', startMatchGame);

    // Kids' Corner - Energy Quiz
    let currentQuestionIndex = 0;
    const quizGame = document.getElementById('energy-quiz');
    const quizQuestions = [
        {
            question: "Which energy source comes from the sun?",
            options: ["Wind", "Solar", "Geothermal", "Hydro"],
            answer: 1
        },
        {
            question: "What turns in a wind turbine to generate electricity?",
            options: ["Wheels", "Gears", "Blades", "Pistons"],
            answer: 2
        },
        {
            question: "Which renewable energy source uses water?",
            options: ["Solar", "Wind", "Geothermal", "Hydroelectric"],
            answer: 3
        },
        {
            question: "What is biomass energy made from?",
            options: ["Rocks", "Plants and animal waste", "Sand", "Salt water"],
            answer: 1
        },
        {
            question: "Which energy source uses heat from inside the Earth?",
            options: ["Solar", "Wind", "Geothermal", "Nuclear"],
            answer: 2
        }
    ];

    function startQuiz() {
        currentQuestionIndex = 0;
        showQuestion(currentQuestionIndex);
    }

    function showQuestion(index) {
        const q = quizQuestions[index];
        let quizHTML = `<h3>Question ${index + 1}</h3>
            <div class="quiz-question">
                <p>${q.question}</p>
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
            </div>
            <button id="next-question" class="cta-button">Next Question</button>`;
        quizGame.innerHTML = quizHTML;
    
        document.getElementById('next-question').addEventListener('click', function() {
            e.preventDefault();
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            if (selected) {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizQuestions.length) {
                    showQuestion(currentQuestionIndex);
                } else {
                    showQuizResult();
                }
            } else {
                alert('Please select an answer before moving to the next question.');
            }
        });
    }

    function showQuizResult() {
        let score = 0;
        let resultHTML = '<h3>Quiz Results</h3>';
        quizQuestions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            const userAnswer = selected ? parseInt(selected.value) : -1;
            const isCorrect = userAnswer === q.answer;
            if (isCorrect) score++;
            
            resultHTML += `
                <div class="quiz-result ${isCorrect ? 'correct' : 'incorrect'}">
                    <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
                    <p>Your answer: ${userAnswer >= 0 ? q.options[userAnswer] : 'Not answered'}</p>
                    <p>Correct answer: ${q.options[q.answer]}</p>
                </div>
            `;
        });
        resultHTML += `<p>You got ${score} out of ${quizQuestions.length} questions correct!</p>
            <button id="restart-quiz" class="cta-button">Restart Quiz</button>`;
        
        quizGame.innerHTML = resultHTML;
        
        document.getElementById('restart-quiz').addEventListener('click', startQuiz);
    }

    document.querySelector('#energy-quiz .cta-button').addEventListener('click', startQuiz);

    // Update button styles for calculator and simulator
    const calculatorButton = document.querySelector('#calculator button');
    const simulatorButton = document.querySelector('#simulator button');
    calculatorButton.classList.add('cta-button');
    simulatorButton.classList.add('cta-button');

    // Update Renewable Energy section buttons
    document.querySelectorAll('.energy-card .more-info').forEach(button => {
        button.classList.add('cta-button');
        button.style.backgroundColor = '#fdd835';
        button.style.color = '#333333';
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    const tooltip = document.getElementById('tooltip-content');
    tooltip.classList.add('visible');
    const tooltipArrow = tooltip.querySelector('::before');

    tooltip.addEventListener('click', function() {
        this.classList.toggle('visible');
    });
    
    const tips = [
        "Turn off lights when not in use to save energy.",
        "Use energy-efficient LED bulbs to reduce electricity consumption.",
        "Unplug electronics and appliances when not in use to avoid phantom energy loss.",
        "Use natural light when possible to reduce the need for artificial lighting.",
        "Set your thermostat a few degrees lower in winter and higher in summer.",
        "Use a programmable thermostat to automatically adjust temperature settings.",
        "Seal air leaks around windows and doors to improve insulation.",
        "Use cold water for laundry when possible to save on water heating costs.",
        "Clean or replace HVAC filters regularly for better efficiency.",
        "Use energy-efficient appliances with ENERGY STAR certification."
    ];
    
    function showNextTip() {
        tipElement.textContent = tips[currentTipIndex];
        currentTipIndex = (currentTipIndex + 1) % tips.length;
    }

    let currentTipIndex = 0;
    
    // Show first tip immediately
    showNextTip();
    
    // Rotate tips every 30 seconds
    setInterval(showNextTip, 30000);

    // Renewable Energy Section
    const moreInfoButtons = document.querySelectorAll('.energy-card .more-info');
    moreInfoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.energy-card');
            card.classList.toggle('flipped');
        });
    });

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
        
        const annualElectricityUsage = electricity * 12;
        const totalCarbonFootprint = annualElectricityUsage * emissionFactors[country];
    
        const treesNeeded = (totalCarbonFootprint / 200).toFixed(2);
        const carsNotDriven = (totalCarbonFootprint / 4000).toFixed(2);
    
        result.innerHTML = `
            <h3>Your Annual Carbon Footprint</h3>
            <p>${totalCarbonFootprint.toFixed(2)} kg CO2</p>
            <p>To offset this:</p>
            <ul>
                <li>${treesNeeded} trees need to be planted</li>
                <li>${carsNotDriven} cars should not be driven for a year</li>
            </ul>
            <p>Alternatively, you could:</p>
            <ul>
                <li>Carpool with ${Math.ceil(carsNotDriven)} other people for a year</li>
                <li>Use public transportation or bike for ${Math.ceil(carsNotDriven * 30)} days</li>
            </ul>
        `;
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
    
        const ledSavings = "Switching to LED bulbs can save up to 80% energy compared to traditional filament bulbs.";
        const solarPanelSavings = "A 5kW solar panel system can typically save around 7,500 kWh per year, which is about $1,125 annually.";
    
        savingsResult.innerHTML = `
            <h3>Your Potential Savings</h3>
            <p>Energy Saved: ${savedEnergy.toFixed(2)} kWh per year</p>
            <p>New Annual Usage: ${newUsage.toFixed(2)} kWh</p>
            <p>Money Saved: $${moneySaved.toFixed(2)} per year</p>
            <h4>Energy Saving Tips:</h4>
            <p>${ledSavings}</p>
            <p>${solarPanelSavings}</p>
            <p>Adjust the savings percentage based on the energy-saving measures you plan to implement.</p>
        `;
    });

    // Incentive Finder
    const incentivesByState = {
        maharashtra: [
            "Maharashtra Solar Rooftop Subsidy",
            "Electric Vehicle Policy 2021",
            "Energy Conservation Building Code",
            "Mukhyamantri Saur Krishi Vahini Yojana: Provides daytime solar power to farmers",
            "MEDA Initiatives: Subsidies for solar, wind, and biogas projects"
        ],
        gujarat: [
            "Gujarat Solar Power Policy 2021",
            "Wind Power Policy 2016",
            "Electric Vehicle Policy 2021",
            "Surya Urja Rooftop Yojana: Subsidizes rooftop solar installations",
            "Wind-Solar Hybrid Power Policy: Promotes hybrid power projects with incentives for land and infrastructure"
        ],
        karnataka: [
            "Karnataka Renewable Energy Policy 2022-2027",
            "Solar Rooftop Incentive Program",
            "Electric Vehicle and Energy Storage Policy 2017",
            "Karnataka Solar Policy: Aims to install 10 GW of solar power by 2025",
            "KREDL Initiatives: Facilitates renewable energy projects including solar, wind, and biomass"
        ],
        "andaman and nicobar islands": [
            "Solar Power Projects: Incentives to reduce reliance on diesel generators",
            "Energy Efficiency Initiatives: Programs to promote energy efficiency and renewable energy adoption"
        ],
        "dadra and nagar haveli and daman and diu": [
            "Solar Rooftop Scheme: Subsidies for residential and commercial rooftop solar installations",
            "Renewable Energy Policy: Support for small-scale solar and wind projects"
        ],
        lakshadweep: [
            "Lakshadweep Renewable Energy Development Agency (LREDA): Focuses on solar energy projects",
            "Solar Power Projects: Financial support for solar installations"
        ],
        ladakh: [
            "Solar Energy Initiatives: Promotes solar power projects to leverage high solar insolation",
            "Small Hydro Projects: Encourages small hydro projects to utilize water resources"
        ],
        delhi: [
            "Mukhyamantri Solar Power Scheme: Subsidies for residential rooftop solar installations",
            "Net Metering: Allows feeding excess solar power back into the grid for credits",
            "Property Tax Rebates: For properties with solar installations"
        ],
        chandigarh: [
            "Chandigarh Solar City Project: Aims to make Chandigarh a model solar city"
        ]
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

    const energyCards = document.querySelectorAll('.energy-card');
    energyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.transition = 'transform 0.3s ease-in-out';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Add smooth scrolling animation
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const startQuizButton = document.querySelector('#energy-quiz .cta-button');
    if (startQuizButton) {
        startQuizButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default button behavior
            startQuiz();
        });
    }

    // Dynamic year in footer
    const currentYear = new Date().getFullYear();
    document.querySelector('footer p').textContent = `© ${currentYear} Mr. SunShine. All rights reserved.`;
});