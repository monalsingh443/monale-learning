
const questions = document.querySelectorAll('.question');
const pageButtons = document.querySelectorAll('.page-btn');
const prevButton = document.getElementById('prev');
const nextButton = document.querySelector('.pagination button:last-child');

let currentPage = 1;
const questionsPerPage = 10;

// Function to display questions for the current page
function showQuestions(page) {
    const start = (page - 1) * questionsPerPage;
    const end = start + questionsPerPage;

    questions.forEach((question, index) => {
        question.style.display = index >= start && index < end ? 'block' : 'none';
    });

    pageButtons.forEach(btn => btn.classList.remove('active'));
    pageButtons[page - 1].classList.add('active');

    prevButton.disabled = page === 1;
    nextButton.disabled = page === pageButtons.length;
}

// Pagination button functionality
pageButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        currentPage = index + 1;
        showQuestions(currentPage);
    });
});

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showQuestions(currentPage);
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < pageButtons.length) {
        currentPage++;
        showQuestions(currentPage);
    }
});

// Add functionality to show correct or incorrect feedback
questions.forEach(question => {
    const options = question.querySelectorAll('label');

    options.forEach(option => {
        option.addEventListener('click', () => {
            const input = option.querySelector('input');
            const span = option.querySelector('span');

            // Reset all options for the question
            options.forEach(opt => {
                opt.classList.remove('correct', 'incorrect');
                opt.querySelector('span').textContent = '';
            });

            // Show feedback based on value
            if (input.value === 'correct') {
                option.classList.add('correct');
                span.textContent = '✅';
            } else {
                option.classList.add('incorrect');
                span.textContent = '❌';
            }
        });
    });
});

// Initialize
showQuestions(currentPage);
