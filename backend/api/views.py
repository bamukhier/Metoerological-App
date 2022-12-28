from rest_framework import viewsets, filters
from drf_multiple_model.viewsets import ObjectMultipleModelAPIViewSet
from drf_multiple_model.pagination import MultipleModelLimitOffsetPagination
from .models import Coordinate, City
from .serializers import CoordinateSerializer, CitySerializer

class CoordinateViewset(viewsets.ModelViewSet):
    queryset = Coordinate.objects.all()
    serializer_class = CoordinateSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['lat', 'long', '-updated_at']
    ordering = ('-updated_at')
    # search_fields = ['lat', 'long']

class CityViewset(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    http_method_names = ['get']
    # filter_backends = [filters.SearchFilter]
    # search_fields = [name_en', 'name_ar', 'lat', 'long']


# This a helper class to define LimitOffsetPagination for def-multiple-model
class LimitPagination(MultipleModelLimitOffsetPagination):
    default_limit = 10

class SearchAPIView(ObjectMultipleModelAPIViewSet):
    querylist = [
        {'queryset': Coordinate.objects.all(), 'serializer_class': CoordinateSerializer},
        {'queryset': City.objects.all(), 'serializer_class': CitySerializer}
    ]
    filter_backends = [filters.SearchFilter]
    search_fields = ['lat', 'long']
    pagination_class = LimitPagination