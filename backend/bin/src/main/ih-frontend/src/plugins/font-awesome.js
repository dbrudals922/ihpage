import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faPlus,
  faBars,
  faPencilAlt,
  faFlag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import {
  faHeart
} from "@fortawesome/free-regular-svg-icons";

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faPlus, faHeart, faBars, faPencilAlt, faFlag, faTrash);

export { FontAwesomeIcon };
