// Supabase client singleton for vanilla JS
// Docs: https://supabase.com/docs/guides/with-js

// Подключение Supabase через CDN (см. index.html)
const SUPABASE_URL = 'https://hfghbfnhrzkthtqpsaco.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmZ2hiZm5ocnprdGh0cXBzYWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMTI1NjUsImV4cCI6MjA2NTY4ODU2NX0.5StVwbKp2PfxQ0aDFveVcHZ2V5S0D1pdRwk7T0FYaIQ';

// Инициализация клиента (CDN создаёт глобальный объект 'supabase')
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Проверяет, есть ли уже такой email в таблице subs
 * @param {string} email
 * @returns {Promise<boolean>} true если email уже есть
 */
export async function isDuplicateEmail(email) {
  const { data, error } = await supabase
    .from('subs')
    .select('id')
    .eq('email', email)
    .maybeSingle();
  if (error) throw error;
  return !!data;
}

/**
 * Добавляет email в таблицу subs
 * @param {string} email
 * @returns {Promise<void>}
 */
export async function addEmail(email) {
  const { error } = await supabase
    .from('subs')
    .insert([{ email }]);
  if (error) throw error;
}
