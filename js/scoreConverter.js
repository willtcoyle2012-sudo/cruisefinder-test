// js/scoreConverter.js

export function convertOldScores(ship) {
  const baseline = 60;
  let softPoints = 0;

  const s = ship.scores;

  // Audience preference
  const audienceKeys = ["Family","Couples","Solo","Friends","Older Adults"];
  const audienceFraction = audienceKeys.reduce((sum, key) => sum + (s[key] || 0), 0) / audienceKeys.length;
  softPoints += audienceFraction * 10; // max 10

  // Luxury / Market
  softPoints += (s["Luxury"] || 0) * 6;

  // Modern
  softPoints += (s["Modern"] || 0) * 6;

  // Dining
  softPoints += (s["Dining"] || 0) * 6;

  // Size
  softPoints += (s["Size"] || 0) * 6;

  // Extras
  const extraKeys = ["Adventure","Cultural","Relaxation","Party","Romantic","Family Fun"];
  const extraFraction = extraKeys.reduce((sum, key) => sum + (s[key] || 0), 0) / extraKeys.length;
  softPoints += extraFraction * 6; // max 6

  // Final score
  const finalScore = Math.min(baseline + softPoints, 100);

  return {
    ...ship,
    finalScore
  };
}

export function getSortedShips(oldShipsJson) {
  return oldShipsJson
    .map(convertOldScores)
    .sort((a,b) => b.finalScore - a.finalScore);
}
