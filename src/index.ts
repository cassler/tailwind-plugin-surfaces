import plugin from 'tailwindcss/plugin';
import { CSSRuleObject, ThemeConfig } from 'tailwindcss/types/config';




export function getRGBA(color:string) {
  const hex = color.replace('#', '');
  const bits = hex.length / 3;
  const factor = bits === 1 ? 17 : 1;
  const [R,G,B] = [0,1,2].map(x => {
    let localHex = hex.slice(bits*x, bits*(x+1));
    return parseInt(localHex, 16) * factor
  })
  const brightness = ((R * 299) + (G * 587) + (B * 114)) / 1000;
  const isBright = brightness > 155
  return { R,G,B,brightness,isBright }
}
export function toRGBA(color:string, alpha:string|number = 1):string {
  const { R,G,B } = getRGBA(color)
  return `rgba(${R},${G},${B},${alpha})`
}
export function hexIsLight(color:string):boolean {
  const { isBright } = getRGBA(color);
  return isBright;
}


export const surfaces = plugin(( {matchUtilities, theme }) => {

  /**
   * This plugin provides a box-* utility class. This allows
   * inheritence of default color palettes for background and test respectively.
   *
   * Ex: `.box-red-200` will have a bg of red-200, black titles, and red-900 body.
   * Ex: `.box-blue-700` will have a bg of blue-700, white titles and blue-50 body.
   */



  function getColorScale(hue: keyof Extract<ThemeConfig,"colors">): Extract<ThemeConfig,"colors"> {
    return theme(`colors.${hue.toString()}`)
  }

  let btnBase:CSSRuleObject = {
    letterSpacing: '-0.01333em',
    fontSize: '12px',
    padding: theme('spacing.1'),
    paddingLeft: theme('spacing.2'),
    paddingRight: theme('spacing.2'),
    borderRadius: theme('borderRadius.sm'),
    backgroundColor: 'transparent',
    border: '0px solid var(--border-color)',
    transition: 'all 0.2s ease-in-out',
    color: 'var(--txt-color)',
  };

  return !!matchUtilities && Object.keys(theme('colors')).map(hue => {
    const colors = getColorScale(hue);
    return matchUtilities({

      [`box-${hue}`]: (value:string) => {
        let isLight = hexIsLight(value);
        return {
          '--tw-ring-color': isLight ? toRGBA(colors['300'], '0.5') : toRGBA(colors['900'], '0.5'),
          '--tw-ring-opacity': '0.5',
          '--border-color': toRGBA(isLight ? colors['300'] : colors['500'], '0.8'),
          backgroundColor: value,
          color: isLight ? colors['900'] : colors['50'],
          borderColor: isLight ? colors['500'] : colors['300'],
          'h1,h2,h3,h4,h5,h6': {
            fontWeight: '600',
            color: isLight ? colors['900'] : colors['50'],
          },
          'small,caption,footer': {
            color: isLight ? colors['700'] : colors['300'],
          },
          'button': {
            '--border-color': isLight ? toRGBA(colors[300], '0.5') : toRGBA(colors[900], '0.5'),
            '--bg-color': toRGBA(`${isLight ? colors[700] : colors[50]}`, '0.75'),
            '--bg-hover': toRGBA(`${isLight ? colors[700] : colors[50]}`, '0.1'),
            '--txt-color': isLight ? colors[700] : colors[50],
            ...btnBase,
            '&:hover': {
              backgroundColor: 'var(--bg-hover)',
            },
            '&[type="submit"]': {
              color: isLight ? colors[50] : colors[900],
              backgroundColor: 'var(--bg-color)',
            },
          },
        }}
      }, {
        values: getColorScale(hue),
        type: "color"
      });
    });
});

export default surfaces;
