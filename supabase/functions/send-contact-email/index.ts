import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.13";

interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneFull: string;
  subject: string;
  message: string;
  pageUrl?: string;
  timestamp?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: ContactPayload;

  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { firstName, lastName, email, phoneFull, subject, message, pageUrl, timestamp } = payload;

  if (!firstName || !lastName || !email || !phoneFull || !subject || !message) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 422,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const smtpHost = Deno.env.get("SMTP_HOST");
  const smtpPort = Number(Deno.env.get("SMTP_PORT") ?? "587");
  const smtpUser = Deno.env.get("SMTP_USER");
  const smtpPass = Deno.env.get("SMTP_PASS");

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error("SMTP secrets not configured");
    return new Response(JSON.stringify({ error: "Email service not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const submittedAt = timestamp
    ? new Date(timestamp).toLocaleString("en-UG", { timeZone: "Africa/Kampala" })
    : new Date().toLocaleString("en-UG", { timeZone: "Africa/Kampala" });

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background: #1a237e; padding: 24px 32px;">
        <h2 style="color: #ffffff; margin: 0; font-size: 22px;">New Contact Form Submission</h2>
        <p style="color: #c5cae9; margin: 4px 0 0; font-size: 14px;">AA Uganda Website</p>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr>
            <td style="padding: 10px 0; color: #666; width: 160px; vertical-align: top; font-weight: 600;">Name</td>
            <td style="padding: 10px 0; color: #212121;">${firstName} ${lastName}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px 8px; color: #666; font-weight: 600;">Email</td>
            <td style="padding: 10px 8px; color: #212121;">
              <a href="mailto:${email}" style="color: #1a237e;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666; font-weight: 600;">Phone</td>
            <td style="padding: 10px 0; color: #212121;">${phoneFull}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px 8px; color: #666; font-weight: 600;">Subject</td>
            <td style="padding: 10px 8px; color: #212121;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666; font-weight: 600; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; color: #212121; white-space: pre-line; line-height: 1.6;">${message}</td>
          </tr>
        </table>

        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;" />

        <p style="font-size: 12px; color: #9e9e9e; margin: 0;">
          Submitted: ${submittedAt} (EAT)${pageUrl ? ` &nbsp;|&nbsp; Source: <a href="${pageUrl}" style="color: #9e9e9e;">${pageUrl}</a>` : ""}
        </p>
      </div>
    </div>
  `;

  const textBody = `New contact form submission — AA Uganda\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phoneFull}\nSubject: ${subject}\n\nMessage:\n${message}\n\nSubmitted: ${submittedAt}${pageUrl ? `\nSource: ${pageUrl}` : ""}`;

  try {
    await transporter.sendMail({
      from: `"AA Uganda Website" <${smtpUser}>`,
      to: "info@aau.co.ug",
      replyTo: `"${firstName} ${lastName}" <${email}>`,
      subject: `[AAU Contact] ${subject} — ${firstName} ${lastName}`,
      text: textBody,
      html: htmlBody,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Nodemailer send error:", err);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
