import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BottomNavigation() {
  return (
    <div className="btm-nav btm-nav-md">
      <button className="p-2">
        <FontAwesomeIcon icon={['fas', 'house']} fontSize="8px" />
      </button>
      <button className="p-2">
        <FontAwesomeIcon icon={['fas', 'compass']} />
      </button>
      <button className="p-2">
        <FontAwesomeIcon icon={['fas', 'user']} />
      </button>
    </div>
  )
}