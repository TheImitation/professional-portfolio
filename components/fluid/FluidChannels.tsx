"use client";

import React from "react";
import { EMAIL_B64, WHATSAPP_B64 } from "@/datasets/Site";

/* Same proxy approach as the live Contact section: the raw address and
   number never appear in the HTML, and are only decoded at click time. */
export default function FluidChannels()
{
  return (
    <div className="egress-actions">
      <button
        type="button"
        className="fluid-btn solid"
        onClick={() => { window.location.href = `mailto:${atob(EMAIL_B64)}`; }}
      >
        Open a channel
      </button>
      <button
        type="button"
        className="fluid-btn"
        onClick={() =>
          window.open(`https://wa.me/${atob(WHATSAPP_B64)}`, "_blank", "noopener,noreferrer")
        }
      >
        WhatsApp
      </button>
    </div>
  );
}
