import './navbar.css';
import { Link } from 'react-router-dom';

const navbar = () => {
    return (
        <>
        <div className="navbar">
            <li className="listitem">
            <Link className="listitem" to="/">Home</Link>
            </li>
            <li className="listitem">
            <Link className="listitem" to="/create">Create</Link>
            </li>
            <li className="listitem">
            <Link className="listitem" to="/gallery">Gallery</Link>
            </li>
        </div>
        </>
    )
}

export default navbar;