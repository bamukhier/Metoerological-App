from django.db import models

class Coordinate(models.Model):
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    long = models.DecimalField(max_digits=9, decimal_places=6)
    updated_at = models.DateTimeField(auto_now=True)

class City(models.Model):
    region_id = models.IntegerField()
    name_ar = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100)
    lat = models.DecimalField(max_digits=11, decimal_places=8)
    long = models.DecimalField(max_digits=11, decimal_places=8)