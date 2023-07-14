// array describing the color for each team
// using camel case where the team names include a space
const colors = [
    '#00D2BE',
    '#DC0000',
    '#1E41FF',
    '#FFF500',
    '#F596C8',
    '#9B0000',
    '#469BFF',
    '#BD9E57',
    '#FF8700',
    '#FFFFFF'
];
  
  // array describing the drivers, sorted by position and with a gap describing the distance from the leading driver
  const leaderboard = [
    {
      name: 'Emilian',
      team: '1188 Zeilen Code, 21 Konzepte',
      gap: '188'
    },
    {
      name: 'Scharbel',
      team: '274 Zeilen Code, 13 Konzepte',
      gap: '72'
    }
  ];

  function getRandomElement(array) {
    // Überprüfen, ob das Array leer ist
    if (array.length === 0) {
      return undefined;
    }
  
    // Generiere einen zufälligen Index basierend auf der Länge des Arrays
    const randomIndex = Math.floor(Math.random() * array.length);
  
    // Gib das Element an dem zufälligen Index zurück
    return array[randomIndex];
  }
  
  // target the table element in which to add one div for each driver
  const main = d3
    .select('table');
  
  // for each driver add one table row
  // ! add a class to the row to differentiate the rows from the existing one
  // otherwise the select method would target the existing one and include one row less than the required amount
  const drivers = main
    .selectAll('tr.driver')
    .data(leaderboard)
    .enter()
    .append('tr')
    .attr('class', 'driver');
  
  // in each row add the information specified by the dataset in td elements
  // specify a class to style the elements differently with CSS
  
  // position using the index of the data points
  drivers
    .append('td')
    .text((d, i) => i + 1)
    .attr('class', 'position');
  
  
  // name followed by the team
  drivers
    .append('td')
    // include the last name in a separate element to style it differently
    // include the team also in another element for the same reason
    .html (({name, team}) => `${name.split(' ').map((part, index) => index > 0 ? `<strong>${part}</strong>` : `${part}`).join(' ')} <span>${team}</span>`)
    // include a border with the color matching the team
    .style('border-left', ({team}) => {
      // find the color using the string value found in d.team
      // ! if the string value has a space, camelCase the value
      console.log('foo')
      const color = getRandomElement(colors);
      return `4px solid ${color}`;
    })
    .attr('class', 'driver');
  
  // gap from the first driver
  drivers
    .append('td')
    .attr('class', 'gap')
    .append('span')
    .text(({gap}) => gap);