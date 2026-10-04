import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID || '3efb5217e90e8067b776f1d90ac77dd6'

export async function getReflectionByDay(dayNumber: number) {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Name',
        rich_text: {
          contains: `Day ${dayNumber}`,
        },
      },
    })

    if (response.results.length === 0) {
      return null
    }

    const page = response.results[0]
    const props = page.properties as any

    return {
      id: page.id,
      day: dayNumber,
      title: props.Title?.rich_text[0]?.plain_text || '',
      rawQuote: props['Raw Quote']?.rich_text[0]?.plain_text || '',
      versionA: props['Version A']?.rich_text[0]?.plain_text || '',
      versionB: props['Version B']?.rich_text[0]?.plain_text || '',
      versionC: props['Version C']?.rich_text[0]?.plain_text || '',
      quotable: props.Quotable?.rich_text[0]?.plain_text || '',
      scripture: props.Scripture?.rich_text[0]?.plain_text || '',
    }
  } catch (error) {
    console.error('Error fetching reflection:', error)
    return null
  }
}

export async function getAllReflections() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: 'Name',
          direction: 'ascending',
        },
      ],
    })

    return response.results.map((page, index) => {
      const props = page.properties as any
      return {
        id: page.id,
        day: index + 1,
        title: props.Title?.rich_text[0]?.plain_text || '',
        quotable: props.Quotable?.rich_text[0]?.plain_text || '',
      }
    })
  } catch (error) {
    console.error('Error fetching reflections:', error)
    return []
  }
}