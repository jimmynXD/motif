export interface ColorTokenInterface {
  token: string
  hex: string
  rgb: {
    r: number
    g: number
    b: number
  }
}

export interface TypographyTokenInterface {
  token: string
  fontFamily: string
  fontWeight: string
  fontSize: number
  lineHeight?: string
  lineHeightRelative?: number
  letterSpacing: number
}
