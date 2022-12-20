from rest_framework import routers
from .views import CoordinateViewset, CityViewset

router = routers.DefaultRouter()
router.register('coordinate', CoordinateViewset)
router.register('city', CityViewset)