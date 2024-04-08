document.addEventListener('DOMContentLoaded', () => {
  const timerElement = document.getElementById('timer');
  const messageElement = document.getElementById('message');
  messageElement.textContent = "Look at an object 20 feet away";
  let countdown = 20;
  const countdownInterval = setInterval(() => {
     countdown--;
     timerElement.textContent = countdown;
     if (countdown <= 0) {
       clearInterval(countdownInterval);
       window.close();
     }
  }, 1000);
 });
 
 