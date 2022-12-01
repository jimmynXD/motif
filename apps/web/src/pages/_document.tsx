import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="keywords"
            content="figma plugin, ux, dx, labxd, motifxd, motif, developer experience, designer experience,"
          />
          <meta name="description" content="" />
          <link rel="canonical" href="https://motifxd.com/" />

          <meta property="og:title" content="motifXD" />
          <meta
            property="og:description"
            content="DesignOps Toolchain Development"
          />
          <meta property="og:url" content="https://motifxd.com" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://motifxd.com/cover.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@hausofxd" />
          <meta name="twitter:creator" content="@hausofxd" />
          <meta name="twitter:title" content="Haus of XD" />
          <meta
            name="twitter:description"
            content="Haus of XD is the voice for motifXD, developing the DesignOps toolchain."
          />
          <meta name="twitter:image" content="https://motif.com/cover.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="favicon-16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favicon-32.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
