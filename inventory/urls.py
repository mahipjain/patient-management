from django.conf.urls import url
from django.views.generic import TemplateView

from . import views

urlpatterns = [
	url(r'^$', TemplateView.as_view(template_name='index.html')),
	url(r'^add_patient/$', views.add_patient),
	url(r'^patient_list/$', views.patient_list),
]
