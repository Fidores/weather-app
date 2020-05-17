/**
 * It uses weather id from OpenWeatherMap API to create name of an image associated with given id.
 */

export const formatIllustrationName = (id: number, nightTime: boolean) => {
  const dayWeatherGroups = {
    '2': 'thunderstorm',
    '3': 'rain',
    '5': 'rain',
    '6': 'snow',
    '7': 'atmosphere',
    '8': 'clear_sky',
    '9': 'cloudy',
  };

  const nightWeatherGroups = {
    '2': 'thunderstorm',
    '3': 'rain',
    '5': 'rain',
    '6': 'snow-n',
    '7': 'atmosphere',
    '8': 'clear_sky-n',
    '9': 'cloudy-n',
  };

  let index: string = '';
  const group = nightTime ? nightWeatherGroups : dayWeatherGroups;

  if (id < 800) index = id.toString()[0];
  else if (id === 800) index = '8';
  else index = '9';

  return `${group[index]}-landscape.jpg`;
};
