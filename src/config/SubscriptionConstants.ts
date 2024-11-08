export const AI_GENERATION_PER_DECK = 4;
export const PRICE_PER_DECK = 4;
export const DISCOUNT_PER_DECK = 0.2;
export const MIN_FLASHCARDS_PER_DECK = 3;
export const MAX_FLASHCARDS_PER_DECK = 20;
export const FREE_FLASHCARDS_PER_DECK = 5;
export const FREE_DECKS = 3;
export const MAX_DECKS = 200;
export const MIN_DECKS = 10;
export const DECK_JUMPS = 5;

export const UPSELL_POINTS = [
  {
    intent: "manual_card_count",
    message: `Create upto ${MAX_FLASHCARDS_PER_DECK} flashcards per deck`
  },
  {
    intent: "card_count",
    message: `Generate upto ${MAX_FLASHCARDS_PER_DECK} flashcards per deck`
  },
]