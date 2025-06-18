// Простой API endpoint для обработки подписки
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Логируем для отладки
    console.log('Received subscription request:', { email, timestamp: new Date().toISOString() });

    // Простая валидация
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Здесь можно добавить интеграцию с Supabase или другим сервисом
    // Пока просто возвращаем успех для тестирования
    console.log('Email subscription successful:', email);

    res.status(200).json({ 
      success: true, 
      message: 'Thank you! You\'ve been added to our waitlist.',
      email: email 
    });

  } catch (error) {
    console.error('Error processing subscription:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 