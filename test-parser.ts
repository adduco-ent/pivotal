function parseLastSent(notes: string) {
  if (!notes) return null;
  let lastState = null;
  const regex = /\[Seq([ABC])_([123]) sent at (.*?)\]/g;
  let match;
  while ((match = regex.exec(notes)) !== null) {
    const seq = match[1];
    const step = parseInt(match[2], 10);
    const date = new Date(match[3]);
    if (!lastState || step > lastState.step) {
      lastState = { step, sequence: seq, date };
    }
  }
  if (lastState) return lastState;
  const oldRegex = /\[SequenceA_Initial sent from .* at (.*?) EST\]/g;
  while ((match = oldRegex.exec(notes)) !== null) {
    const date = new Date(match[1]);
    lastState = { step: 1, sequence: 'A', date };
  }
  return lastState;
}

console.log(parseLastSent("[SequenceA_Initial sent from jarred@pivotaltimes.io at 7/19/2026, 10:30:00 AM EST]"));
console.log(parseLastSent("[SeqB_1 sent at 2026-07-20T02:00:00.000Z]\n[SeqB_2 sent at 2026-07-23T02:00:00.000Z]"));
console.log(parseLastSent(""));
