module.exports.validateLoginInput = (username, password )=> 
{
    const errors = {};

    if(username.trim()===' '){
        errors.username = 'Username must not be empty';
    }

    if (password.trim()===' '){
        errors.password = 'Password must not be empty';
    }
    
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

module.exports.validateRegisterInput = (
    username, 
    email, 
    password, 
    confirmPassword
) => {
    const errors = {};

    if (username.trim() === '') {
        errors.username= 'Username must not be empty';
    }

    if (email.trim() === '') {
        errors.email = 'Email must not be empty';
    }
    else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)) {
            errors.email = 'Email must a valid';
        }
    }
        
        if (password.trim() === ''){
            errors.password = 'Password must be valid';
        } else if (password.trim() !== confirmPassword.trim()) {
            errors.confirmPassword = 'Passwords must match';
        }
        
        if (confirmPassword.trim() === '') {
            errors.confirmPassword = 'Confirm Password must not be empty';
        }

        return {
            errors,
            valid: Object.keys(errors).length < 1
        };
};


module.exports.validateUpdateTicketInput = (id, title, description, assignedProjectInput, assignedDeveloperInput, priority, status, type  )=> 
{
    const errors = {};

    if(id.trim()===''){
        errors.username = 'Id must not be empty';
    }

    if (title.trim()===' '){
        errors.password = 'Title must not be empty';
    }

    if(description.trim()===''){
        errors.username = 'Description must not be empty';
    }

    if (assignedProjectInput.trim()===' '){
        errors.password = 'Assigned Project must not be empty';
    }

    if (assignedDeveloperInput.trim()===' '){
        errors.password = 'Assigned Developer must not be empty';
    }

    if (priority.trim()===' '){
        errors.password = 'Priority must not be empty';
    }

    if (status.trim()===' '){
        errors.password = 'Status must not be empty';
    }

    if (type.trim()===' '){
        errors.password = 'Type must not be empty';
    }
    
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};