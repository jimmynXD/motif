import { createMainService, Service } from '@/comlinkFigma';

export const getTypes = () => {
  // get all text styles from figma
  const textStyles = figma.getLocalTextStyles();

  const typographyValues = textStyles.map((style) => {
    // replace / with .
    const typographyName = style.name.toLowerCase().replace(/\//g, '.');
    const lineHeightRelative =
      style.lineHeight.unit === 'PIXELS' &&
      Math.round((style.lineHeight.value / style.fontSize) * 100) / 100;
    const lineHeightAbsolute =
      style.lineHeight.unit === 'PIXELS' && `${style.lineHeight.value}px`;

    return {
      token: typographyName,
      style: {
        fontFamily: style.fontName.family,
        fontWeight: style.fontName.style.toLowerCase(),
        fontSize: style.fontSize,
        lineHeight: lineHeightAbsolute,
        lineHeightRelative,
        letterSpacing: style.letterSpacing.value,
      },
    };
  });

  console.log('\ntypes', typographyValues);
  return typographyValues;
};

export const service: Service = {
  getTypes,
};

export default createMainService(service);
