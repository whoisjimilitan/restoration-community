import fs from 'fs'
import path from 'path'

export default function Home({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'brotherjimi.html')
  const html = fs.readFileSync(filePath, 'utf-8')

  return {
    props: { html },
    revalidate: 3600, // ISR: revalidate every hour
  }
}