const weatherGroups = {
  '2': 'thunderstorm',
  '3': 'rain',
  '5': 'rain',
  '6': 'snow',
  '7': 'atmosphere',
  '8': 'clear_sky',
  '9': 'cloudy',
};

/**
 * It uses weather id from OpenWeatherMap API to create name of an image associated with given id.
 */

export const formatIllustrationName = (id: number) => {
  let index: string = '';

  if (id < 800) index = id.toString()[0];
  else if (id === 800) index = '8';
  else index = '9';

  return `${weatherGroups[index]}-landscape.jpg`;
};
