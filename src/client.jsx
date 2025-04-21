import { createClient } from '@supabase/supabase-js';

const URL ="https://oatlkewixhaifylnlymd.supabase.co";
const API_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdGxrZXdpeGhhaWZ5bG5seW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMzY4NDIsImV4cCI6MjA2MDYxMjg0Mn0._vJqNy2LpIgi6wQlMOtRh2eZWVsj7LibFeytYys-dbc";

export const supabase = createClient(URL, API_KEY);