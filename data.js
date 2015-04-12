window.DEMO_DATA = [
    'Thor', 'Captain America', 'Hawk Eye', 'Black Widow',
    'Nick Fury', 'Iron Man', 'Hulk'
];
window.FILE_NAMES = DEMO_DATA.map(function(name){
    return name.toLowerCase().replace(/\s/, '-');
});