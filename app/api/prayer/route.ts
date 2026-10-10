import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import nodemailer from "nodemailer";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "whoisjimi.today@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { prayer, email, phone, whatsapp } = await req.json();

    if (!prayer || typeof prayer !== "string") {
      return NextResponse.json({ error: "Prayer text required" }, { status: 400 });
    }

    const properties: Record<string, any> = {
      "Name": { title: [{ type: "text", text: { content: prayer.substring(0, 100) } }] },
      "Prayer": { rich_text: [{ type: "text", text: { content: prayer } }] },
      "Received": { date: { start: new Date().toISOString() } },
      "WhatsApp": { checkbox: whatsapp === true },
      "Status": { select: { name: "New" } },
    };

    if (email) properties["Email"] = { email };
    if (phone) properties["Phone"] = { phone_number: phone };

    const page = await notion.pages.create({
      parent: { database_id: process.env.NOTION_PRAYERS_DATABASE_ID! },
      properties,
    });

    const pageId = page.id;
    const notionLink = `https://www.notion.so/${pageId.replace(/-/g, "")}`;

    try {
      await transporter.sendMail({
        from: "whoisjimi.today@gmail.com",
        to: "whoisjimi.today@gmail.com",
        subject: "Prayer received",
        html: `
          <p><strong>Prayer:</strong></p>
          <p>${prayer.replace(/\n/g, "<br>")}</p>
          <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          ${whatsapp ? `<p><strong>WhatsApp:</strong> Yes</p>` : ""}
          <p><a href="${notionLink}">View in Notion</a></p>
        `,
      });
    } catch (emailError) {
      console.error("[prayer] Email failed:", emailError);
    }

    return NextResponse.json({ id: pageId }, { status: 201 });
  } catch (error) {
    console.error("[prayer] Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, phone, whatsapp } = await req.json();

    if (!id || !phone) {
      return NextResponse.json({ error: "id and phone required" }, { status: 400 });
    }

    const pageId = id;

    await notion.pages.update({
      page_id: pageId,
      properties: {
        "Phone": { phone_number: phone },
        "WhatsApp": { checkbox: whatsapp === true },
      },
    });

    const notionLink = `https://www.notion.so/${pageId.replace(/-/g, "")}`;

    try {
      const phoneDisplay = whatsapp ? `${phone} (WhatsApp)` : phone;

      await transporter.sendMail({
        from: "whoisjimi.today@gmail.com",
        to: "whoisjimi.today@gmail.com",
        subject: `CALL: ${phoneDisplay}`,
        html: `
          <p><strong>Call this person:</strong> ${phoneDisplay}</p>
          <p><a href="${notionLink}">View prayer in Notion</a></p>
        `,
      });
    } catch (emailError) {
      console.error("[prayer/call] Email failed:", emailError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[prayer/call] Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}