export type ConceptId = 'bliscy' | 'auto' | 'prywatnosc';

export type RouteId = 'hub' | ConceptId;

export interface ScenarioSpec {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  durationLabel: string;
  stepsCount: string;
}

export interface MetricComparison {
  label: string;
  baseline: string;
  ours: string;
}

export interface ConceptSpec {
  id: ConceptId;
  number: string;
  categoryBadge: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  heroPromise: string;
  targetAudience: string;
  baselineGap: string;
  ourBreakthrough: string;
  polishAiRole: {
    model: string;
    task: string;
    whySovereign: string;
  };
  legalBasis: string[];
  dualScreenSetup: {
    leftActor: string;
    leftRole: string;
    leftModeLabel: string;
    rightActor: string;
    rightRole: string;
    rightModeLabel: string;
  };
  metrics: MetricComparison[];
  scenarios: ScenarioSpec[];
  keyFeatures: string[];
}
