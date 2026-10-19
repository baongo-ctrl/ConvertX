import { getTerms } from '../content/legal';
import LegalPage from './LegalPage';

export default function Terms() {
  return <LegalPage path="/terms" getDocument={getTerms} />;
}
