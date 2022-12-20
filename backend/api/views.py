from rest_framework import viewsets
from .models import Coordinate
from .serializers import CoordinateSerializer

class CoordinateViewset(viewsets.ModelViewSet):
    queryset = Coordinate.objects.all()
    serializer_class = CoordinateSerializer
