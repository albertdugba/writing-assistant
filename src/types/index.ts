export type Tone = "formal" | "professional" | "friendly";
export type Length = "same" | "shorter" | "longer";

export type ToneType = {
  label: string;
  value: Tone;
};

export type LengthType = {
  label: string;
  value: Length;
};
