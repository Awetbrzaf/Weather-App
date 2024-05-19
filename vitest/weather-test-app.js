import mock from '/node_modules';
import vitest from '/node_modules';
import checkweather from 'script.js';


const { checkweather } = require('weather-app');

global.fetch = vitest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({
      name: 'mekele', // Example city name
      main: {
        temp: 15, // Example temperature
        humidity: 70, // Example humidity
      },
      wind: {
        speed: 10, // Example wind speed
      },
      weather: [{ main: 'Snowy' }], // Example weather condition
    }),
  })
);

describe('checkweather function', () => {
  it('fetches weather data for a valid city', async () => {
    const city = 'Mekele'; // Example city name
    const result = await checkweather(city);


    expect(document.querySelector('.city').innerHTML).toBe('Mekele');
    expect(document.querySelector('.temp').innerHTML).toBe('15°C');
    expect(document.querySelector('.humidity').innerHTML).toBe('70%');
    expect(document.querySelector('.wind').innerHTML).toBe('10km/h');

  });

  it('displays an error message for an invalid city', async () => {
    const invalidCity = 'NonexistentCity'; // Example invalid city name
    await checkweather(invalidCity);

    // Assuming you have DOM elements to display error messages
    expect(document.querySelector('.error').style.display).toBe('block');
    expect(document.querySelector('.Weather').style.display).toBe('none');
  });
});
