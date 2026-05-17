/**
 * Structured sales copy returned by the AI Sales Copy Generator (Phase 5M).
 * @typedef {Object} AiSalesCopyPayload
 * @property {string} title
 * @property {string} subtitle
 * @property {string} heroSummary
 * @property {string[]} keyBenefits
 * @property {string[]} applications
 * @property {string[]} keySpecs
 * @property {string} whyThisProduct
 * @property {string[]} repTalkTrack
 * @property {string[]} discoveryQuestions
 * @property {string[]} crossSell
 * @property {string[]} cautions
 * @property {string} recommendedNextStep
 */

export const AI_SALES_COPY_GENERATOR_VERSION = "1.0.0";

export const AI_SALES_COPY_FIELD_KEYS = Object.freeze([
  "title",
  "subtitle",
  "heroSummary",
  "keyBenefits",
  "applications",
  "keySpecs",
  "whyThisProduct",
  "repTalkTrack",
  "discoveryQuestions",
  "crossSell",
  "cautions",
  "recommendedNextStep",
]);

/** @returns {AiSalesCopyPayload} */
export function emptyAiSalesCopyPayload() {
  return {
    title: "",
    subtitle: "",
    heroSummary: "",
    keyBenefits: [],
    applications: [],
    keySpecs: [],
    whyThisProduct: "",
    repTalkTrack: [],
    discoveryQuestions: [],
    crossSell: [],
    cautions: [],
    recommendedNextStep: "",
  };
}
