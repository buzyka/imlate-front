/**
 * Dashboard link tile: icon, navy title, muted description. Lifts 3px on hover.
 *
 */
export interface FeatureCardProps {
  title: React.ReactNode;
  /** One or two sentences, sentence case. */
  description: React.ReactNode;
  /** 32px glyph. The shipped app uses emoji here; prefer an Icon at 28-32px. */
  icon?: React.ReactNode;
  href?: string;
  target?: string;
  style?: React.CSSProperties;
}
export function FeatureCard(props: FeatureCardProps): JSX.Element;
