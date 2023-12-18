"use client";

import { redirect } from "next/navigation";
import tokensJSON from "@/tokens.json";

export default function Home() {
  redirect("/token/" + tokensJSON[0].address);
}
