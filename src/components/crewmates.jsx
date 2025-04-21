import './crewmates.css'
import { Link } from 'react-router-dom';

const crewmates = (props) => {
    return(
        <>
        <div className="crewmate-container">
            <div className="crewmate-card" id={props.color}>
                <img src="https://cdn.icon-icons.com/icons2/2637/PNG/512/among_us_crewmate_icon_159245.png" class="single-crewmate" height="150px" width="auto"></img>
                <h3><span className="label">Name:</span> <span className="propcolor">{props.name}</span></h3>
                <h3><span className="label">Hat:</span> <span className="propcolor">{props.hat}</span></h3>
                <h3><span className="label">Pet:</span> <span className="propcolor">{props.pet}</span></h3>
                <h3><span className="label">Color:</span> <span className="propcolor">{props.color}</span></h3>
                <Link to={`/edit/${props.id}`}>
                    <button>Edit</button>
                </Link>

                <Link to={`/${props.id}`}>
                    <button>Inspect</button>
                </Link>
            </div>
        </div>
        </>
    )
}

export default crewmates