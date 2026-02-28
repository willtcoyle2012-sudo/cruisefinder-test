function convertOldScores(ship, user){
  const baseline = 60;
  let score = baseline;

  // Audience match
  if(user.audience==="Family") score += (ship.scores.Family||0)*20;
  if(user.audience==="Adult") score += ((ship.scores.Couples||0 + ship.scores["Older Adults"]||0)/2)*20;
  if(user.audience==="Solo") score += (ship.scores.Solo||0)*20;

  // Budget match (higher for closer Luxury preference)
  if(user.budget==="low") score += (1 - (ship.scores.Luxury||0))*10;
  if(user.budget==="mid") score += 10; // neutral
  if(user.budget==="high") score += (ship.scores.Luxury||0)*10;

  // Region match
  if(ship.deployment.includes(user.region)) score += 10;

  // Extra attributes
  const extra = ["Adventure","Cultural","Relaxation","Party","Romantic","Family Fun"];
  score += extra.reduce((sum,key)=>sum + (ship.scores[key]||0)*3,0);

  return {...ship, finalScore: Math.min(score, 100)};
}
