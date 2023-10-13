import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { ProfileFormDataType } from "~/utils/validations/profile-form";
const webhookSecret: string = env.DATABASE_URL;
toast;

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  try {
    // Verify the webhook payload and headers
    evt = (await wh.verify(payload, headers)) as WebhookEvent;
  } catch (_) {
    // If the verification fails, return a 400 error
    return res.status(400).json({});
  }
  const id = evt.data?.id;

  const eventType = evt.type;
  if (eventType === "user.created" && id !== undefined) {
    console.log(`User ${id} was ${eventType}`);
    api.user.add.useMutation().mutate(dummyData);
    res.status(201).json({});
  }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

let dummyData: ProfileFormDataType = {
  city: "test",
  email: "testworked@yahoo.com",
  firstName: "test",
  lastName: "test worked",
  postcode: "testworked",
  street: "testworked",
};
