"use client";

import { useEffect, useRef } from "react";

/* A hello for the kind of visitor who opens devtools on a portfolio. */
const ConsoleEgg = () =>
{
  const logged = useRef(false);

  useEffect(() =>
  {
    if (logged.current) return;
    logged.current = true;

    console.log(
      "%c{TheImitation_}",
      "font-family: monospace; font-size: 22px; font-weight: bold; color: #7df9ff; text-shadow: 0 0 12px rgba(0,191,255,0.8);"
    );
    console.log(
      "%cWell hello, fellow dev. Since you're poking around: the headshot on the homepage is hiding something — try the arrow keys.\nSource lives at https://github.com/TheImitation",
      "font-family: monospace; font-size: 12px; color: #9db8c9;"
    );
  }, []);

  return null;
};

export default ConsoleEgg;
