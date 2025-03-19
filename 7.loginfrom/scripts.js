$(document).ready(function() {
    function calculateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function validateName() {
        const name = $('#name').val();
        if (name.length < 3 || /\d/.test(name)) {
            $('#nameError').text('Name must be at least 3 letters and contain no numbers.');
            return false;
        } else {
            $('#nameError').text('');
            return true;
        }
    }

    function validateEmail() {
        const email = $('#email').val();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            $('#emailError').text('Please enter a valid email address.');
            return false;
        } else {
            $('#emailError').text('');
            return true;
        }
    }

    function validateAddress() {
        
        const address = $('#address').val();
        if (address.trim() === '') {
            $('#addressError').text('Address is required.');
            return false;
        } else {
            $('#addressError').text('');
            return true;
        }
    }

    function validateDob() {
        const dob = $('#dob').val();
        if (!dob) {
            $('#dobError').text('Date of Birth is required.');
            return false;
        } else {
            $('#dobError').text('');
            return true;
        }
    }

    function validateGender() {
        const gender = $('input[name="gender"]:checked').val();
        if (!gender) {
            $('#genderError').text('Please select a gender.');
            return false;
        } else {
            $('#genderError').text('');
            return true;
        }
    }

    function validatePassword() {
        const password = $('#password').val();
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            $('#passwordError').text('Password must be at least 8 characters long, with one uppercase, one lowercase, one number, and one special character.');
            return false;
        } else {
            $('#passwordError').text('');
            return true;
        }
    }

    function validateConfirmPassword() {
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        if (password !== confirmPassword) {
            $('#confirmPasswordError').text('Passwords do not match.');
            return false;
        } else {
            $('#confirmPasswordError').text('');
            return true;
        }
    }

    function validateAge() {
        const dob = $('#dob').val();
        if (validateDob()) {
            const age = calculateAge(dob);
            $('#age').val(age);
            if (age < 18) {
                $('#ageError').text('Age is restricted. Must be at least 18.');
                return false;
            } else {
                $('#ageError').text('');
                return true;
            }
        }
        return false;
    }

    $('#name').keyup(validateName);
    $('#email').keyup(validateEmail);
    $('#address').keyup(validateAddress);
    $('#dob').change(validateAge);
    $('#gender').change(validateGender);
    $('#password').keyup(validatePassword);
    $('#confirmPassword').keyup(validateConfirmPassword);

    $(document).on('click', '.toggle-password', function() {
        $(this).toggleClass("fas fa-eye");
        var input = $("#password");
        input.attr('type') === 'password' ? input.attr('type','text') : input.attr('type','password')
    });

    $('#signupForm').submit(function(event) {
        event.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isAddressValid = validateAddress();
        const isDobValid = validateDob();
        const isGenderValid = validateGender();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isAgeValid = validateAge();

        if (isNameValid && isEmailValid && isAddressValid && isDobValid && isGenderValid && isPasswordValid && isConfirmPasswordValid && isAgeValid) {
            $('#Message').text('Form submitted successfully!');
            $('#Message').css('color', 'green');
            window.location.href = 'https://www.cybrosys.com/';
        } else {
            $('#Message').text('Error in form submission.');
            $('#Message').css('color', 'red');
        }
    });
});
