from rest_framework import viewsets, filters
from drf_multiple_model.viewsets import ObjectMultipleModelAPIViewSet
from .models import Coordinate, City
from .serializers import CoordinateSerializer, CitySerializer

class CoordinateViewset(viewsets.ModelViewSet):
    queryset = Coordinate.objects.all()
    serializer_class = CoordinateSerializer
    # filter_backends = [filters.SearchFilter]
    # search_fields = ['lat', 'long']

class CityViewset(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    http_method_names = ['get']
    # filter_backends = [filters.SearchFilter]
    # search_fields = [name_en', 'name_ar', 'lat', 'long']

class SearchAPIView(ObjectMultipleModelAPIViewSet):
    querylist = [
        {'queryset': Coordinate.objects.all(), 'serializer_class': CoordinateSerializer},
        {'queryset': City.objects.all(), 'serializer_class': CitySerializer}
    ]
    filter_backends = [filters.SearchFilter]
    search_fields = ['lat', 'long']