from rest_framework import viewsets, filters, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_multiple_model.viewsets import ObjectMultipleModelAPIViewSet
from drf_multiple_model.pagination import MultipleModelLimitOffsetPagination
from .models import Coordinate, City, CustomUser
from .serializers import CoordinateSerializer, CitySerializer, RegisterUserSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView


class RegisterUser(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    queryset = CustomUser.objects.all()
    serializer_class = RegisterUserSerializer

# this view is for removing and blacklisting a token when user logout
class BlacklistTokenView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CoordinateViewset(viewsets.ModelViewSet):
    queryset = Coordinate.objects.all()
    serializer_class = CoordinateSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['label', 'lat', 'long', '-updated_at']
    ordering = ('-updated_at')
    # search_fields = ['lat', 'long']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    


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
