# Generated by Django 4.1.4 on 2022-12-20 08:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coordinate',
            name='lat',
            field=models.DecimalField(decimal_places=6, max_digits=9),
        ),
        migrations.AlterField(
            model_name='coordinate',
            name='long',
            field=models.DecimalField(decimal_places=6, max_digits=9),
        ),
    ]