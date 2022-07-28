import plugin from 'tailwindcss/plugin';
import type { CSSRuleObject } from 'tailwindcss/types/config';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';

type DefaultColorScales = Omit<DefaultColors, 'inherit' | 'current' | 'transparent' | 'black' | 'white'>;
type DefaultColorName = keyof DefaultColorScales;

const getRGBA = (color:string) => {
  const hex = color.replace('#', '');
  const bits = hex.length / 3;
  const factor = bits === 1 ? 17 : 1;
  const [R, G, B] = [0, 1, 2].map(x => {
    let localHex = hex.slice(bits * x, bits * (x + 1));
    return parseInt(localHex, 16) * factor;
  });
  const brightness = ((R * 299) + (G * 587) + (B * 114)) / 1000;
  const isBright = brightness > 155;
  return { R, G, B, brightness, isBright };
};

const toRGBA = (color:string, alpha:string | number = 1):string => {
  const { R, G, B } = getRGBA(color);
  return `rgba(${R},${G},${B},${alpha})`;
};

const hexIsLight = (color:string):boolean => {
  const { isBright } = getRGBA(color);
  return isBright;
};


const surfaces = plugin(( { matchUtilities, theme } ) => {
  // check that this version of Tailwind supports our plugin.
  if (!matchUtilities) return;
  // helper function, makes things a bit more concise
  const getColorScale = <K extends DefaultColorName>(hue: K):DefaultColorScales[K] => theme(`colors.${hue}`);
  // get all of the color groupings in our current theme.
  const shades = Object.keys(theme('colors')) as DefaultColorName[];
  // stashing this here as a way to keep global CSS consistent
  const baseStyle:CSSRuleObject = {
    backgroundColor: 'var(--surface-bg-color)',
    color: 'var(--surface-text-color)',
    borderColor: 'var(--surface-border-color)',
    'h1,h2,h3,h4,h5,h6': {
      fontWeight: '600',
      color: 'var(--surface-heading-color)',
    },
    'small,caption,footer': {
      color: 'var(--surface-caption-color)',
    },
    'button': {
      letterSpacing: '-0.01333em',
      fontSize: '12px',
      padding: theme('spacing.1'),
      paddingLeft: theme('spacing.2'),
      paddingRight: theme('spacing.2'),
      borderRadius: theme('borderRadius.sm'),
      backgroundColor: 'transparent',
      border: '0px solid var(--btn-border-color)',
      transition: 'all 0.2s ease-in-out',
      color: 'var(--txt-color)',
      '&:hover': {
        backgroundColor: 'var(--bg-hover)',
      },
      '&[type="submit"]': {
        color: 'var(--surface-btn-bg-color_',
        backgroundColor: 'var(--bg-color)',
      },
    }
  };

  return shades.map(hue => {
    const h = getColorScale(hue);
    const getVar = <T extends keyof typeof h>(args0: T, args1: T, ref: string) => {
      return h[hexIsLight(ref) ? args0 : args1];
    };
    return matchUtilities({
      [`box-${hue}`]: (value:string) => ({
        '--tw-ring-opacity': '0.5',
        '--tw-ring-color': getVar('700', '200', value),
        '--tw-border-color': getVar('600', '300', value),
        '--surface-heading-color': getVar('900', '50', value),
        '--surface-text-color': getVar('800', '100', value),
        '--surface-caption-color': getVar('600', '300', value),
        '--surface-border-color': getVar('500', '300', value),
        '--surface-btn-bg-color': getVar('50', '300', value),
        '--surface-bg-color': value,
        ...baseStyle,
      })
    }, {
      values: getColorScale(hue),
      type: 'color',
    });
  });
});

module.exports = Object.assign(surfaces, {
  hexIsLight, toRGBA, getRGBA,
});

