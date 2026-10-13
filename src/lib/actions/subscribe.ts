"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Введите корректный email"),
});

export type SubscribeState = { ok: boolean; message: string };

export async function subscribeAction(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { ok: false, message: "Введите корректный email" };
  }

  try {
    await prisma.subscriber.upsert({
      where: { email: parsed.data.email },
      update: {},
      create: { email: parsed.data.email },
    });
    return { ok: true, message: "Спасибо! Вы подписаны на дайджест." };
  } catch {
    return { ok: false, message: "Не получилось подписать. Попробуйте позже." };
  }
}
