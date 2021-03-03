from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions
from .models import Post
from .serializers import PostSerializer


class PostList(ListCreateAPIView):

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Post.objects.filter(owner=self.request.user)


class PostDetailView(RetrieveUpdateDestroyAPIView):

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PostSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Post.objects.filter(owner=self.request.user)
