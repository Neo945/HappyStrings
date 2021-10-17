import { Translate } from "@google-cloud/translate/build/src/v2";
import cred from "./cread.json";

const translate = new Translate({
  credentials: cred,
  projectId: cred.project_id,
});

async function translateText(text, target) {
  return (await translate.translate(text, target))[0];
}
