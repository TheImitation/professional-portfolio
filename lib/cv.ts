import fs from "fs";
import path from "path";
import { CV_PATH } from "@/datasets/Site";

/* The CV buttons only render once the PDF actually exists in public/.
   Server-only: both pages call it at build time. */
export const cvAvailable = () => fs.existsSync(path.join(process.cwd(), "public", CV_PATH));
