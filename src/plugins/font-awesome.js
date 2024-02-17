import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { // Import les icônes voulues
  faPlus,
  faPencil,
  faEye,
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faFireExtinguisher,
  faAirFreshener,
  faCar,
  faSheetPlastic,
  faCheck,
  faMapMarker,
  faCalendar,
  faFilter,
  faArrowLeft,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";

library.add(faCalendar, faArrowRight, faArrowLeft, faFilter, faCheck, faAirFreshener, faCar, faPlus, faFireExtinguisher, faPencil, faEye, faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faSheetPlastic, faMapMarker);

export { FontAwesomeIcon };