from __future__ import unicode_literals

from django.db import models

GENDER_CHOICES = (
	('Male', 'Male'),
	('Female', 'Female'),
)

class Patient(models.Model):
	firstname = models.CharField(max_length=20)
	lastname = models.CharField(max_length=20)
	age = models.IntegerField()
	dob = models.DateField()
	gender = models.CharField(max_length=6, choices=GENDER_CHOICES) 
	phone = models.IntegerField()
	description = models.CharField(max_length=200)

	def __str__(self):
		return self.firstname
