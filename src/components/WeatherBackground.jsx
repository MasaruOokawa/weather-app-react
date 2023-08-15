import { useEffect } from 'react';

const gmapsKey = "AIzaSyAJNuetOB7aGHXWyTLLqvhX_GTGUT4gyEg";


const customStyle = [
    'feature:water|color:0xD0E0E3',
    'feature:landscape|color:0xffffff',
    'feature:all|element:labels|gamma:10.0',
    'feature:all|element:all|hue:0xD9EAD3',
    'feature:all|element:all|saturation:-70'
];


const WeatherBackground = ({ location }) => {
    useEffect(() => {
        if (location) {
            const formattedLocation = location.replace(/\s/gi, "+"); // スペースを+に置き換え
            const styleParameters = customStyle.map((styleRule) => `&style=${encodeURIComponent(styleRule)}`).join('');
            const imageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${formattedLocation}&zoom=10&size=640x640&scale=2&format=jpeg&key=${gmapsKey}${styleParameters}`;
            document.body.style.backgroundImage = `url(${imageURL})`;
            document.body.style.backgroundSize = 'cover';
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const styleParameters = customStyle.map((styleRule) => `&style=${encodeURIComponent(styleRule)}`).join('');
                const imageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=10&size=640x640&scale=2&format=jpeg&key=${gmapsKey}${styleParameters}`;
                document.body.style.backgroundImage = `url(${imageURL})`;
                document.body.style.backgroundSize = 'cover';
            }, error => {
                console.error('Failed to retrieve location:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, [location]);

    return null;
};

export default WeatherBackground;
