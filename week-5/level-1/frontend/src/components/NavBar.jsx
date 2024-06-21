import PropTypes from "prop-types";

function NavBar({ style }) {
    return (
        <div>
            <h1 style={style}>This is Nav Bar</h1>
        </div>
    )
}

NavBar.propTypes = {
    style: PropTypes.object
}

export default NavBar;