import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const TITLE_TEXT = `
                   __          __                     __ __ 
.-----.-----.--.--|  |_ ______|  |_.-----.______.----|  |__|
|     |  -__|_   _|   _|______|   _|__ --|______|  __|  |  |
|__|__|_____|__.__|____|      |____|_____|      |____|__|__|
`;
export const DEFAULT_APP_NAME = "next-ts-cli";
export const CREATE_NEXT_TS_CLI = "next-ts-cli";
