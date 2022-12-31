from django.contrib import admin
from django.urls import path, include
from api.urls import router, urlpatterns as tokenURLs

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth', include('rest_framework.urls', namespace='rest_framework')),
] + tokenURLs # /api/user/register & /api/user/logout & /api/token & /api/token/refresh
