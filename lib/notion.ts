import { Client } from '@notionhq/client'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID || '3efb5217e90e8067b776f1d90ac77dd6'

function isFullPage(page: any): page is PageObjectResponse {
  return page.object === 'page' && 'properties' in page
}

function getRichTextValue(prop: any): string {
  if (prop?.type === 'rich_text' && prop.rich_text?.[0]?.plain_text) {
    return prop.rich_text[0].plain_text
  }
  return ''
}

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
    if (!isFullPage(page)) return null
    const props = page.properties as any

    return {
      id: page.id,
      day: dayNumber,
      title: getRichTextValue(props.Title),
      rawQuote: getRichTextValue(props['Raw Quote']),
      versionA: getRichTextValue(props['Version A']),
      versionB: getRichTextValue(props['Version B']),
      versionC: getRichTextValue(props['Version C']),
      quotable: getRichTextValue(props.Quotable),
      scripture: getRichTextValue(props.Scripture),
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

    return response.results
      .filter(isFullPage)
      .map((page, index) => {
        const props = page.properties as any
        return {
          id: page.id,
          day: index + 1,
          title: getRichTextValue(props.Title),
          quotable: getRichTextValue(props.Quotable),
        }
      })
  } catch (error) {
    console.error('Error fetching reflections:', error)
    return []
  }
}