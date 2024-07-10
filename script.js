const initialTime = 300; 
const timerElement = document.getElementById('timer');
let time = initialTime;
let countdown;

const questions = [
    {
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Berlin", "Madrid"],
        "answer": "Paris"
    },
    {
        "question": "What is 2 + 2?",
        "options": ["3", "4", "5", "6"],
        "answer": "4"
    },
    {
        "question": "What is the largest planet in our solar system?",
        "options": ["Earth", "Mars", "Jupiter", "Saturn"],
        "answer": "Jupiter"
    },
    {
        "question": "What is the chemical symbol for water?",
        "options": ["H2O", "O2", "CO2", "HO"],
        "answer": "H2O"
    },
    {
        "question": "What is the speed of light?",
        "options": ["300,000 km/s", "150,000 km/s", "299,792 km/s", "400,000 km/s"],
        "answer": "299,792 km/s"
    },
    {
        "question": "Who wrote 'To Kill a Mockingbird'?",
        "options": ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
        "answer": "Harper Lee"
    },
    {
        "question": "What is the smallest unit of life?",
        "options": ["Atom", "Molecule", "Cell", "Organ"],
        "answer": "Cell"
    },
    {
        "question": "What is the capital of Japan?",
        "options": ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        "answer": "Tokyo"
    },
    {
        "question": "What is the powerhouse of the cell?",
        "options": ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
        "answer": "Mitochondria"
    },
    {
        "question": "Who painted the Mona Lisa?",
        "options": ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        "answer": "Leonardo da Vinci"
    },
    {
        "question": "What is the largest ocean on Earth?",
        "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        "answer": "Pacific Ocean"
    },
    {
        "question": "What is the square root of 64?",
        "options": ["6", "7", "8", "9"],
        "answer": "8"
    },
    {
        "question": "What is the chemical symbol for gold?",
        "options": ["Ag", "Au", "Gd", "Ga"],
        "answer": "Au"
    },
    {
        "question": "What is the longest river in the world?",
        "options": ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        "answer": "Nile River"
    },
    {
        "question": "What is the capital of Australia?",
        "options": ["Sydney", "Melbourne", "Canberra", "Perth"],
        "answer": "Canberra"
    },
    {
        "question": "What is the largest mammal in the world?",
        "options": ["Elephant", "Whale Shark", "Blue Whale", "Giraffe"],
        "answer": "Blue Whale"
    },
    {
        "question": "What is the hardest natural substance on Earth?",
        "options": ["Iron", "Diamond", "Gold", "Quartz"],
        "answer": "Diamond"
    },
    {
        "question": "Who developed the theory of relativity?",
        "options": ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Niels Bohr"],
        "answer": "Albert Einstein"
    },
    {
        "question": "What is the capital of Canada?",
        "options": ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        "answer": "Ottawa"
    },
    {
        "question": "What is the currency of Japan?",
        "options": ["Yuan", "Won", "Yen", "Dollar"],
        "answer": "Yen"
    }
];

let currentPage = 1;
const questionsPerPage = 5;
let userAnswers = new Array(questions.length).fill(null);

function updateTimerDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerElement.textContent = `Time left: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    countdown = setInterval(() => {
        time--;
        updateTimerDisplay();
        if (time <= 0) {
            clearInterval(countdown);
            alert('Time is up!');
            calculateScore();
        }
    }, 1000);
}

function renderQuestions(page) {
    const questionContainer = document.getElementById('questions');
    questionContainer.innerHTML = '';

    for (let i = (page - 1) * questionsPerPage; i < page * questionsPerPage && i < questions.length; i++) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        const questionObj = questions[i];

        let optionsHTML = '';
        questionObj.options.forEach((option, index) => {
            const isChecked = userAnswers[i] === option ? 'checked' : '';
            optionsHTML += `
                <div>
                    <input type="radio" name="question${i}" id="question${i}_option${index}" value="${option}" ${isChecked}>
                    <label for="question${i}_option${index}">${option}</label>
                </div>
            `;
        });

        questionDiv.innerHTML = `
            <p>${questionObj.question}</p>
            ${optionsHTML}
        `;
        questionContainer.appendChild(questionDiv);
    }
}

function handleNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    if (currentPage === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    if (currentPage === Math.ceil(questions.length / questionsPerPage)) {
        nextBtn.disabled = true;
        submitBtn.style.display = 'block';
    } else {
        nextBtn.disabled = false;
        submitBtn.style.display = 'none';
    }
}

function calculateScore() {
    let score = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            score++;
        }
    });
    document.getElementById('result').innerHTML = `<h2>Your Score: ${score} out of ${questions.length}</h2>`;
    document.getElementById('result').style.display = 'block';
    document.getElementById('questions').style.display = 'none';
    document.getElementById('navigation').style.display = 'none';
}

document.getElementById('next-btn').addEventListener('click', () => {
    saveAnswers();
    currentPage++;
    renderQuestions(currentPage);
    handleNavigation();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    saveAnswers();
    currentPage--;
    renderQuestions(currentPage);
    handleNavigation();
});

document.getElementById('submit-btn').addEventListener('click', () => {
    saveAnswers();
    calculateScore();
});

function saveAnswers() {
    const currentQuestions = document.querySelectorAll('.question');
    currentQuestions.forEach((questionDiv, index) => {
        const options = questionDiv.querySelectorAll('input[type="radio"]');
        options.forEach(option => {
            if (option.checked) {
                userAnswers[(currentPage - 1) * questionsPerPage + index] = option.value;
            }
        });
    });
}

window.onload = () => {
    renderQuestions(currentPage);
    handleNavigation();
    startTimer();
};
