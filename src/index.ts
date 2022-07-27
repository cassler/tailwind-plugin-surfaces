const plugin = require('tailwindcss/plugin');
const cols = require('tailwindcss/colors');

function hexIsLight(color:string) {
  const hex = color.replace('#', '');
  const contrastR = parseInt(hex.substr(0, 2), 16);
  const contrastG = parseInt(hex.substr(2, 2), 16);
  const contrastB = parseInt(hex.substr(4, 2), 16);
  const brightness = ((contrastR * 299) + (contrastG * 587) + (contrastB * 114)) / 1000;
  return brightness > 155;
}

export default plugin(function ({ matchUtilities, theme }:Parameters<typeof plugin>[0]) {
  /**
   * This plugin provides a box-* utility class. This allows
   * inheritence of default color palettes for background and test respectively.
   *
   * Ex: `.box-red-200` will have a bg of red-200, black titles, and red-900 body.
   * Ex: `.box-blue-700` will have a bg of blue-700, white titles and blue-50 body.
   */
  if (!matchUtilities) return;

  return Object.keys(cols).map(hue => {
    let colors = theme(`colors.${hue}`);

    return matchUtilities({
      [`box-${hue}`]: (value:string) => {
        return [{
          backgroundColor: value,
          color: hexIsLight(value) ? colors[900] : colors[50],
          borderColor: hexIsLight(value) ? colors[500] : colors[300],
        },
        {
          'h1,h2,h3,h4,h5,h6': {
            fontWeight: 600,
            color: hexIsLight(value) ? '#000' : '#fff',
          },
          'small,caption,footer': {
            opacity: 0.666,
          },
        }];
      },
    }, {
      values: theme(`colors.${hue}`),
      type: 'color',
    });
  });
});
