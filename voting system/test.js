$(document).ready(function(){
    // validating the candidate name
    function Validatename(){ 
        const candidateName = $('#Candidatename').val();
        const namereg = /^[A-Za-z\s]+$/;
        
        if(candidateName.length < 3 || !namereg.test(candidateName)){
            $('#cDError').text("Invalid Name Format!!");
            return false;
        } else {
            $('#cDError').text("");
            return true;
        }
    }
      
    // validating the ID 
    function ValidateId(){
        const candidateId = $('#id').val();
        const IDreg = /^[0-9]{4}$/;
        
        if(!IDreg.test(candidateId)){
            $('#IDError').text("Invalid Format!!");
            return false;
        } else {
            $('#IDError').text("");
            return true;
        }
    }
    
    // validating the Edited candidate name
    function ValidatenameEdit(){ 
        const candidateNameEdit = $('#CandidatenameEdit').val();
        const namereg = /^[A-Za-z\s]+$/;
        
        if(candidateNameEdit.length < 3 || !namereg.test(candidateNameEdit)){
            $('#cDError').text("Invalid Name Format!!");
            return false;
        } else {
            $('#cDError').text("");
            return true;
        }
    }
    
    // validating the Edited ID 
    function ValidateIdEdit(){
        const candidateIdEdit = $('#idEdit').val();
        const IDreg = /^[0-9]{4}$/;
        
        if(!IDreg.test(candidateIdEdit)){
            $('#IDError').text("Invalid Format!!");
            return false;
        } else {
            $('#IDError').text("");
            return true;
        }
    }
    
    // Reset the form
    function resetForm() {
        $('#Candidatename').val('');
        $('#editindex').val('');
        $('#cDError').text('');
        $('#IDError').text('');
    }
    
    // Call validation functions on keyup
    $('#Candidatename').keyup(Validatename);
    $('#id').keyup(ValidateId);
    $('#CandidatenameEdit').keyup(ValidatenameEdit);
    $('#idEdit').keyup(ValidateIdEdit);
    
    // Default submission resist
    $('#candidateList').submit(function(event){
        event.preventDefault();
        const isNameValid = Validatename();
        const isIDValid = ValidateId();
        const editIndex = $('#editindex').val();
        const candidateId = $('#id').val();
                // checking the id is similar 
        const IDExists = $('#list_candidate').find('td.id').filter(function(){
            return $(this).text() === candidateId;
        }).length > 0;
        
        if(IDExists && editIndex === ""){
            $('#message').text("Already existed ID");
            return false;
        }
        
         // validate the function values
        if(isNameValid && isIDValid){
            const candidateName = $('#Candidatename').val();
            
            if(editIndex === ""){
            // data appended to 1st table
            $('#list_candidate').append("<tr><td class='Candidatename'>" + candidateName + "</td><td class='id'>" + candidateId + "</td><td><button type='button' class='btn btn-secondary edit-button' data-bs-toggle='modal' data-bs-target='#exampleModal'>EDIT</button></td><td><button type='button' class='btn btn-secondary delete-button'>REMOVE</button></td></tr>");
            // same data appended to 2nd table 
            $('#list_candidate_2').append("<tr><td class='Candidatename'>" + candidateName + "</td><td class='id'>" + candidateId + "</td><td><button class='vote-button'>VOTE</button></td><td class='counter'>0</td></tr>");
            } else {
                // table value change - after editing
                const row = $('#list_candidate').find('tr').eq(editIndex);
                row.find('td:eq(0)').text(candidateName);
                row.find('td:eq(1)').text(candidateId);
                 // 2table value also change - after editing
                const candidateRow = $('#list_candidate_2').find('tr').eq(editIndex);
                candidateRow.find('td:eq(0)').text(candidateName);
                candidateRow.find('td:eq(1)').text(candidateId);
            }
            resetForm();
        }
    });
    
    // Edit submission handler
    $('#EditButton').click(function(event){
        event.preventDefault();
        const isNameValidEdit = ValidatenameEdit();
        const isIDValidEdit = ValidateIdEdit();
        const editIndex = $('#editindex').val();
        const candidateIdEdit = $('#idEdit').val();
        // checking the id is similar 
        const IDExists = $('#list_candidate').find('td.id').filter(function(){
            return $(this).text() === candidateIdEdit && $(this).closest('tr').index() !== parseInt(editIndex);
        }).length > 0;
        
        if(IDExists){
            $('#message').text("Already existed ID");
            return false;
        }
        
        // validate the function values
            if(isNameValidEdit && isIDValidEdit){
            const candidateNameEdit = $('#CandidatenameEdit').val();

            // table value change - after editing
            const row = $('#list_candidate').find('tr').eq(editIndex);
            row.find('td:eq(0)').text(candidateNameEdit);
            row.find('td:eq(1)').text(candidateIdEdit);
            
            // 2table value also change - after editing
            const candidateRow = $('#list_candidate_2').find('tr').eq(editIndex);
            candidateRow.find('td:eq(0)').text(candidateNameEdit);
            candidateRow.find('td:eq(1)').text(candidateIdEdit);
            resetForm();
            $('#editindex').val('');
            $('#exampleModal').modal('hide');
        }
    });
    
    // Counting Button
    $('#list_candidate_2').on('click', '.vote-button', function () {
        const row = $(this).closest('tr');
        const CountVote = row.find('.counter');
        // convert text into integer
        let voteCount = parseInt(CountVote.text());
        voteCount++;
        CountVote.text(voteCount);
        Winner();
    });
    
    // Show button
    function Winner() {
        let maxVotes = 0;
        let winner = "";
        // Each table row itterate
        $('#list_candidate_2 tr').each(function() {
            const candidateName = $(this).find('.Candidatename').text();
            const voteCount = parseInt($(this).find('.counter').text());
            if (voteCount > maxVotes) {
                maxVotes = voteCount;
                winner = candidateName;
            }
        });
        $("#Show-button").click(function(){
            $(".winner").text("Winner: " + winner);
        });
        // $("#hide-button").click(function(){
        //     $(".winner").hide();
        // });
    }
    
    // Clear option
    $('#cancelEdit').on('click', function(){
        $('#editindex').val('');
        $('#exampleModal').modal('hide');
    });
    
    // Edit option
    $('#list_candidate').on('click', '.edit-button', function() {
        const row = $(this).closest('tr');
        const candidateNameEdit = row.find('td:eq(0)').text();
        const candidateIdEdit = row.find('td:eq(1)').text();
        const index = row.index();
        $('#CandidatenameEdit').val(candidateNameEdit);
        $('#idEdit').val(candidateIdEdit);
        $('#editindex').val(index); 
    });
    
    // Clear option
    $('#cancel').on('click', function(){
        $('#editindex').val('');
    });
    
    // Delete option
    $('#list_candidate').on('click', '.delete-button', function() {
        const row = $(this).closest('tr');
        const index = row.index();
        row.remove();
        $('#list_candidate_2').find('tr').eq(index).remove();
        resetForm();
    });
});
