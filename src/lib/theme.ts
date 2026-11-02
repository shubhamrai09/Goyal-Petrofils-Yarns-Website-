export const THEME_STORAGE_KEY = "geetex-theme";

/** Runs in <head> before paint so the saved theme shows without a flash. */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t&&t!=="classic")document.documentElement.dataset.theme=t}catch(e){}`;
