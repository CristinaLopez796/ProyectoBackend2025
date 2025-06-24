const { createClient } = require('@supabase/supabase-js');
const { supabaseAdmin } = require("../supabaseClient");
require("dotenv").config();

const supabaseAnonClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ user: data.user });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabaseAnonClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ user: data.user, session: data.session });
};
