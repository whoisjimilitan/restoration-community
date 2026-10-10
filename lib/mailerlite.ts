const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_BASE_URL = "https://connect.mailerlite.com/api";

const GROUP_IDS: Record<string, string> = {
  "journey": "200521180101215690",
  "received": "200521181048080072",
};

export async function addSubscriber(email: string, tags: string[], ref?: string, source?: string) {
  try {
    const payload: any = {
      email,
      groups: tags.map(tag => GROUP_IDS[tag] || tag),
    };

    if (ref) {
      payload.fields = { ref };
    }

    const response = await fetch(`${MAILERLITE_BASE_URL}/subscribers`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      const errorMsg = `MailerLite ${response.status}: ${errorBody}`;
      console.error("MailerLite API error:", errorMsg);
      console.error("Request payload:", JSON.stringify(payload));
      throw new Error(errorMsg);
    }

    return { success: true, subscriber: await response.json() };
  } catch (error) {
    console.error("MailerLite subscribe error:", error);
    return { success: false, error: String(error) };
  }
}

export async function tagSubscriber(email: string, tags: string[]) {
  try {
    // Get subscriber first
    const searchResp = await fetch(`${MAILERLITE_BASE_URL}/subscribers?filter[email]=${email}`, {
      headers: {
        "Authorization": `Bearer ${MAILERLITE_API_KEY}`,
      },
    });

    if (!searchResp.ok) {
      throw new Error("Subscriber not found");
    }

    const data = await searchResp.json();
    const subscriber = data.data?.[0];
    if (!subscriber) {
      throw new Error("Subscriber not found");
    }

    // Add tags
    const updateResp = await fetch(`${MAILERLITE_BASE_URL}/subscribers/${subscriber.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groups: tags.map(tag => ({ name: tag })),
      }),
    });

    if (!updateResp.ok) {
      throw new Error(`Failed to tag: ${updateResp.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("MailerLite tag error:", error);
    return { success: false, error: String(error) };
  }
}