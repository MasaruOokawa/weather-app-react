const weatherNamesInJapanese = {
    'Clear': '晴れ',
    'Clouds': 'くもり',
    'Mist': '靄',
    'Fog': '霜',
    'Squall': 'スコール',
    'Rain': '雨',
    'Thunderstorm': '雷雨',
    'Snow': '雪',
    'Drizzle': '靄雨',
};

export const convertWeatherToJapanese = (weatherMain) => weatherNamesInJapanese[weatherMain] || weatherMain;

export const getDayOfWeek = (dayIndex) => ['日', '月', '火', '水', '木', '金', '土'][dayIndex];
