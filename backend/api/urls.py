from rest_framework import routers
from .views import CoordinateViewset, CityViewset

router = routers.DefaultRouter()
router.register('coords', CoordinateViewset)
router.register('city', CityViewset)