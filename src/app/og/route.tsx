import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";

export async function GET() {
  const inter = await fetch(
    new URL("../../fonts/Inter/Inter-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          fontFamily: '"Typewriter"',
          padding: 20,
          backgroundImage:
            "url('data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1164%26quot%3b)' fill='none'%3e%3cuse xlink:href='%23SvgjsSymbol1171' x='0' y='0'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsSymbol1171' x='720' y='0'%3e%3c/use%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1164'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpath d='M-1 0 a1 1 0 1 0 2 0 a1 1 0 1 0 -2 0z' id='SvgjsPath1169'%3e%3c/path%3e%3cpath d='M-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0z' id='SvgjsPath1168'%3e%3c/path%3e%3cpath d='M-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0z' id='SvgjsPath1165'%3e%3c/path%3e%3cpath d='M2 -2 L-2 2z' id='SvgjsPath1170'%3e%3c/path%3e%3cpath d='M6 -6 L-6 6z' id='SvgjsPath1167'%3e%3c/path%3e%3cpath d='M30 -30 L-30 30z' id='SvgjsPath1166'%3e%3c/path%3e%3c/defs%3e%3csymbol id='SvgjsSymbol1171'%3e%3cuse xlink:href='%23SvgjsPath1165' x='30' y='30' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='30' y='90' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1166' x='30' y='150' stroke='rgba(211%2c 211%2c 211%2c 1)' stroke-width='3'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='30' y='210' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1168' x='30' y='270' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1169' x='30' y='330' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='30' y='390' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='30' y='450' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='30' y='510' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1168' x='30' y='570' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='90' y='30' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='90' y='90' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='90' y='150' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='90' y='210' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='90' y='270' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='90' y='330' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1168' x='90' y='390' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1169' x='90' y='450' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='90' y='510' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='90' y='570' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1168' x='150' y='30' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='150' y='90' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='150' y='150' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='150' y='210' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='150' y='270' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1169' x='150' y='330' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1166' x='150' y='390' stroke='rgba(211%2c 211%2c 211%2c 1)' stroke-width='3'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='150' y='450' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1169' x='150' y='510' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='150' y='570' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='210' y='30' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='210' y='90' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='210' y='150' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='210' y='210' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='210' y='270' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='210' y='330' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='210' y='390' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='210' y='450' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1168' x='210' y='510' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='210' y='570' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='270' y='30' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='270' y='90' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1168' x='270' y='150' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='270' y='210' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='270' y='270' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='270' y='330' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='270' y='390' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='270' y='450' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='270' y='510' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='270' y='570' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='330' y='30' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='330' y='90' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='330' y='150' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='330' y='210' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='330' y='270' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='330' y='330' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='330' y='390' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='330' y='450' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='330' y='510' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='330' y='570' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='390' y='30' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='390' y='90' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='390' y='150' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='390' y='210' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='390' y='270' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='390' y='330' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='390' y='390' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1169' x='390' y='450' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='390' y='510' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='390' y='570' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='450' y='30' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='450' y='90' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='450' y='150' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='450' y='210' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='450' y='270' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='450' y='330' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='450' y='390' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='450' y='450' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='450' y='510' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='450' y='570' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='510' y='30' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='510' y='90' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='510' y='150' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='510' y='210' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='510' y='270' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1168' x='510' y='330' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='510' y='390' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1169' x='510' y='450' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1166' x='510' y='510' stroke='rgba(211%2c 211%2c 211%2c 1)' stroke-width='3'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1168' x='510' y='570' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1168' x='570' y='30' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='570' y='90' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='570' y='150' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='570' y='210' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='570' y='270' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1166' x='570' y='330' stroke='rgba(211%2c 211%2c 211%2c 1)' stroke-width='3'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='570' y='390' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='570' y='450' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='570' y='510' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1168' x='570' y='570' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1169' x='630' y='30' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='630' y='90' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='630' y='150' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='630' y='210' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='630' y='270' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='630' y='330' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1167' x='630' y='390' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='630' y='450' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='630' y='510' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='630' y='570' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='690' y='30' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1166' x='690' y='90' stroke='rgba(211%2c 211%2c 211%2c 1)' stroke-width='3'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='690' y='150' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1168' x='690' y='210' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1169' x='690' y='270' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='690' y='330' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='690' y='390' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='690' y='450' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1170' x='690' y='510' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1165' x='690' y='570' stroke='rgba(211%2c 211%2c 211%2c 1)'%3e%3c/use%3e%3c/symbol%3e%3c/svg%3e')",
        }}>
        <div
          style={{
            fontFamily: "Inter",
            fontWeight: "bold",
            fontSize: 80,
            padding: 20,
            marginLeft: 100,
          }}>
          {"NameDayToken 🥳"}
        </div>
        <div
          style={{
            fontFamily: "Inter",
            fontWeight: "bold",
            fontSize: 40,
          }}>
          {
            "The ERC-20 token only mintable by the name owners during the name day"
          }
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Typewriter",
          data: inter,
          style: "normal",
        },
      ],
    }
  );
}
