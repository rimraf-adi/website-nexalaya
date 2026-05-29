import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import fs from "fs";
import path from "path";

/**
 * Append a row to the Google Sheet with [Email, Organization, Timestamp]
 */
async function appendToSheet(email: string, org: string) {
  const base64Key = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!base64Key || !spreadsheetId) {
    console.warn("Google Sheets env vars missing — skipping sheet logging.");
    return;
  }

  // Decode the base64-encoded service account JSON
  const credentials = JSON.parse(
    Buffer.from(base64Key, "base64").toString("utf-8")
  );

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
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
      values: [[email, org, timestamp]],
    },
  });
}

export async function POST(request: Request) {
  try {
    const { email, org } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Log to Google Sheets
    try {
      await appendToSheet(email, org || "");
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
