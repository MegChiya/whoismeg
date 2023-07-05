//
const quiz = [
    {
      question: 'What does Meg do?',
      image: ['images/1-1.png', 'images/1-2.png'],
      answers: ['UX design', 'Make sushi'],
      correct: 'UX design'
    },
    {
      question: 'What is Meg passionate about?',
      image: ['images/2-1.png', 'images/2-2.png'],
      answers: ['Going for long road trips', 'Creating positive emotions between technologies and people'],
      correct: 'Creating positive emotions between technologies and people'
    },
    {
      question: 'What degree is Meg currently pursuing?',
      image: ['images/3-1.png', 'images/3-2.png'],
      answers: ['A split at 180 degrees', 'Master’s in User Experience Design'],
      correct: 'Master’s in User Experience Design'
    },
    {
      question: 'Where is Meg originally from?',
      image: ['images/4-1.png', 'images/4-2.png'],
      answers: ['Shizuoka, Japan', 'Out of space'],
      correct: 'Shizuoka, Japan'
    },
    {
      question: 'Did Meg design and code this quiz?',
      image: ['images/5-1.png', 'images/5-2.png'],
      answers: ['Yes, she did and she enjoyed it a lot!', 'No…she wants nothing to do with programming.'],
      correct: 'Yes, she did and she enjoyed it a lot!'
    }
  ];
  
  const quizLength = quiz.length;
  let quizIndex = 0;
  let score = 0;
  
  const $options = document.getElementsByClassName('options');
  const optionsLength = $options.length;

  const $pics = document.getElementsByTagName('img');
  const picsLength = $pics.length;
  
  const setupQuiz = () => {
    document.getElementById('js-question').textContent = quiz[quizIndex].question;
    let buttonIndex = 0;
    while (buttonIndex < optionsLength) {
      $options[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
      $pics[buttonIndex].src = quiz[quizIndex].image[buttonIndex];
      buttonIndex++;
    }
  };
  setupQuiz();
  
  const clickHandler = (e) => {
    let modal;
    if (quiz[quizIndex].correct === e.target.textContent) {
      modal = new bootstrap.Modal(document.getElementById('myModal1'));
      modal.show();
      score++;
    } else {
      modal = new bootstrap.Modal(document.getElementById('myModal2'));
      modal.show();
    }
  };
  
  const nextButton = document.querySelector('#myModal1 .btn-primary');
  nextButton.addEventListener('click', () => {
    quizIndex++;
    if (quizIndex < quizLength) {
      setupQuiz();
      const modal = bootstrap.Modal.getInstance(document.getElementById('myModal1'));
      modal.hide();
      const progressPercentage = ((quizIndex + 1) / quizLength) * 100; // Calculate the new progress percentage
      const progressBar = document.querySelector('.progress-bar');
      progressBar.style.width = `${progressPercentage}%`; // Set the width of the progress bar
      progressBar.setAttribute('aria-valuenow', progressPercentage); // Update the aria-valuenow attribute
    } else {
        const resultModal = new bootstrap.Modal(document.getElementById('myModal1'));
        resultModal.show();
        const resultMessage =
          'Now that you got to know Meg better, let’s explore her UX case studies and design projects';
        document.querySelector('#myModal1 .modal-body p').textContent = resultMessage;
      }
  });
  
  let handlerIndex = 0;
  while (handlerIndex < optionsLength) {
    $options[handlerIndex].addEventListener('click', (e) => {
      clickHandler(e);
    });
    handlerIndex++;
  }
  
  const myModal = document.getElementById('myModal');
  const myInput = document.getElementById('myInput');
  
  myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus();
  });
  