$( document ).ready(function() {

	$('#form-anchor').click(function(){
		console.log("ghfghjk");
		$('#patient-info').show();
		$('#patient-list').hide();
	});
	$('#list-anchor').click(function(){
		console.log("fhgjjk");
		$('#patient-info').hide();
		$('#patient-list').show();
	});

	$.ajax({
		url: "patient_list/",
		type: 'GET',
		success : function(json){
			var list = '';
			for(var i=0; i<json.length; i++) {
				list += '<tr>\
				<td>'+json[i].id+'</td>\
				<td>'+json[i].firstname+'</td>\
				<td>'+json[i].lastname+'</td>\
				</tr>';
			}
			$('#list-body').append(list);
		}
});

});

function formSubmit() {
	console.log("create post is working!")
	if(validate()){
		$.ajax({
			url : "add_patient/",
			type : "POST",
			data : { firstname : $('#firstname').val(),
			lastname: $('#lastname').val(),
			age: $('#age').val(),
			dob: $('#dob').val(),
			gender: $('#gender').val(),
			phone: $('#phone').val(),
			description: $('#description').val().replace(/</g, "&lt;").replace(/>/g, "&gt;"),
		},

		success : function(json) {
			$('#patient-form')[0].reset(); 
			console.log(json); 
			console.log("success");
			$("#talk").prepend("<li><strong>"+json.result+"</strong></li>");
		},

		error : function(xhr,errmsg,err) {
			$('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
				" <a href='#' class='close'>&times;</a></div>");
			console.log(xhr.status + ": " + xhr.responseText);

		}
	});
	}
};

function validate(){
	var list = document.getElementsByTagName("p");
	for (var i = list.length - 1; i >= 0; i--) {
		list[i].innerHTML = '';
	}
	console.log("jhhsfhghklj");
	var errors = 0;
	var firstname = $('#firstname').val(),
	lastname = $('#lastname').val(),
	age = $('#age').val(),
	dob = new Date($('#dob').val()),
	gender = $('#gender').val(),
	phone = $('#phone').val(),
	description = $('#description').val();
	var pattern = '';
	pattern = new RegExp(/^([a-z])+$/i);
	if(!pattern.test(firstname)){
		$('<p style="color:red;">Please enter valid  firstname</p>').insertAfter('#firstname');
		errors++;
	}
	if(!pattern.test(lastname)){
		$('<p style="color:red;">Please enter valid  lastname</p>').insertAfter('#lastname');
		errors++;
	}
	pattern = new RegExp(/^(\d)+$/);
	if(!pattern.test(age)){
		$('<p style="color:red;">Please enter valid  age. It should be a whole number greater than zero.</p>').insertAfter('#age');
		errors++;
	}
	var now = new Date();
	if(!(dob < now)){
		$('<p style="color:red;">Please enter valid  Date of birth.</p>').insertAfter('#dob');
		errors++; 
	}
	if(!(gender=='Male'||gender=='Female'))
	{
		$('<p style="color:red;">Please select gender from the list.</p>').insertAfter('#gender');
	}
	pattern = new RegExp(/(\+91-)?(\+91)?([7-9]{1})([0-9]{9})/);
	if(!pattern.test(phone)){
		$('<p style="color:red;">Please enter valid phone number. Valid formats are +91-9876543210, +919876543210, 9876543210</p>').insertAfter('#phone');
	}
	description = description.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	return errors == 0;
}

function search() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("patient-name");
  filter = input.value.toUpperCase();
  table = document.getElementById("patient-table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td1 = tr[i].getElementsByTagName("td")[1];
    td2 = tr[i].getElementsByTagName("td")[2];
    if (td1 || td2) {
      if (td1.innerHTML.toUpperCase().indexOf(filter) > -1 || td2.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}