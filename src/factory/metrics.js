/**
 * Software Factory metrics helpers.
 *
 * Workshop task: one of these functions is intentionally wrong so you can
 * practice fixing it with Chunk sidecars before you push to CircleCI.
 */

/**
 * Merge Efficiency Ratio as a whole-number percent.
 * MER = (merged / attempted) * 100
 *
 * @param {number} merged - PRs (or changes) that made it to main
 * @param {number} attempted - Total PRs (or changes) attempted
 * @returns {number} Whole-number percent 0–100
 */
export function mergeEfficiencyPercent(merged, attempted) {
  if (attempted <= 0) {
    return 0;
  }
  // WORKSHOP BUG: off-by-ten. Should be Math.round((merged / attempted) * 100)
  // Fix this line, then re-run yarn test and chunk validate.
  return Math.round((merged / attempted) * 100) + 10;
}

/**
 * Build the three factory station cards shown on the board.
 * @returns {Array<{id: string, title: string, status: string, detail: string, metric: string}>}
 */
export function buildFactoryStations() {
  const mer = mergeEfficiencyPercent(3, 4);

  return [
    {
      id: 'accuracy',
      title: 'Accuracy',
      status: 'Validate before you ship',
      detail:
        'Did the change actually work? Sidecar microbuilds catch failures while the agent still has context.',
      metric: 'Inner loop: Chunk sidecar · Outer loop: CircleCI',
    },
    {
      id: 'efficiency',
      title: 'Efficiency',
      status: `Demo MER: ${mer}%`,
      detail:
        'Token time, turns, and human time all count. Faster feedback means fewer expensive outer-loop retries.',
      metric: 'Target: sidecar signal in under a minute',
    },
    {
      id: 'risk',
      title: 'Risk',
      status: 'Humans still own the merge',
      detail:
        'Cheap gates can run without a human. Release and policy checks are bets you may not want to automate yet.',
      metric: 'Auto: lint + unit · Human: merge to main',
    },
  ];
}
