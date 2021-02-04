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

function ManageUserRoles(props) {


  function handleClick(e) {
  
      document.getElementById('navbar').style.width = '150px';
      document.getElementById('navName').style.fontSize = '0';
      document.getElementById('grid').style.width = '30px';
  
      document.getElementById('navbar1').style.width = '150px';
      document.getElementById('navName1').style.fontSize = '0';
      document.getElementById('grid1').style.width = '30px';
  
      document.getElementById('navbar2').style.width = '150px';
      document.getElementById('navName2').style.fontSize = '0';
      document.getElementById('grid2').style.width = '30px';
  
      document.getElementById('navbar3').style.width = '150px';
      document.getElementById('navName3').style.fontSize = '0';
      document.getElementById('grid3').style.width = '30px';
  
      document.getElementById('navbar4').style.width = '150px';
      document.getElementById('navName4').style.fontSize = '0';
      document.getElementById('grid4').style.width = '30px';
  
      document.getElementById('navbar5').style.width = '150px';
      document.getElementById('navName5').style.fontSize = '0';
      document.getElementById('grid5').style.width = '30px';

  }

  function secondHandleClick (e) {
    document.getElementById('navbar').style.width = '270px';
    document.getElementById('navName').style.fontSize = '.875rem';
    document.getElementById('grid').style.width = '30px';

    document.getElementById('navbar1').style.width = '270px';
    document.getElementById('navName1').style.fontSize = '.875rem';
    document.getElementById('grid1').style.width = '30px';

    document.getElementById('navbar2').style.width = '270px';
    document.getElementById('navName2').style.fontSize = '.875rem';
    document.getElementById('grid2').style.width = '30px';

    document.getElementById('navbar3').style.width = '270px';
    document.getElementById('navName3').style.fontSize = '.875rem';
    document.getElementById('grid3').style.width = '30px';

    document.getElementById('navbar4').style.width = '270px';
    document.getElementById('navName4').style.fontSize = '.875rem';
    document.getElementById('grid4').style.width = '30px';

    document.getElementById('navbar5').style.width = '270px';
    document.getElementById('navName5').style.fontSize = '.875rem';
    document.getElementById('grid5').style.width = '30px';
  }
  const styles = useStyles();
  return (

    <div>
      <div className="navbar" class="navbar" id="navbar">
        <a className="section" href="#section">
          <img class="grid" id="grid" src={grid} alt="image al" />
          <span class="navName" id="navName">Dashboard Home</span>
        </a>

        <a className="section" href="#section" id="navbar1">
          <img class="grid" id="grid1" src={homeIcon} alt="image al" />
          <span class="navName" id="navName1">Manage Role Assignment</span>
        </a>

        <a className="section" href="#section" id="navbar2">
          <img class="grid" id="grid2" src={peopleCirle} alt="image al" />
          <span class="navName" id="navName2">Manage Project Users</span>
        </a>

        <a className="section" href="#section" id="navbar3">
          <img class="grid" id="grid3" src={layers} alt="image al" />
          <span class="navName" id="navName3">My Projects</span>
        </a>


        <a className="section" href="#section" id="navbar4">
          <img class="grid" id="grid4" src={layers} alt="image al" />
          <span class="navName" id="navName4">My Tickets</span>
        </a>


        <a className="section" href="#section" id="navbar5">

          <img class="grid" id="grid5" src={personAddOutline} alt="image al" />
          <span class="navName" id="navName5">User Profile</span>
        </a>

        <a className="section" href="#section" id="navbar5" onClick={handleClick}>
          Click me
          </a>

          <a className="section" href="#section" id="navbar5" onClick={secondHandleClick}>
          UnClick me
          </a>
      </div>

     
    </div>



  );
}

export default ManageUserRoles;