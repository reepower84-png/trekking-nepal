import { NextRequest, NextResponse } from "next/server";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1457406206602776741/A-dGhbpVt6HzwSNJVguZ1OLf-ngkyO1NkucsW_aE8p4sIa_b_CG93Cbf-FKjDZWf7ZMS";

export async function POST(request: NextRequest) {
  try {
    const { name, phone, message } = await request.json();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    const discordMessage = {
      embeds: [
        {
          title: "📩 새로운 문의가 접수되었습니다!",
          color: 0x1b6b3a,
          fields: [
            { name: "이름", value: name, inline: true },
            { name: "연락처", value: phone, inline: true },
            { name: "문의 내용", value: message },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "트레킹네팔 문의폼",
          },
        },
      ],
    };

    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordMessage),
    });

    if (!discordResponse.ok) {
      return NextResponse.json(
        { error: "알림 전송에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
