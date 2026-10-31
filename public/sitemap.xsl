<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="sm">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>NEXSUS XML Sitemap</title>
        <style>
          :root { color-scheme: light; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background: #f5f5f2;
            color: #111;
            font-family: Arial, Helvetica, sans-serif;
            -webkit-font-smoothing: antialiased;
          }
          main {
            width: min(1180px, calc(100% - 40px));
            margin: 0 auto;
            padding: 72px 0 80px;
          }
          .brand {
            margin: 0 0 64px;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: .08em;
          }
          .eyebrow {
            margin: 0 0 14px;
            color: #666;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: .12em;
            text-transform: uppercase;
          }
          h1 {
            max-width: 850px;
            margin: 0;
            font-size: clamp(40px, 7vw, 86px);
            font-weight: 500;
            letter-spacing: -.055em;
            line-height: .94;
          }
          .intro {
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: end;
            gap: 32px;
            margin: 34px 0 54px;
          }
          .intro p {
            max-width: 560px;
            margin: 0;
            color: #555;
            font-size: 16px;
            line-height: 1.55;
          }
          .count {
            white-space: nowrap;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: .04em;
          }
          .table-wrap {
            overflow-x: auto;
            border-top: 1px solid #111;
            background: #fff;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
          }
          th, td {
            padding: 18px 16px;
            border-bottom: 1px solid #deded9;
            text-align: left;
            vertical-align: top;
          }
          th {
            color: #666;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: .12em;
            text-transform: uppercase;
          }
          td {
            font-size: 13px;
            line-height: 1.45;
          }
          th:nth-child(1), td:nth-child(1) { width: 18%; }
          th:nth-child(2), td:nth-child(2) { width: 12%; }
          th:nth-child(3), td:nth-child(3) { width: 55%; }
          th:nth-child(4), td:nth-child(4) { width: 15%; }
          a {
            color: inherit;
            text-decoration: none;
            overflow-wrap: anywhere;
          }
          a:hover, a:focus-visible { text-decoration: underline; }
          .footer {
            margin: 22px 0 0;
            color: #777;
            font-size: 11px;
            line-height: 1.5;
          }
          @media (max-width: 720px) {
            main {
              width: min(100% - 24px, 1180px);
              padding: 34px 0 48px;
            }
            .brand { margin-bottom: 42px; }
            .intro {
              grid-template-columns: 1fr;
              gap: 18px;
              margin: 26px 0 38px;
            }
            table { min-width: 760px; }
            th, td { padding: 15px 12px; }
          }
        </style>
      </head>
      <body>
        <main>
          <p class="brand">NEXSUS</p>
          <p class="eyebrow">Technical SEO</p>
          <h1>XML Sitemap</h1>
          <div class="intro">
            <p>Canonical, indexable pages available to search engines.</p>
            <div class="count">Total URLs: <xsl:value-of select="count(sm:urlset/sm:url)" /></div>
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Content type</th>
                  <th scope="col">Language</th>
                  <th scope="col">URL</th>
                  <th scope="col">Last modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sm:urlset/sm:url">
                  <xsl:variable name="url" select="sm:loc" />
                  <xsl:variable name="path" select="substring-after($url, 'https://nexsus.ma')" />
                  <tr>
                    <td>
                      <xsl:choose>
                        <xsl:when test="$path = '/'">Homepage</xsl:when>
                        <xsl:when test="$path = '/fr' or starts-with($path, '/fr/') or $path = '/ar' or starts-with($path, '/ar/')">Localized Page</xsl:when>
                        <xsl:when test="$path = '/insights'">Insights Hub</xsl:when>
                        <xsl:when test="$path = '/insights/projects' or $path = '/insights/technology' or $path = '/insights/brand-creative' or $path = '/insights/ventures'">Insight Category</xsl:when>
                        <xsl:when test="starts-with($path, '/insights/')">Insight Article</xsl:when>
                        <xsl:otherwise>Core Page</xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="$path = '/fr' or starts-with($path, '/fr/')">French</xsl:when>
                        <xsl:when test="$path = '/ar' or starts-with($path, '/ar/')">Arabic</xsl:when>
                        <xsl:otherwise>English</xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td><a href="{$url}"><xsl:value-of select="$url" /></a></td>
                    <td><xsl:value-of select="sm:lastmod" /></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
          <p class="footer">This presentation layer is provided for human readability. Search engines receive the underlying standards-compliant XML sitemap.</p>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
