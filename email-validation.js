// Список временных email-сервисов
const TEMPORARY_EMAIL_DOMAINS = [
  'mailinator.com',
  '10minutemail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'yopmail.com',
  'tempmail.com',
  'throwawaymail.com',
  'maildrop.cc',
  'getairmail.com',
  'sharklasers.com',
  'guerrillamail.info',
  'guerrillamail.biz',
  'guerrillamail.com',
  'guerrillamail.de',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamailblock.com',
  'spam4.me',
  'trashmail.com',
  'trashmail.net',
  'trashmail.me',
  'trashmail.io',
  'trashmail.ws',
  'trashmail.co',
  'trashmail.de',
  'trashmail.fr',
  'trashmail.it',
  'trashmail.nl',
  'trashmail.pl',
  'trashmail.ru',
  'trashmail.se',
  'trashmail.uk',
  'trashmail.us',
  'trashmail.xyz',
  'trashmail.info',
  'trashmail.net',
  'trashmail.me',
  'trashmail.io',
  'trashmail.ws',
  'trashmail.co',
  'trashmail.de',
  'trashmail.fr',
  'trashmail.it',
  'trashmail.nl',
  'trashmail.pl',
  'trashmail.ru',
  'trashmail.se',
  'trashmail.uk',
  'trashmail.us',
  'trashmail.xyz',
  'trashmail.info'
];

// Проверка синтаксиса email
function isValidEmailSyntax(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Проверка на временный email
function isTemporaryEmail(email) {
  const domain = email.split('@')[1].toLowerCase();
  return TEMPORARY_EMAIL_DOMAINS.includes(domain);
}

// Проверка MX-записи домена
async function checkMXRecord(email) {
  const domain = email.split('@')[1];
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
    const data = await response.json();
    return data.Answer && data.Answer.length > 0;
  } catch (error) {
    console.error('Error checking MX record:', error);
    return false;
  }
}

// Основная функция валидации
export async function validateEmail(email) {
  // Проверка синтаксиса
  if (!isValidEmailSyntax(email)) {
    return {
      isValid: false,
      error: 'Invalid email format'
    };
  }

  // Проверка на временный email
  if (isTemporaryEmail(email)) {
    return {
      isValid: false,
      error: 'Temporary email addresses are not allowed'
    };
  }

  // Проверка MX-записи
  const hasMX = await checkMXRecord(email);
  if (!hasMX) {
    return {
      isValid: false,
      error: 'Invalid email domain'
    };
  }

  return {
    isValid: true,
    error: null
  };
}

// Функция для проверки в реальном времени
export function setupRealTimeValidation(inputElement, messageElement) {
  let validationTimeout;

  inputElement.addEventListener('input', async (e) => {
    const email = e.target.value.trim();
    
    // Очищаем предыдущий таймаут
    clearTimeout(validationTimeout);
    
    // Если поле пустое, очищаем сообщение
    if (!email) {
      messageElement.textContent = '';
      messageElement.className = '';
      return;
    }

    // Устанавливаем новый таймаут для проверки
    validationTimeout = setTimeout(async () => {
      const result = await validateEmail(email);
      
      if (!result.isValid) {
        messageElement.textContent = result.error;
        messageElement.className = 'text-red-500 mt-2 text-center';
      } else {
        messageElement.textContent = '';
        messageElement.className = '';
      }
    }, 500); // Задержка 500мс для предотвращения частых проверок
  });
} 