import { css } from '@emotion/react';
import { colors } from '../colors';
import { ColorValue } from '../types/Colors';
import { hexToRGBA } from './hexToRGBA';

type CreatePulseEffectProps = {
  /**
   * The intermediate color between the starting and the ending color
   * @default brandPrimaryDarkFaded
   */
  startingColor?: ColorValue;
  /**
   * The ending color of the animation, should have alpha at 0
   * @default brandPrimaryDarkTransparent
   */
  endingColor?: ColorValue;
  /**
   * In seconds, how fast should the animation loop
   * @default 1s
   */
  speed?: number;
};

/**
 * Creates a pulsating effect on an element with a default color of brandPrimaryDark
 */
export const createPulseEffect = ({
  startingColor = colors.brandPrimaryDark,
  endingColor = colors.brandPrimaryDark,
  speed = 1,
}: CreatePulseEffectProps = {}) => {
  // As long as the colors in the theme are hex values, this should be fine
  // and allows us to use `colors.THING` instead of colors['THING']
  const fadedColor = hexToRGBA(startingColor as string, 0.4);
  const transparentColor = hexToRGBA(endingColor as string, 0.0);

  return css`
    box-shadow: 0 0 0 ${fadedColor};
    animation: pulse ${speed}s infinite;

    &:hover {
      animation: none;
    }

    @-webkit-keyframes pulse {
      0% {
        -webkit-box-shadow: 0 0 0 0 ${fadedColor};
      }
      70% {
        -webkit-box-shadow: 0 0 0 10px ${transparentColor};
      }
      100% {
        -webkit-box-shadow: 0 0 0 0 ${transparentColor};
      }
    }

    @keyframes pulse {
      0% {
        -moz-box-shadow: 0 0 0 0 ${fadedColor};
        box-shadow: 0 0 0 0 ${fadedColor};
      }
      70% {
        -moz-box-shadow: 0 0 0 10px ${transparentColor};
        box-shadow: 0 0 0 10px ${transparentColor};
      }
      100% {
        -moz-box-shadow: 0 0 0 0 ${transparentColor};
        box-shadow: 0 0 0 0 ${transparentColor};
      }
    }
  `;
};

export const pulseEffect = createPulseEffect();
