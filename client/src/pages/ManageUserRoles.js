import { makeStyles } from '@material-ui/core/styles';
import '../css/main.css';
import grid from '../icons/grid-outline.svg';
import homeIcon from '../icons/home-outline.svg';
import layers from '../icons/layers-outline.svg';
import list from '../icons/list-outline.svg';
import peopleCirle from '../icons/people-circle-outline.svg';
//import peopleOutline from '../icons/people-outline.svg';
import personAddOutline from '../icons/person-add-outline.svg';
import personCircleOutline from '../icons/person-circle-outline.svg';
//import personOutline from 'person-outline.svg';
import reorderFourOutline from '../icons/reorder-four-outline.svg';
//import users from 'users.svg';

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#F5F8FB',
        width: '100%',
        height: '100%',
    },
  }));
  
function ManageUserRoles (props) {

    const styles = useStyles();
        return (
    
          <div>
          <div className="navbar">
          <a className="section" href="#section">
          <img class="grid" src={grid} alt="image al" />
          <span class="nav__name">Dashboard Home</span>
          </a>
          
          <a className="section" href="#section">
          <img class="grid" src={homeIcon} alt="image al" />
          <span class="nav__name">Manage Role Assignment</span>
          </a>
          
          <a className="section" href="#section">
          <img class="grid" src={peopleCirle} alt="image al" />
          <span class="nav__name">Manage Project Users</span>
          </a>
            
          <a className="section" href="#section">
          <img class="grid" src={layers} alt="image al" />
          <span class="nav__name">My Projects</span>
          </a>
          
          
          <a className="section" href="#section">
          <img class="grid" src={layers} alt="image al" />
          <span class="nav__name">My Tickets</span>
          </a>


          <a className="section" width="10px"href="#section">
            
          <img class="grid" src={personAddOutline} alt="image al" />
          <span class="nav__name">User Profile</span>
          </a>
          </div>
          </div>

          
        
        );
}

export default ManageUserRoles;