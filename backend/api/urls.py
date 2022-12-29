from rest_framework import routers
from django.urls import path
from .views import CoordinateViewset, CityViewset, SearchAPIView, RegisterUser, BlacklistTokenView

router = routers.DefaultRouter()
router.register('coords', CoordinateViewset)
router.register('city', CityViewset)
router.register('findCoords', SearchAPIView, basename='findCoords')

urlpatterns = [
    path('api/user/register', RegisterUser.as_view()),
    path('api/user/logout', BlacklistTokenView.as_view()),
]