(() => {
  const form = document.getElementById("signupForm");
  const status = document.getElementById("signupStatus");
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const data = new FormData(form);
    const fullName = String(data.get("fullName") || "").trim();
    const studioName = String(data.get("studioName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");
    const confirmPassword = String(data.get("confirmPassword") || "");
    const serviceInterest = String(data.get("serviceInterest") || "");
    status.classList.remove("error");
    if (password !== confirmPassword) {
      status.classList.add("error");
      status.innerHTML = "The passwords do not match.<small>パスワードが一致しません。</small>";
      return;
    }
    const { supabaseUrl, supabaseAnonKey } = window.ATELIER_CONFIG || {};
    if (!supabaseUrl || !supabaseAnonKey || !window.supabase) {
      status.classList.add("error");
      status.innerHTML = "Account creation is not connected yet. Add your Supabase project URL and public key in app/assets/js/config.js.<small>アカウント作成の準備ができていません。SupabaseのURLと公開キーを設定してください。</small>";
      return;
    }
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    status.innerHTML = "Creating your account…<small>アカウントを作成しています…</small>";
    try {
      const client = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
      const { error } = await client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/`,
          data: { full_name: fullName, studio_name: studioName, service_interest: serviceInterest }
        }
      });
      if (error) throw error;
      form.reset();
      status.innerHTML = "Account created. Check your email to confirm your address and finish signing up.<small>アカウントを作成しました。メールアドレスを確認して登録を完了してください。</small>";
    } catch (error) {
      status.classList.add("error");
      status.innerHTML = `${String(error.message || "Account creation failed.")}<small>アカウントを作成できませんでした。入力内容をご確認ください。</small>`;
    } finally {
      button.disabled = false;
    }
  });
})();
