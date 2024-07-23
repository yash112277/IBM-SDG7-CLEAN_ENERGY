// Enhanced AI Chatbot
const chatbotToggle = document.createElement('div');
chatbotToggle.innerHTML = '💬';
chatbotToggle.style.position = 'fixed';
chatbotToggle.style.bottom = '20px';
chatbotToggle.style.right = '20px';
chatbotToggle.style.fontSize = '2rem';
chatbotToggle.style.cursor = 'pointer';
chatbotToggle.style.backgroundColor = 'var(--primary-color)';
chatbotToggle.style.color = 'white';
chatbotToggle.style.borderRadius = '50%';
chatbotToggle.style.width = '60px';
chatbotToggle.style.height = '60px';
chatbotToggle.style.display = 'flex';
chatbotToggle.style.justifyContent = 'center';
chatbotToggle.style.alignItems = 'center';
document.body.appendChild(chatbotToggle);

const chatbot = document.createElement('div');
chatbot.style.position = 'fixed';
chatbot.style.bottom = '100px';
chatbot.style.right = '20px';
chatbot.style.width = '300px';
chatbot.style.height = '400px';
chatbot.style.backgroundColor = 'white';
chatbot.style.borderRadius = '10px';
chatbot.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
chatbot.style.display = 'none';
chatbot.innerHTML = `
    <div style="background-color: var(--primary-color); color: white; padding: 10px; border-radius: 10px 10px 0 0;">SDG-7 Energy Assistant</div>
    <div id="chatMessages" style="height: 320px; overflow-y: auto; padding: 10px;"></div>
    <input type="text" id="userInput" placeholder="Ask about SDG-7..." style="width: 100%; padding: 10px; border: none; border-top: 1px solid #eee;">
`;
document.body.appendChild(chatbot);

chatbotToggle.addEventListener('click', () => {
    chatbot.style.display = chatbot.style.display === 'none' ? 'block' : 'none';
});

const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');

userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const userMessage = userInput.value;
        chatMessages.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
        userInput.value = '';
        
        // Simple response logic
        let botResponse = "I'm sorry, I don't have information about that. Can you ask something related to SDG-7 or renewable energy?";
        if (userMessage.toLowerCase().includes('renewable')) {
            botResponse = "Renewable energy sources include solar, wind, hydro, geothermal, and biomass. They are crucial for achieving SDG-7 goals.";
        } else if (userMessage.toLowerCase().includes('efficiency')) {
            botResponse = "Energy efficiency is about using less energy to perform the same task. It's a key component of SDG-7 for sustainable energy.";
        }
        
        setTimeout(() => {
            chatMessages.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
    }
});

// Carbon Footprint Calculator
const carbonCalculator = document.getElementById('carbon-calculator');
const result = document.getElementById('result');

const emissionFactors = {
    usa: 0.42, // kg CO2 per kWh
    uk: 0.23,
    germany: 0.34,
    india: 0.82,
    // Add more countries and their emission factors
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
new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Solar', 'Wind', 'Hydro', 'Geothermal', 'Biomass', 'Biofuel', 'Other Renewables'],
        datasets: [{
            data: [10, 24, 37, 4, 15, 4, 6],
            backgroundColor: [
                '#ffd166',
                '#06d6a0',
                '#118ab2',
                '#ef476f',
                '#073b4c',
                '#3a86ff',
                '#8338ec'
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Global Renewable Energy Mix 2023'
            }
        }
    }
});

// Energy Savings Simulator
const savingsSimulator = document.getElementById('savings-simulator');
const savingsResult = document.getElementById('savings-result');

savingsSimulator.addEventListener('submit', function(e) {
    e.preventDefault();
    const currentUsage = parseFloat(document.getElementById('current-usage').value);
    const savingsPercentage = parseFloat(document.getElementById('savings-percentage').value);

    const potentialSavings = (currentUsage * savingsPercentage) / 100;
    const newUsage = currentUsage - potentialSavings;

    savingsResult.innerHTML = `
        <h3>Energy Savings Simulation</h3>
        <p>With a ${savingsPercentage}% reduction in energy usage, you can save ${potentialSavings.toFixed(2)} kWh per month.</p>
        <p>Your new monthly energy usage would be ${newUsage.toFixed(2)} kWh.</p>
    `;
});
