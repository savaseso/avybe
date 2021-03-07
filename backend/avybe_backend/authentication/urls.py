from django.urls import path
from .views import RegisterView
from .views import LoginView
from .views import IsAuthView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('isAuth', IsAuthView.as_view()),
]
