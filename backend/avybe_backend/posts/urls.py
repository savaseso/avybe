from django.urls import path
from .views import PostList,PostDetailView


urlpatterns = [
    path('', PostList.as_view()),
    path('<int:id>', PostDetailView.as_view()),
]
2