from rest_framework import routers
from .views import CoordinateViewset, CityViewset, SearchAPIView


router = routers.DefaultRouter()
router.register('coords', CoordinateViewset)
router.register('city', CityViewset)
router.register('findCoords', SearchAPIView, basename='findCoords')