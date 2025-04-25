export function getStars(rating: number): string {
    const full = '★'.repeat(Math.floor(rating));
    const empty = '☆'.repeat(5 - Math.floor(rating));
    return full + empty;
  }