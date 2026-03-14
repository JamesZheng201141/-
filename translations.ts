import { Language } from './types';

export const translations = {
  zh: {
    nav_daily: '智慧',
    nav_library: '藏经阁',
    nav_recitation: '修持',
    nav_chat: '解惑',
    nav_my: '我的',
    
    daily_title: '每日智慧',
    daily_source: '今日开示',
    
    lib_title: '般若藏经阁',
    lib_tab_sutra: '经典经文',
    lib_tab_history: '佛教史迹',
    lib_back: '返回',
    
    rec_streak: '累计打卡天数',
    rec_today: '今日修持(遍)',
    rec_title: '今日功课',
    rec_select: '选择经文',
    rec_btn: '完成诵读 • 打卡',
    rec_btn_loading: '记录中...',
    rec_history: '修持记录',
    rec_empty: '暂无记录，愿您今日精进。',
    rec_continue: '继续修持',

    chat_title: '般若解惑',
    chat_placeholder: '请问您有什么疑惑？',
    chat_send: '发送',
    chat_loading: '思考中...',
    chat_error: '抱歉，我暂时无法回答您的问题。',

    my_title: '个人中心',
    my_plan: '当前方案',
    my_plan_free: '随缘版 (免费)',
    my_plan_pro: '护法版 (会员)',
    my_subscribe: '升级会员',
    my_subscribed: '已订阅',
    my_lang: '语言设置',
    my_about: '关于般若伴侣',
    my_version: '版本 v1.3.0',
    my_quote: '万法唯心造',
    
    sub_interval_month: '月付',
    sub_interval_year: '年付',
    sub_price_month: '¥18 / 月',
    sub_price_year: '¥168 / 年',
    sub_save: '省 20%',
    sub_select_plan: '选择订阅方案',
    sub_manage: '管理订阅'
  },
  en: {
    nav_daily: 'Wisdom',
    nav_library: 'Library',
    nav_recitation: 'Practice',
    nav_chat: 'Ask Zen',
    nav_my: 'Profile',
    
    daily_title: 'Daily Wisdom',
    daily_source: 'Daily Reflection',
    
    lib_title: 'Sutra Library',
    lib_tab_sutra: 'Scriptures',
    lib_tab_history: 'History',
    lib_back: 'Back',
    
    rec_streak: 'Day Streak',
    rec_today: 'Today (Count)',
    rec_title: 'Daily Practice',
    rec_select: 'Select Sutra',
    rec_btn: 'Complete • Check-in',
    rec_btn_loading: 'Saving...',
    rec_history: 'History',
    rec_empty: 'No records yet. Diligence brings wisdom.',
    rec_continue: 'Continue',

    chat_title: 'Zen Q&A',
    chat_placeholder: 'What is your doubt?',
    chat_send: 'Send',
    chat_loading: 'Meditating...',
    chat_error: 'Sorry, I cannot answer your question right now.',

    my_title: 'My Profile',
    my_plan: 'Current Plan',
    my_plan_free: 'Free Plan',
    my_plan_pro: 'Dharma Guardian (Pro)',
    my_subscribe: 'Upgrade to Pro',
    my_subscribed: 'Subscribed',
    my_lang: 'Language',
    my_about: 'About App',
    my_version: 'Version v1.3.0',
    my_quote: 'All things are created by the mind.',

    sub_interval_month: 'Monthly',
    sub_interval_year: 'Yearly',
    sub_price_month: '$2.99 / mo',
    sub_price_year: '$29.99 / yr',
    sub_save: 'Save 20%',
    sub_select_plan: 'Select Plan',
    sub_manage: 'Manage Subscription'
  }
};

export const getTranslation = (lang: Language) => translations[lang];
