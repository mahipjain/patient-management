from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^inventory/', include('inventory.urls')),
    url(r'^admin/', admin.site.urls),
]
