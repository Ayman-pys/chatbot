// بيانات اللغات
const translations = {
    en: {
        title: "DEEPSEEK & KIN",
        description: "This website is an AI website developed <br> by KIN and DeepSeek.",
        button: "Start Now!",
    },
    fr: {
        title: "DEEPSEEK & KIN",
        description: "Ce site web est un site d'intelligence artificielle développé <br> par KIN et DeepSeek.",
        button: "Commencer maintenant !",
    },
    ar: {
        title: "ديب سييك وكين",
        description: "هذا الموقع هو موقع ذكاء اصطناعي تم تطويره <br> بواسطة كين وديب سييك.",
        button: "ابدأ الآن!",
    }
};

// عناصر الصفحة
const languageSelect = document.getElementById('language-select');
const title = document.getElementById('title');
const description = document.getElementById('description');
const button = document.getElementById('button');

// دالة لتحديث المحتوى بناءً على اللغة
function updateLanguage(lang) {
    const content = translations[lang];
    title.innerHTML = content.title;
    description.innerHTML = content.description;
    button.textContent = content.button;

    // ضبط اتجاه النص
    if (lang === 'ar') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
}

// تحديث اللغة عند تغيير الاختيار
languageSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

// تحديث اللغة عند تحميل الصفحة (الإنجليزية افتراضيًا)
window.addEventListener('load', () => {
    updateLanguage('en');
});