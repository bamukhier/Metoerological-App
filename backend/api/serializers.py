from rest_framework import serializers
from .models import Coordinate, City

class CoordinateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinate
        fields = ('id', 'lat', 'long', 'updated_at')

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('id', 'region_id', 'name_ar', 'name_en', 'lat', 'long')