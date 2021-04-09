import { makeStyles } from '@material-ui/core/styles';
import '../css/main.css';
import UserTable from '../components/UserTable';
import UserList from '../components/UserList';
import SideAndNavbar from '../components/SideAndNavbar';
import Button from '@material-ui/core/Button';

function ManageUserRoles(props) {

  return (
    <body>
    <SideAndNavbar/>

      <div id="main" class="main">
        <div class="grid-item">
          <p>Manage User Roles</p>
          <div class="custom-select">
            <label for="cars" class="heading" className="part1">Select 1 or more Users:</label>
            <br />
            <UserList />
          </div>
          <div class="custom-select2">
            <label for="cars" class="heading" className="part2">Select the Role to assign:</label>
            <br />
            <select>
              <option value="0">--Select Role/None--:</option>
              <option value="1">Admin</option>
              <option value="2">Demo_Admin</option>
              <option value="3">Demo_Developer</option>
              <option value="4">Demo_Project Manager</option>
            </select>
          </div>

          <Button variant="contained" color="primary">
          Assign
          </Button>
        </div>

        <div class="grid-item">
          <div class="table">
            <UserTable class="userTable" />
          </div>
        </div>
      </div>

    </body>
  );
}

export default ManageUserRoles;