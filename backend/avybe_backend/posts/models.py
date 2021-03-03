from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Post (models.Model):
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    picture = models.ImageField(default='default.jpg', upload_to='post_pics')