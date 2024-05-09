import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export const EyeOpenIcon = () => <FontAwesomeIcon icon={faEye} />;
export const EyeClosedIcon = () => <FontAwesomeIcon icon={faEyeSlash} />;
export const ConfigIcon = () => <FontAwesomeIcon icon={faCog} />;