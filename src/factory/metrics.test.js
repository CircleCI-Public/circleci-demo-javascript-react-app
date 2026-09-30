import { mergeEfficiencyPercent, buildFactoryStations } from './metrics';

describe('mergeEfficiencyPercent', () => {
  it('returns 0 when nothing was attempted', () => {
    expect(mergeEfficiencyPercent(0, 0)).toBe(0);
  });

  it('returns the merge efficiency ratio as a whole-number percent', () => {
    // 3 merged of 4 attempted => 75%
    expect(mergeEfficiencyPercent(3, 4)).toBe(75);
  });

  it('rounds to the nearest whole number', () => {
    // 2 / 3 ~= 66.666... => 67
    expect(mergeEfficiencyPercent(2, 3)).toBe(67);
  });
});

describe('buildFactoryStations', () => {
  it('returns Accuracy, Efficiency, and Risk stations', () => {
    const stations = buildFactoryStations();
    expect(stations.map((s) => s.id)).toEqual([
      'accuracy',
      'efficiency',
      'risk',
    ]);
  });
});
