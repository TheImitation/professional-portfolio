import React from "react";
import { ImageResponse } from "next/server";
import { PERSON, SITE_URL } from "@/datasets/Site";

export const runtime = "edge";
export const alt = `${PERSON.name} — ${PERSON.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The same 11x8 pixel pal that hides behind the headshot. */
const PAL = [
  "..X.....X..",
  "...X...X...",
  "..XXXXXXX..",
  ".XX.XXX.XX.",
  "XXXXXXXXXXX",
  "X.XXXXXXX.X",
  "X.X.....X.X",
  "...XX.XX...",
];

const CELL = 26;

export default function OpenGraphImage()
{
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px 96px",
          backgroundColor: "#060f1a",
          backgroundImage:
            "radial-gradient(circle at 18% 15%, rgba(0,191,255,0.22), transparent 55%), radial-gradient(circle at 85% 90%, rgba(125,249,255,0.16), transparent 50%)",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#00bfff" }}>
            {"{TheImitation_}"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              color: "#e8f4fb",
              marginTop: 28,
            }}
          >
            {PERSON.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#7df9ff",
              marginTop: 18,
              maxWidth: 640,
            }}
          >
            {PERSON.title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#9db8c9",
              marginTop: 44,
            }}
          >
            {SITE_URL.replace("https://", "")}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {PAL.map((row, y) => (
            <div key={y} style={{ display: "flex" }}>
              {row.split("").map((cell, x) => (
                <div
                  key={x}
                  style={{
                    width: CELL,
                    height: CELL,
                    backgroundColor: cell === "X" ? "#7df9ff" : "transparent",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
