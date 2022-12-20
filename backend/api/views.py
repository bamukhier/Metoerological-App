from rest_framework import viewsets
from .models import Coordinate, City
from .serializers import CoordinateSerializer, CitySerializer

class CoordinateViewset(viewsets.ModelViewSet):
    queryset = Coordinate.objects.all()
    serializer_class = CoordinateSerializer

class CityViewset(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer