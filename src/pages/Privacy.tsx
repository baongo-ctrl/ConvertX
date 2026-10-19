import { getPrivacy } from '../content/legal';
import LegalPage from './LegalPage';

export default function Privacy() {
  return <LegalPage path="/privacy" getDocument={getPrivacy} />;
}
