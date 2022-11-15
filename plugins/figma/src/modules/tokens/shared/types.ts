export interface ColorToken {
  name: string
  hex: string
  rgb: {
    r: number
    g: number
    b: number
  }
}

export interface TypographyToken {
  name: string
  fontFamily: string
  fontWeight: string
  fontSize: number
  lineHeight?: string
  lineHeightRelative?: number
  letterSpacing: number
}
