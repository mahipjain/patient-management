from django.shortcuts import render
from models import Patient
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json

@csrf_exempt
def add_patient(request):
	if request.method == 'POST':
		print request.POST
        	firstname = request.POST.get('firstname')
		print firstname
        	lastname = request.POST.get('lastname')
		age = request.POST.get('age')
		dob = request.POST.get('dob')
		gender = request.POST.get('gender')
		phone = request.POST.get('phone')
		description = request.POST.get('description')
		response_data = {}

        	patient = Patient(firstname=firstname,lastname=lastname,age=age,dob=dob,gender=gender,phone=phone,description=description)
        	patient.save()

        	response_data['result'] = 'Data stored successfully!'
        	return HttpResponse(
            	json.dumps(response_data),
            	content_type="application/json"
        	)	
    	else:
        	return HttpResponse(
            	json.dumps({"nothing to see": "this isn't happening"}),
            	content_type="application/json"
        	)

def patient_list(request):
	patients = Patient.objects.all()
	pat_list = []
	for patient in patients:
		temp_dict= {'id':patient.id, 'firstname':patient.firstname, 'lastname':patient.lastname}
		pat_list.append(temp_dict)
	return HttpResponse(json.dumps(pat_list), content_type="application/json")
