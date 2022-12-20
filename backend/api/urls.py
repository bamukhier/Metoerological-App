from rest_framework import routers
from .views import CoordinateViewset

router = routers.DefaultRouter()
router.register('coordinate', CoordinateViewset)