"use client";

import React from "react";
import { openEmail, openWhatsApp } from "@/datasets/Site";
import { CHANNELS } from "@/datasets/Copy";

/* The same channels as the classic Contact section, decoded at click time. */
export default function FluidChannels()
{
  return (
    <div className="egress-actions">
      <button
        type="button"
        className="fluid-btn solid"
        onClick={() => openEmail()}
      >
        {CHANNELS.email.name}
      </button>
      <button
        type="button"
        className="fluid-btn"
        onClick={() => openWhatsApp()}
      >
        {CHANNELS.whatsapp.name}
      </button>
    </div>
  );
}
