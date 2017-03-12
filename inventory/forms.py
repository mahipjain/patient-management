from models import *
from django import forms

class PatientForm(forms.ModelForm):
	class Meta:
		model = Patient
		fields = ['firstname', 'lastname', 'age',
				'gender', 'phone', 'description'
			]
