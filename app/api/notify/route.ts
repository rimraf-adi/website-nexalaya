import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import fs from "fs";
import path from "path";

/**
 * Append a row to the Google Sheet with [Name, Email, Timestamp]
 */
async function appendToSheet(name: string, email: string) {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!privateKey || !clientEmail || !spreadsheetId) {
    console.warn("Google Sheets env vars missing — skipping sheet logging.");
    return;
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:C",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[name, email, timestamp]],
    },
  });
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // 1. Log to Google Sheets
    try {
      await appendToSheet(name, email);
    } catch (sheetError) {
      // Don't block the email send if Sheets fails
      console.error("Failed to log to Google Sheets:", sheetError);
    }

    // 2. Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "info.nexalaya@gmail.com",
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Read the HTML template and inject the user's name
    const templatePath = path.join(process.cwd(), "template.html");
    let htmlTemplate = fs.readFileSync(templatePath, "utf-8");
    htmlTemplate = htmlTemplate.replace(/\{\{NAME\}\}/g, name);

    await transporter.sendMail({
      from: '"nexalaya Team" <info.nexalaya@gmail.com>',
      to: email,
      subject: "Your nexalaya Campus Demo Request",
      html: htmlTemplate,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/notify:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please check server logs." },
      { status: 500 }
    );
  }
}
